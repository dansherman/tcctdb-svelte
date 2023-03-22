import { parse } from 'yaml'
import slugify from 'slugify'
import updateClient from './sanityUpdateClient'

interface show {
  title: string,
  slug?: string,
  characters: {
    characterName: {

    }
  }
}

const createShow = async (title:string, slug:string) => {
  if (!slug) {
    slug = slugify(title, {lower: true})
  }
  let query = `count(*[_type=='show' && slug.current=='${slug}'])`
  let conflicts = await updateClient.fetch(query)
  if (conflicts > 0) {
    throw {
      status:'error',
      message:`Error: Slug '${slug}' exists, could not create show.`
    }
  }
  const doc = {
    _type: 'show',
    title,
    slug: {
      _type: 'slug',
      current: slug
    }
  } 
  let showID = updateClient.create(doc).then((res) => {
    return res._id
  })

  return showID
}

const createCharacter = async (showID:string, character:object, sortOrder) => {
  const doc = {
    _type: 'character',
    show: {
      _type: 'ref',
      _ref: showID
    },
    sortOrder,
    ...character 
  } 
  updateClient.create(doc).then((res) => {
    return res._id
  }).catch((err) => {
    return err.message
})
} 

export const newShow = async (ymlText) => {
  let data:show = parse(ymlText)
  try {
    let showID = await createShow(data.title, data?.slug)
    let i = 1
    for (let [characterName, details] of Object.entries(data.characters)) {
      details = {characterName, ...details}
      let characterID = createCharacter(showID, details, i)
    }
    return showID
  } catch (err) {
    return err.message
  }
}

export const newPerson = async (person, slug) => {
  let nameFull = `${person.nameFirst} ${person.nameLast}`
  if (!slug) {
    slug = slugify(nameFull, {lower: true})
  }
  let query = `count(*[_type=='person' && slug.current=='${slug}'])`
  let conflicts = await updateClient.fetch(query)
  if (conflicts > 0) {
    throw {
      status:'error',
      message:`Error: Slug '${slug}' exists, could not create person.`
    }
  }
  const doc = {
    _type: 'person',
    nameFirst: person.nameFirst,
    nameLast: person.nameLast,
    slug: {
      _type: 'slug',
      current: slug
    }
  } 
  let personID = updateClient.create(doc).then((res) => {
    return res._id
  })

  return personID
}