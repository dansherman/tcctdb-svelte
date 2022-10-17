export const prerender = false;
import updateClient from '$lib/sanityUpdateClient.js';
import getHash from '$lib/hash.js'

export async function GET({ params }) {
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
	const people = await updateClient.fetch(query, params={'slug':slug});
	const person = people[0];
	if (person) {
    return {
			body: { person }
		};
	}

}

export async function POST({ params, request }) {
	const { slug, key } = params;

	const data = await request.json();
  if (getHash(slug) === key) {
		let newDoc = {
			_type: "person",
			...data
		}
		newDoc['_id'] = `${data._id}`
		delete newDoc.key
		delete newDoc.name
		if (data.avatarData) {

			let avatarBuffer = await Buffer.from(data.avatarData, 'base64');
			let ext = data.avatarType.split('/')[1]
			let avatarDoc = await updateClient.assets.upload(
				'image', 
				avatarBuffer,  
				{
					contentType: data.avatarType, 
					filename: `${slug}.${ext}`
				})

			newDoc.headshot = {
				asset:
					{_ref: avatarDoc._id}
			}
		}
		delete newDoc.avatarData
		delete newDoc.avatarType
		updateClient.createOrReplace(newDoc)
		return {body: {message:"OK"},status:200}
	} else {
		return {
			status: 403
		};
	}
}
