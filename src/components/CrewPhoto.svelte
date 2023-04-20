<script lang="ts">
  export let crewMember
  export let assignment
  export let size = 94
  import { urlFor } from "$lib/img-url.js";

</script>

{#if crewMember.assignmentPhotos}
  <img
    src={urlFor(crewMember.assignmentPhotos[0]).size(size, size).url()}
    alt="{crewMember.person.name} as {assignment.jobName}"
    class="object-cover rounded-xl w-full h-full object-top"
  />
{:else if crewMember.person.headshot}
<img
src={urlFor(crewMember.person.headshot).size(size, size).url()}
alt="{crewMember.person.name} as {assignment.jobName}"
class="object-cover rounded-xl w-full h-full object-top"
/>
{:else}
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
{/if}
