type ProfileImage = {
    contentType: string
    data: string
}

export type Profile = {
    battleHistory: string[]
    comparisons: string[]
    createdAt: string
    favourites: string[]
    silhouetteHistory: string[]
    teams: string[]
    theme: string
    colorScheme: string
    username: string
    email: string
    _id: string
    profileImage: ProfileImage
}