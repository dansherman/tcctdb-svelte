<script lang="ts">
  import type { PageData } from "./$types";
  import type { Person, Role } from "$lib/types";
  import ActorChip from "$components/ActorChip.svelte";

  import { vocalTxtColors } from "$lib/vocalRanges";
  import { createStoreMethods, paletteStore } from 'svelte-command-palette'

  const paletteMethods = createStoreMethods();
  export let data: PageData;
  $: cast = data.cast;
  $: crew = data.crew;
  let people: Array<Person> = data.people;
  let peopleByID = Object.assign({}, ...people.map((x) => ({ [x._id]: x })));
  let production = data.production;

  let chosenRole:Role
  // onMount(async () => {
  //   await refreshCastCrew()
  // });
  const showAssignPerson = (role) => {
    paletteStore.update((storeValue) => {
    return {
        ...storeValue,
        chosenRole: role
      }
    })
    $paletteStore.selectedCommandId = 'assignPersonToRole'
    paletteMethods.openPalette()
  }
</script>

<svelte:head>
  <title>{production.show.title}</title>
</svelte:head>
<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
  <h3 class="text-base font-semibold leading-6 text-gray-900">Cast</h3>
  <table class="min-w-full divide-y divide-gray-300">
    <thead>
      <tr>
        <th
          scope="col"
          class="w-64 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >Role</th
        >
        <th
          scope="col"
          class="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Vocal Range</th
        >
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >Actor</th
        >


      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      {#each cast as role}
        <tr>
          <td class="w-64 py-1 pl-4">
            {role.character.characterName}
          </td>
          <td class="w-48 py-1 {vocalTxtColors[role.character.vocalRange]} capitalize">
            {role.character.vocalRange}
          </td>
          <td class=" py-1 mr-2 flex justify-start">

            {#each role.people as person, i}
              <ActorChip person={peopleByID[person._id]} index={i} roleRef={role._id} />
            {/each}
            {#if role.character.allowMultiple == true || role.people.length == 0}
            <button on:click={()=>{showAssignPerson(role)}} class="grow text-left hover:bg-sky-100 rounded-full">&nbsp;</button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>
<!-- <form method="POST" action="?/addMissingCharacters"><button type="submit">Add Missing Characters</button><input hidden name="showRef" value="{production.show._id}"/><input hidden name="productionRef" value="{production._id}"/></form>
<form method="POST" action="?/deleteDocs"><button type="submit">deleteDocs</button></form> -->
