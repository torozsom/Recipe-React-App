/**
 * Hangos lépésvezető UI komponens a Web Speech API‑t használó lejátszóhoz.
 *
 * A megadott lépéseket képes felolvasni, és gombokkal irányítható
 * (Start/Stop/Previous/Next). Ha nincs lépés, nem renderel tartalmat.
 */
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
                <h3>Voice step-by-step guide</h3>
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
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        disabled={currentIndex >= steps.length - 1}
                    >
                        Next
                    </button>
                </div>
            </header>

            <p className="step-guide-current">{/* live indicator of current step */}
                Step {currentIndex + 1} of {steps.length}: {steps[currentIndex]}
            </p>
        </section>
    )
}
