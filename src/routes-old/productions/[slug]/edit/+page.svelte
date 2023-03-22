<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import Subtitle from "$components/Subtitle.svelte";
  import Title from "$components/Title.svelte";
  import { enhance, type SubmitFunction } from "$app/forms";
  import { clickOutside } from "$lib/clickOutside";
  import { vocalRanges } from "$lib/vocalRanges.js";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import client from "$lib/sanityClient";
  import ComboBox from "$components/FormElements/ComboBox.svelte";
  let cast = data.cast;
  let crew = data.crew;
  console.log(cast);
  $: characterRef = "";
  $: personRef = "";
  let people = data.people;
  // onMount(async () => {
  //   await refreshCastCrew()
  // });
</script>

<Title>{data.production.show.title}</Title>
<Subtitle>Cast</Subtitle>
<div class="editRow">
  <div class="icon" style="width:32px" />
  <div class="label">Character</div>
  <div class="label">Vocal Range</div>
  <div class="">Actor</div>
  <div class="">list people </div>
  <div class="">save</div>
</div>
{#each cast as character}
  {#each character.actors as actor}
    <form action="?/saveCharacter" method="POST" use:enhance>
      <div class="editRow">
        <input bind:value={character._id} name="_id" hidden />
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class=""
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div class="label">
          <span>{character.characterName}</span>
        </div>
        <div class="label">
          <span>{character.vocalRange}</span>
        </div>
        <div class="">
          <input
            bind:value={actor.person.name}
            name="actorName"
            list="people"
            type="text"
          />
        </div>
        <div class="">
          <button class="outline">list people</button>
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </div>
    </form>
  {/each}
{/each}

<Subtitle>Crew</Subtitle>
<ul>
  {#each crew as person}
    <li>
      {person.jobName} - {person.person.nameFirst}
      {person.person.nameLast}
    </li>
  {/each}
</ul>

<datalist id="people">
  {#each people as person}
    <option value={person}>{person.name}</option>
  {/each}
</datalist>

<style>
  svg {
    height: 32px;
  }
  .editRow {
    display: flex;
    justify-content: space-between;
  }
  .icon,
  .label {
    display: flex;
    align-items: center;
  }
  .label {
    margin-left: 1em;
    width: 10em;
    text-align: left;
  }
  li {
    list-style: none;
  }
  input {
    margin: 0;
  }
</style>
