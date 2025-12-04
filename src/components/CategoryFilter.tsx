/**
 * A `CategoryFilter` komponens bemeneti propjai.
 * @property categories Elérhető kategóriák listája.
 * @property selected A jelenleg kiválasztott kategória értéke (pl. `all`).
 * @property onChange Eseménykezelő a kiválasztott kategória módosításához.
 * @property showOnlyFavorites Opcionális jelző a kedvencek szűréséhez.
 * @property onToggleFavorites Opcionális eseménykezelő a kedvencek kapcsolásához.
 */
type Props = {
    categories: string[]
    selected: string
    onChange: (value: string) => void
    showOnlyFavorites?: boolean
    onToggleFavorites?: (checked: boolean) => void
}

/**
 * Kategória és kedvencek szűrő UI.
 *
 * @param categories Elérhető kategóriák.
 * @param selected Kiválasztott kategória értéke.
 * @param onChange Kategória módosító callback.
 * @param showOnlyFavorites Kedvencek szűrésének állapota.
 * @param onToggleFavorites Kedvencek kapcsoló callback.
 */
export function CategoryFilter({
                                   categories,
                                   selected,
                                   onChange,
                                   showOnlyFavorites,
                                   onToggleFavorites,
                               }: Props) {
    return (
        <section className="category-filter">
            <h2>Szűrő</h2>
            <label className="category-filter-select">
                Kategória
                <select
                    value={selected}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="all">Mind</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>
            {typeof showOnlyFavorites === 'boolean' && onToggleFavorites && (
                <label className="toggle">
                    <input
                        type="checkbox"
                        checked={showOnlyFavorites}
                        onChange={(e) => onToggleFavorites(e.target.checked)}
                    />
                    <span>Kedvencek szűrése</span>
                </label>
            )}
        </section>
    )
}
