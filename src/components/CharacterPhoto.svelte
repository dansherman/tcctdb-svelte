<script lang="ts">
  export let role;
  export let size: number = 256;
  import { urlFor } from "$lib/imgUrl.js";
  let castMember = role.castMember
</script>

{#if castMember.characterPhotos}
  <img
    src={urlFor(castMember.characterPhotos[0].photo)?.size(size, size).url()}
    alt="{castMember.person.name} as {role.characterName}"
    class="object-cover rounded-xl w-full h-full object-top"
  />
{:else if castMember.person.headshot}
  <img
    src={urlFor(castMember.person.headshot).size(size, size).url()}
    alt="{castMember.person.name} as {role.characterName}"
    class="object-cover rounded-xl w-full h-full object-top"
  />
{:else}
  <span class="inline-block rounded-xl overflow-hidden bg-sky-100">
    <svg
      class="h-full w-full text-sky-300"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
{/if}