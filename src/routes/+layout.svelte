<script lang='ts'>
	import "../app.css"
  import { fade } from "svelte/transition";
  import { navigationIsDelayed } from "$lib/stores.js";
  import { Circle3 } from "svelte-loading-spinners"
</script>
<div class="text-xl font-light tracking-wider mx-auto max-w-md sm:max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
  <a href="/">TCCTDB</a>
</div>
<div class="container mx-auto max-w-md sm:max-w-4xl px-4 sm:px-6 lg:px-8">
  {#if $navigationIsDelayed}
  <div class="fixed w-full h-full z-10" in:fade={{ duration: 150 }}>
    <div class="absolute w-full h-full bg-white dark:bg-indigo-800 opacity-50 z-10"></div>
    <div class="absolute w-full h-full flex justify-center items-center z-20">
      <Circle3 />
    </div>
  </div>
  {:else}
  <slot/>
{/if}
</div>
<footer class="fixed bottom-0 bg-indigo-700 w-full text-white">
  <div class="py-1 text-center text-sm font-light sm:text-md">
    Provided by <a class="font-medium" href="https://4communitytheatre.org">4 Community Theatre</a> with content hosting by <a class="font-medium" href="https://sanity.io">Sanity.io</a>.
  </div>
</footer>


