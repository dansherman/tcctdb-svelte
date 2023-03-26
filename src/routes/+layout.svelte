<script lang='ts'>
	import { page } from '$app/stores';
	import("../../app.css")
	$: path = $page.url.pathname
</script>
<div class="">
  <a href="/">TCCTDB</a>
</div>
<div class="container mx-auto max-w-md sm:max-w-4xl sm:px-6 lg:px-8 pt-12">
  <slot/>
</div>
<footer class="fixed bottom-0 bg-indigo-700 w-full text-white">
  <div class="py-1 md:py-3 text-center text-sm sm:text-md">
    Provided by <a class="font-bold" href="https://4communitytheatre.org">4 Community Theatre</a> with content hosting by <a class="font-bold" href="https://sanity.io">Sanity.io</a>.
  </div>
</footer>


