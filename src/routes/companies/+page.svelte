<script>
  export let data;
  let {companies} = data
  import Title from "$components/Title.svelte"
</script>
<svelte:head>
  <title>Theater Companies</title>
</svelte:head>
<Title>Theater Companies</Title>
<ul class="list">
    {#each companies as company}
      <li><a href="/companies/{company.slug}/">{company.name}</a></li>
    {/each}
</ul>
