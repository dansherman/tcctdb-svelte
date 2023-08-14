import client from "$lib/sanityClient";
export async function load() {
  const query = `*[_type == 'show']`;
  let shows = await client.fetch(query);
  return { shows };
}
