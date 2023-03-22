import updateClient from '$lib/sanityUpdateClient.js';
/** @type {import('./edit/$types').Actions} */
export const actions = {
	saveCharacter: async ({request}) => {
		const data = await request.formData();
		const _id = data.get('_id').toString()
		const vocalRange = data.get('vocalRange').toString()
		const notes = data.get('notes').toString()
		const characterName = data.get('characterName').toString()
		let response = await updateClient
			.patch(_id)
			.set({vocalRange: vocalRange})
			.set({notes: notes})
			.set({characterName: characterName})
			.commit()
			.then((res) => {
				return JSON.stringify(res);
			})
			.catch((err) => {
				return err.message;
			});
		return { response: response }
	},
	addCharacter: async ({  request }) => {
		const data = await request.formData();
    const characterName = data.get('newCharacter');
		const showId = data.get('showId')
		let response = await updateClient.create(
			{
				_type: 'character',
				characterName: characterName,
				show: {
					'_type':'reference',
					'_ref':showId
				}
			})
			.then((res) => {
				return JSON.stringify(res);
			})
			.catch((err) => {
				return err.message;
			});
		console.log(response)
		return { response: response }
  },

};

export async function load({params}) {
	const {slug} = params
  const qParams = {slug:slug}
	const query = `*[_type == 'show' && slug.current == $slug][0]{
		...,
		'characters': *[_type == 'character' && references(^._id)]|order(sortOrder asc){...,'editing':false}
  }`;
    const results = await updateClient.fetch(query, params=qParams);
    return  results;
}