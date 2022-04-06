<script>
	export let people = [];
	export let crew = [];
	export let jobNum = 0
	import Headshot from '$components/Headshot.svelte';
	$: displayAssignJobDialog = false;
	const toggleAssignJob = () => {
		displayAssignJobDialog = !displayAssignJobDialog;
	};
	const assignJob = (person) => {
		crew[jobNum].person = person
		let postData = [{ _id: crew[jobNum]._id, field: "crew", value: crew[jobNum].person._id }]
		let result = fetch('/update', {
			method: "POST",
			body: JSON.stringify(postData),
		});
		displayAssignJobDialog = false
		crew = crew
	}
</script>

<div class="flex items-center">
	<button
	class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
	on:click={toggleAssignJob}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		<path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
	</svg></button
>
	{#if displayAssignJobDialog}
	<div class="absolute bg-white px-4 py-2 border-2 border-slate-600 rounded-md h-48 lg:h-96">
		<ul class="max-h-full overflow-y-scroll divide-y divide-slate-200">
			{#each people as person}
			<li class="text-lg py-2 px-3" on:click={() => {assignJob(person)}}>
				<div class="flex item-center"><div class="w-12 h-12"><Headshot person={person} width=48 height=48 link=0/></div><div class="pl-2">{person.nameLast}, {person.nameFirst}</div></div>
			</li>
			{/each}
		</ul>
	</div>
{/if}
	<div class="w-12 h-12">
		<Headshot person={crew[jobNum].person} width=36 height=36 link=0/>
	</div>
	<div>

		<span class="text-2xl px-3 ">
			{#if crew[jobNum].person}
				{crew[jobNum].person.nameLast}, {crew[jobNum].person.nameFirst}
			{:else}
			--
			{/if}
		</span>
	</div>

</div>
