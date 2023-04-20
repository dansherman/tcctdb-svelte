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
  castMembers: [
    {person:Person,
    characterPhotos:Array<Photo>,
  name:string}
  ]
  production: Production
  character: Character
  characterName: string
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
  attribution:string,
	photo:{
		crop:{
			bottom:number,
			top:number,
			right:number,
			left:number
		}
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