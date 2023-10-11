<script lang="ts">
	import PersonChip from '$components/PersonChip.svelte';
	import CrewPhoto from '$components/CrewPhoto.svelte';
	import CastCrewItem from '$components/CastCrewItem.svelte';
	import CastCrewItems from '$components/CastCrewItems.svelte';
	import CastCrewLabel from '$components/CastCrewLabel.svelte';
	import CastCrewRow from '$components/CastCrewRow.svelte';
	import CastCrewList from '$components/CastCrewList.svelte';
	export let data;
	let crew = data.crew;
</script>

<CastCrewList>
	{#each crew as job}
		{@const jobName = job.jobName}
		<CastCrewRow>
			<CastCrewLabel>{jobName}</CastCrewLabel>
      <CastCrewItems>
			{#each job.crewMembers as c}
      {@const crewMember = c.crewMember}
				{#if crewMember}
					<CastCrewItem>
						<div class="w-48 m:w-1/4 text-center mx-auto">
							<CrewPhoto {crewMember} {jobName} />
						</div>
						<div class="w-48 m:w-1/4 text-center mx-auto">
							<PersonChip person={crewMember} />
						</div>
					</CastCrewItem>
				{/if}
			{/each}
      </CastCrewItems>
		</CastCrewRow>
	{/each}
</CastCrewList>
