import client from "$lib/sanityClient";
export const prerender = false;
export async function load() {
  const query = `*[_type=='production']{
		'company':company->name,
		'show':show->title,
		'year':performanceDates[0].dateAndTime,
		poster,
		slug
	}`;
  let productions = await client.fetch(query);
  productions = productions.map((p) => {
    if (p.year != null) {
      p.year = p.year.slice(0, 4);
    } else {
      p.year = "—";
    }
    return p;
  });
  return { productions };
}
