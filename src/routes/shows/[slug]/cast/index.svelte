<script>
  export let results;
  import { page } from "$app/stores";
  let { people, show } = results;
  import ModalDialog from "$components/ModalDialog.svelte";
  import { Spinner, alerts } from "$lib/store.js";
  import AssignPerson from "$components/AssignPerson.svelte";
  import ShowNav from "$components/ShowNav.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";
  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");
  const handleDndConsider = (e) => {
    cast = e.detail.items;
  };
  const handleDndFinalize = (e) => {
    cast = e.detail.items;
  };
  /** @type {Array}*/
  let cast = show["cast"];
  $: cast;
  $: deleteGroup = [];
  $: deleteThing = {};
  $: deleteGroupName = "";
  $: displayCharacterDialog = false;
  $: displayBulkCharacterDialog = false;
  $: displayDeleteDialog = false;
  $: newCharacters = "";
  $: newCharacter = "";
  $: uniqueCharacter = true;

  const addCharacter = () => {
    displayCharacterDialog = true;
  };
  const bulkAdd = () => {
    displayBulkCharacterDialog = true;
  };
  let timer;
  const testCharacter = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fetch(`/character/${encodeURIComponent(newCharacter)}`).then((result) => {
        let response = result.json();
        uniqueCharacter = response["person"] > 0;
      });
    }, 500);
  };
  const saveCharacter = async (characterName) => {
    let postData = {
      characterName: characterName,
      show: {
        _type: "reference",
        _ref: show._id,
      },
    };
    let result = await fetch(`/shows/${show.slug.current}/character/add`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    let resultJSON = await result.json();
    let new_id = resultJSON.response._id;
    cast = [...cast, { taskName: characterName, _id: new_id }];
  };
  const saveCharacters = async () => {
    let characters = newCharacters.split("\n");
    characters = characters.reverse();
    for (const newCharacter of characters) {
      saveCharacter(newCharacter);
    }
    displayCharacterDialog = false;
  };
  const confirmDelete = ({ thing, group }) => {
    deleteGroup = Object.values(group)[0];
    deleteGroupName = Object.keys(group)[0];
    deleteThing = thing;
    displayDeleteDialog = true;
  };
  const processDelete = () => {
    let result = fetch("/delete", {
      method: "POST",
      body: JSON.stringify(deleteThing),
    });
    for (var i = 0; i < deleteGroup.length; i++) {
      if (deleteGroup[i]._id == deleteThing["_id"]) {
        deleteGroup.splice(i, 1);
        break;
      }
    }
    displayDeleteDialog = false;
    $alerts = [
      ...$alerts,
      { title: "Success", subtitle: `Deleted ${deleteThing["taskName"]}` },
    ];

    cast = deleteGroup;
  };

  const saveCastOrder = async () => {
    let postData = [];
    $Spinner = true;
    cast.forEach((role, i) => {
      postData.push({ _id: role._id, field: "sortOrder", value: i + 1 });
    });
    let result = await fetch("/update", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    $Spinner = false;
    let rJSON = await result.json();
    // console.log(rJSON)
  };
  const saveRow = async (row) => {
    let postData = [
      { _id: row._id, field: "person", value: row.person._id, ref: true },
    ];
    $Spinner = true;
    let result = await fetch("/update", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    $Spinner = false;
    $alerts = [
      ...$alerts,
      {
        title: "Success",
        subtitle: `Saved ${row.person.nameFirst} ${row.person.nameLast} as ${row.taskName}`,
      },
    ];
  };
</script>

<div class="bg-white">
  <div class="pb-16 sm:pb-24">
    <div class=" max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <ShowNav slug={show.slug} />
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <ul
                class="divide-y divide-slate-200"
                use:dndzone={{ items: cast }}
                on:consider={handleDndConsider}
                on:finalize={handleDndFinalize}
              >
                {#each cast as role, roleNum (role._id)}
                  <li>
                    <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                        <div class="min-w-0 flex-none">
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
                              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                          </svg>
                        </div>
                        <div
                          class="min-w-0 flex-1 px-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium "
                        >
                          {role.taskName}
                        </div>
                        <div class="min-w-0 flex-1 px-4 ">
                          <AssignPerson {people} assignment={role} />
                        </div>
                        <div class="flex justify-end space-x-2">
                          <div class="flex justify-end space-x-4">
                            <button
                              on:click={() => {
                                saveRow(role);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 stroke-sky-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                />
                              </svg>
                            </button><button
                              on:click={() => {
                                confirmDelete({ thing: role, group: { cast } });
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
                        </div>
                      </div>
                    </div>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          <div class="mt-4 flex justify-between">
            <div class="flex space-x-2">
              <button
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                on:click={addCharacter}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                  />
                </svg></button
              >
              <button
                class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                on:click={bulkAdd}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                  />
                </svg></button
              >
            </div>
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              on:click={saveCastOrder}>Save Cast Order</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if displayCharacterDialog}
<ModalDialog>
          {#if uniqueCharacter}
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-500"
            >
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
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500"
            >
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          {/if}
          <div>
            <form class="space-y-8 divide-y divide-gray-200">
              <label
                for="comment"
                class="block text-sm font-medium text-gray-700"
                >Add the character.</label
              >
              <div class="mt-1">
                <input
                  bind:value={newCharacter}
                  on:keyup={() => {
                    testCharacter;
                  }}
                  type="text"
                  rows="4"
                  name="comment"
                  id="comment"
                  class="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
        <div class="mt-4 flex justify-between">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayCharacterDialog = false;
            }}>Cancel</button
          >
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayCharacterDialog = false;
              saveCharacter(newCharacter);
            }}>Save</button
          >
        </div>
      </ModalDialog>
{/if}
{#if displayBulkCharacterDialog}
  <ModalDialog>
      <div
        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
      >
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100"
          >
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
              >Add the characters, one character per line.</label
            >
            <div class="mt-1">
              <textarea
                bind:value={newCharacters}
                rows="4"
                name="comment"
                id="comment"
                class="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayBulkCharacterDialog = false;
            }}>Cancel</button
          >
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={saveCharacters}>Save</button
          >
        </div>
      </ModalDialog>
{/if}
{#if displayDeleteDialog}
 <ModalDialog>
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
          >
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
              >Really delete <span class="bg-yellow-200"
                >{deleteThing["taskName"]}</span
              >?</label
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
            on:click={processDelete}>Delete</button
          >
        </div>
        </ModalDialog>

{/if}
