import updateClient from '$lib/sanityUpdateClient.js';

export async function post({ params, request }) {
	const data = await request.json();
  // jobRef:{} 2 items
  // _ref:54de9441-d794-47ca-9a28-3c0e90ecece6
  // _type:reference
  // person:{} 2 items
  // _ref:2ab73d0f-efb9-4ad8-a2e2-4d9045adee9e
  // _type:reference
  // show:{} 2 items
  // _ref:57f8c144-8550-458e-9da7-131c8196a0a5
  // _type:reference

	let response = await updateClient.create(
    {
      _type: 'job',
      jobRef: {
        _ref: data.newJob._id
      },
      show: {
        _ref: data.show._id
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });
  let qParams = {show_id: data.show._id}
  response = await updateClient.fetch(`*[ _type == 'job' && references($show_id) && !(_id in path("drafts.**"))]|order(jobRef->sortOrder asc){
    "taskName":jobRef->jobName, person->{_id,"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}}`, qParams)

  return {
    status: 200,
    body: {response: response}
  }
}
