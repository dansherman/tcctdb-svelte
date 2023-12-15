export type Person = {
  _id: string,
  name: string,
  nameFirst: string,
  nameLast: string,
  slug: Slug
  headshot?: [Photo]
  vocalRange?: string
  roles?: [Role]
  assignments?: [Assignment]
  castProductions?: {[slug: string]:{
    production:Production,
    roles:[Role]}
  }
  crewProductions?: {[slug: string]:{
    production:Production,
    assignments:[Assignment]}
  }
  biography?: string,
  resumeUrl?: string,
  productionPhotos?: [Production]
  character_photo?: string,
}

export type Slug = {
  current: string
}

export type Role = {
  _id: string,
  castMember: 
    {person:Person,
    characterPhotos:Array<Photo>,
  name:string}
  production: Production
  character: Character
  characterName: string
  character_photo:string
}
export type Assignment = {
  _id?: string,
  crewMembers: [
    {
      person:Person,
      assignmentPhotos:Array<Photo>,
    name:string}
  ]
  production?: Production
  job?: Job
  jobName: string
}
export type Job = {
  _id: string,
  jobName: string,
  sort_order: number
}
export type Character = {
  _id: string
  allowMultiple: boolean
  characterName: string
  roleSize: string
  vocalRange: string
  sort_order: number
}

export type Production = {
  _id: string
  slug: Slug
  photos: [Photo]
  year: string
}

export type Photo = {
	id:string,
  pid:number,
	caption:string,
  attribution:string,
	photo:{
		
	},
  metadata:{
    dimensions:{
      height:number
      width:number
      aspectRatio:number
    }
  },
  roles:Array<Role>
}