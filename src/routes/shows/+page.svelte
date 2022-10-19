<script>

	export let data;
  let { shows } = data;
	import client from '$lib/sanityClient.js';
	import ShowCard from '$components/ShowCard.svelte';
import { urlFor } from '$lib/img-url';
</script>

<!-- <div class="text-black">{% include "header.njk" %}</div> -->

              <table class="min-w-full divide-y divide-slate-300">
                <thead class="bg-slate-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Show</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white">
                  {#each shows as show}
                  <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="font-medium text-slate-900">{show.title}</div>
                        </div>
                      </div>
                    </td>
                    
                  </tr>
                  {/each}

                </tbody>
              </table>