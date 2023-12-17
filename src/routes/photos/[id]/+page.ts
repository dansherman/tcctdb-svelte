import client from '$lib/sanityClient.js';
import groq from 'groq';

export async function load({ params }) {
	const { id } = params;
	const query = groq`*[_id == $id]{'_id':photo.asset._ref,caption,photo,'metadata':photo.asset->metadata,"attribution":attribution->name,roles[]->{"characterName":character->characterName, castMember{"name":person->nameFirst + " " + person->nameLast, "slug":person->slug}}}`;
	const result = await client.fetch(query, params={'id':id});
	const photo = result[0];
	if (photo) {
    return { photo };
	}
}