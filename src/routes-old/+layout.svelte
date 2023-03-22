<script>
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/all.css';

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';
  import { page } from '$app/stores';
  import { Spinner } from '$lib/store.js'

  $: menuOpen = false
  $: profileMenuOpen = false
  $: loggedIn = false
  const activeLink = "bg-sky-700 text-white rounded-md py-2 px-3 text-sm font-medium"
  const inactiveLink = "text-white hover:bg-sky-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
  const mobileActiveLink = "bg-sky-700 text-white hover:bg-sky-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
  const mobileInactiveLink = "text-white hover:bg-sky-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
  const links = [
    {href:'/productions', title:'Productions'},
    {href:'/people', title:'People'},
    //{href:'/shows', title:'Shows'},
    // {href:'/companies', title:'Companies'},
  ]
</script>
<style>
  p {text-align: center}
  </style>
  <main class="container">
        <slot></slot>
  </main>

 <footer>
<p>Provided by <a href="https://4communitytheatre.org">4 Community Theatre</a> with content hosting by <a href="https://sanity.io">Sanity.io</a>.</p>
</footer>


{#if Spinner}
<div class="flex place-content-center fixed bottom-4 right-4 w-12 h-12 pt-3 bg-orange-200 text-orange-700 rounded-full">
  <div><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
  </svg>
  </div>
</div>
{/if}