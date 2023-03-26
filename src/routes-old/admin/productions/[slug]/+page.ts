
import client from "$lib/sanityClient";
import type { PageLoad } from './$types';
export const load:PageLoad = async ({ params, data }) => {
  const castQuery = `*[_type == 'role' && !(_id in path("drafts.**")) && production._ref == $productionID]|order(character->sortOrder){
    _id, 
    character->{...}, 
    people[]->{...}}`
  const crewQuery = `*[ _type == 'assignment' && !(_id in path("drafts.**")) && production._ref == $productionID]|order(job->sortOrder){
    _id,
    job->{...},
    people[]->{...}}`
  const cast = await client.fetch(castQuery, { productionID: data.production._id, showID: data.production.show._id });
  const crew = await client.fetch(crewQuery, { productionID: data.production._id, showID: data.production.show._id });
  for (let role of cast) {
    if (role.people == null) {
      role.people = []
    }
  }
  for (let job of crew) {
    if (job.people == null) {
      job.people = []
    }
  }
  return { ...data, cast, crew };
}