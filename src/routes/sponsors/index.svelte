<script context="module">
  export const prerender = false;
  export async function load({ params }) {
  const query = `{"sponsors":*[_type=='sponsor']{..., 'boardContactName':boardContact->nameLast + ", " + boardContact->nameFirst},"seasons":*[_type=='show'].season,"board":*[_type=='board']|order(person->nameLast){"_id":person->_id,"nameLast":person->nameLast,"nameFirst":person->nameFirst}}`;
  const data = await client.fetch(query);
  return {
    props:  {data }
  };
}

</script>
<script>
export let data = {}
import client from '$lib/sanityClient.js'
let sponsors = []
const board = data.board.filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i)
const seasons = [...new Set(data.seasons)]
for (const sponsor of data.sponsors) { 
  sponsor.displaySeasonSelect = false
  sponsor.displayBoardSelect = false
  sponsors = [...sponsors, sponsor]
}
import ModalDialog from "$components/ModalDialog.svelte";
import { Spinner } from '$lib/store.js'
import { urlFor } from '$lib/img-url.js';

$: displayAddSponsorDialog = false;
$: displayAddSponsorsDialog = false;
$: displayDeleteDialog = false;
$: newsponsors = ""
$: newsponsor = ""
$: uniquesponsor = true;
$: sponsorToDelete = {}
const displayAddSponsor = () => {
  displayAddSponsorDialog = true;
};
const displayAddSponsors = () => {
  displayAddSponsorsDialog = true;
}
const createsponsor = async (sponsorName) => {
  let postData = {
      name: sponsorName
    };
  $Spinner = true
    let result = await fetch(`/sponsors/add`, {
    method: 'POST',
    body: JSON.stringify(postData)
  });
  let resultJSON = await result.json();
  let newsponsor = resultJSON.response
  sponsors = [...sponsors, newsponsor];
  displayAddSponsorDialog = false;
  $Spinner = false
}
const createsponsors = async () => {
  let sponsorsArray = newsponsors.split('\n');
  sponsorsArray = sponsorsArray.reverse();
  for (const sponsor of sponsorsArray) {
    createsponsor(sponsor)
  }
  displayAddSponsorsDialog = false;
};
const confirmDelete = (sponsor) => {
  displayDeleteDialog = true;
  sponsorToDelete = sponsor;
};
const processDelete = async (sponsor) => {
  let result = await fetch('/delete', {
    method: 'POST',
    body: JSON.stringify(sponsor)
  });
  for (var i = 0; i < sponsors.length; i++) {
    // console.log({sponsor:sponsors[i]})
    if (sponsors[i]._id == sponsor._id) {
      sponsors.splice(i, 1);
      break;
    }
    sponsors = sponsors
  }
  displayDeleteDialog = false;
};
const saveSponsorChanges = async(_id, field, value, ref = false) => {
  $Spinner = true
  let item = {
    _id: _id,
    field: field,
    value: value,
    ref: ref
  }

  let result = await fetch('/update', {
    method: 'POST',
    body: JSON.stringify([item])
  })
  $Spinner = false
}

</script>

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
      >Contact Person</th
    >
    <th
      scope="col"
      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >Board Contact</th
    >
    <th
      scope="col"
      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >Season</th
    >
    <th scope="col" class="relative text-sm font-semibold text-gray-900 py-3.5 pl-3 pr-4 sm:pr-6">
      Live?<span class="sr-only">Delete</span>
    </th>
  </tr>
</thead>
<tbody class="divide-y divide-gray-200 bg-white">
  {#each sponsors as sponsor}
    <tr>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div class="flex content-center">
          <div class="h-10 w-10 flex-shrink-0">
            {#if sponsor.logo}
            <img src={urlFor(sponsor.logo).width(40).auto('format').fit('clip').url()} alt={sponsor.name} class="place-content-center rounded-md" />
            {/if}
          </div>
          <div class="ml-4">
            <div class="font-base text-xl text-gray-900">
              {sponsor.name}
            </div>
          </div>
        </div>
      </td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div class="text-gray-900">{sponsor.contactPerson}</div>
        <div class="text-gray-500">{sponsor.phoneNumber}</div>
      </td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div class="relative inline-block text-left">
          <div>
            <button type="button" on:click={() => {sponsor.displayBoardSelect = !sponsor.displayBoardSelect}} class="z-0 inline-flex justify-center w-full rounded-md  py-2 bg-white text-sm font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-100 focus:ring-sky-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
              {sponsor.boardContactName}
              <!-- Heroicon name: solid/chevron-down -->
              <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        
          {#if sponsor.displayBoardSelect}
          <div class="origin-top-left absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
              <!-- Active: "bg-zinc-100 text-zinc-900", Not Active: "text-zinc-700" -->
              {#each board as person}
              <button on:click={() => {
                sponsor.live = false; 
                sponsor.boardContact = person;
                sponsor.boardContactName = person.nameLast + ", " + person.nameFirst;
                saveSponsorChanges(sponsor._id, 'boardContact', person._id, true); 
                sponsor.displayBoardSelect = false}
                } class="{sponsor.BoardContact == person? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700'} text-zinc-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">{person.nameLast}, {person.nameFirst}</button>
              {/each}
            </div>
          </div>
          {/if}
        </div>
      </td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div class="relative inline-block text-left">
          <div>
            <button type="button" on:click={() => {sponsor.displaySeasonSelect = !sponsor.displaySeasonSelect}} class="z-0 inline-flex justify-center w-full rounded-md  py-2 bg-white text-sm font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-100 focus:ring-sky-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
              {sponsor.season}
              <!-- Heroicon name: solid/chevron-down -->
              <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        
          {#if sponsor.displaySeasonSelect}
          <div class="origin-top-left absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
              <!-- Active: "bg-zinc-100 text-zinc-900", Not Active: "text-zinc-700" -->
              {#each seasons as season}
              <button on:click={() => {
                sponsor.live = false; 
                sponsor.season = season; 
                saveSponsorChanges(sponsor._id, 'season', sponsor.season); 
                sponsor.displaySeasonSelect = false}
              } class="text-zinc-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">{season}</button>
              {/each}
            </div>
          </div>
          {/if}
        </div>
        </td
      >
      <td
        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
      >
        <div class="flex justify-end space-x-4">
        <button type="button" class="{sponsor.live? 'bg-emerald-400' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="false"
        on:click={() => {
          sponsor.live = !sponsor.live
          sponsor = sponsor
          saveSponsorChanges(sponsor._id, 'live', sponsor.live );
        }}>

        <span class="{sponsor.live? 'translate-x-5' : 'translate-x-0'} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200">
          {#if sponsor.live}
          <span class="{sponsor.live? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity" aria-hidden="true">
            <svg class="h-3 w-3 text-emerald-700" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
          {:else}
          <span class="{sponsor.live? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity" aria-hidden="true">
            <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
              <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          {/if}
        </span>
        </button>
        <button
            on:click={() => {
              confirmDelete(sponsor);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

        </div>
      </td>
    </tr>
  {/each}
</tbody>
</table>
<div class="mt-4 flex justify-between">
<div class="flex space-x-2">
  <button
  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
  on:click={displayAddSponsor}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
  </svg></button
>
<button
  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
  on:click={displayAddSponsors}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg></button
>
</div>
</div>
{#if displayAddSponsorDialog}
<ModalDialog>
      <div>
        {#if uniquesponsor}
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-500">
          <!-- Heroicon name: outline/check -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        {:else}
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-500">
          <!-- Heroicon name: outline/check -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        {/if}
        <div>
          <form class="space-y-8 divide-y divide-gray-200">
          <label for="comment" class="block text-sm font-medium text-gray-700"
            >Add the sponsor.</label
          >
          <div class="mt-1">
            <input
              bind:value={newsponsor}
              type="text"
              rows="4"
              name="comment"
              id="comment"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </form>
        </div>
      </div>
      <div class="mt-4 flex justify-between">
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          on:click={() => {
            displayAddSponsorDialog = false;
          }}>Cancel</button
        >
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          on:click={() => {
            displayAddSponsorDialog = false;
            createsponsor(newsponsor)
          }}>Save</button
        >
      </div>
</ModalDialog>>
{/if}
{#if displayAddSponsorsDialog}
<ModalDialog>
  
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-sky-100">
          <!-- Heroicon name: outline/check -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-sky-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <div>
          <label for="comment" class="block text-sm font-medium text-gray-700"
            >Add the sponsors, one character per line.</label
          >
          <div class="mt-1">
            <textarea
              bind:value={newsponsors}
              rows="4"
              name="comment"
              id="comment"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-between">
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          on:click={() => {
            displayAddSponsorsDialog = false;
          }}>Cancel</button
        >
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          on:click={createsponsors}>Save</button
        >
      </div>
    </ModalDialog>
{/if}
{#if displayDeleteDialog}
<ModalDialog>
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <!-- Heroicon name: outline/check -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <label for="comment" class="block text-sm font-medium text-gray-700"
            >Really delete <span class="bg-yellow-200">{sponsorToDelete['name']}</span>?</label
          >
        </div>
      </div>
      <div class="mt-4 flex justify-between">
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          on:click={() => {
            displayDeleteDialog = false;
          }}>Cancel</button
        >
        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          on:click={() => {
            processDelete(sponsorToDelete);
          }}>Delete</button
        >
      </div>
    </ModalDialog>
{/if}
