<script> 
  export let data;
  let {person} = data;
  // import Headshot from '$components/Headshot.svelte';
  // import ProductionMiniCard from '$components/ProductionMiniCard.svelte'
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
        </div>
        <div class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 mx-8 md:mx-12 lg:mx-16">
            <!-- <Headshot person={ person } width=512 height=512/> -->
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
                <ul	class="space-y-12">
                {#each person.cast as role}
                <a class="font-semibold`" href="/productions/{role.production.slug}">{role.production.title}</a> - {role.characterName}
                <!-- <ProductionMiniCard production={role.production} name={role.characterName}/> -->
                  {/each}
                </ul>
              </ul>
            </div>
            {/if}
            {#if person.crew.length > 0}
            <div class="mt-4 text-lg text-slate-500">
              <h3 class="text-lg font-medium text-slate-600">Crew</h3>
              <ul class="space-y-12">
                {#each person.crew as job}
                <div>
                  <a class="font-semibold`" href="/productions/{job.production.slug}">{job.production.title}</a> - {job.jobName}</div>
                <!-- <ProductionMiniCard production={job.production} name={job.jobName}/> -->
                {/each}
              </ul>
            </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </main>
