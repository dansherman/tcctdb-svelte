
export const prerender = false;
import client from '$lib/sanityClient.js';

export async function load({ params }) {
	const { slug } = params;
	const query = `
	*[_type == 'person' && slug.current == $slug]{
		nameFirst,
		"name": nameFirst + " " + nameLast,
		nameLast,
		headshot,
		biography,
		slug,
		'assignments': *[ _type == 'assignment' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc){
			'jobName':job->jobName,
			production->{
				'title':show->title,
				'company':company->name,
				poster,
				slug}
			},
		'roles': *[ _type == 'role' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc){
			'characterName':character->characterName,
			production->{
				'title':show->title,
				'company':company->name,
				poster,
				slug}
			},
		'mostRecent': *[(_type == 'assignment' || _type == 'role') && references(^._id)]|order(production.performanceDates[0].dateAndTime asc)[0]{
							production->{
				'title':show->title,
				'company':company->name,
				poster,
				slug}
			}
	}
`;
	const people = await client.fetch(query, params={'slug':slug});
	const person = people[0];
	if (person) {
    return { person };
	}

}

