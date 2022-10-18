export const prerender = false;
import client from '$lib/sanityClient.js';
import getHash from '$lib/hash.js'

export async function load({ params }) {
	const { slug } = params;
	const query = `
	*[_type == 'person' && slug.current == $slug]{
		nameFirst,
		"name": nameFirst + " " + nameLast,
		nameLast,
		headshot,
		biography,
		'slug':slug.current,
		'crew': *[ _type == 'job' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc){
			'jobName':jobName->jobName,
				production->{
				'show':show->title,
				'company':company->name,
				poster,
				'slug':slug.current}
			},
		'cast': *[ _type == 'role' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc){
			'characterName':character->characterName,
			production->{
				'show':show->title,
				'company':company->name,
				poster,
				'slug':slug.current}
			},
		'mostRecent': *[(_type == 'job' || _type == 'character') && references(^._id)]|order(production.performanceDates[0].dateAndTime asc)[0]{
							production->{
				'show':show->title,
				'company':company->name,
				poster,
				'slug':slug.current}
			}
	}
`;
	const people = await client.fetch(query, params={'slug':slug});
	const person = people[0];
	if (person) {
    return { person };
	}

}


