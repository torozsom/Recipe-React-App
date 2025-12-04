type Props = {
    onCreateNew: () => void
    onLoadSamples: () => void
}

/**
 * Az alkalmazás fejlécében megjelenő akciógombok együttese.
 *
 * Egy elsődleges gombot biztosít új recept létrehozására, valamint egy
 * másodlagos gombot a minta receptek betöltésére. A konkrét műveleteket
 * a hívó komponens adja át callback-ek formájában.
 *
 * @param onCreateNew Új recept létrehozását indító callback.
 * @param onLoadSamples Minta receptek betöltését indító callback.
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
