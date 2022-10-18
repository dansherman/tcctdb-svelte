import getHash from '$lib/hash';
import updateClient from '$lib/sanityUpdateClient.js';
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
		return {status:200}
	} else {
			return {status: 403};
		}
	}