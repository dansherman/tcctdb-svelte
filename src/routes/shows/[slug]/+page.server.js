import updateClient from '$lib/sanityUpdateClient.js';

import dayjs from 'dayjs';

export async function load({params}) {
	const {slug} = params
  const qParams = {slug:slug}
	const query = `*[_type == 'show' && slug.current == $slug][0]{
      ...,
      'characters': *[_type == 'character' && references(^._id)]{...}
  }`;
    const results = await updateClient.fetch(query, params=qParams);
    return  results;
}

