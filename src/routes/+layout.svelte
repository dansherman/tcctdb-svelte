<script lang='ts'>
	import "../app.css"
  import { navigationIsDelayed } from "$lib/stores.js";
  import { SpinLine } from "svelte-loading-spinners"

  import { fade} from "svelte/transition";



</script>

<div class="text-xl font-light tracking-wider mx-auto max-w-md sm:max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
  <a href="/">TCCTDB</a>
</div>
{#if $navigationIsDelayed}
<div class="fixed w-full h-full z-10" in:fade={{ duration: 150 }}>
    <div class="absolute w-full h-full bg-white dark:bg-cyan-800 opacity-50 z-10"></div>
    <div class="absolute w-full h-full flex justify-center items-center z-20">
      <SpinLine />
    </div>
  </div>
  {/if}
<div class="container mx-auto max-w-md sm:max-w-4xl px-4 sm:px-6 lg:px-8 pb-8">
  
  <slot/>
</div>


<footer class="sm:fixed sm:bottom-0 bg-indigo-700 w-full text-white">
  <div class="py-1 mx-auto w-52 sm:w-full text-center text-xs font-light sm:text-md">
    Provided by <a class="font-medium" href="https://4communitytheatre.org">4 Community Theatre</a> with content hosting by <a class="font-medium" href="https://sanity.io">Sanity.io</a>.
  </div>
</footer>


