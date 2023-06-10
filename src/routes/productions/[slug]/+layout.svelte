<script lang="ts">
  import Title from "$components/Title.svelte";
  import SubTitle from "$components/SubTitle.svelte";
  export let data;
  import { page } from "$app/stores";
  let production = data.production;
  let show = production.show;

  $: path = $page.url.pathname;
  let pages = [
    { url: production.slug, name: "Summary" },
    { url: `${production.slug}/cast`, name: "Cast" },
    {
      url: `${production.slug}/productionTeam`,
      name: "Production Team",
    },
    { url: `${production.slug}/photos`, name: "Photos" },
  ];
  let activePage = "border-indigo-500 text-indigo-600";
  let defaultPage =
    "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
</script>

<svelte:head>
  <title>{production.show.title}</title>
</svelte:head>
<Title>{production.show.title}</Title>
<SubTitle>
  <a href="/companies/{production.company.slug}"
    >{production.company.name}</a
  >
</SubTitle>
<div>
  <div class="block">
    <div class="border-b border-gray-200">
      <nav
        class="-mb-px flex justify-between sm:justify-start sm:space-x-8"
        aria-label="Tabs"
      >
        {#each pages as p}
          {#if path.endsWith(p.url)}
            <a
              href="/productions/{p.url}"
              class="{activePage} whitespace-nowrap border-b-2 py-2 sm:py-4 px-1 text-xs sm:text-sm md:text-md font-medium"
              >{p.name}</a
            >
          {:else}
            <a
              href="/productions/{p.url}"
              class="{defaultPage} whitespace-nowrap border-b-2 py-2 sm:py-4 px-1 text-xs sm:text-sm md:text-md font-medium"
              >{p.name}</a
            >
          {/if}
        {/each}
      </nav>
    </div>
  </div>
</div>
<slot />
