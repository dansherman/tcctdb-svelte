    
import  client  from '$lib/sanityClient'
		export const prerender = false;
export async function load() {
	const query = `*[_type=='company']{
		'company':company->name,
		slug
	}`;
	let companies = await client.fetch(query);

	return { companies };
}
