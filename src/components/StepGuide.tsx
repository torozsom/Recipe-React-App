import {useStepGuide} from '../hooks/useStepGuide'

/**
 * A `StepGuide` komponens propjai.
 * @property title Opcionális cím, amely a felolvasás elején elhangzik.
 * @property steps A felolvasandó lépések listája (sorrendben).
 */
type Props = {
    title?: string
    steps: string[]
}

/**
 * Hangos lépéslejátszó vezérlő felülete.
 *
 * @param title Opcionális recept cím a felolvasás bevezetéséhez.
 * @param steps Lépések listája. Üres lista esetén `null`-t renderel.
 */
export function StepGuide({title, steps}: Props) {
    const {currentIndex, isPlaying, start, stop, next, previous} = useStepGuide(
        title,
        steps,
    )

    if (!steps.length) return null

    return (
        <section className="step-guide">
            <header className="step-guide-header">
                <h3>Lépések felolvasása</h3>
                <div className="step-guide-actions">
                    {isPlaying ? (
                        <button type="button" className="with-icon" onClick={stop}>
                            <span className="material-symbols-rounded" aria-hidden="true">stop</span>
                            Stop
                        </button>
                    ) : (
                        <button type="button" className="with-icon" onClick={start}>
                            <span className="material-symbols-rounded" aria-hidden="true">play_arrow</span>
                            Start
                        </button>
                    )}
                    <button type="button" className="with-icon" onClick={previous} disabled={currentIndex <= 0}>
                        <span className="material-symbols-rounded" aria-hidden="true">chevron_left</span>
                        Előző
                    </button>
                    <button
                        type="button"
                        className="with-icon"
                        onClick={next}
                        disabled={currentIndex >= steps.length - 1}
                    >
                        Köv.
                        <span className="material-symbols-rounded" aria-hidden="true">chevron_right</span>
                    </button>
                </div>
            </header>

            <p className="step-guide-current">{}
                {currentIndex + 1}. lépés: {steps[currentIndex]}
            </p>
        </section>
    )
}
