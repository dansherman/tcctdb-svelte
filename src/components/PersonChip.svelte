<script>
  export let person
  </script>
<span class="first:-ml-1 mr-2 sm:mx-1 px-1 text-lg font-medium border-b-sky-500 border rounded-sm hover:bg-sky-200 hover:shadow-md text-sky-800">
  <a href="/people/{person.slug.current}">{person.name}</a>
</span>