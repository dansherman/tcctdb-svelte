<script> 
  export let data;
  let {person} = data;
  import client from '$lib/sanityClient.js'
  import Headshot from '$components/Headshot.svelte';
  import { urlFor } from '$lib/img-url';
  import ShowCard from '$components/ShowCard.svelte';
</script>
<svelte:head>
  <title>{person.name}</title>
</svelte:head>
<main>

<div class="bg-white">
  <div class="pt-6 pb-16 sm:pb-24">
    <div class="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
        <div class="lg:col-start-8 lg:col-span-5">
          <div class="flex justify-between">
            <h1 class="text-4xl font-medium text-slate-900">
              { person.name }
            </h1>
            <p class="text-xl font-medium text-slate-900"></p>
          </div>
          <!-- Reviews -->

        </div>

        <!-- Image gallery -->
        <div class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 mx-8 md:mx-12 lg:mx-16">
            <Headshot person={ person } width=800 height=800/>
        </div>

        <div class="mt-8 lg:col-span-5">
          <div class="mt-10">
            {#if person.biography}
            <h2 class="text-xl font-medium text-slate-800">Biography</h2>
            <div class="mt-4 text-lg text-slate-500">
              {person.biography}
            </div>
            {/if}
          </div>

          <div class="mt-8 border-t border-slate-200 pt-8">
            <h2 class="text-xl font-medium text-slate-800">Show History</h2>
            {#if person.cast.length > 0}
            <div class="mt-4 text-lg text-slate-500">
              <h3 class="text-lg font-medium text-slate-600">Roles</h3>
              <ul>
                <ul	class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8 place-items-center">
                {#each person.cast as role}
                    <li>
                      <div class="border-2 border-slate-100 bg-slate-50 overflow-hidden object-center rounded-xl ">
                        <div class="w-24 h-24 object-center mx-auto">
                          <a href="/shows/{role.production.slug.current}">
                            <img src={urlFor(role.production.poster).height(144).auto('format').url()} alt={role.production.title} class="mx-auto max-w-24 max-h-full object-center"/>
                          </a>
                        </div>
                        <span class="text-lg">{role.characterName}</span>
                    </li>
                  {/each}
                </ul>
              </ul>
            </div>
            {/if}
            {#if person.crew.length > 0}
            <div class="mt-4 text-lg text-slate-500">
              <h3 class="text-lg font-medium text-slate-600">Crew</h3>
              <ul class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8 place-items-center">
                {#each person.crew as job}
                <li>
                  <div class="border-2 border-slate-100 bg-slate-50 overflow-hidden object-center rounded-xl ">
                    <div class="w-24 h-24 object-center mx-auto">
                      <a href="/shows/{job.production.slug.current}">
                        <img src={urlFor(job.production.poster).height(144).auto('format').url()} alt={job.production.title} class="mx-auto max-w-24 max-h-full object-center"/>
                      </a>
                    </div>
                    <span class="text-lg">{job.jobName}</span>
                </li>
                {/each}
              </ul>
            </div>
            {/if}
          </div>

          <!-- Policies -->

        </div>
      </div>
    </div>
  </div>
  </div>
  </main>
