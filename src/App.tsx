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


// elérhető nehézségi szint opciók
const DIFFICULTIES = ['Egyszerű', 'Normál', 'Nehéz']


/**
 * Fő alkalmazás komponens, amely a teljes UI‑t összeállítja.
 */
export function App() {
    // receptek tartós tárolása a LocalStorage-ban
    const [storedRecipes, setStoredRecipes] = useLocalStorage<Recipe[]>('recipes', [],)

    const [selectedId, setSelectedId] = useState<RecipeId | null>(null) // fókuszban lévő recept azonosítója
    const [filterCategory, setFilterCategory] = useState<string>('all') // kategória szűrő
    const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false) // csak kedvencek kapcsoló
    const [isEditing, setIsEditing] = useState<boolean>(false) // szerkesztési mód jelző


    const categories = useMemo(() => {
        const set = new Set(
            storedRecipes
                .map((r) => r.category)
                .filter((v): v is string => Boolean(v)),
        )
        return Array.from(set) // egyedi kategórialistát ad vissza
    }, [storedRecipes])


    const filteredRecipes = useMemo(() => {
        return storedRecipes.filter((recipe) => {
            const matchCategory =
                filterCategory === 'all' || recipe.category === filterCategory
            const matchFavorite = !showOnlyFavorites || !!recipe.isFavorite
            return matchCategory && matchFavorite // mindkét szűrő feltételének teljesülnie kell
        })
    }, [storedRecipes, filterCategory, showOnlyFavorites])


    const selectedRecipe: Recipe | null =
        storedRecipes.find((r) => r.id === selectedId) || null // származtatott kijelölt recept


    /**
     * Recept mentése: ha van `id`, frissítés; különben létrehozás új azonosítóval.
     */
    const handleSaveRecipe = (recipe: Partial<Recipe>) => {
        // recept létrehozása vagy frissítése, majd az űrlap bezárása
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
        // recept eltávolítása és szükség esetén a kijelölés törlése
        const updated = storedRecipes.filter((r) => r.id !== id)
        setStoredRecipes(updated)
        if (selectedId === id) {
            setSelectedId(null)
        }
    }


    /** Kedvenc jelölésének átkapcsolása egy receptnél. */
    const handleToggleFavorite = (id: RecipeId) => {
        // kedvenc jelző átkapcsolása a receptnél
        const updated = storedRecipes.map((r) =>
            r.id === id ? {...r, isFavorite: !r.isFavorite} : r,
        )
        setStoredRecipes(updated)
    }


    /** Új recept létrehozása űrlap megnyitásával. */
    const handleCreateNew = () => {
        // űrlap megnyitása új recept létrehozásához
        setSelectedId(null)
        setIsEditing(true)
    }


    /** Kijelölt recept szerkesztése űrlap megnyitásával. */
    const handleEditSelected = () => {
        // űrlap megnyitása a kijelölt recept szerkesztéséhez
        if (!selectedRecipe) return
        setIsEditing(true)
    }


    /** Szerkesztés megszakítása, űrlap bezárása mentés nélkül. */
    const handleCancelEdit = () => {
        // űrlap bezárása mentés nélkül
        setIsEditing(false)
    }


    /**
     * Minta receptek betöltése a `public/sample-recipes.json` forrásból és
     * egyesítése a meglévő listával (azonosító alapján deduplikál).
     */
    const handleLoadSampleRecipes = async () => {
        // minta receptek letöltése és egyesítése (azonosító alapján deduplikálás)
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
