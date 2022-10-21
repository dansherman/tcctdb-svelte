<script>
  import Title from '$components/Title.svelte'
  import SubTitle from '$components/SubTitle.svelte'
  import PersonCard from '$components/PersonCard.svelte'
  import H2 from '$components/H2.svelte'
  import PersonCardList from '$components/PersonCardList.svelte';
  export let data;
  let cast = data.cast;
  let crew = data.crew;
  let production = data.production;
  let show = production.show;
</script>

<Title>{show.title}</Title>
<SubTitle>{production.company.name}</SubTitle>
<H2>Cast</H2>
<PersonCardList>
              {#each cast as role}
            {#if role.person}
									<PersonCard person={role.person} title={role.character.characterName} photo={role.character.characterPhoto} />
							{/if}
            {/each}
          </PersonCardList>
          <H2>Crew</H2>
          <PersonCardList>
            {#each crew as job}
            <PersonCard person={job.person} title={job.jobName} photo={job.person.headshot} />
            {/each}
          </PersonCardList>

