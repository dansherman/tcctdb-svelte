<script>
  import ProductionCard from "$components/ProductionCard.svelte";
  import Title from "$components/Title.svelte";
  export let data;
  let {company, productions} = data;
</script>
<svelte:head>
  <title>{company.name}</title>
</svelte:head>

<Title>{company.name}</Title>
<ul class="list">
  {#each productions as production}
    <li><ProductionCard {production} /></li>
    {/each}
</ul>
