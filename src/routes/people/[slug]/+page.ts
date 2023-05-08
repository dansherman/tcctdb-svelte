export const prerender = false;
import client from "$lib/sanityClient.js";
import type { Role, Person } from "$lib/types.js";
export async function load({ params }) {
  const { slug } = params;
  const query = `
	*[_type == 'person' && slug.current == $slug]{
		nameFirst,
		"name": nameFirst + " " + nameLast,
		nameLast,
		headshot,
		biography,
		"resumeUrl":resume.asset->url,
		slug,
		'assignments': *[ _type == 'assignment' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc){
			'jobName':job->jobName,
			production->{
				'title':show->title,
				'company':company->name,
				poster,
				slug}
			},
		'roles': *[ _type == 'role' && references(^._id)]|order(production.performanceDates[0].dateAndTime asc){
			'characterName':character->characterName,
			production->{
				'title':show->title,
				'company':company->name,
				poster,
				slug}
			},
		'mostRecent': *[(_type == 'assignment' || _type == 'role') && references(^._id)]|order(production.performanceDates[0].dateAndTime asc)[0]{
							production->{
				'title':show->title,
				'company':company->name,
				poster,
				slug}
			},
			'productionPhotos':*[_type == 'production' && references(*[_type=="role" && references(^.^._id)]._id)]
			{
				slug,
	'photos':productionPhotos[references(*[_type=="role" && references(^.^.^._id)]._id)]{_id,caption,photo,'metadata':photo.asset->metadata,"attribution":attribution->name,roles[]->{"characterName":character->characterName, castMembers[]{"name":person->nameFirst + " " + person->nameLast, "slug":person->slug}}}
}
	}
`;
  const people = await client.fetch(query, (params = { slug: slug }));
  const person: Person = people[0];

  if (person) {
    let productions = {};
    for (let role of person.roles) {
      if (!Object.keys(productions).includes(role.production.slug.current)) {
        productions[role.production.slug.current] = {
          production: role.production,
          roles: [],
        };
      }
			productions[role.production.slug.current].roles.push(role);
    }
		person.castProductions = productions;
		productions = {}
		for (let assignment of person.assignments) {
      if (!Object.keys(productions).includes(assignment.production.slug.current)) {
        productions[assignment.production.slug.current] = {
          production: assignment.production,
          assignments: [],
        };
      }
			productions[assignment.production.slug.current].assignments.push(assignment);
    }
		person.crewProductions = productions
    return { person };
  }
}
