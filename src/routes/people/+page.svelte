<script>
  export let data;
  let {people} = data
  import Headshot from "$components/Headshot.svelte";
  import H2 from "$components/H2.svelte"
  let cast = people.filter(person => person.mostRecentRole != null)
  let crew = people.filter(person => person.mostRecentJob != null)

</script>
<H2>Cast</H2>
<table class="min-w-full divide-y divide-gray-300">
  <thead class="bg-gray-50">
    <tr>
      <th
        scope="col"
        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >Name</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Company</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Show</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Role</th
      >
      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 bg-white">
    {#each cast as person}
      <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div class="flex items-center">
            <div class="h-10 w-10 flex-shrink-0">
              <Headshot {person} width=48 height=48 />
            </div>
            <div class="ml-4">
              <div class="font-base text-xl text-gray-900">
                {person.nameLast}, {person.nameFirst}
              </div>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {person.mostRecentRole.production.company}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {person.mostRecentRole.production.show}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.mostRecentRole.characterName}</td
        >
        
      </tr>
    {/each}
  </tbody>
</table>

<H2>Crew</H2>
<table class="min-w-full divide-y divide-gray-300">
  <thead class="bg-gray-50">
    <tr>
      <th
        scope="col"
        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >Name</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Company</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Show</th
      >
      <th
        scope="col"
        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >Job</th
      >
      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 bg-white">
    {#each crew as person}
      <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div class="flex items-center">
            <div class="h-10 w-10 flex-shrink-0">
              <Headshot {person} width=48 height=48 />
            </div>
            <div class="ml-4">
              <div class="font-base text-xl text-gray-900">
                {person.nameLast}, {person.nameFirst}
              </div>
            </div>
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {person.mostRecentJob.production.company}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {person.mostRecentJob.production.show}
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.mostRecentJob.jobName.jobName}</td
        >
        
      </tr>
    {/each}
  </tbody>
</table>