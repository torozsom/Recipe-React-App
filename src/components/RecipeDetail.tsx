import {StepGuide} from './StepGuide'
import type {Recipe, RecipeId} from '../types'
import {FavoriteToggle} from './FavoriteToggle'
import {RecipeMeta} from './RecipeMeta'
import {IngredientsList} from './IngredientsList'
import {StepsList} from './StepsList'

/**
 * A `RecipeDetail` komponens propjai.
 * @property recipe A megjelenítendő recept vagy `null`, ha nincs kiválasztva.
 * @property onEdit Szerkesztés indítása a kiválasztott recepthez.
 * @property onDelete Törlés callback recept azonosítóval (megerősítés után).
 * @property onToggleFavorite Kedvenc státusz váltása a recept azonosítójával.
 */
type Props = {
    recipe: Recipe | null
    onEdit: () => void
    onDelete: (id: RecipeId) => void
    onToggleFavorite: (id: RecipeId) => void
}

/**
 * Recept részletező felület.
 *
 * Üres állapotot jelenít meg, ha nincs kiválasztott recept. A törlés előtt
 * beépített böngészői megerősítést kér.
 */
export function RecipeDetail({recipe, onEdit, onDelete, onToggleFavorite}: Props) {
    if (!recipe) {
        return (
            <section className="recipe-detail empty">
                <p>Válassz ki egy receptet.</p>
            </section>
        )
    }

    const handleDelete = () => {
        if (confirm(`Biztosan törlöd a(z) "${recipe.title}" receptet?`)) {
            onDelete(recipe.id)
        }
    }

    return (
        <section className="recipe-detail">
            <header className="recipe-detail-header">
                <div className="recipe-detail-title-row">
                    <h2 className="recipe-detail-title">{recipe.title}</h2>
                    <FavoriteToggle
                        active={!!recipe.isFavorite}
                        onToggle={() => onToggleFavorite(recipe.id)}
                        variant="detail"
                    />
                </div>

                <div className="recipe-detail-actions">
                    <button type="button" className="with-icon" onClick={onEdit}>
                        <span className="material-symbols-rounded" aria-hidden="true">edit</span>
                        Módosít
                    </button>
                    <button type="button" className="danger with-icon" onClick={handleDelete}>
                        <span className="material-symbols-rounded" aria-hidden="true">delete</span>
                        Töröl
                    </button>
                </div>

                <RecipeMeta
                    time={recipe.time}
                    difficulty={recipe.difficulty}
                    category={recipe.category}
                    variant="detail"
                />
            </header>

            {recipe.imageUrl && (
                <img
                    src={recipe.imageUrl}
                    alt="Recipe"
                    className="recipe-detail-image"
                />
            )}

            <section>
                <h3>Hozzávalók</h3>
                <IngredientsList items={recipe.ingredients} />
            </section>

            <section>
                <h3>Lépések</h3>
                <StepsList steps={recipe.steps} />
            </section>

            <StepGuide title={recipe.title} steps={recipe.steps || []}/>
        </section>
    )
}
