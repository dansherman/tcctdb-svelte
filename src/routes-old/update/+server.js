import { json as json$1 } from '@sveltejs/kit';
import updateClient from '$lib/sanityUpdateClient.js';

export async function POST({ params, request }) {
	const data = await request.json();
  console.log(data)
  data.forEach(async (item) => {
    let updateParams = {}
    if (item.ref) {
      updateParams[item.field] = {_ref:item.value}
    } else {
      updateParams[item.field] = item.value
    }
    await updateClient
        .patch(item._id)
        .set(updateParams)
        .commit()
        .then((res) => {
          return JSON.stringify(res);
        })
        .catch((err) => {
          return err.message;
        });
      }
  )
  return json$1({message:"OK"})
}
