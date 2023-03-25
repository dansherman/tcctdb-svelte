import { defineActions } from 'svelte-command-palette'

export const paletteActions = defineActions([
  {
      title: "Open Svelte Command Palette on github",
      subTitle: "This opens github in a new tab!",
      onRun: ({ action, storeProps, storeMethods }) => {
          window.open("https://github.com/rohitpotato/svelte-command-palette")
      },
      shortcut: "Space k"
  },
  {
    actionId: 'assignPersonToRole',
    title: 'Assign Person to Role',
    subTitle: 'Run by clicking on role',
    // called when the action is triggered along with palette state and methods
    onRun: ({ action, storeProps, storeMethods }) => {
      
      console.log(storeProps.chosenRole)
    },
    // decide whether to run the action based on your palette state
    canActionRun: ({ action, storeProps, storeMethods }) => {
      return true;
    },
    // keyboard shortcut to call the action
    shortcut: 'G G',
    // allows searching for actions via keywords
    keywords: ['git', 'github']
  }
])