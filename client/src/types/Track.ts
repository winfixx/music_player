interface Track {
    id: number | null
    name: string
    fileName: string
    avatar: string
    createdAt: string
    album?: Album
}