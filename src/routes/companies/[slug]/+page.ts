
export const prerender = false;
import client from '$lib/sanityClient.js';

export async function load({ params }) {
	const { slug } = params;
	const query = `
	*[_type == 'company' && slug.current == $slug]{
		...}
`;
	const productionQuery = `*[_type == 'production' && company->slug.current == $slug]{
  
		poster, show->{title}, slug}`
	const companies = await client.fetch(query, params={'slug':slug});
	const productions = await client.fetch(productionQuery, params={'slug':slug});
	const company = companies[0];
	if (company) {
    return { company, productions };
	}

}


