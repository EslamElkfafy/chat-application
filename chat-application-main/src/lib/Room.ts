type Room = {
    _id: string
    name: string
    description: string
    helloMessage: string
    password: string
    enterLikes: number
    micLikes: number
    visitors: number
    mics: number
    voiceActive: boolean
    withoutNotification: boolean
    enterNotification: boolean
    placesOfVoices: string[]
    img: string
    userId: string
    userName: string
    type?: string
}

export default Room