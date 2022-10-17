<script>
  import { page } from '$app/stores';
  import { Spinner } from '$lib/store.js'
  import { alerts } from '$lib/store.js'

  import "../app.css";
  
  const activeLink = "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
  const inactiveLink = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto sm:h-16" src="/logo-black.svg" alt="4ct logo">
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {#each links as link}
            <a href={link.href} class={$page.url.pathname === link.href ? activeLink : inactiveLink}> {link.title} </a>
            {/each}
                      </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button type="button" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">View notifications</span>
            <!-- Heroicon name: outline/bell -->
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          <!-- Profile dropdown -->
          
        </div>
        
      </div>
    </div>
  </nav>

  
</div>


<div class="min-h-full">
 

  <div class="">
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
        <!-- Replace with your content -->
          <slot></slot>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</div>
{#if $Spinner}
<div class="flex place-content-center fixed bottom-4 right-4 w-12 h-12 pt-3 bg-orange-200 text-orange-700 rounded-full">
  <div><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
  </div>
</div>
{/if}
<div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
  <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    <!--
      Notification panel, dynamically insert this into the live region when it needs to be displayed

      Entering: "transform ease-out duration-300 transition"
        From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        To: "translate-y-0 opacity-100 sm:translate-x-0"
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
    {#each $alerts as alert}
    <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Heroicon name: outline/check-circle -->
            <svg class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{alert.title}</p>
            <p class="mt-1 text-sm text-gray-500">{alert.subtitle}</p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button on:click={() => {$alerts = $alerts.filter(a => a !== alert);}} class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>