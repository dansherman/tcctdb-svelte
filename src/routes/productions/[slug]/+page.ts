import client from '$lib/sanityClient.js';

import dayjs from 'dayjs';

export async function load({params}) {
	const {slug} = params
	const productionQuery = `*[_type == 'production' && slug.current == $slug][0]{ 
    _id,
    description,
    poster,
    performanceDates[]{dateAndTime,venue->{name}},
    show->,
    company->{name,logo, slug},
    slug
  }`;

  const castQuery = `*[ _type == 'role' && references($id) && !(_id in path("drafts.**"))]|order(character->sortOrder asc){
    _id,
    character->{sortOrder, characterName, allowMultiple},
    characterPhoto,
    people[]->{
      _id,
      "name":nameFirst + " " + nameLast,
      nameLast,
      nameFirst,
      headshot,
      slug
    }
  }`
  const crewQuery = `*[ _type == 'assignment' && references($id) && !(_id in path("drafts.**"))]|order(job->sortOrder asc){
    _id,
    job->{sortOrder, jobName, allowMultiple},
    people[]->{
      _id,
      "name":nameFirst + " " + nameLast,
      nameLast,
      nameFirst,
      headshot,
      slug}
    }`
    const production = await client.fetch(productionQuery, {slug:slug});
    let cast = await client.fetch(castQuery, {id:production._id})
    let crew = await client.fetch(crewQuery, {id:production._id})
    for (let row of cast) {
      row.characterName = row.character.characterName
    }
    for (let row of crew) {
      row.jobName = row.job.jobName
    }
    if ( production.performanceDates ) {
      production.parsedPerformanceDates = production.performanceDates.map((pd) => {
        let d = new Date(pd.dateAndTime);
        return {'dateAndTime':dayjs(d).format('MMM D, YYYY h:mma'), 'venue':pd.venue}
      })
    }
    return { production, cast, crew };
}

