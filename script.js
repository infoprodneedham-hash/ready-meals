const recipes = {
    Chicken: [
        { name: "Pesto Chicken", ingredients: ["Chicken Breast", "Pesto", "Pasta"] },
        { name: "Chicken Stir Fry", ingredients: ["Chicken", "Soy Sauce", "Veggies"] },
        { name: "Roast Chicken", ingredients: ["Whole Chicken", "Potatoes"] }
    ],
    Beef: [
        { name: "Tacos", ingredients: ["Ground Beef", "Taco Shells", "Cheese"] },
        { name: "Beef Stew", ingredients: ["Beef Cubes", "Carrots", "Stock"] },
        { name: "Steak", ingredients: ["Sirloin", "Garlic Butter"] }
    ],
    Pork: [
        { name: "Pork Chops", ingredients: ["Pork Chops", "Applesauce"] },
        { name: "Pulled Pork", ingredients: ["Pork Shoulder", "BBQ Sauce", "Buns"] },
        { name: "Bacon Pasta", ingredients: ["Bacon", "Cream", "Parmesan"] }
    ],
    Fish: [
        { name: "Baked Salmon", ingredients: ["Salmon", "Lemon", "Asparagus"] },
        { name: "Fish Tacos", ingredients: ["White Fish", "Slaw", "Tortillas"] },
        { name: "Tuna Melt", ingredients: ["Canned Tuna", "Bread", "Mayo"] }
    ],
    Vegetarian: [
        { name: "Veggie Curry", ingredients: ["Chickpeas", "Coconut Milk", "Spinach"] },
        { name: "Mushroom Risotto", ingredients: ["Mushrooms", "Arborio Rice", "Broth"] },
        { name: "Halloumi Salad", ingredients: ["Halloumi", "Mixed Greens", "Cucumber"] }
    ]
};

let masterShoppingList = new Set();

function initApp() {
    const menuContainer = document.getElementById('menu-categories');
    
    for (const category in recipes) {
        const section = document.createElement('div');
        section.className = 'category-section';
        section.innerHTML = `<h3>${category}</h3><div class="recipe-grid"></div>`;
        
        const grid = section.querySelector('.recipe-grid');
        
        recipes[category].forEach(recipe => {
            const btn = document.createElement('button');
            btn.className = 'recipe-btn';
            btn.innerText = recipe.name;
            btn.onclick = () => addIngredients(recipe.ingredients);
            grid.appendChild(btn);
        });
        
        menuContainer.appendChild(section);
    }
}

function addIngredients(ingredients) {
    ingredients.forEach(item => masterShoppingList.add(item));
    renderList();
}

function renderList() {
    const listUl = document.getElementById('list-items');
    listUl.innerHTML = "";
    masterShoppingList.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        listUl.appendChild(li);
    });
}

function clearList() {
    masterShoppingList.clear();
    renderList();
}

// Start the app
initApp();