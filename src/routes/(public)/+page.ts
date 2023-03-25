export const prerender = false;
import client from "$lib/sanityClient";
export async function load({ params }) {
  const query = `*[_type == 'production']{
    slug,
    show->{title},
    poster
  }`;
  let productions = await client.fetch(query);

  return { productions };
}