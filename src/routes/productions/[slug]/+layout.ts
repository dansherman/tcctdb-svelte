import client from '$lib/sanityClient.js';
import dayjs from 'dayjs';
import groq from 'groq';

export const load = async ({ params }) => {
	const { slug } = params;
	const productionQuery = groq`*[_type == 'production' && slug.current == $slug][0]{ 
    _id,
    description,
    poster,
    performanceDates[]{dateAndTime,venue->{name}},
    productionPhotos[]{_id,caption,photo,'metadata':photo.asset->metadata,"attribution":attribution->name,roles[]->{"characterName":character->characterName, castMember{"name":person->nameFirst + " " + person->nameLast, "slug":person->slug}}},
    show->,
    company->{name,logo, slug},
    slug,
    'year':performanceDates[0].dateAndTime,
  }`;

	const castQuery = groq`*[_type=='character' && references(*[_id==$id].show._ref)]|order(orderRank asc){
  characterName,
  roleSize,
  'castMembers':*[ _type == 'role' && references($id) && character->characterName==^.characterName && !(_id in path("drafts.**"))]{
      'castMember':castMember.person->{
        nameLast,
        nameFirst,
        slug,
        _id,
        "name":nameFirst + " " + nameLast,
        headshot,
      },
      'characterPhotos':castMember.characterPhotos
    }
}`;
	const crewQuery = groq`*[_type=="job"]|order(orderRank asc){
    _id,
    jobName,
    orderRank,
    'crewMembers':*[ _type == 'assignment' && references($id) && job->jobName==^.jobName && !(_id in path("drafts.**"))]{
      'crewMember':crewMember.person->{
        nameLast,
        nameFirst,
        slug,
        _id,
        "name":nameFirst + " " + nameLast,
        headshot,
      }
    }
    }`;
	let production = await client.fetch(productionQuery, { slug: slug });
	let cast = await client.fetch(castQuery, { id: production._id });
	let crew = await client.fetch(crewQuery, { id: production._id });
	if (production.year) {
		production.year = production.year.slice(0, 4);
	} else {
		production.year = '—';
	}
  cast = cast.filter((role)=> role.castMembers.length > 0)
  crew = crew.filter((job)=> job.crewMembers.length > 0)
	if (production.performanceDates) {
		production.parsedPerformanceDates = production.performanceDates.map((pd) => {
			let d = new Date(pd.dateAndTime);
			return {
				dateAndTime: dayjs(d).format('MMM D, YYYY h:mma'),
				venue: pd.venue
			};
		});
	}
	return { production, cast, crew };
};
