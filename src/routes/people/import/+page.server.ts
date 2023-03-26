import type { PageServerLoad, Actions } from './$types';
import { newPerson } from '$lib/import';
import { parse } from 'yaml'
// export const load = (async ({ cookies }) => {
//   const user = await db.getUserFromSession(cookies.get('sessionid'));
//   return { user };
// }) satisfies PageServerLoad;

export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    const yamlText = data.get('yamlText');
    const people = parse(yamlText)
    for (let person of people.people) {
      let id = await newPerson(person)
      console.log(id)
    }

    return { success: true };
  },

} satisfies Actions;