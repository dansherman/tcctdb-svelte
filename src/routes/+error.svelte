<script context="module">
  /** @type {import('@sveltejs/kit').ErrorLoad} */
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`
      }
    };
  }
</script>

<script>
  export let title;
</script>
<div class="bg-white">
	<div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 ">
<h1 class="text-xl pt-16">Something went wrong: {title}</h1>
</div>
</div>