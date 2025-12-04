import {useRecipeHighlight} from '../hooks/useRecipeHighlight'
import type {Recipe} from '../types'
import {FavoriteToggle} from './FavoriteToggle'
import {RecipeMeta} from './RecipeMeta'

/**
 * A `RecipeCard` komponens bemeneti propjai.
 * @property recipe A megjelenítendő recept.
 * @property isSelected Kijelölt‑e a kártya (UI kiemeléshez).
 * @property onSelect Kártya kiválasztásának eseménye.
 * @property onToggleFavorite Kedvenc státusz váltásának eseménye.
 */
type Props = {
    recipe: Recipe
    isSelected: boolean
    onSelect: () => void
    onToggleFavorite: () => void
}

/**
 * Recept kártya címkével, meta adatokkal és opcionális képpel.
 *
 * @param recipe A kártya adatai.
 * @param isSelected Kijelöltség vizuális állapota.
 * @param onSelect Kiválasztás callback.
 * @param onToggleFavorite Kedvenc kapcsoló callback.
 */
export function RecipeCard({recipe, isSelected, onSelect, onToggleFavorite}: Props) {
    const {cardRef, isAnimating} = useRecipeHighlight(isSelected)

    return (
        <article
            ref={cardRef}
            className={`recipe-card ${isSelected ? 'selected' : ''} ${
                isAnimating ? 'highlight' : ''
            }`}
            onClick={onSelect} // kártya kiválasztása kattintásra
        >
            <header className="recipe-card-header">
                <h2 className="recipe-card-title">{recipe.title}</h2>
                <FavoriteToggle
                    active={!!recipe.isFavorite}
                    onToggle={onToggleFavorite}
                    stopPropagation
                />
            </header>

            <RecipeMeta
                time={recipe.time}
                difficulty={recipe.difficulty}
                category={recipe.category}
                variant="card"
            />

            {recipe.imageUrl && (
                <img
                    src={recipe.imageUrl}
                    alt="Recipe"
                    className="recipe-card-image"
                    loading="lazy"
                />
            )}
            {(() => {
                const ingredients = recipe.ingredients ?? []
                return (
                    ingredients.length > 0 && (
                        <p className="recipe-card-ingredients">
                            {ingredients.slice(0, 3).join(', ')}
                            {ingredients.length > 3 ? '…' : ''}
                        </p>
                    )
                )
            })()}
        </article>
    )
}
