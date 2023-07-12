<script lang="ts">
  import PersonChip from "$components/PersonChip.svelte";
  import CharacterPhoto from "$components/CharacterPhoto.svelte";
  export let data;
  let { production } = data;
  let { cast } = production;
</script>

<ul class="list divide-y">
  {#each cast as role}
    <li
      class="mx-auto max-w-xs md:max-w-full my-4 py-2 grid grid-cols-3 md:grid-cols-6"
    >
      <div
        class=" pb-2 md:ml-0 col-span-3 md:col-span-2 text-center md:text-left"
      >
        <span class="text-lg font-semibold tracking-wide"
          >{role.character.character_name}</span
        >
      </div>
      <div
        class="md:ml-0 col-span-3 md:col-span-4 flex flex-wrap justify-between gap-3"
      >
        {#each role.people as person}
          <div class="mx-auto md:mx-0 w-full md:w-1/3 grid grid-cols-1 item">
            <div class="mx-auto">
              <CharacterPhoto {role} {person} />
            </div>
            {#if person}<div class="w-48 m:w-60 text-center mx-auto">
                <PersonChip {person} />
              </div>{/if}
          </div>
        {/each}
      </div>
    </li>
  {/each}
</ul>
