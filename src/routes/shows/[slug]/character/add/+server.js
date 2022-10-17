import updateClient from '$lib/sanityUpdateClient.js';

export async function POST({ params, request }) {
	const data = await request.json();
  // let postData = {
  //     characterName: newCharacter,
  //     show: {
  //       '_type':'reference',
  //       '_ref':show._id
  //     }
  //   }

	let response = await updateClient.create(
    {
      _type: 'character',
      characterName: data.characterName,
      show: data.show
    })
    .then((res) => {
      return JSON.stringify(res);
    })
    .catch((err) => {
      return err.message;
    });
  return {
    status: 200,
    body: {response: JSON.parse(response)}
  }
}
