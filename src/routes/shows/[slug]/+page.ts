import client from '$lib/sanityClient.js';

export async function load({params}) {
	const {slug} = params
  const qParams = {slug:slug}
	const query = `*[_type == 'show' && slug.current == $slug][0]{
      ...,
      'characters': *[_type == 'character' && references(^._id)]{...}
  }`;
    const show = await client.fetch(query, params=qParams);
    return {show};
}

