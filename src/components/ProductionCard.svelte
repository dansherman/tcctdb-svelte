<script>
  export let production
  import { urlFor } from "$lib/img-url";
</script>
<li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
  <div class="flex flex-1 flex-col p-4">
      <a href="/productions/{production.slug.current}">
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
    <h3 class="mt-6 text-sm font-medium text-gray-900">{production.show}</h3>
    <dl class="mt-1 flex flex-grow flex-col justify-between">
      <dt class="sr-only">Theater Company</dt>
      <dd class="text-sm text-gray-700">{production.company}</dd>
      <dt class="sr-only">Year</dt>
      <dd class="text-sm text-gray-500">{production.year}</dd>
    </dl>
  </div>
</li>