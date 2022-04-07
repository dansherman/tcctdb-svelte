<script>
  import { page } from '$app/stores';
  import { Spinner } from '$lib/store.js'

  import "../app.css";
  
  const activeLink = "border-sky-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium mx-1"
  const inactiveLink = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium mx-1"
  const activeMobileLink = "bg-sky-50 border-sky-500 text-sky-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
  const inactiveMobileLink = "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
  const links = [
    {href:'/shows', title:'Shows'},
    {href:'/people', title:'People'},
    {href:'/sponsors', title:'Sponsors'},
    {href:'/content', title:'Content'}
  ]
</script>
<div class="min-h-full">
  <nav class="bg-blue-100 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <div class="flex justify-start lg:w-0 lg:flex-1">

              {#each links as link}
              <a href={link.href} class={$page.url.pathname === link.href ? activeLink : inactiveLink}> {link.title} </a>
              {/each}
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          {#if $Spinner}
          <div class="text-orange-300 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          {/if}
          <span class="text-gray-500">4CT Admin Page</span>

        </div>

      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1"><a href="/" class="{inactiveMobileLink} pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </a>
        {#each links as link}
        <a href={link.href} class={$page.url.pathname === link.href ? activeMobileLink : inactiveMobileLink}> {link.title} </a>
        {/each}
      </div>
      
    </div>
  </nav>

  <div class="py-10">
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Replace with your content -->
          <slot></slot>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</div>