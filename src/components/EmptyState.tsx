/**
 * Üres állapot komponens, amikor nincs a szűrésnek megfelelő recept.
 *
 * Javaslatot tesz új recept hozzáadására egy gombbal.
 */
/**
 * A komponens bemeneti propjai.
 * @property onCreateNew Új recept létrehozását indító callback.
 */
type Props = {
    onCreateNew: () => void
}

/**
 * Üres állapot megjelenítése és akciógomb.
 *
 * @param onCreateNew Új recept létrehozásának indítása.
 */
export function EmptyState({onCreateNew}: Props) {
    return (
        <div className="empty-state">
            <p>Nincs a szűrésnek megfelelő recept.</p>
            <button className="ghost" type="button" onClick={onCreateNew}>
                Új recept hozzáadása
            </button>
        </div>
    )
}
