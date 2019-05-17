// Read existing recipes in localStorage
let getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
        try {
            return recipesJSON ? JSON.parse(recipesJSON) : []
        } catch (e) {
            return []
        }
}

// Save recipes to localStorage
let saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Delete Recipes
const deleteRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
}

// Remove ingredient from the list
const removeIngredient = (name) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.name === name)

        if (ingredientIndex > -1) {
            recipe.ingredients.splice(ingredientIndex, 1)
        }
}

// Toggle/hide completed ingredients
const toggleIngredient = (name) => {
    const toggleIndex = recipe.ingredients.find((ingredient) => ingredient.name === name)

    if (toggleIndex) {
        toggleIndex.completed = !toggleIndex.completed 
    }
    saveRecipes(recipes)
}

// Render application recipes
const renderRecipes = (recipes, filters) => {
    const recipeElContainer = document.querySelector('#recipes')
        recipeElContainer.innerHTML = ''
    
        recipes.map(recipe => {
            const recipeEl = document.createElement('p')
            const recipeName = document.createElement('a')
            const deleteEl = document.createElement('i')

            recipeElContainer.appendChild(recipeEl)

            recipeName.textContent = recipe.name
            recipeName.setAttribute('href', `/edit.html#${recipe.id}`)

            // deleteEl.textContent = 'Remove'
            deleteEl.classList.add('ion-close-circled')
            deleteEl.addEventListener('click', (id) => {
                deleteRecipe(recipe.id)
                saveRecipes(recipes)
                renderRecipes(recipes, filters)
            })

            recipeEl.appendChild(deleteEl)
            recipeEl.appendChild(recipeName)
        })
}

// // Render application ingredients
// const renderIngredients = (ingredients, ingredientFilters) => {
//     const filteredIngredients = ingredients.filter((ingredient) => {
//         const searchTextMatch = ingredient.name.toLowerCase().includes(ingredientFilters.searchText.toLowerCase())
//         const hideCompletedMatch = !ingredientFilters.hideCompleted || !ingredient.completed

//         return searchTextMatch && hideCompletedMatch 
//     })

//     document.querySelector('#ingredients').innerHTML = ''

//     filteredIngredients.map(ingredient => {
//         // Create a container for the ingredients
//         const ingredientEl = document.createElement('p')
//         const ingredientName = generateIngredientDOM(ingredient)
//         const checkBox = document.createElement('input')
//         const removeEl = document.createElement('button')
    
//         document.querySelector('#ingredients').appendChild(ingredientEl)
    
//         // Setup checkbox
//         checkBox.checked = ingredient.completed
//         checkBox.setAttribute('type', 'checkbox')
//         checkBox.addEventListener('change', function () {
//             toggleIngredient(ingredient.id)
//             saveRecipes(recipes)
//             renderIngredients(ingredients, ingredientFilters)
//         })

//         // Setup remove button
//         removeEl.textContent = 'Remove'
//         removeEl.classList.add('remove_button')
//         removeEl.addEventListener('click', () => {
//             removeIngredient(ingredient.id)
//             saveRecipes(recipes)
//             renderIngredients(ingredients, ingredientFilters)
//         })

//         // Add all elements to the ingredientEl as you create them
//         ingredientEl.appendChild(removeEl)
//         ingredientEl.appendChild(ingredientName)
//         ingredientEl.appendChild(checkBox)
//     })
// }
