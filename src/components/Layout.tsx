import {ReactNode} from 'react'
import {HeaderActions} from './HeaderActions'
import {FooterNotice} from './FooterNotice'

/**
 * A `Layout` komponens propjai.
 * @property children A fő tartalom (oldal törzs).
 * @property onCreateNew Új recept létrehozásának indítása.
 * @property onLoadSamples Minta receptek betöltésének indítása.
 * @property hasRecipes Van‑e már bármilyen recept a tárban (lábjegyzet szövegéhez).
 */
type Props = {
    children: ReactNode
    onCreateNew: () => void
    onLoadSamples: () => void
    hasRecipes: boolean
}

/**
 * Oldalváz komponens fejléc/gombokkal és lábléccel.
 *
 * @param children A megjelenítendő belső tartalom.
 * @param onCreateNew Új recept művelet callback.
 * @param onLoadSamples Minta receptek betöltése callback.
 * @param hasRecipes Receptállapot jelző (lábjegyzet üzenethez).
 */
export function Layout({children, onCreateNew, onLoadSamples, hasRecipes}: Props) {
    return (
        <div className="app-shell">
            <header className="app-header">
                <div>
                    <h1>Recept kártyák</h1>
                    <p className="app-subtitle">
                        Rendszerezd a receptjeidet.
                    </p>
                </div>
                <HeaderActions onCreateNew={onCreateNew} onLoadSamples={onLoadSamples} />
            </header>

            <div className="app-body">{children}</div>

            <footer className="app-footer">
                <FooterNotice hasRecipes={hasRecipes} />
            </footer>
        </div>
    )
}
