import updateClient from '$lib/sanityUpdateClient.js';

export async function get({params}) {
	const {slug, charNameEnc} = params
	let charName = decodeURIComponent(charNameEnc)
	const query = `count(*[_type == 'character' && show->slug.current == '${slug}' && characterName == '${charName}'])`;
    const person = await updateClient.fetch(query);
    return {
			body: { person }
		};
}