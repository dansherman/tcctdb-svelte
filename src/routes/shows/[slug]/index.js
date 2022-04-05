import updateClient from '$lib/sanityUpdateClient.js';

import dayjs from 'dayjs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({params}) {
	const {slug} = params
	const query = `{
    'show':*[_type == 'show' && slug.current == '${slug}'][0]{
      _id,
      title,
      description,
      poster,
      performanceDates[]{dateAndTime,venue->{name}},
      'crew': *[ _type == 'job' && references(^._id)]{
        jobName,person->{"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}},
      'cast': *[ _type == 'character' && references(^._id)]|order(sortOrder asc){
        _id,sortOrder,characterName,"actor":actor->{"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}},
      auditionInformation,
      displayAuditionInformation,
      auditionLink,
      slug
    },
    'actors':*[_type == 'person']|order(nameLast){_id, nameLast, nameFirst, headshot, slug}
  }`;
    const results = await updateClient.fetch(query);
    if ( results.show.performanceDates ) {
      results.show.parsedPerformanceDates = results.show.performanceDates.map((pd) => {
        let d = new Date(pd.dateAndTime);
        return {'dateAndTime':dayjs(d).format('MMM D, YYYY h:mma'), 'venue':pd.venue}
      })
    }
    return {
			body: { results }
		};
}
