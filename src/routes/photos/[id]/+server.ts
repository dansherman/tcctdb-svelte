import client from '$lib/sanityClient.js';
import groq from 'groq';

export async function entries() {
  const query = groq`*[_type == 'photo']{
    "id":_id
  }
`;
  let ids = await client.fetch(query);
  
  return  ids ;
}

export const prerender = true;