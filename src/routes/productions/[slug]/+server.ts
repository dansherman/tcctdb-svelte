import client from '$lib/sanityClient.js';
import groq from 'groq';

export async function entries() {
  const query = groq`*[_type == 'production']{
    "slug":slug.current
  }
`;
  let slugs = await client.fetch(query);
  
  return  slugs ;
}

export const prerender = true;