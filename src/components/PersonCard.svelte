<script>
  export let person;
  export let title;
  import Headshot from "$components/Headshot.svelte";
</script>

<li
  class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
>
  <div
    class="sm:w-48 p-2 mx-auto flex flex-none flex-row justify-center gap-x-4 sm:gap-y-2  sm:flex-col sm:items-center"
  >
    <div
      class="bg-rose-100 border-slate-400 border-2 h-24 w-24 md:h-40 md:w-40 lg:h-48 lg:w-48 rounded-full"
    >
      <Headshot {person} />
    </div>
    <div class="basis-1/2">
      <div
        class="flex flex-col content-evenly justify-center place-items-center h-full"
      >
        <div><p class="font-semibold text-slate-800 text-lg">{title}</p></div>
        <div>
          <h3 class="text-sky-600 text-xl">
            <a href="/people/{person.slug.current}">{person.name}</a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</li>
