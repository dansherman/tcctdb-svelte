import updateClient from '$lib/sanityUpdateClient.js';

export async function post({ params, request }) {
	const data = await request.json();
  // data = [{_id, field, value}]
  data.forEach(async (item) => {
    switch (item.field) {
      case 'sortOrder':
        await updateClient
        .patch(item._id)
        .set({ sortOrder: item.value })
        .commit()
        .then((res) => {
          return JSON.stringify(res);
        })
        .catch((err) => {
          return err.message;
        });
        break
      case 'person':
        await updateClient
        .patch(item._id)
        .set({ person: {_ref:item.value }})
        .commit()
        .then((res) => {
          return JSON.stringify(res);
        })
        .catch((err) => {
          return err.message;
        });
      }
  })
  return {
    status: 200,
    body: {message:"OK"}
  }
}
