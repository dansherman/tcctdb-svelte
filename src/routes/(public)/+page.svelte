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
      <div class="mx-auto border-indigo-400 rounded-md border-2 inset-2 h-72 w-48 mb-3.5 flex justify-items-center place-items-center shadow-md">
          <div class="mx-auto text-center">
            {production.show.title}
          </div>
        </div>
      </a>
      {/each}
    </div>