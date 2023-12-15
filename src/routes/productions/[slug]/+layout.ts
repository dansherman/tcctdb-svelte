import client from '$lib/sanityClient.js';
import dayjs from 'dayjs';
import groq from 'groq';

export const load = async ({ params }) => {
	const { slug } = params;
	const query = groq`{
    'production':*[_type == 'production' && slug.current == $slug][0]{ 
    _id,
    description,
    poster,
    performanceDates[]{dateAndTime,venue->{name}},
    'photos':*[_type=='photo' && references(^._id)]{'_id':photo.asset._ref,caption,photo,'metadata':photo.asset->metadata,"attribution":attribution->name,roles[]->{"characterName":character->characterName, castMember{"name":person->nameFirst + " " + person->nameLast, "slug":person->slug}}},
    show->,
    company->{name,logo, slug},
    slug,
    'year':performanceDates[0].dateAndTime,
  },
  'cast':*[_type=='character' && references(*[slug.current == $slug].show._ref)]|order(orderRank asc){
  characterName,
  roleSize,
  'castMembers':*[ _type == 'role' && references(*[slug.current == $slug]._id) && character->characterName==^.characterName && !(_id in path("drafts.**"))]{
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
},
'crew':*[_type=="job"]|order(orderRank asc){
    _id,
    jobName,
    orderRank,
    'crewMembers':*[ _type == 'assignment' && references(*[slug.current == $slug]._id) && job->jobName==^.jobName && !(_id in path("drafts.**"))]{
      'crewMember':crewMember.person->{
        nameLast,
        nameFirst,
        slug,
        _id,
        "name":nameFirst + " " + nameLast,
        headshot,
      }
    }
    }
  }`;

	let {production, cast, crew} = await client.fetch(query, { slug: slug });
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
