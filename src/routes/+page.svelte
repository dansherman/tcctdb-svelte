<script lang="ts">
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

<div class="sm:flex flex-wrap justify-between pt-6">
  {#each productions as production}
  <a href="/productions/{production.slug.current}">  
    <div class="mx-auto border-indigo-500 bg-indigo-100 rounded-md border-2 inset-2 h-72 w-48 mb-3.5 flex flex-col justify-between shadow-md">
      <div class="mx-auto text-center px-4 pt-2">
        <p class="text-lg font-extralight">{production.company.name}</p>
      </div>
      <div class="mx-auto text-center px-4">
        <p class="text-xl font-semibold tracking-wide">{production.show.title}</p>
      </div>
      <div class="">
        <p class="text-lg text-center">{production.year}</p>
      </div>
    </div>
  </a>
  {/each}
</div>