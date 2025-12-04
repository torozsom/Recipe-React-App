type Props = {
    time?: string
    difficulty?: string
    category?: string
    variant?: 'card' | 'detail'
}

/**
 * Recept metaadatok (idő, nehézség, kategória) egységes megjelenítése.
 *
 * A komponens kártya (`card`) és részletes (`detail`) nézetben is használható,
 * ennek megfelelően eltérő CSS-osztályt alkalmaz. Hiányzó értékek esetén
 * alapértelmezett szöveget jelenít meg (`n/a`, `uncategorized`), így a UI
 * stabil marad hiányos adatok mellett is.
 *
 * @param time Elkészítési idő, tetszőleges szöveges formában (pl. "45 perc").
 * @param difficulty A recept nehézségi szintje, tetszőleges szövegként.
 * @param category Opcionális kategórianév; ha meg van adva, egy további
 *                  meta-szegmensben jelenik meg.
 * @param variant Megjelenési változat: `card` (alapértelmezett) vagy `detail`.
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
