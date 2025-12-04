type Props = {
    active: boolean
    onToggle: () => void
    variant?: 'card' | 'detail'
    stopPropagation?: boolean
}

/**
 * Kedvenc csillag kapcsoló gomb.
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
