<script lang="ts">
  import ProductionCard from "$components/ProductionCard.svelte";
  export let data
  let productions = data.productions
</script>
<svelte:head>
  <title>Twin Cities Community Theater Database</title>
</svelte:head>

<h1 class="text-4xl font-bold pb-1">Twin Cities</h1>
<h2 class="text-4xl font-semibold pb-1">Community Theater</h2>
<h3 class="text-4xl font-medium pb-1">Database</h3>
<p>A somewhat complete list of people involved in community theater in the metro area.</p>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
  {#each productions as production}
    <ProductionCard {production} />
  {/each}
</div>