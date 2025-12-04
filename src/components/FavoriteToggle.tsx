type Props = {
    active: boolean
    onToggle: () => void
    variant?: 'card' | 'detail'
    stopPropagation?: boolean
}

/**
 * Kedvenc-csillag kapcsoló gomb egy recept kártyán vagy részletes nézetben.
 *
 * A komponens kizárólag vizuális és interakciós logikát tartalmaz: a
 * `active` állapot alapján tölti ki a csillag ikont, valamint a `variant`
 * segítségével különböző megjelenési módokat támogat (kártya vs. részletező).
 * Opcionálisan megakadályozza az esemény tovaterjedését, ha egy nagyobb
 * kattintható felületen belül helyezkedik el.
 *
 * @param active Jelzi, hogy az adott recept jelenleg kedvencként van-e megjelölve.
 * @param onToggle Callback, amelyet a felhasználó kattintásakor hívunk.
 * @param variant Megjelenési változat: `card` (alapértelmezett) vagy `detail`.
 * @param stopPropagation Ha igaz, a kattintás esemény nem buborékol tovább a DOM-fában.
 */
export function FavoriteToggle({active, onToggle, variant = 'card', stopPropagation}: Props) {
    const className = `icon-button favorite ${variant === 'detail' ? 'detail' : ''} ${
        active ? 'active' : ''
    }`
    return (
        <button
            type="button"
            className={className}
            onClick={(e) => {
                if (stopPropagation) e.stopPropagation()
                onToggle()
            }}
            aria-label={active ? 'Eltávolítás a kedvencek közül' : 'Hozzáadás a kedvencekhez'}
        >
            <span className={`material-symbols-rounded ${active ? 'filled' : ''}`} aria-hidden="true">
                star
            </span>
        </button>
    )
}
