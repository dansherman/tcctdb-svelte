<script>
  export let data;
  let {people} = data
  import Headshot from "$components/Headshot.svelte";
  import Title from "$components/Title.svelte"
</script>
<svelte:head>
  <title>People</title>
</svelte:head>
<Title>People</Title>
<table class="min-w-full divide-y divide-slate-300">
  <thead class="bg-slate-50">
    <tr>
      <th
        scope="col"
        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6"
        >Name</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
        >Roles</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
        >Jobs</th
      >
      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-200 bg-white">
    {#each people as person}
      <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div class="flex items-center">
            <div class="h-10 w-10 flex-shrink-0">
              <Headshot {person} width={48} height={48} />
            </div>
            <div class="ml-4">
              <div class="font-base text-xl text-slate-900">
                {person.name_last}, {person.name_first}
              </div>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
          {person.role_count[0].count}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
          {person.job_count[0].count}
        </td>
        
      </tr>
    {/each}
  </tbody>
</table>
