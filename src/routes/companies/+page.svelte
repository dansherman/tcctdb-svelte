<script>

	export let data;
  let { companies } = data;
	import client from '$lib/sanityClient.js';
	import ShowCard from '$components/ShowCard.svelte';
import { urlFor } from '$lib/img-url';
import H2 from '$components/H2.svelte'
</script>

<!-- <div class="text-black">{% include "header.njk" %}</div> -->

              <table class="min-w-full divide-y divide-slate-300">
                <thead class="bg-slate-50">
                  <H2>Theater Companies</H2>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white">
                  {#each companies as company}
                  <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="font-medium text-slate-900">{company.name}</div>
                        </div>
                      </div>
                    </td>
                    
                  </tr>
                  {/each}

                </tbody>
              </table>