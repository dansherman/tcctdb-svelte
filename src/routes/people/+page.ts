import client from "$lib/sanityClient";
import groq from "groq";
export async function load({ params }) {
  const query = groq`*[_type == 'person' && (!excludePerson || !defined(excludePerson))]|order(nameFirst asc)|order(nameLast asc){
    "slug":slug.current,
    nameLast,
    nameFirst,
    headshot,
    "roleCount": count(*[_type == 'role' && references(^._id)]),
    "jobCount": count(*[_type == 'assignment' && references(^._id)])
  }`;
  let people = await client.fetch(query);

  return { people };
}