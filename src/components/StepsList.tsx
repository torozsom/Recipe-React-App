type Props = {
    steps?: string[]
}

/**
 * Elkészítési lépések megjelenítése számozott listában.
 *
 * Üres vagy nem megadott lista esetén rövid magyarázó szöveget jelenít meg,
 * jelezve, hogy a recepthez még nincsenek rögzített lépések. A komponens
 * a részletes nézet (`RecipeDetail`) részeként használható.
 *
 * @param steps Az elkészítés egyes lépései; minden elem külön listapontban jelenik meg.
 */
export function StepsList({steps}: Props) {
    if (!steps || steps.length === 0) {
        return <p>Nincsenek még lépések.</p>
    }
    return (
        <ol className="recipe-detail-list">
            {steps.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ol>
    )
}
