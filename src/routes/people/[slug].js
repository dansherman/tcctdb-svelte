import updateClient from '$lib/sanityUpdateClient.js';

import dayjs from 'dayjs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}) {
	const {slug} = params
	const query = `*[_type == 'person' && slug.current == '${slug}'][0]{...}`;
    const person = await updateClient.fetch(query);
    return {
			body: { person }
		};
}

// export async function post({ params, request }) {
// 	const { slug, key } = params;
// 	const data = await request.json();
//   if (getHash(slug) === key) {
// 		let avatarID = ""
// 		if (data.avatarData) {

// 			let avatarBuffer = await Buffer.from(data.avatarData, 'base64');
// 			let ext = data.avatarType.split('/')[1]
// 			updateClient.assets.upload(
// 				'image', 
// 				avatarBuffer,  
// 				{
// 					contentType: data.avatarType, 
// 					filename: `${slug}.${ext}`
// 				})
// 			.then((document)=>{
// 				avatarID = document._id
// 				updateClient
// 				.patch(data._id)
// 				.set({'headshot.asset._ref': avatarID})
// 				.commit()
// 			})
// 			.catch((err) => {
// 				console.log("Error uploading headshot:")
// 				console.log(err.message)
// 			})
// 		}
// 		updateClient
// 			.patch(data._id)
// 			.set({'nameFirst': data.nameFirst})
// 			.set({'nameLast': data.nameLast})
// 			.set({'biography': data.biography})
// 			.set({'emailAddress': data.emailAddress})
// 			.commit()
// 			.then((res) => {
// 				return JSON.stringify(res)
// 			})
// 			.catch((err) => {
// 				return err.message
// 			})
// 	} else {
// 		return {
// 			status: 403
// 		};
// 	}
// }
