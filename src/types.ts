/**
 * Közös típusok a Recept alkalmazáshoz.
 *
 * Ezek a típusok a komponensek és hooks-ok között megosztva biztosítják
 * a konzisztens adatmodellt. A legtöbb komponens a `Recipe`, `RecipeId` és
 * a nehézségi szint (`Difficulty`) típusokra támaszkodik.
 */

/** Egy recept egyedi azonosítója (UUID vagy tetszőleges string). */
export type RecipeId = string

/**
 * A recept nehézségi szintjei. A felületen ezek a magyar nyelvű címkék jelennek meg.
 */
export type Difficulty = 'Egyszerű' | 'Normál' | 'Nehéz'

/**
 * Egy teljes recept adatmodellje, ahogyan az alkalmazás tárolja és megjeleníti.
 */
export interface Recipe {
    id: RecipeId
    title: string
    time?: string
    difficulty?: Difficulty | string
    category?: string
    imageUrl?: string
    ingredients?: string[]
    steps?: string[]
    isFavorite?: boolean
}