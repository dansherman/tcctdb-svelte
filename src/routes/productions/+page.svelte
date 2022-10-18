<script>
  import ProductionCard from "$components/ProductionCard.svelte";
  import ProductionCards from '$components/ProductionCardList.svelte'

	export let data;
  let { productions } = data;
</script>
<ProductionCards>
  {#each productions as production}
  <ProductionCard {production}/>
  {/each}
</ProductionCards>