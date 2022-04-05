<script>
	export let actors = [];
	export let cast = [];
	export let roleNum = 0
	import Headshot from '$components/Headshot.svelte';
	// let p = person.person
	$: displayAssignActorDialog = false;
	const toggleAssignActor = () => {
		displayAssignActorDialog = !displayAssignActorDialog;
	};
	const assignActor = (actor) => {
		cast[roleNum].actor = actor
		displayAssignActorDialog = false
		cast = cast
	}
</script>

<div class="flex items-center">
	<button
	class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
	on:click={toggleAssignActor}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
		<path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
	</svg></button
>
	{#if displayAssignActorDialog}
	<div class="absolute bg-white px-4 py-2 border-2 border-slate-600 rounded-md h-48 lg:h-">
		<ul class="max-h-full overflow-y-scroll divide-y divide-slate-200">
			{#each actors as actor}
			<li class="text-lg py-2 px-3" on:click={() => {assignActor(actor)}}>
				<div class="flex item-center"><div class="w-12 h-12"><Headshot person={actor} width=48 height=48 link=0/></div><div class="pl-2">{actor.nameLast}, {actor.nameFirst}</div></div>
			</li>
			{/each}
		</ul>
	</div>
{/if}
	<div class="w-12 h-12">
		<Headshot person={cast[roleNum].actor} width=36 height=36 link=0/>
	</div>
	<div class="text-base sm:text-lg md:text-xl lg:text-2xl px-3 ">

		<span>
			{#if cast[roleNum].actor}
				{cast[roleNum].actor.nameLast}, {cast[roleNum].actor.nameFirst}
			{:else}
			--
			{/if}
		</span>
	</div>

</div>
