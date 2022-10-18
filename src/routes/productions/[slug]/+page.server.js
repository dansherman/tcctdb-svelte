import updateClient from '$lib/sanityUpdateClient.js';

import dayjs from 'dayjs';

export async function load({params}) {
	const {slug} = params
  const qParams = {slug:slug}
	const query = `*[_type == 'production' && slug.current == $slug][0]{ 
    _id,
    description,
    poster,
    show->{...},
    performanceDates[]{dateAndTime,venue->{name}},
    'crew': *[ _type == 'assignment' && references(^._id) && !(_id in path("drafts.**"))]|order(job->sortOrder){
      _id,
      "jobName":job->jobName,
      person->{
        _id,
        "name":nameFirst + " " + nameLast,
        nameLast,
        nameFirst,
        headshot,
        slug
      }
    },
    'cast': *[ _type == 'role' && references(^._id) && !(_id in path("drafts.**"))]|order(sortOrder asc){
      _id,
      sortOrder,
      "characterName":character->characterName,
      person->{
        _id,
        "name":nameFirst + " " + nameLast,
        nameLast,
        nameFirst,
        headshot,
        slug
      }
    },
    slug
  }`;
    const results = await updateClient.fetch(query, params=qParams);
    if ( results.performanceDates ) {
      results.parsedPerformanceDates = results.performanceDates.map((pd) => {
        let d = new Date(pd.dateAndTime);
        return {'dateAndTime':dayjs(d).format('MMM D, YYYY h:mma'), 'venue':pd.venue}
      })
    }
    return results;
}

