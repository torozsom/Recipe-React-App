/**
 * Gyökér alkalmazás komponens: állapotkezelés, szűrők és elrendezés.
 *
 * A recepteket `LocalStorage`‑ban tartósítja, kategória és kedvencek
 * szerinti szűrést biztosít, valamint kezeli az új/szerkesztés/törlés
 * műveleteket. A jobb oldali panelen a részletező vagy az űrlap jelenik meg
 * az aktuális állapot szerint.
 */
import {useMemo, useState} from 'react'
import './index.css'
import './styles/App.css'
import {useLocalStorage} from './hooks/useLocalStorage'
import {Layout} from './components/Layout'
import {RecipeList} from './components/RecipeList'
import {RecipeDetail} from './components/RecipeDetail'
import {RecipeForm} from './components/RecipeForm'
import {CategoryFilter} from './components/CategoryFilter'
import {EmptyState} from './components/EmptyState'
import type {Recipe, RecipeId} from './types'


const DIFFICULTIES = ['Egyszerű', 'Normál', 'Nehéz'] // available difficulty options


/**
 * Fő alkalmazás komponens, amely a teljes UI‑t összeállítja.
 */
export function App() {
    // persist recipes in LocalStorage
    const [storedRecipes, setStoredRecipes] = useLocalStorage<Recipe[]>('recipes', [],)

    const [selectedId, setSelectedId] = useState<RecipeId | null>(null) // focused recipe id
    const [filterCategory, setFilterCategory] = useState<string>('all') // category filter
    const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false) // favorites toggle
    const [isEditing, setIsEditing] = useState<boolean>(false) // edit mode flag


    const categories = useMemo(() => {
        const set = new Set(
            storedRecipes
                .map((r) => r.category)
                .filter((v): v is string => Boolean(v)),
        )
        return Array.from(set) // unique list of categories
    }, [storedRecipes])


    const filteredRecipes = useMemo(() => {
        return storedRecipes.filter((recipe) => {
            const matchCategory =
                filterCategory === 'all' || recipe.category === filterCategory
            const matchFavorite = !showOnlyFavorites || !!recipe.isFavorite
            return matchCategory && matchFavorite // both filters must pass
        })
    }, [storedRecipes, filterCategory, showOnlyFavorites])


    const selectedRecipe: Recipe | null =
        storedRecipes.find((r) => r.id === selectedId) || null // derived selected recipe


    /**
     * Recept mentése: ha van `id`, frissítés; különben létrehozás új azonosítóval.
     */
    const handleSaveRecipe = (recipe: Partial<Recipe>) => {
        // create or update a recipe then close the form
        if (recipe.id) {
            const updated = storedRecipes.map((r) =>
                r.id === recipe.id ? (recipe as Recipe) : r,
            )
            setStoredRecipes(updated)
            setIsEditing(false)
        } else {
            const withId = {
                ...recipe,
                id: crypto.randomUUID(),
                isFavorite: false,
            } as Recipe
            const updated = [...storedRecipes, withId]
            setStoredRecipes(updated)
            setSelectedId(withId.id)
            setIsEditing(false)
        }
    }


    /**
     * Recept végleges törlése. Ha a törölt volt a kijelölt, a kijelölést törli.
     */
    const handleDeleteRecipe = (id: RecipeId) => {
        // remove a recipe and clear selection if needed
        const updated = storedRecipes.filter((r) => r.id !== id)
        setStoredRecipes(updated)
        if (selectedId === id) {
            setSelectedId(null)
        }
    }


    /** Kedvenc jelölésének átkapcsolása egy receptnél. */
    const handleToggleFavorite = (id: RecipeId) => {
        // toggle favorite flag for a recipe
        const updated = storedRecipes.map((r) =>
            r.id === id ? {...r, isFavorite: !r.isFavorite} : r,
        )
        setStoredRecipes(updated)
    }


    /** Új recept létrehozása űrlap megnyitásával. */
    const handleCreateNew = () => {
        // open form for creating a new recipe
        setSelectedId(null)
        setIsEditing(true)
    }


    /** Kijelölt recept szerkesztése űrlap megnyitásával. */
    const handleEditSelected = () => {
        // open form for editing the selected recipe
        if (!selectedRecipe) return
        setIsEditing(true)
    }


    /** Szerkesztés megszakítása, űrlap bezárása mentés nélkül. */
    const handleCancelEdit = () => {
        // close the form without saving
        setIsEditing(false)
    }


    /**
     * Minta receptek betöltése a `public/sample-recipes.json` forrásból és
     * egyesítése a meglévő listával (azonosító alapján deduplikál).
     */
    const handleLoadSampleRecipes = async () => {
        // fetch and merge sample recipes (id de-dup)
        try {
            const response = await fetch('/sample-recipes.json')
            if (!response.ok) {
                console.error('Failed to load sample recipes')
                return
            }
            const data = (await response.json()) as Partial<Recipe>[]
            const withIds: Recipe[] = data.map((recipe) => ({
                ...recipe,
                id: recipe.id || crypto.randomUUID(),
                isFavorite: !!recipe.isFavorite,
            })) as Recipe[]
            setStoredRecipes((prev) => {
                const existingIds = new Set(prev.map((r) => r.id))
                const merged = [
                    ...prev,
                    ...withIds.filter((r) => !existingIds.has(r.id)),
                ]
                return merged
            })
        } catch (error) {
            console.error('Error while loading sample recipes', error)
        }
    }


    return (
        <Layout
            onCreateNew={handleCreateNew}
            onLoadSamples={handleLoadSampleRecipes}
            hasRecipes={storedRecipes.length > 0}
        >
            <section className="app-main">
                <aside className="app-sidebar">
                    <CategoryFilter
                        categories={categories}
                        selected={filterCategory}
                        onChange={setFilterCategory}
                        showOnlyFavorites={showOnlyFavorites}
                        onToggleFavorites={setShowOnlyFavorites}
                    />
                </aside>

                <main className="app-content">
                    <div className="app-content-left">
                        {filteredRecipes.length === 0 ? (
                            <EmptyState onCreateNew={handleCreateNew}/>
                        ) : (
                            <RecipeList
                                recipes={filteredRecipes}
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}
                    </div>

                    <div className="app-content-right">
                        {isEditing ? (
                            <RecipeForm
                                key={selectedRecipe?.id || 'new'}
                                recipe={selectedRecipe}
                                difficulties={DIFFICULTIES}
                                onSave={handleSaveRecipe}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <RecipeDetail
                                recipe={selectedRecipe}
                                onEdit={handleEditSelected}
                                onDelete={handleDeleteRecipe}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )}
                    </div>
                </main>
            </section>
        </Layout>
    )
}


export default App
