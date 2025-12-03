/**
 * Apró, típusos React hook a böngésző LocalStorage-ával szinkronizált állapothoz.
 *
 * A kezdő értéket egyszer tölti be a `localStorage`-ból (ha elérhető),
 * majd minden változáskor JSON formátumban elmenti ugyanarra a kulcsra.
 *
 * Példa használat:
 * ```ts
 * const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", [])
 * ```
 *
 * Megjegyzés: Privát/inkognitó mód vagy kvóta hibák esetén a mentés csendben sikertelen lehet.
 *
 * @param key A `localStorage` kulcs, amely alatt az érték tárolódik.
 * @param initialValue Kezdő érték, ha nincs még eltárolt adat, vagy nem elérhető a `window`.
 * @returns Kettős: az aktuális érték és az állításhoz használt setter (ugyanúgy, mint a `useState`).
 */
import {Dispatch, SetStateAction, useEffect, useState} from 'react'


export function useLocalStorage<T>(key: string, initialValue: T) {
    // initialize from LocalStorage (or fallback to initial)
    const [value, setValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue
        try {
            const stored = window.localStorage.getItem(key)
            return stored ? (JSON.parse(stored) as T) : initialValue
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // ignore quota / privacy errors
        }
    }, [key, value]) // store whenever key or value changes

    return [value, setValue] as [T, Dispatch<SetStateAction<T>>] // típusos tuple
}
