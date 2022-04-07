<script>
	export let people = [];
	export let group = [];
	export let rowNum = 0
  export let taskName = "Uh Oh."
  import { Spinner } from '$lib/store.js'
	import Headshot from '$components/Headshot.svelte';
  import { alerts } from '$lib/store.js'
	$: displayAssignPersonDialog = false;
	const toggleAssignPerson = () => {
		displayAssignPersonDialog = !displayAssignPersonDialog;
	};
	const assignPerson = async (person) => {
		group[rowNum].person = person
		let postData = [{ _id: group[rowNum]._id, field: "person", value: group[rowNum].person._id }]
		$Spinner = true
		let result = await fetch('/update', {
			method: "POST",
			body: JSON.stringify(postData),
		});
		$Spinner = false
		displayAssignPersonDialog = false
		group = group
    $alerts = [...$alerts, {title:"Success", subtitle:`Saved ${person.nameFirst} ${person.nameLast} as ${taskName}`}]
	}
</script>
<div class="flex items-center">
	<button
	class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
	on:click={toggleAssignPerson}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		<path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
	</svg></button
>
	{#if displayAssignPersonDialog}
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
      class="relative h-[768px] inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
    >
      <div class="h-full">
        <div class="flex flex-none flex-nowrap justify-between mb-3 font-medium text-xl">
          <div>Assignment: {taskName}</div>
          <div class="cursor-pointer"
          on:click={() => {
            displayAssignPersonDialog = false;
          }}
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
        </div>
        <div class="">
          

        <ul class="max-h-[700px] overflow-y-scroll divide-y divide-slate-200">
          {#each people as person}
            <li
              class="text-lg py-2 px-3"
              on:click={() => {
                assignPerson(person);
              }}
            >
              <div class="flex item-center">
                <div class="w-12 h-12">
                  <Headshot {person} width="48" height="48" link=false />
                </div>
                <div class="pl-3 place-self-center">{person.nameLast}, {person.nameFirst}</div>
              </div>
            </li>
          {/each}
        </ul>
        </div>
      </div>
      
    </div>
  </div>
</div>

{/if}
	<div class="w-12 h-12">
		<Headshot person={group[rowNum].person} width=36 height=36 link=0/>
	</div>
	<div class="text-base sm:text-lg md:text-xl lg:text-2xl px-3 ">

		<span>
			{#if group[rowNum].person}
				{group[rowNum].person.nameLast}, {group[rowNum].person.nameFirst}
			{:else}
			--
			{/if}
		</span>
	</div>

</div>
