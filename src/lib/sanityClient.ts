// sanityClient.js

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'g8vgowfg',
  dataset: 'tcctdb',
  apiVersion:'2021-03-25',
  useCdn: true
})

export default client