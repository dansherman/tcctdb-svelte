<script lang="ts">
  import PersonChip from "$components/PersonChip.svelte";
  import CrewPhoto from "$components/CrewPhoto.svelte";
  export let data;
  let { production } = data;
  let crew = production.crew;
</script>

<ul class="list divide-y">
  {#each crew as assignment}
    <li
      class="mx-auto max-w-xs md:max-w-full my-4 py-2 grid grid-cols-3 md:grid-cols-6"
    >
      <div class=" pb-2 col-span-3 md:col-span-2 text-center md:text-left">
        <span class="text-lg font-semibold tracking-wide"
          >{assignment.job.job_name}</span
        >
      </div>
      <div
        class="col-span-3 md:col-span-4 flex flex-wrap justify-between gap-3"
      >
        {#each assignment.people as person}
          <div class="mx-auto md:mx-0 w-full md:w-1/3 grid grid-cols-1 item">
            <div class="w-48 m:w-60 h-full mx-auto">
              <CrewPhoto {person} {assignment} />
            </div>
            <div class="w-48 m:w-60 text-center">
              <PersonChip {person} />
            </div>
          </div>
        {/each}
      </div>
    </li>
  {/each}
</ul>
