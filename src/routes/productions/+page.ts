import client from "$lib/sanityClient";
import type { Production } from "$lib/types";
import groq from "groq";
export const prerender = true;
export async function load() {
  const query = groq`*[_type == 'production']{
    slug,
    show->{title},
    poster,
    company->{name, slug},
    'year':performanceDates[0].dateAndTime,
  }`;
  let productions = await client.fetch(query);
  productions = productions.map((p:Production) => {
    if (p.year != null) {
      p.year = p.year.slice(0, 4);
    } else {
      p.year = "—";
    }
    return p;
  });
  return { productions };
}
