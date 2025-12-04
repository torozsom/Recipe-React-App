type Props = {
    items?: string[]
}

/**
 * Hozzávalók felsorolása. Üres lista esetén helyettesítő szöveget jelenít meg.
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
