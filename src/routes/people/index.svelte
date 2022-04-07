<script context="module">
  export const prerender = false;
  export async function load({ params }) {
    const query = `*[_type=='person']| order(nameFirst asc)|order(nameLast asc){headshot, nameFirst, nameLast, slug}`;
    const people = await client.fetch(query);
    return {
      props: { people },
    };
  }
</script>

<script>
  export let people;
  import client from "$lib/sanityClient.js";
  import Headshot from "$components/Headshot.svelte";
  import getHash from "$lib/hash";
  import { Spinner } from '$lib/store.js'

  $: displayAddPersonDialog = false;
  $: displayAddPeopleDialog = false;
  $: displayDeleteDialog = false;
  $: newPeople = ""
  $: newPerson = ""
  $: uniquePerson = true;
  $: personToDelete = {}
  const displayAddPerson = () => {
    displayAddPersonDialog = true;
  };
  const displayAddPeople = () => {
    displayAddPeopleDialog = true;
  }
  const createPerson = async (personName) => {
    let [nameFirst, nameLast] = personName.split(' ')
    let postData = {
        nameLast: nameLast,
        nameFirst: nameFirst,
      };
    $Spinner = true
      let result = await fetch(`/people/add`, {
      method: 'POST',
      body: JSON.stringify(postData)
    });
    let resultJSON = await result.json();
    let newPerson = resultJSON.response
    people = [...people, newPerson];
    displayAddPersonDialog = false;
    $Spinner = false
  }
  const createPeople = async () => {
    let peopleArray = newPeople.split('\n');
    peopleArray = peopleArray.reverse();
    for (const person of peopleArray) {
      createPerson(person)
    }
    displayAddPeopleDialog = false;
  };
  const confirmDelete = (person) => {
    displayDeleteDialog = true;
    personToDelete = person;
  };
  const processDelete = async (person) => {
    let result = await fetch('/delete', {
      method: 'POST',
      body: JSON.stringify(person)
    });
    for (var i = 0; i < people.length; i++) {
      // console.log({person:people[i]})
      if (people[i]._id == person._id) {
        people.splice(i, 1);
        break;
      }
      people = people
    }
    displayDeleteDialog = false;
  };
</script>

<table class="min-w-full divide-y divide-gray-300">
  <thead class="bg-gray-50">
    <tr>
      <th
        scope="col"
        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >Name</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Producer</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Director</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Season</th
      >
      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 bg-white">
    {#each people as person}
      <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div class="flex items-center">
            <div class="h-10 w-10 flex-shrink-0">
              <Headshot {person} width="48" height="48" />
            </div>
            <div class="ml-4">
              <div class="font-base text-xl text-gray-900">
                {person.nameLast}, {person.nameFirst}
              </div>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div class="text-gray-900">...</div>
          <div class="text-gray-500">Optimization</div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span
            class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
            >Active</span
          >
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td
        >
        <td
          class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
        >
          {#if person.slug.current == 'duplicate'}
          <div title='{person.nameFirst} {person.nameLast} looks like a duplicate.' class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {/if}
          <div class="flex justify-end space-x-2">
            <button
              on:click={() => {
                confirmDelete(person);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="mt-4 flex justify-between">
  <div class="flex space-x-2">
    <button
    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
    on:click={displayAddPerson}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
    </svg></button
  >
  <button
    class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
    on:click={displayAddPeople}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg></button
  >
  </div>
</div>
{#if displayAddPersonDialog}
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
      >
        <div>
          {#if uniquePerson}
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-500">
            <!-- Heroicon name: outline/check -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          {:else}
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500">
            <!-- Heroicon name: outline/check -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {/if}
          <div>
            <form class="space-y-8 divide-y divide-gray-200">
            <label for="comment" class="block text-sm font-medium text-gray-700"
              >Add the person.</label
            >
            <div class="mt-1">
              <input
                bind:value={newPerson}
                type="text"
                rows="4"
                name="comment"
                id="comment"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </form>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayAddPersonDialog = false;
            }}>Cancel</button
          >
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayAddPersonDialog = false;
              createPerson(newPerson)
            }}>Save</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
{#if displayAddPeopleDialog}
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
      >
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
            <!-- Heroicon name: outline/check -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700"
              >Add the people, one character per line.</label
            >
            <div class="mt-1">
              <textarea
                bind:value={newPeople}
                rows="4"
                name="comment"
                id="comment"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayAddPeopleDialog = false;
            }}>Cancel</button
          >
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={createPeople}>Save</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
{#if displayDeleteDialog}
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
      >
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <!-- Heroicon name: outline/check -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700"
              >Really delete <span class="bg-yellow-200">{personToDelete['nameFirst']} {personToDelete['nameLast']}</span>?</label
            >
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayDeleteDialog = false;
            }}>Cancel</button
          >
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            on:click={() => {
              processDelete(personToDelete);
            }}>Delete</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
