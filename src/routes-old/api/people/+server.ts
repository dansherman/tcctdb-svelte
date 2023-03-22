import client from '$lib/sanityClient.js';

export async function GET() {
	
  let people = await client.fetch(`*[_type == 'person' && !(_id in path("drafts.**")) && (isLocal || isLocal == null)]|order(nameFirst)|order(nameLast)`)

  return new Response(JSON.stringify(people))
}