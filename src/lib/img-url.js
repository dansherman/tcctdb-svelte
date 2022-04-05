import imageUrlBuilder from '@sanity/image-url'
import client from './sanityClient'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  if (source) {
  return builder.image(source)
  } else {
    return undefined
  }
}