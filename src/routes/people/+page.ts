export const prerender = false;
import client from "$lib/sanityClient";
export async function load({ params }) {
  const query = `*[_type == 'person' && isLocal]|order(nameFirst asc)|order(nameLast asc){
    slug,
    nameLast,
    nameFirst,
    headshot,
    "roleCount": count(*[_type == 'role' && references(^._id)]),
    "jobCount": count(*[_type == 'assignment' && references(^._id)])
  }`;
  let people = await client.fetch(query);

  return { people };
}
