import type { PageServerLoad, Actions } from './$types';
import { newShow } from '$lib/import';
// export const load = (async ({ cookies }) => {
//   const user = await db.getUserFromSession(cookies.get('sessionid'));
//   return { user };
// }) satisfies PageServerLoad;

export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    const yamlText = data.get('yamlText');
    const showData = newShow(yamlText)

    return { success: true };
  },
  register: async (event) => {
    // TODO register the user
  }
} satisfies Actions;