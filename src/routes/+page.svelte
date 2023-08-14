<script lang="ts">
  import ProductionCard from "$components/ProductionCard.svelte";
  import Grid from "$components/Grid.svelte";
  export let data
  let productions = data.productions
</script>
<svelte:head>
  <title>Twin Cities Community Theater Database</title>
</svelte:head>

<h1 class="text-4xl font-bold pb-1">Twin Cities</h1>
<h2 class="text-4xl font-semibold pb-1">Community Theater</h2>
<h3 class="text-4xl font-medium pb-1">Database</h3>
<p class="mb-4">A <span class="line-through text-slate-500">somewhat complete</span> <span class="font-bold">growing</span> list of people involved in community theater in the metro area.</p>

<Grid>
  {#each productions as production}
    <ProductionCard {production} />
  {/each}
</Grid>