type Props = {
    hasRecipes: boolean
}

/**
 * Lábjegyzet jelzőszöveg komponens, amely a receptlista állapotát kommunikálja.
 *
 * Ha még nincs egyetlen recept sem (`hasRecipes === false`), egy bátorító
 * üzenetet jelenít meg, amely az első recept hozzáadására ösztönöz. Ellenkező
 * esetben üres stringet renderel, így a layout változatlan marad.
 *
 * @param hasRecipes Logikai jelző, amely azt mutatja, hogy van-e már mentett recept.
 */
export function FooterNotice({hasRecipes}: Props) {
    return (
        <small>{hasRecipes ? '' : 'No recipes yet. Start by adding your first one! '}</small>
    )
}
