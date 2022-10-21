<script>
  import { page } from '$app/stores';
  import { Spinner } from '$lib/store.js'
  
  import "../app.css";
  $: menuOpen = false
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

<div class="min-h-full">
  <div class="bg-sky-600 pb-32">
    <nav class="border-b border-sky-300 border-opacity-25 bg-sky-600 lg:border-none">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-400 lg:border-opacity-25">
          <div class="flex items-center px-2 lg:px-0">
            <div class="flex-shrink-0">
              <a href="/"><p class="font-bold text-white">TCCTDB</p></a>
            </div>
            <div class="hidden lg:ml-10 lg:block">
              <div class="flex space-x-4">
                <!-- Current: "", Default: "" -->
                {#each links as link}
                <a href={link.href} class={$page.url.pathname === link.href ? activeLink : inactiveLink}> {link.title} </a>
                {/each}
              
              </div>
            </div>
          </div>
          <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div class="w-full max-w-lg lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative text-slate-400 focus-within:text-slate-600">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <!-- Heroicon name: mini/magnifying-glass -->
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="search" class="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-slate-900 placeholder-slate-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600 sm:text-sm" placeholder="Search" type="search" name="search">
              </div>
            </div>
          </div>
          
              <div class="flex lg:hidden">
        <!-- Mobile menu button -->
        <button type="button" on:click={() => menuOpen = !menuOpen} class="inline-flex items-center justify-center rounded-md bg-sky-600 p-2 text-sky-200 hover:bg-sky-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          {#if !menuOpen}
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {:else}
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {/if}
        </button>
      </div>  
        </div>


      <!-- Mobile menu, show/hide based on menu state. -->
      {#if menuOpen}
      <div class="lg:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pt-2 pb-3">

          {#each links as link}
          <a href={link.href} class={$page.url.pathname === link.href ? mobileActiveLink : mobileInactiveLink}> {link.title} </a>
          {/each}
        </div>
        

      </div>
      {/if}
    </div>
    </nav>

  </div>

  <main class="-mt-32">
    <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
        <slot></slot>
      </div>
      <!-- /End replace -->
    </div>
  </main>

  <footer class="bg-slate-500">
  <div class="mx-auto max-w-7xl py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
    
    <div class="mt-8 md:order-1 md:mt-0">
      <p class="text-center text-base text-slate-300">Provided by <a href="https://4communitytheatre.org">4 Community Theatre</a> with content hosting by <a href="https://sanity.io">Sanity.io</a>.</p>
    </div>
  </div>
</footer>
</div>{#if $Spinner}
<div class="flex place-content-center fixed bottom-4 right-4 w-12 h-12 pt-3 bg-orange-200 text-orange-700 rounded-full">
  <div><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
  </div>
</div>
{/if}