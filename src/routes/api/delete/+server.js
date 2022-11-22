import { json as json$1 } from '@sveltejs/kit';
import updateClient from '$lib/sanityUpdateClient.js';

export async function POST({ params, request }) {
	const data = await request.json();
	let response = await updateClient
    .delete(data._id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });

  return json$1({response})
}