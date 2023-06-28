export interface Person {
  _id: string,
  name: string,
  nameFirst: string,
  nameLast: string,
  slug: Slug
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

export interface Slug {
  current: string
}

export interface Role {
  _id: string,
  castMembers: [
    {person:Person,
    characterPhotos:Array<Photo>,
  name:string}
  ]
  production: Production
  character: Character
  characterName: string
  character_photo:string
}
export interface Assignment {
  _id: string,
  crewMembers: [
    {
      person:Person,
      assignmentPhotos:Array<Photo>,
    name:string}
  ]
  production: Production
  job: Job
  jobName: string
}
export interface Job {
  _id: string,
  jobName: string
}
export interface Character {
  _id: string
  allowMultiple: boolean
  characterName: string
  roleSize: string
  vocalRange: string
}

export interface Production {
  _id: string
  slug: Slug
  photos: [Photo]
}
interface photoRelationship {
  cast:{}
  crew:{}
  person:{}
}
export interface Photo {
	id:string,
  filename:string,
  thumbname:string,
  pid:number,
	caption:string,
  attribution:string,
  photoRelationships:Array<photoRelationship>
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