import client from "$lib/sanityClient";
export const prerender = false;
export async function load() {
  const query = `*[_type=='show']`;
  const shows = await client.fetch(query);
  return { shows };
}
