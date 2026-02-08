const recipes = {
    Chicken: [
        { name: "Pesto Chicken", ingredients: [{ item: "Chicken Breast", qty: 1, unit: "pc" }, { item: "Pesto", qty: 50, unit: "g" }, { item: "Pasta", qty: 100, unit: "g" }], method: "Boil pasta. Pan-fry chicken until golden. Toss together with pesto and a splash of pasta water." },
        { name: "Chicken Stir Fry", ingredients: [{ item: "Chicken Strips", qty: 150, unit: "g" }, { item: "Soy Sauce", qty: 1, unit: "tbsp" }, { item: "Mixed Veggies", qty: 1, unit: "cup" }], method: "Heat oil in a wok. Sear chicken strips. Add veggies and soy sauce. Stir-fry for 5 minutes on high heat." },
        { name: "Roast Chicken", ingredients: [{ item: "Chicken Thighs", qty: 2, unit: "pc" }, { item: "Potatoes", qty: 2, unit: "pc" }, { item: "Carrots", qty: 1, unit: "pc" }], method: "Toss thighs and chopped veggies in oil and salt. Roast at 200°C for 35-40 minutes until skin is crispy." }
    ],
    Beef: [
        { name: "Beef Tacos", ingredients: [{ item: "Ground Beef", qty: 150, unit: "g" }, { item: "Taco Shells", qty: 3, unit: "pc" }, { item: "Shredded Cheese", qty: 30, unit: "g" }], method: "Brown the beef. Add taco seasoning. Fill shells and top with cheese and fresh salad." },
        { name: "Beef Stew", ingredients: [{ item: "Beef Cubes", qty: 200, unit: "g" }, { item: "Beef Stock", qty: 250, unit: "ml" }, { item: "Onion", qty: 0.5, unit: "pc" }], method: "Sear beef cubes. Add onions and stock. Simmer on low heat for 2 hours or until tender." },
        { name: "Steak & Greens", ingredients: [{ item: "Sirloin Steak", qty: 1, unit: "pc" }, { item: "Asparagus", qty: 5, unit: "pc" }, { item: "Butter", qty: 10, unit: "g" }], method: "Season steak. Sear in a hot pan 3 mins per side. Baste with garlic butter. Sauté asparagus in the same pan." }
    ],
    Pork: [
        { name: "Honey Pork Chops", ingredients: [{ item: "Pork Chop", qty: 1, unit: "pc" }, { item: "Honey", qty: 1, unit: "tbsp" }, { item: "Green Beans", qty: 100, unit: "g" }], method: "Sear pork chops. Glaze with honey in the final 2 minutes. Steam green beans on the side." },
        { name: "BBQ Pulled Pork", ingredients: [{ item: "Pork Shoulder", qty: 200, unit: "g" }, { item: "BBQ Sauce", qty: 2, unit: "tbsp" }, { item: "Burger Buns", qty: 1, unit: "pc" }], method: "Slow cook pork until it shreds with a fork. Mix with BBQ sauce and serve in toasted buns." },
        { name: "Bacon Carbonara", ingredients: [{ item: "Bacon", qty: 3, unit: "strips" }, { item: "Pasta", qty: 100, unit: "g" }, { item: "Egg", qty: 1, unit: "pc" }], method: "Cook pasta. Fry bacon until crisp. Mix hot pasta with whisked egg and cheese (off the heat) to create a sauce." }
    ],
    Fish: [
        { name: "Lemon Salmon", ingredients: [{ item: "Salmon Fillet", qty: 1, unit: "pc" }, { item: "Lemon", qty: 0.5, unit: "pc" }, { item: "Broccoli", qty: 1, unit: "head" }], method: "Bake salmon with lemon slices at 180°C for 12-15 mins. Serve with steamed broccoli." },
        { name: "Fish Tacos", ingredients: [{ item: "White Fish", qty: 150, unit: "g" }, { item: "Corn Tortillas", qty: 3, unit: "pc" }, { item: "Cabbage Slaw", qty: 0.5, unit: "cup" }], method: "Dust fish in flour and pan-fry. Serve in tortillas with crunchy slaw and lime." },
        { name: "Pan Seared Sea Bass", ingredients: [{ item: "Sea Bass", qty: 1, unit: "pc" }, { item: "Cherry Tomatoes", qty: 6, unit: "pc" }, { item: "Olive Oil", qty: 1, unit: "tbsp" }], method: "Sear bass skin-side down until crispy. Add tomatoes to the pan until they burst. Serve with oil drizzle." }
    ],
    Vegetarian: [
        { name: "Chickpea Curry", ingredients: [{ item: "Chickpeas", qty: 0.5, unit: "can" }, { item: "Coconut Milk", qty: 100, unit: "ml" }, { item: "Rice", qty: 75, unit: "g" }], method: "Sauté spices and chickpeas. Add coconut milk and simmer for 10 mins. Serve with fluffy rice." },
        { name: "Mushroom Risotto", ingredients: [{ item: "Mushrooms", qty: 100, unit: "g" }, { item: "Arborio Rice", qty: 80, unit: "g" }, { item: "Veggie Broth", qty: 300, unit: "ml" }], method: "Sauté mushrooms. Add rice, then add broth one ladle at a time, stirring until absorbed." },
        { name: "Halloumi Salad", ingredients: [{ item: "Halloumi", qty: 125, unit: "g" }, { item: "Mixed Greens", qty: 1, unit: "bag" }, { item: "Cucumber", qty: 0.25, unit: "pc" }], method: "Grill halloumi slices until golden. Toss with greens, cucumber, and a simple lemon dressing." }
    ]
};

let selectedRecipes = [];

// Initialize App: Builds the visual cards
function initApp() {
    const menuContainer = document.getElementById('menu-categories');
    menuContainer.innerHTML = ''; 
    
    for (const category in recipes) {
        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `<h3>${category}</h3><div class="recipe-grid"></div>`;
        
        const grid = section.querySelector('.recipe-grid');
        
        recipes[category].forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            
            card.innerHTML = `
                <div class="recipe-main">
                    <span class="expand-icon" onclick="toggleMethod(this)">▼</span>
                    <span class="recipe-name" onclick="toggleMethod(this)">${recipe.name}</span>
                    <button class="add-btn" onclick="addRecipe('${category}', '${recipe.name}')">Add</button>
                </div>
                <div class="recipe-method">
                    <p><strong>Method:</strong> ${recipe.method}</p>
                </div>
            `;
            grid.appendChild(card);
        });
        
        menuContainer.appendChild(section);
    }
    loadFromStorage();
}

// Expand/Collapse the Method section
function toggleMethod(element) {
    const card = element.closest('.recipe-card');
    card.classList.toggle('expanded');
}

// Add recipe to the global selection
function addRecipe(category, recipeName) {
    const recipe = recipes[category].find(r => r.name === recipeName);
    selectedRecipes.push(recipe);
    saveToStorage();
    renderList();
    
    // Brief visual feedback on the button
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.style.backgroundColor = "#2ecc71";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
    }, 1000);
}

// Generate the shopping list with multipliers
function renderList() {
    const listUl = document.getElementById('list-items');
    const peopleSelect = document.getElementById('people-count');
    const multiplier = peopleSelect ? parseInt(peopleSelect.value) : 1;
    
    listUl.innerHTML = "";

    if (selectedRecipes.length === 0) {
        listUl.innerHTML = "<p>Select recipes to see ingredients!</p>";
        return;
    }

    const totals = {};

    selectedRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
            const key = `${ing.item}|${ing.unit}`;
            const totalForThisRecipe = ing.qty * multiplier;
            totals[key] = (totals[key] || 0) + totalForThisRecipe;
        });
    });

    for (const [key, qty] of Object.entries(totals)) {
        const [itemName, unit] = key.split('|');
        const li = document.createElement('li');
        const displayQty = Number.isInteger(qty) ? qty : qty.toFixed(1);
        
        li.innerHTML = `<strong>${displayQty}${unit}</strong> &nbsp; ${itemName}`;
        // Optional: Tap an item to remove it from the list
        li.onclick = () => removeItem(itemName);
        listUl.appendChild(li);
    }
}

function updateServings() {
    renderList();
}

// Local Storage Handlers
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

function clearList() {
    if (confirm("Clear your shopping list and start over?")) {
        selectedRecipes = [];
        saveToStorage();
        renderList();
    }
}

// Helper to remove single item if user changes mind
function removeItem(name) {
    selectedRecipes = selectedRecipes.filter(r => !r.ingredients.some(i => i.item === name));
    saveToStorage();
    renderList();
}

// Start app
initApp();