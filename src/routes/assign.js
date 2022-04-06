import updateClient from '$lib/sanityUpdateClient.js';

export async function post({ params, request }) {
	const data = await request.json();
  let postData = [{ _id: data._id, field: "crew", value: data.person._id }]
	let result = await fetch('/update', {
    method: "POST",
    body: JSON.stringify(postData),
  });
  let qParams = {show_id: data.show._id}
  let response = await updateClient.fetch(`*[ _type == 'job' && references($show_id) && !(_id in path("drafts.**"))]{
    _id, "jobName":jobRef->jobName,"sortOrder":jobRef->sortOrder, person->{_id,"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}}`, qParams)

  return {
    status: 200,
    body: {response: response}
  }
}
