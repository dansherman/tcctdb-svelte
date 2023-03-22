import client from '$lib/sanityClient.js';

export async function GET({params}) {
  const { slug } = params;
  const crewQuery = `*[ _type == 'assignment' && production->slug.current == $slug && !(_id in path("drafts.**"))]|order(job->sortOrder){
    _id,
    "jobName":job->jobName,
    person->{
      _id,
      "name":nameFirst + " " + nameLast,
      nameLast,
      nameFirst,
      headshot,
      slug}
    }`;
  
  let people = await client.fetch(crewQuery,{slug:slug})
  return new Response(JSON.stringify(people))
}