import { json as json$1 } from '@sveltejs/kit';
import updateClient from '$lib/sanityUpdateClient.js';
import slugify from '$lib/slugify';
export async function POST({ params, request }) {
	const data = await request.json();
  let slug = slugify(`${data.nameFirst} ${data.nameLast}`)
  let slugQuery = `count(*[_type == 'person' && slug.current == '${slug}'])`
  let slugCheck = await updateClient.fetch(slugQuery)
  // console.log({slugQuery, slugCheck})
  let response = JSON.stringify({
    slug: {current:'duplicate'},
    nameFirst: data.nameFirst,
    nameLast: data.nameLast

  })
  if (slugCheck === 0) {
    response = await updateClient.create(
      {
        _type: 'person',
        nameLast: data.nameLast,
        nameFirst: data.nameFirst,
        slug: {
          current:slug
        }
      })
      .then((res) => {
        return JSON.stringify(res);
      })
      .catch((err) => {
        return err.message;
      });
  }
  return json$1({response: JSON.parse(response)})
}
