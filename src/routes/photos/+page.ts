import client from "$lib/sanityClient";
import groq from "groq";
export async function load({ params }) {
  const query = groq`*[_type == 'photo' ]{...}`;
  let photos = await client.fetch(query);

  return { photos };
}