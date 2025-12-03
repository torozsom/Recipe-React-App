/**
 * Vezérelt űrlap új recept létrehozásához vagy meglévő szerkesztéséhez.
 *
 * A komponens belső `FormState` állapotot tart fenn, amely a bemeneteket
 * tárolja. Mentéskor a soronként megadott hozzávalókat és lépéseket tömbbé
 * alakítja, és `Partial<Recipe>` formában adja vissza a szülőnek.
 */
import {FormEvent, useEffect, useState} from 'react'
import type {Difficulty, Recipe} from '../types'

/**
 * A belső űrlapállapot shape‑je.
 */
type FormState = {
    title: string
    time: string
    difficulty: Difficulty | string
    category: string
    imageUrl: string
    ingredientsText: string
    stepsText: string
}

const emptyRecipe: FormState = {
    title: '',
    time: '',
    difficulty: 'Egyszerű',
    category: '',
    imageUrl: '',
    ingredientsText: '',
    stepsText: '',
}

type Props = {
    recipe: Recipe | null
    difficulties: (Difficulty | string)[]
    onSave: (recipe: Partial<Recipe>) => void
    onCancel: () => void
}

/**
 * Recept űrlap komponens.
 *
 * @param recipe A szerkesztendő recept vagy `null` új létrehozásakor.
 * @param difficulties Előre definiált nehézségi opciók listája.
 * @param onSave Mentés callback, `Partial<Recipe>` payload‑dal.
 * @param onCancel Mégse callback az űrlap bezárásához.
 */
export function RecipeForm({recipe, difficulties, onSave, onCancel}: Props) {
    const [form, setForm] = useState<FormState>(emptyRecipe)

    useEffect(() => {
        if (recipe) {
            setForm({
                title: recipe.title || '',
                time: recipe.time || '',
                difficulty: recipe.difficulty || 'Egyszerű',
                category: recipe.category || '',
                imageUrl: recipe.imageUrl || '',
                ingredientsText: (recipe.ingredients || []).join('\n'),
                stepsText: (recipe.steps || []).join('\n'),
            })
        } else {
            setForm(emptyRecipe)
        }
    }, [recipe]) // sync form when recipe prop changes

    /** Mezőérték frissítése a belső űrlapállapotban. */
    const updateField = (field: keyof FormState, value: string) => {
        setForm((prev) => ({...prev, [field]: value}))
    }

    /**
     * Beküldés kezelése: a szövegmezőkből soronkénti tömböket képez,
     * majd meghívja az `onSave` callbacket a normalizált adatokkal.
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const ingredients = form.ingredientsText
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean)

        const steps = form.stepsText
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean)

        const payload: Partial<Recipe> = {
            ...(recipe || {}),
            title: form.title.trim() || 'Névtelen recept',
            time: form.time.trim(),
            difficulty: form.difficulty,
            category: form.category.trim(),
            imageUrl: form.imageUrl.trim(),
            ingredients,
            steps,
        }

        onSave(payload) // hand off to parent
    }

    return (
        <section className="recipe-form-section">
            <h2>{recipe ? 'Recept módosítása' : 'Új recept'}</h2>
            <form className="recipe-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>
                        Recept neve
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            placeholder="Nagymama almás pitéje"
                        />
                    </label>
                </div>

                <div className="form-row inline">
                    <label>
                        Idő
                        <input
                            type="text"
                            value={form.time}
                            onChange={(e) => updateField('time', e.target.value)}
                            placeholder="45 perc"
                        />
                    </label>
                    <label>
                        Nehézség
                        <select
                            value={form.difficulty}
                            onChange={(e) => updateField('difficulty', e.target.value)}
                        >
                            {difficulties.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Kategória
                        <input
                            type="text"
                            value={form.category}
                            onChange={(e) => updateField('category', e.target.value)}
                            placeholder="Főétel, desszert, leves..."
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Fénykép (opcionális)
                        <input
                            type="url"
                            value={form.imageUrl}
                            onChange={(e) => updateField('imageUrl', e.target.value)}
                            placeholder="https://example.com/my-recipe.jpg"
                        />
                    </label>
                </div>

                <div className="form-row two-col">
                    <label>
                        Hozzávalók (soronként egy)
                        <textarea
                            rows={8}
                            value={form.ingredientsText}
                            onChange={(e) => updateField('ingredientsText', e.target.value)}
                        />
                    </label>
                    <label>
                        Lépések (soronként egy)
                        <textarea
                            rows={8}
                            value={form.stepsText}
                            onChange={(e) => updateField('stepsText', e.target.value)}
                        />
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary">
                        Mentés
                    </button>
                    <button type="button" className="ghost" onClick={onCancel}>
                        Vissza
                    </button>
                </div>
            </form>
        </section>
    )
}
