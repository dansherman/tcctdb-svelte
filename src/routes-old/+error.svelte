<script>
  import { page } from '$app/stores'
</script>
<div class="bg-white">
	<div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 ">
<h1 class="text-xl pt-16">Something went wrong: {$page.status}: {$page.error.message}</h1>
</div>
</div>