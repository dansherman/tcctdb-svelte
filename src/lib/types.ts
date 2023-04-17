export interface Person {
  _id: string,
  name: string,
  nameFirst: string,
  nameLast: string,
  slug: Slug
  vocalRange?: string
}

export interface Slug {
  current: string
}

export interface Role {
  _id: string,
  people: Array<Person>
  production: Production
  character: Character
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
}

export interface Photo {
	_id:string,
  id:number,
	caption:string,
	photo:{},
  metadata:{
    dimensions:{
      height:number
      width:number
      aspectRatio:number
    }
  }
}