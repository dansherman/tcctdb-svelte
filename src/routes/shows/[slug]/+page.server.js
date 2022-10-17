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
      description,
      poster,
      performanceDates[]{dateAndTime,venue->{name}},
      'crew': *[ _type == 'job' && references(^._id) && !(_id in path("drafts.**"))]|order(jobRef->sortOrder){
        _id,"taskName":jobRef->jobName, person->{_id,"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}},
      'cast': *[ _type == 'character' && references(^._id) && !(_id in path("drafts.**"))]|order(sortOrder asc){
        _id,sortOrder,"taskName":characterName,person->{_id,"name":nameFirst + " " + nameLast,nameLast,nameFirst,headshot,slug}},
      auditionInformation,
      displayAuditionInformation,
      auditionLink,
      slug
    },
    'people':*[_type == 'person']|order(nameFirst)|order(nameLast){_id, nameLast, nameFirst, headshot, slug},
    'jobs':*[_type == 'jobTypes']|order(sortOrder){_id,jobName}
  }`;
    const results = await updateClient.fetch(query, params=qParams);
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

