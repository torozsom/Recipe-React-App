type Props = {
    hasRecipes: boolean
}

/**
 * Lábléc információs szöveg komponens.
 */
export function FooterNotice({hasRecipes}: Props) {
    return (
        <small>{hasRecipes ? '' : 'No recipes yet. Start by adding your first one! '}</small>
    )
}
