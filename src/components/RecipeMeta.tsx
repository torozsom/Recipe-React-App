type Props = {
    time?: string
    difficulty?: string
    category?: string
    variant?: 'card' | 'detail'
}

/**
 * Recept meta adatok (idő, nehézség, kategória) egységes megjelenítése.
 */
export function RecipeMeta({time, difficulty, category, variant = 'card'}: Props) {
    const className = variant === 'detail' ? 'recipe-detail-meta' : 'recipe-card-meta'
    return (
        <p className={className}>
            <span className="material-symbols-rounded meta-icon" aria-hidden="true">schedule</span>
            {time || 'n/a'}
            {' '}•{' '}
            <span className="material-symbols-rounded meta-icon" aria-hidden="true">signal_cellular_alt</span>
            {difficulty || 'n/a'}
            {typeof category !== 'undefined' && (
                <>
                    {' '}•{' '}
                    <span className="material-symbols-rounded meta-icon" aria-hidden="true">category</span>
                    {category || 'uncategorized'}
                </>
            )}
        </p>
    )
}
