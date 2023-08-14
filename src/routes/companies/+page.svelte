<script>
  export let data;
  let {companies} = data
  import Title from "$components/Title.svelte"
</script>
<svelte:head>
  <title>Companies</title>
</svelte:head>
<Title>Companies</Title>
<ul class="list">
    {#each companies as company}
      <li><a href="/companies/{company.slug.current}/">{company.name}</a></li>
    {/each}
</ul>
