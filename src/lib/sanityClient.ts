// sanityClient.js

import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'g8vgowfg',
  dataset: 'tcctdb',
  apiVersion:'2021-03-25',
  useCdn: true
})

export default client