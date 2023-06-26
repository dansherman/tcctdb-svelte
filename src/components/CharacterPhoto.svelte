<script lang="ts">
  export let role
  export let person
  import { getImageUrl } from "$lib/getImageUrl.js";
  let filename:string
  let bucket:string
  if (person.character_photo) {
    filename = person.character_photo
    bucket = "productionPhotos"
  } else if (person.headshot) {
    filename = person.headshot
    bucket = "headshots"
  }
  console.log(person)
</script>
{#await getImageUrl(filename,bucket) }
<span class="inline-block rounded-xl overflow-hidden bg-gray-100">
  <svg
    class="h-full w-full text-gray-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
</span>
{:then photoUrl}
<img
  src={photoUrl}
  class="h-48 m:h-60 object-cover rounded-lg"
  alt="character photo for {role.character.character_name}"
/>
{:catch error}
<span class="inline-block rounded-xl overflow-hidden bg-emerald-100">
  <svg
    class="h-full w-full text-emerald-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
</span>
        {/await}
