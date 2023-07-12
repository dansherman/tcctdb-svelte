<script>
  export let production
  const getThumbURL = (cf_id) => {
    return `https://tcctdb.com/cdn-cgi/imagedelivery/GSd7USrTOBJXFqpEygK5AA/${cf_id}/thumbnail`
  }
</script>
{#if production.poster}
<div class="">
<a class="" href="/productions/{production.slug}">  
  <img class="mx-auto w-64 border-indigo-500 bg-indigo-500 border-2 inset-2 shadow-md rounded-md mb-3.5" src={getThumbURL(production.poster)} alt="poster for {production.show.title} by {production.company.name}"/> 
</a>
</div>
{:else}
<div class="mx-auto border-indigo-500 bg-indigo-200 rounded-md border-2 inset-2 h-72 w-56 mb-3.5 flex flex-col justify-between shadow-md">
<a href="/productions/{production.slug}">  
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