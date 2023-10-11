import client from '$lib/sanityClient.js';
import groq from 'groq';
export async function load() {
	const query = groq`
	*[_type == 'company']{
		...}
`;
	const companies = await client.fetch(query);

    return { companies };
	}
