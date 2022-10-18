<script>
  import Title from '$components/Title.svelte'
  import PersonCard from '$components/PersonCard.svelte'
  import H2 from '$components/H2.svelte'
  import PersonCardList from '$components/PersonCardList.svelte';
  export let data;
  let cast = data.cast;
  let crew = data.crew;
  let show = data.show;
</script>

<Title>{show.title}</Title>
<H2>Cast</H2>
<PersonCardList>
              {#each cast as role}
            {#if role.person}
									<PersonCard person={role.person} title={role.characterName} />
							{/if}
            {/each}
          </PersonCardList>
          <H2>Crew</H2>
          <PersonCardList>
            {#each crew as job}
            <PersonCard person={job.person} title={job.jobName}/>
            {/each}
          </PersonCardList>

