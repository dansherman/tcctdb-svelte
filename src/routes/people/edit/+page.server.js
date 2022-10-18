export const prerender = false;
import  client  from '$lib/sanityClient'
export async function load({ params }) {
  const query = `*[_type=='person']| order(nameFirst asc)|order(nameLast asc)
{
  headshot, 
  nameFirst, 
  nameLast, 
  slug,
  'mostRecent': *[(_type == 'job' || _type == 'character') && references(^._id)]|order(production.performanceDates[0].dateAndTime asc)[0]{
                production->{
          'show':show->title,
          'company':company->name,
          poster,
          'slug':slug.current}
        }
}`;
  let people = await client.fetch(query);
  people = people.map((person) => {
    if (person.lastShow == undefined)
    {
      person.lastShow = {role:"",show:{title:"", role:""}}
    }
    return person
  })
    
  return { people };
}
