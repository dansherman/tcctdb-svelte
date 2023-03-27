export const prerender = false;
import client from "$lib/sanityClient";
export async function load({ params }) {
  const query = `*[_type == 'company' ]{...}`;
  let companies = await client.fetch(query);

  return { companies };
}
