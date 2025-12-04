type Props = {
    items?: string[]
}

/**
 * Hozzávalók felsorolása listaként egy recept részletező nézetében.
 *
 * Üres vagy nem megadott lista esetén egy helyettesítő szöveget renderel,
 * így a felhasználó érti, hogy a recepthez még nem lettek hozzávalók rögzítve.
 * A komponens tipikusan a `RecipeDetail` részeként jelenik meg.
 *
 * @param items A hozzávalók szöveges listája; minden elem egy sorban jelenik meg.
 */
export function IngredientsList({items}: Props) {
    if (!items || items.length === 0) {
        return <p>Nincsenek még hozzávalók.</p>
    }
    return (
        <ul className="recipe-detail-list">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}
