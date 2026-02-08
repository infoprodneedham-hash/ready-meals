const recipes = {
    Chicken: [
        { name: "Pesto Chicken", ingredients: [{ item: "Chicken Breast", qty: 1, unit: "pc" }, { item: "Pesto", qty: 50, unit: "g" }, { item: "Pasta", qty: 100, unit: "g" }] },
        { name: "Chicken Stir Fry", ingredients: [{ item: "Chicken Strips", qty: 150, unit: "g" }, { item: "Soy Sauce", qty: 1, unit: "tbsp" }, { item: "Mixed Veggies", qty: 1, unit: "cup" }] },
        { name: "Roast Chicken", ingredients: [{ item: "Chicken Thighs", qty: 2, unit: "pc" }, { item: "Potatoes", qty: 2, unit: "pc" }, { item: "Carrots", qty: 1, unit: "pc" }] }
    ],
    Beef: [
        { name: "Beef Tacos", ingredients: [{ item: "Ground Beef", qty: 150, unit: "g" }, { item: "Taco Shells", qty: 3, unit: "pc" }, { item: "Shredded Cheese", qty: 30, unit: "g" }] },
        { name: "Beef Stew", ingredients: [{ item: "Beef Cubes", qty: 200, unit: "g" }, { item: "Beef Stock", qty: 250, unit: "ml" }, { item: "Onion", qty: 0.5, unit: "pc" }] },
        { name: "Steak & Greens", ingredients: [{ item: "Sirloin Steak", qty: 1, unit: "pc" }, { item: "Asparagus", qty: 5, unit: "pc" }, { item: "Butter", qty: 10, unit: "g" }] }
    ],
    Pork: [
        { name: "Honey Pork Chops", ingredients: [{ item: "Pork Chop", qty: 1, unit: "pc" }, { item: "Honey", qty: 1, unit: "tbsp" }, { item: "Green Beans", qty: 100, unit: "g" }] },
        { name: "BBQ Pulled Pork", ingredients: [{ item: "Pork Shoulder", qty: 200, unit: "g" }, { item: "BBQ Sauce", qty: 2, unit: "tbsp" }, { item: "Burger Buns", qty: 1, unit: "pc" }] },
        { name: "Bacon Carbonara", ingredients: [{ item: "Bacon", qty: 3, unit: "strips" }, { item: "Pasta", qty: 100, unit: "g" }, { item: "Egg", qty: 1, unit: "pc" }] }
    ],
    Fish: [
        { name: "Lemon Salmon", ingredients: [{ item: "Salmon Fillet", qty: 1, unit: "pc" }, { item: "Lemon", qty: 0.5, unit: "pc" }, { item: "Broccoli", qty: 1, unit: "head" }] },
        { name: "Fish Tacos", ingredients: [{ item: "White Fish", qty: 150, unit: "g" }, { item: "Corn Tortillas", qty: 3, unit: "pc" }, { item: "Cabbage Slaw", qty: 0.5, unit: "cup" }] },
        { name: "Pan Seared Sea Bass", ingredients: [{ item: "Sea Bass", qty: 1, unit: "pc" }, { item: "Cherry Tomatoes", qty: 6, unit: "pc" }, { item: "Olive Oil", qty: 1, unit: "tbsp" }] }
    ],
    Vegetarian: [
        { name: "Chickpea Curry", ingredients: [{ item: "Chickpeas", qty: 0.5, unit: "can" }, { item: "Coconut Milk", qty: 100, unit: "ml" }, { item: "Rice", qty: 75, unit: "g" }] },
        { name: "Mushroom Risotto", ingredients: [{ item: "Mushrooms", qty: 100, unit: "g" }, { item: "Arborio Rice", qty: 80, unit: "g" }, { item: "Veggie Broth", qty: 300, unit: "ml" }] },
        { name: "Halloumi Salad", ingredients: [{ item: "Halloumi", qty: 125, unit: "g" }, { item: "Mixed Greens", qty: 1, unit: "bag" }, { item: "Cucumber", qty: 0.25, unit: "pc" }] }
    ]
};

let selectedRecipes = [];

// Initialize the buttons on page load
function initApp() {
    const menuContainer = document.getElementById('menu-categories');
    menuContainer.innerHTML = ''; // Clear existing
    
    for (const category in recipes) {
        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `<h3>${category}</h3><div class="recipe-grid"></div>`;
        
        const grid = section.querySelector('.recipe-grid');
        
        recipes[category].forEach(recipe => {
            const btn = document.createElement('button');
            btn.className = 'recipe-btn';
            btn.innerText = recipe.name;
            btn.onclick = () => addRecipe(category, recipe.name);
            grid.appendChild(btn);
        });
        
        menuContainer.appendChild(section);
    }
    loadFromStorage();
}

function addRecipe(category, recipeName) {
    const recipe = recipes[category].find(r => r.name === recipeName);
    // Push a copy of the recipe to the selected list
    selectedRecipes.push(recipe);
    saveToStorage();
    renderList();
}

function renderList() {
    const listUl = document.getElementById('list-items');
    const multiplier = parseInt(document.getElementById('people-count').value);
    listUl.innerHTML = "";

    if (selectedRecipes.length === 0) {
        listUl.innerHTML = "<p>Select recipes to see ingredients!</p>";
        return;
    }

    // Object to consolidate totals: { "Chicken Breast (pc)": 2 }
    const totals = {};

    selectedRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
            const key = `${ing.item}|${ing.unit}`;
            const totalForThisRecipe = ing.qty * multiplier;
            totals[key] = (totals[key] || 0) + totalForThisRecipe;
        });
    });

    // Build the list items
    for (const [key, qty] of Object.entries(totals)) {
        const [itemName, unit] = key.split('|');
        const li = document.createElement('li');
        
        // Clean up numbers (avoiding 0.33333333)
        const displayQty = Number.isInteger(qty) ? qty : qty.toFixed(1);
        
        li.innerHTML = `<strong>${displayQty}${unit}</strong> &nbsp; ${itemName}`;
        listUl.appendChild(li);
    }
}

function updateServings() {
    renderList();
}

function clearList() {
    if (confirm("Clear your shopping list and start over?")) {
        selectedRecipes = [];
        saveToStorage();
        renderList();
    }
}

function saveToStorage() {
    localStorage.setItem('mealPlannerData', JSON.stringify(selectedRecipes));
}

function loadFromStorage() {
    const data = localStorage.getItem('mealPlannerData');
    if (data) {
        selectedRecipes = JSON.parse(data);
        renderList();
    }
}

// Start app
initApp();