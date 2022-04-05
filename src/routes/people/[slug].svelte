<script>
	export let person;
	import Headshot from '$components/Headshot.svelte';

	
</script>

<div class="bg-white">
	<div class="pt-6 pb-16 sm:pb-24">
		<div class="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="mt-8 flex flex-col">
				<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
					{person.nameFirst} {person.nameLast}
				</div>
			</div>
		</div>
	</div>
</div>
