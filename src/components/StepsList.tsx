type Props = {
    steps?: string[]
}

/**
 * Elkészítési lépések számozott listában. Üres lista esetén helyettesítő szöveg.
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
