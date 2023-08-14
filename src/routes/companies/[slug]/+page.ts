export const prerender = false;
import client from '$lib/sanityClient.js';

export async function load({ params }) {
	const { slug } = params;
	const query = `
	*[_type == 'company' && slug.current == $slug]{
		...}
`;
	const productionQuery = `*[_type == 'production' && company->slug.current == $slug]{
    slug,
    show->{title},
    poster,
    company->{name},
    'year':performanceDates[0].dateAndTime,
  }`
	const companies = await client.fetch(query, params={'slug':slug});
	let productions = await client.fetch(productionQuery, params={'slug':slug});
	const company = companies[0];
	productions = productions.map((p) => {
    if (p.year != null) {
      p.year = p.year.slice(0, 4);
    } else {
      p.year = "—";
    }
    return p;
  });
	if (company) {
    return { company, productions };
	}

}