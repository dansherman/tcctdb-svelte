import updateClient from '$lib/sanityUpdateClient.js';

import dayjs from 'dayjs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({params}) {
	const {slug} = params
  const qParams = {slug:slug}
	const query = `{
    'show':*[_type == 'show' && slug.current == $slug][0]{
      _id,
      title,
      'cast': *[ _type == 'character' && references(^._id) && !(_id in path("drafts.**"))]|order(sortOrder asc){
        _id,sortOrder,"taskName":characterName,person->{_id,"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}},
      slug
    },
    'people':*[_type == 'person']|order(nameFirst)|order(nameLast){_id, nameLast, nameFirst, headshot, slug},
  }`;
    const results = await updateClient.fetch(query, params=qParams);
    return {
			body: { results }
		};
}

