/**
 * A komponens bemeneti propjai.
 * @property onCreateNew Új recept létrehozását indító callback.
 */
type Props = {
    onCreateNew: () => void
}

/**
 * Üres állapotot jelző nézet, amikor a szűrők alapján nincs megjeleníthető recept.
 *
 * Egy rövid tájékoztató üzenetet és egy akciógombot tartalmaz, amely új recept
 * létrehozását kezdeményezi. Tipikusan akkor jelenik meg, amikor a keresés vagy
 * kategória szűrés eredménye üres.
 *
 * @param onCreateNew Új recept létrehozását indító callback.
 */
export function EmptyState({onCreateNew}: Props) {
    return (
        <div className="empty-state">
            <p>Nincs a szűrésnek megfelelő recept.</p>
            <button className="ghost with-icon" type="button" onClick={onCreateNew}>
                <span className="material-symbols-rounded" aria-hidden="true">add</span>
                Új recept hozzáadása
            </button>
        </div>
    )
}
