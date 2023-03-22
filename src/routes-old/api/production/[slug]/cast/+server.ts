import client from '$lib/sanityClient.js';

export async function GET({params}) {
  const { slug } = params;
  const productionQuery = `*[_type == 'production' && slug.current == $slug][0]{_id}`;
  const production = await client.fetch(productionQuery, {slug:slug});
  let castQuery = `*[ _type == 'role' && production->slug.current == $slug && !(_id in path("drafts.**"))]{
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
  
  let people = await client.fetch(castQuery,{slug:slug})
  return new Response(JSON.stringify(people))
}