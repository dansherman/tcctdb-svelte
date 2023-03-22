<script lang="ts">
  import type { Person } from "$lib/types";
  import { vocalTxtColors, vocalBorderColors } from "$lib/vocalRanges";
  import { enhance } from "$app/forms";
  export let person: Person
  export let index:Number
  export let roleRef:string
  </script>
<span class="rounded-full bg-white {vocalTxtColors[person.vocalRange]} {vocalBorderColors[person.vocalRange]} border py-1.5 px-3 mr-1 text-sm font-semibold  shadow-sm">
  {person.name}
  <form action="?/unAssignRole" method="POST" class="inline" use:enhance>
    <button type="submit" class="pl-1 text-opacity-50 text-gray-400 hover:text-opacity-100">×</button>
    <input hidden name="index" value={index}/>
    <input hidden name="roleRef" value={roleRef}/>
  </form>
</span>