export const prerender = false;
import updateClient from '$lib/sanityUpdateClient.js';
import getHash from '$lib/hash.js'
import { email } from '$lib/email';

export async function GET({ params }) {
	const {slug} = params
	const query = `*[_type == 'person' && slug.current == '${slug}'][0]{...}`;
  const person = await updateClient.fetch(query);
	if (person) {
    let key = getHash(person.slug.current)
			let smtpResponse = email(person.emailAddress, "Login link for 4CT", `Here is your login link for 4CT: https://fourct.com/edit/${person.slug.current}/${key}/profile`)
    return {
			body: { smtpResponse }
		};
	}
}