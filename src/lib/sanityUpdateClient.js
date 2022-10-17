// sanityClient.js

import sanityClient from '@sanity/client'

const updateClient = sanityClient({
  projectId: 'g8vgowfg',
  dataset: 'tcctdb',
  apiVersion:'2021-03-25',
  useCdn: false,
  token: "skm2EP08x637BzxR2ANe4ngYuodFm70OkaV2j3yaW1br3GYyNldcbvD9NWcdqlXAdNgfevXeDH9r7MbKnGl9zjIhGT2TQ5oLKKcodSSpDMzeOWQruHMRu3CLJwiXrNU8aui8k8UX821QRrd2wrCYKGd3xIP3W9Sh20wVjrsWvyVGWmLbNvLt"
})

export default updateClient