<script>
  export let person
  </script>
<span class="first:-ml-1 mr-2 sm:mx-1 px-1 text-lg font-medium border-b-blue-500 border rounded-sm hover:bg-blue-200 hover:shadow-md text-blue-800">
  <a href="/people/{person.slug.current}">{person.name}</a>
</span>