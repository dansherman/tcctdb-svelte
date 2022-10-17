<script>
  export let results;
  let { people, show, jobs } = results;
  import { Spinner, alerts } from "$lib/store.js";
  import ShowNav from "$components/ShowNav.svelte";

  import AssignPerson from "$components/AssignPerson.svelte";
import ModalDialog from "$components/ModalDialog.svelte";
  /** @type {Array}*/
  let crew = show["crew"];
  $: crew;
  $: newJobs = "";
  $: deleteGroup = [];
  $: deleteThing = {};
  $: deleteGroupName = "";
  $: displayDeleteDialog = false;
  $: displayAddJobDialog = false;

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

    crew = deleteGroup;
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
              <ul class="divide-y divide-slate-200">
                {#each crew as job}
                  <li>
                    <div class="flex items-center px-4 py-4 sm:px-6">
                      <div class="min-w-0 flex-1 flex items-center">
                        <div class="min-w-0 flex-1 px-4 text-2xl font-medium ">
                          {job.taskName}
                        </div>
                        <div class="min-w-0 flex-1 px-4 ">
                          <AssignPerson {people} assignment={job} />
                        </div>
                        <div class="flex justify-end space-x-2">
                          <div class="flex justify-end space-x-4">
                            <button
                              on:click={() => {
                                saveRow(job);
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
                            </button>
                            <button
                              on:click={() => {
                                confirmDelete({ thing: job, group: { crew } });
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
            <div class="mt-4 flex justify-between">
              <div class="flex space-x-2">
                <button
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  on:click={() => {
                    displayAddJobDialog = true;
                  }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

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
  <ModalDialog>
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
      </ModalDialog>
{/if}
