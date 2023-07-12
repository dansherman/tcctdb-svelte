<script lang="ts">
	export let data;
	let productions = data
  import Title from '$components/Title.svelte';
</script>

<svelte:head>
	<title>Productions</title>
</svelte:head>
<Title>Productions</Title>
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

