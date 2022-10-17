<script context="module">
    export const prerender = false;
	export async function load({ params }) {
		const query = `*[_type=='show']| order(performanceDates[0].dateAndTime desc){slug,title,tagline,poster,season,currentFuturePast}`;
		const shows = await client.fetch(query);
		return {
			props: { shows }
		};
	}
</script>

<script>
	export let shows;
	import client from '$lib/sanityClient.js';
	import ShowCard from '$components/ShowCard.svelte';
import { urlFor } from '$lib/img-url';
</script>

<!-- <div class="text-black">{% include "header.njk" %}</div> -->

              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Show</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Season</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  {#each shows as show}
                  <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img class="h-10 w-10 rounded-full" src={urlFor(show.poster).size(48,48).url()} alt="{show.title}"/>
                        </div>
                        <div class="ml-4">
                          <div class="font-medium text-gray-900">{show.title}</div>
                          <div class="text-gray-500">{show.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {#if show.currentFuturePast == 'current'}
                      <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{show.currentFuturePast}</span>
                      {/if}
                      {#if show.currentFuturePast == 'future'}
                      <span class="inline-flex rounded-full bg-sky-100 px-2 text-xs font-semibold leading-5 text-green-800">{show.currentFuturePast}</span>
                      {/if}
                      {#if show.currentFuturePast == 'past'}
                      <span class="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-green-800">{show.currentFuturePast}</span>
                      {/if}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{show.season}</td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="/shows/{show.slug.current}" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">{show.title}</span></a>
                    </td>
                  </tr>
                  {/each}

                </tbody>
              </table>
              <ul>
                <li>TODO: Select featured show</li>

              </ul>