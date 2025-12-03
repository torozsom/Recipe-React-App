/**
 * Kártya kiemelésére szolgáló animációs hook.
 *
 * Ha a `isSelected` értéke igazra vált, egy rövid, finom skálázási animációt
 * futtat a visszaadott `cardRef`-re hivatkozó elemeken. Az animáció
 * `requestAnimationFrame` segítségével történik, és automatikusan visszaállítja
 * a `transform` stílust a ciklus végén.
 *
 * @param isSelected Akkor indít animációt, ha igazra vált.
 * @returns Objektum `cardRef` és `isAnimating` értékekkel. A `cardRef`-et a DOM elemhez kell kötni.
 */
import {MutableRefObject, useEffect, useRef, useState} from 'react'


export function useRecipeHighlight(isSelected: boolean) {
    const cardRef = useRef<HTMLElement | null>(null)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    useEffect(() => {
        if (!isSelected || !cardRef.current) return

        let frame: number | null = null
        let start: number | undefined // animation start timestamp

        setIsAnimating(true)

        const animate = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / 400, 1) // 400ms duration
            const intensity = 1 + 0.08 * Math.sin(progress * Math.PI)
            if (cardRef.current) {
                cardRef.current.style.transform = `scale(${intensity})`
            }

            if (progress < 1) {
                frame = window.requestAnimationFrame(animate)
            } else {
                if (cardRef.current) cardRef.current.style.transform = ''
                setIsAnimating(false)
            }
        }

        frame = window.requestAnimationFrame(animate)

        return () => {
            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [isSelected])

    return {cardRef, isAnimating} as {
        cardRef: MutableRefObject<HTMLElement | null>
        isAnimating: boolean
    }
}
