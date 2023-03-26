import  client  from '$lib/sanityClient'
export const prerender = false;
export async function load() {
	const query = `{
  
		"Shows":*[_type == 'show']|order(title){title, 'href':slug.current},
		"People":*[_type == 'person' && (isLocal || isLocal == null)]|order(nameFirst)|order(nameLast){'name': nameLast + ', ' + nameFirst,nameFirst, nameLast, slug, vocalRange},
		"Companies":*[_type == 'company']{'href':slug.current, 'title':name},
		"Productions":*[_type == 'production']{'href':slug.current, 'title':slug.current}
		
		
	}`;
	let data = await client.fetch(query);
	
	return data;
}
