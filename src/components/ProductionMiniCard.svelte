<script>
  export let production
  export let name
  import { urlFor } from "$lib/img-url";
</script>
<li>
<div class="border-2 border-slate-100 bg-slate-50 overflow-hidden object-center rounded-xl ">
  <div class="w-24 h-24 object-center mx-auto">
    <a href="/productions/{production.slug}">
      {#if production.poster}
          <img class="mx-auto max-w-48 max-h-full object-center" src={urlFor(production.poster).height(288).auto('format').url()} alt="poster for {production.show}">
      {:else}
          <div class="mx-auto max-w-48 max-h-full object-center">
            <svg
            class="h-full w-full text-emerald-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
          
          </svg></div>
      {/if}
        </a>
  </div>
  <span class="text-lg">{name}</span>
</li>