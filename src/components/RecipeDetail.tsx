/**
 * Részletes nézet a kiválasztott recepthez, műveletekkel és hangos lépésvezetővel.
 *
 * A cím mellett jobbra található a kedvenc (csillag) ikon. A cím alatt
 * külön akciósorban jelenik meg a „Módosít” és „Töröl” gomb, ez alatt pedig
 * a meta információk (idő, nehézség, kategória).
 */
import {StepGuide} from './StepGuide'
import type {Recipe, RecipeId} from '../types'

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
        if (confirm(`Delete recipe "${recipe.title}"?`)) {
            onDelete(recipe.id)
        }
    }

    return (
        <section className="recipe-detail">
            <header className="recipe-detail-header">
                <div className="recipe-detail-title-row">
                    <h2 className="recipe-detail-title">{recipe.title}</h2>
                    <button
                        type="button"
                        className={`icon-button favorite detail ${
                            recipe.isFavorite ? 'active' : ''
                        }`}
                        onClick={() => onToggleFavorite(recipe.id)}
                        aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {recipe.isFavorite ? '★' : '☆'}
                    </button>
                </div>

                <div className="recipe-detail-actions">
                    <button type="button" onClick={onEdit}>Módosít</button>
                    <button type="button" className="danger" onClick={handleDelete}>
                        Töröl
                    </button>
                </div>

                <p className="recipe-detail-meta">
                    Idő: {recipe.time || 'n/a'} • Nehézség: {recipe.difficulty || 'n/a'} •
                    Kategória: {recipe.category || 'uncategorized'}
                </p>
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
                {recipe.ingredients?.length ? (
                    <ul className="recipe-detail-list">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Nincsenek még hozzávalók.</p>
                )}
            </section>

            <section>
                <h3>Lépések</h3>
                {recipe.steps?.length ? (
                    <ol className="recipe-detail-list">
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                ) : (
                    <p>Nincsenek még lépések.</p>
                )}
            </section>

            <StepGuide title={recipe.title} steps={recipe.steps || []}/>
        </section>
    )
}
