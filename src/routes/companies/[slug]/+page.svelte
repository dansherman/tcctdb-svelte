<script>
  import ProductionChip from "$components/ProductionChip.svelte";
  import Title from "$components/Title.svelte";
  import SubTitle from "$components/SubTitle.svelte";
  export let data;
  let {company, productions} = data;
  console.log(productions)
</script>
<svelte:head>
  <title>{company.name}</title>
</svelte:head>

<Title>{ company.name }</Title>
<ul class="list">
  {#each productions as production}
    <li><ProductionChip {production} /></li>
    {/each}
</ul>
