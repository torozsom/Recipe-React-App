type Props = {
    onCreateNew: () => void
    onLoadSamples: () => void
}

/**
 * Fejléc akciógombjai (új recept és minta receptek betöltése).
 */
export function HeaderActions({onCreateNew, onLoadSamples}: Props) {
    return (
        <div className="app-header-actions">
            <button className="primary with-icon" type="button" onClick={onCreateNew}>
                <span className="material-symbols-rounded" aria-hidden="true">add</span>
                Új recept
            </button>
            <button className="ghost with-icon" type="button" onClick={onLoadSamples}>
                <span className="material-symbols-rounded" aria-hidden="true">cloud_download</span>
                Minta receptek betöltése
            </button>
        </div>
    )
}
