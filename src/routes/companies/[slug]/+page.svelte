<script>
  import ProductionChip from "$components/ProductionChip.svelte";
  export let data;
  let {company, productions} = data;
  console.log(productions)
</script>
<svelte:head>
  <title>{company.name}</title>
</svelte:head>

<h1 class="font-bold text-6xl py-4">{ company.name }</h1>
<ul class="list">
  {#each productions as production}
    <li><ProductionChip {production} /></li>
    {/each}
</ul>
