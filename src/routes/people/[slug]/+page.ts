import { supabase } from "$lib/supabase";
import { assign } from "svelte/internal";
export const load = async ({ params }) => {
  const { slug } = params;
  const { data: person } = await supabase
    .from('people')
    .select(`*,cast(character(*),production(*,show(title))),crew(production(*,show(title)),job(*))`)
    .eq('slug',slug)
    .single()
		if (person) {
			let productions = {};
			for (let role of person.cast) {
				if (!Object.keys(productions).includes(role.production.slug)) {
					productions[role.production.slug] = {
						production: role.production,
						roles: [],
					};
				}
				productions[role.production.slug].roles.push(role.character);
			}
			person.cast = productions;
			productions = {}
			for (let assignment of person.crew) {
				if (!Object.keys(productions).includes(assignment.production.slug)) {
					productions[assignment.production.slug] = {
						production: assignment.production,
						assignments: [],
					};
				}
				productions[assignment.production.slug].assignments.push(assignment.job);
			}
			person.crew = productions
		}
	return {person}
}
