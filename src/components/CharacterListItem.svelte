<script>
  export let character
  import Select from "./FormElements/Select.svelte";
  let vocalRange = [
    { title: "Not applicable", value: "na" },
    { title: "Soprano", value: "soprano" },
    { title: "Mezzo", value: "mezzo" },
    { title: "Alto", value: "alto" },
    { title: "Tenor", value: "tenor" },
    { title: "Baritone", value: "baritone" },
    { title: "Bass", value: "bass" }
  ]
</script>
<li class="">
  <div class="sm:py-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 border-t border-gray-200">
    <div class="flex justify-start font-medium text-gray-900 py-2">  
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {character.characterName}
    </div>
    <div class="text-gray-900 py-2">
      <Select selected={character.vocalRange} options={vocalRange}/>
    </div>
    <div class="text-gray-900 py-2">{character.notes}</div>      
  </div>
</li>