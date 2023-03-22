<script lang="ts">
	export let data;
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	let productions: TableSource = {
		head: ['Company', 'Show', 'Year'],
		body: tableMapperValues(data.productions, ['show', 'company', 'year']),
		meta: tableMapperValues(data.productions, ['slug'])
	};
</script>

<svelte:head>
	<title>Productions</title>
</svelte:head>
  <h1 class="font-bold text-4xl py-4">Productions</h1>
	<div class="table-container">
		<Table source={productions} interactive on:selected={(meta)=>{console.log(meta)}}/>
	</div>

