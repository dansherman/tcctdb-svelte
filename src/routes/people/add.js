import updateClient from '$lib/sanityUpdateClient.js';

export async function post({ params, request }) {
	const data = await request.json();
  let slug = `${data.nameFirst}-${data.nameLast}`.toLowerCase()
  let slugQuery = `count(*[_type == 'person' && slug.current == '${slug}'])`
  let slugCheck = await updateClient.fetch(slugQuery)
  console.log({slugQuery, slugCheck})
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
  return {
    status: 200,
    body: {response: JSON.parse(response)}
  }
}
