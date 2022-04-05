import updateClient from '$lib/sanityUpdateClient.js';

export async function post({ params, request }) {
	const data = await request.json();

	let response = await updateClient
    .delete(data._id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });

  return {
    status: 200,
    body: {response}
  }
}
