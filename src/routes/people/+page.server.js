export const prerender = false;
import client from "$lib/sanityClient";
export async function load({ params }) {
  const query = `*[_type=='person']| order(nameFirst asc)|order(nameLast asc)
  {
    headshot, 
    nameFirst, 
    nameLast, 
    slug,
    'mostRecentJob': *[_type == 'job' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc)[0]{
      jobName->{jobName},
      production->{
        'show':show->title,
        'company':company->name,
        poster,
        'slug':slug.current
      }
    },
    'mostRecentRole': *[_type == 'role' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc)[0]{
      'characterName':character->characterName,
      production->{
        'show':show->title,
        'company':company->name,
        poster,
        'slug':slug.current
      }
    }
  }
  `;
  let people = await client.fetch(query);

  return { people };
}
