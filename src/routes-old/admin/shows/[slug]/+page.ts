
import client from "$lib/sanityClient";
import type { PageLoad } from './$types';
export const load:PageLoad = async ({ params, data }) => {
  const castQuery = `*[_type == 'character' && !(_id in path("drafts.**")) && show._ref == $showID]|order(sortOrder){
    _id, 
    characterName, 
    vocalRange, 
    'actors':*[_type == 'role' && references($productionID) && references(^._id) && !(_id in path("drafts.**"))]{person->{nameLast, nameFirst, "name":nameFirst + " " + nameLast,}}}`
  const crewQuery = `*[ _type == 'assignment' && references($id) && !(_id in path("drafts.**"))]|order(job->sortOrder){
    _id,
    "jobName":job->jobName,
    person->{
      _id,
      "name":nameFirst + " " + nameLast,
      nameLast,
      nameFirst,
      headshot,
      slug}
    }`;
  const cast = await client.fetch(castQuery, { productionID: data.production._id, showID: data.production.show._id });
  const crew = await client.fetch(crewQuery, { id: data.production._id });
  //TODO add empty actor for each character
  return { ...data, cast, crew };
}