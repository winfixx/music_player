export class CreateGenreDto {
    readonly genres: Array<{id: number, name: string}>
    readonly userId: number
}