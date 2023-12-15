import client from '$lib/sanityClient.js';
import groq from 'groq';

export async function load({ params }) {
	const { slug } = params;
	const query = groq`
	*[_type == 'person' && slug.current == $slug]{
		nameFirst,
		"name": nameFirst + " " + nameLast,
		nameLast,
		headshot,
		biography,
		"resumeUrl":resume.asset->url,
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
			},
			'photos':*[_type=='photo' && references(*[ _type == 'role' && references(^.^._id)]._id) ]{'_id':photo.asset._ref,caption,photo,'metadata':photo.asset->metadata,"attribution":attribution->name,roles[]->{"characterName":character->characterName, castMember{"name":person->nameFirst + " " + person->nameLast, "slug":person->slug}}},
    
	}
`;
	const people = await client.fetch(query, params={'slug':slug});
	const person = people[0];
	if (person) {
    return { person };
	}
}