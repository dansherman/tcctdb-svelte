<script lang="ts">
	export let data;
	let {productions} = data
  import Title from '$components/Title.svelte';
  import ProductionCard from "$components/ProductionCard.svelte";
  import Grid from "$components/Grid.svelte";
</script>

<svelte:head>
	<title>Productions</title>
</svelte:head>
<Title>Productions</Title>
<Grid>
  {#each productions as production}
    <ProductionCard {production} />
  {/each}
</Grid>

