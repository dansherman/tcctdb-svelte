<script>
  export let data;
  import { page } from "$app/stores";
  let { people, show, jobs } = data;
  import { Spinner, alerts } from "$lib/store.js";

  import ShowNav from "$components/ShowNav.svelte";
  import AssignPerson from "$components/AssignPerson.svelte";
  import ModalDialog from "$components/ModalDialog.svelte";
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
  /** @type {Array}*/
  let crew = show["crew"];
  $: crew;
  $: newJobs = "";
  $: deleteGroup = [];
  $: deleteThing = {};
  $: deleteGroupName = "";
  $: displayCharacterDialog = false;
  $: displayBulkCharacterDialog = false;
  $: displayDeleteDialog = false;
  $: displayAddJobDialog = false;
  $: newCharacters = "";
  $: newCharacter = "";
  $: uniqueCharacter = true;
  $page.url.hash;

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

    switch (deleteGroupName) {
      case "crew":
        crew = deleteGroup;
        break;

      case "cast":
        cast = deleteGroup;
        break;
    }
  };
  const addJob = async (newJob) => {
    let postData = {
      newJob: {
        _id: newJob,
      },
      show: show,
    };
    let result = await fetch(`/shows/${show.slug.current}/job/add`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    let resultJSON = await result.json();
    crew = resultJSON.response;
    displayAddJobDialog = false;
  };
  const addJobs = async (newJobs) => {
    $Spinner = true;
    for (const newJob of newJobs) {
      addJob(newJob);
    }
    displayAddJobDialog = false;
    $Spinner = false;
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
  const activeTabStyle = "border-sky-500 text-sky-600";
  const defaultTabStyle =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300";
</script>

<div class="bg-white">
  <div class="pb-16 sm:pb-24">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <ShowNav slug={show.slug} />
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              Show description, dates, poster, etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if displayCharacterDialog}
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
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
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
      </div>
    </div>
  </div>
{/if}
{#if displayBulkCharacterDialog}
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
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
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
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
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
      </div>
    </div>
  </div>
{/if}
{#if displayAddJobDialog}
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
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
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
          <div>
            <form class="space-y-8 divide-y divide-gray-200">
              <fieldset class="mt-6">
                <div>
                  <legend class="text-base font-medium text-gray-900"
                    >Choose the job to add:</legend
                  >
                </div>
                <div class="mt-4 space-y-4">
                  {#each jobs as job}
                    <div class="relative flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id={job.jobName}
                          bind:group={newJobs}
                          value={job._id}
                          aria-describedby="{job.jobName}-description"
                          name={job.jobName}
                          type="checkbox"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for={job.jobName}
                          class="font-medium text-gray-700">{job.jobName}</label
                        >
                        <p id="{job.jobName}-description" class="text-gray-500">
                          Foobar
                        </p>
                      </div>
                    </div>
                  {/each}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              displayAddJobDialog = false;
            }}>Cancel</button
          >
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            on:click={() => {
              addJobs(newJobs);
            }}>Save</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
