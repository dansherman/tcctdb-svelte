import client from "$lib/sanityClient.js";

import dayjs from "dayjs";
import type { LayoutLoad } from "./$types";

export const load = (async ({ params }) => {
  const { slug } = params;
  const productionQuery = `*[_type == 'production' && slug.current == $slug][0]{ 
    _id,
    description,
    poster,
    performanceDates[]{dateAndTime,venue->{name}},
    productionPhotos[]{_id,caption,photo,'metadata':photo.asset->metadata},
    show->,
    company->{name,logo, slug},
    slug,
    'year':performanceDates[0].dateAndTime,
  }`;

  const castQuery = `*[ _type == 'role' && references($id) && !(_id in path("drafts.**"))]|order(character->sortOrder asc){
    _id,
    character->{sortOrder, characterName, allowMultiple, roleSize},
    characterPhotos,
    people[]->{
      _id,
      "name":nameFirst + " " + nameLast,
      nameLast,
      nameFirst,
      headshot,
      slug
    }
  }`;
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
    }`;
  let production = await client.fetch(productionQuery, { slug: slug });
  let cast = await client.fetch(castQuery, { id: production._id });
  let crew = await client.fetch(crewQuery, { id: production._id });
  for (let row of cast) {
    row.characterName = row.character.characterName;
    if (!row.people) {
      row.people = [];
    }
  }
  for (let row of crew) {
    row.jobName = row.job.jobName;
    if (!row.people) {
      row.people = [];
    }
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
}) satisfies LayoutLoad;
