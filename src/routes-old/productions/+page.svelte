<script>
  import ProductionCard from "$components/ProductionCard.svelte";

	export let data;
  function groupBy(arr, n) {
    var group = [];
    for (var i = 0, end = arr.length / n; i < end; ++i)
      group.push(arr.slice(i * n, (i + 1) * n));
    return group;
  }
  let { productions } = data;
  let productionRows = groupBy(productions, 3)

</script>
<svelte:head>
  <title>Productions</title>
</svelte:head>
{#each productionRows as row}
<div class="grid">
  {#each row as production}
  <ProductionCard {production}/>
  {/each}
</div>
{/each}