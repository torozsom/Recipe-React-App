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
                <h3>Recept lépéseinek felolvasása</h3>
                <div className="step-guide-actions">
                    {isPlaying ? (
                        <button type="button" onClick={stop}>
                            Stop
                        </button>
                    ) : (
                        <button type="button" onClick={start}>
                            Start
                        </button>
                    )}
                    <button type="button" onClick={previous} disabled={currentIndex <= 0}>
                        Előző
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        disabled={currentIndex >= steps.length - 1}
                    >
                        Köv.
                    </button>
                </div>
            </header>

            <p className="step-guide-current">{}
                {currentIndex + 1}. lépés: {steps[currentIndex]}
            </p>
        </section>
    )
}
