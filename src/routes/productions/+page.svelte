<script>
  import ProductionCard from "$components/ProductionCard.svelte";
  import ProductionCardList from '$components/ProductionCardList.svelte'

	export let data;
  let { productions } = data;
</script>
<svelte:head>
  <title>Productions</title>
</svelte:head>
<ProductionCardList>
  {#each productions as production}
  <ProductionCard {production}/>
  {/each}
</ProductionCardList>