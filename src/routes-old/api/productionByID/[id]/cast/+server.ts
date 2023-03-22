import client from '$lib/sanityClient.js';

export async function GET({params}) {
  const { id } = params;
  let castQuery = `*[ _type == 'role' && references($id) && !(_id in path("drafts.**"))]{
    _id,
    sortOrder,
    character->{characterName,characterPhoto},
    person->{
      _id,
      "name":nameFirst + " " + nameLast,
      nameLast,
      nameFirst,
      headshot,
      slug
    }
  }`
  
  let people = await client.fetch(castQuery,{ id: id })
  return new Response(JSON.stringify(people))
}