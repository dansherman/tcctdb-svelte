import client from "$lib/sanityClient.js";

import dayjs from "dayjs";

export const load = (async ({ params }) => {
  const { slug } = params;
  const productionQuery = `*[_type == 'production' && slug.current == $slug][0]{ 
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

  const castQuery = `*[ _type == 'role' && references($id) && !(_id in path("drafts.**"))]|order(character->orderRank asc){
    _id,
    character->{characterName, allowMultiple, roleSize},
    castMember{
      person->{nameLast,nameFirst,slug,_id,"name":nameFirst + " " + nameLast,headshot,"photo":{
        _id,caption,"photo":headshot,'metadata':headshot.asset->metadata,"attribution":attribution->name
      },},
      characterPhotos},
    
}`;
  const crewQuery = `*[ _type == 'assignment' && references($id) && !(_id in path("drafts.**"))]|order(job->orderRank asc){
    _id,
    job->{sortOrder, jobName, allowMultiple},
    crewMember{
      person->{
        nameLast,
        nameFirst,
        slug,
        _id,
        "name":nameFirst + " " + nameLast,
        headshot,
        "photo":{
          _id,
          caption,
          "photo":headshot,
          'metadata':headshot.asset->metadata,
          "attribution":attribution->name
      },
    },
    jobPhotos},
    }`;
  let production = await client.fetch(productionQuery, { slug: slug });
  let cast = await client.fetch(castQuery, { id: production._id });
  let crew = await client.fetch(crewQuery, { id: production._id });
  
  for (let role of cast) {
    role.characterName = role.character.characterName;
  }
  for (let row of crew) {
    row.jobName = row.job.jobName;
  }
  if (production.year) {
      production.year = production.year.slice(0, 4);
    } 
  else {
      production.year = "—";
  }
  if (production.performanceDates) {
    production.parsedPerformanceDates = production.performanceDates.map(
      (pd) => {
        let d = new Date(pd.dateAndTime);
        return {
          dateAndTime: dayjs(d).format("MMM D, YYYY h:mma"),
          venue: pd.venue,
        };
      }
    );
  }
  return { production, cast, crew };
})