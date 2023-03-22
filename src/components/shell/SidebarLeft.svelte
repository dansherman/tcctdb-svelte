<script lang="ts">
  import {icons} from "$lib/icons"
  let pages = ["Shows", "People", "Productions", "Companies"]
</script>
<div class="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
  <div class="flex w-full flex-col items-center py-6">
    <div class="flex flex-shrink-0 items-center">
      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company">
    </div>
    <div class="mt-6 w-full flex-1 space-y-1 px-2">
      <!-- Current: "", Default: "text-indigo-100 hover:bg-indigo-800 hover:text-white" -->

      {#each pages as page}
      
      <a href="/admin/{page.toString().toLowerCase()}" class="text-indigo-100 hover:bg-indigo-800 hover:text-white group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium">
        {@html icons[page]}
        <span class="mt-2">{page}</span>
      </a>
      {/each}
      
    </div>
  </div>
</div>