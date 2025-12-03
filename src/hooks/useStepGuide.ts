/**
 * Hangos lépésvezető segédhook a Web Speech API használatával.
 *
 * A megadott lépések szövegét a böngésző `speechSynthesis` képességével
 * olvastatja fel. Kezeli az indítás/leállítás, illetve az előző/következő
 * lépésekre ugrás logikáját, és állapotot ad vissza a vezérlő UI számára.
 *
 * Megjegyzés: A Web Speech API támogatása böngészőfüggő; ahol nem elérhető,
 * a hook csendben nem végez lejátszást.
 */
import {useEffect, useState} from 'react'


/**
 * Lépésről lépésre hangos vezetést biztosító hook.
 *
 * @param title Opcionális cím, amelyet a lépések felolvasása kontextusaként használ.
 * @param steps A felolvasandó lépések listája.
 * @returns Állapot és műveletek: `currentIndex`, `isPlaying`, `start`, `stop`, `next`, `previous`.
 */
export function useStepGuide(title: string | undefined, steps: string[]) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        // reset when recipe changes
        setCurrentIndex(0)
        stopSpeaking()
        setIsPlaying(false)
    }, [title, steps])

    useEffect(() => {
        return () => {
            stopSpeaking()
        }
    }, [])


    const speakCurrent = (index: number) => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
        const utterance = new SpeechSynthesisUtterance(
            `${title || 'Recipe'}, ${index + 1}. lépés ${steps[index]}`,
        )
        window.speechSynthesis.speak(utterance) // speak the current step
    }


    const stopSpeaking = () => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
        window.speechSynthesis.cancel() // cancel any queued speech
    }


    const start = () => {
        if (!steps.length) return
        setIsPlaying(true)
        stopSpeaking()
        speakCurrent(currentIndex)
    }


    const stop = () => {
        stopSpeaking()
        setIsPlaying(false)
    }


    const next = () => {
        setCurrentIndex((prev) => {
            const nextIndex = Math.min(prev + 1, steps.length - 1)
            if (isPlaying && nextIndex !== prev) {
                stopSpeaking()
                speakCurrent(nextIndex)
            }
            return nextIndex
        })
    }


    const previous = () => {
        setCurrentIndex((prev) => {
            const nextIndex = Math.max(prev - 1, 0)
            if (isPlaying && nextIndex !== prev) {
                stopSpeaking()
                speakCurrent(nextIndex)
            }
            return nextIndex
        })
    }


    return {currentIndex, isPlaying, start, stop, next, previous}
}
