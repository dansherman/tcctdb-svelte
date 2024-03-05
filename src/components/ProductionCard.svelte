<script>
  export let production
  import { urlFor } from "$lib/imgUrl";
</script>
{#if production.poster}
<div class="w-64">
<a class="" href="/productions/{production.slug.current}">  
  <img class="mx-auto w-64 border-indigo-500 bg-indigo-500 border-2 inset-2 shadow-md rounded-md mb-3.5" src={urlFor(production.poster).width(256).auto("format").url()} alt="poster for {production.show.title} by {production.company.name}"/> 
</a>
</div>
{:else}
<div class="mx-auto border-indigo-500 bg-indigo-200 rounded-md border-2 inset-2 h-80 w-64 mb-3.5 flex flex-col justify-between shadow-md bg-gradient-to-t from-white to-indigo-200">
<a href="/productions/{production.slug.current}">  
    <div class="mx-auto text-center px-4 pt-2">
      <p class="text-lg font-extralight">{production.company.name}</p>
    </div>
    <div class="mx-auto text-center px-4">
      <p class="text-2xl font-bold tracking-wide">{production.show.title}</p>
    </div>
    <div class="">
      <p class="text-lg text-center">{production.year}</p>
    </div>
  </a>
  </div>
{/if}