/**
 * Görgethető receptlista kártyákkal, kiválasztással és kedvenc kapcsolóval.
 */
import {RecipeCard} from './RecipeCard'
import type {Recipe, RecipeId} from '../types'

/**
 * A `RecipeList` komponens propjai.
 * @property recipes Megjelenítendő receptek listája.
 * @property selectedId A jelenleg kijelölt recept azonosítója (vagy `null`).
 * @property onSelect Kiválasztás callback egy recept azonosítójával.
 * @property onToggleFavorite Kedvenc állapot váltás callback recept azonosítóval.
 */
type Props = {
    recipes: Recipe[]
    selectedId: RecipeId | null
    onSelect: (id: RecipeId) => void
    onToggleFavorite: (id: RecipeId) => void
}

/**
 * Receptkártyák rácsa, amely átadja a szükséges eseménykezelőket a gyerek
 * `RecipeCard` komponenseknek.
 */
export function RecipeList({
                               recipes,
                               selectedId,
                               onSelect,
                               onToggleFavorite,
                           }: Props) {
    return (
        <div className="recipe-list" aria-label="Recipes">{/* grid of recipe cards */}
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isSelected={recipe.id === selectedId}
                    onSelect={() => onSelect(recipe.id)}
                    onToggleFavorite={() => onToggleFavorite(recipe.id)}
                />
            ))}
        </div>
    )
}
