import updateClient from '$lib/sanityUpdateClient.js';
import slugify from '$lib/slugify';
export async function POST({ params, request }) {
	const data = await request.json();

	let response = await updateClient.create(
    {
      _type: 'sponsor',
      name: data.name,
      slug: slugify(data.name)
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
