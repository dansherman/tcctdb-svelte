<script>
  export let production
  import { urlFor } from "$lib/img-url";
</script>
<li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
  <div class="flex flex-1 flex-col p-4">
      <a href="/productions/{production.slug.current}">
    <img class="mx-auto max-w-48 max-h-full object-center" src={urlFor(production.poster).height(288).auto('format').url()} alt="poster for {production.show}">
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