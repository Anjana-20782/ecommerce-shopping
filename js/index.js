let products = [];
let categories = [];
let activeCategory = "all";

// 🔹 Fetch products & categories
async function fetchData() {
  try {
    // Fetch all products
    const productRes = await fetch("https://dummyjson.com/products");
    const productData = await productRes.json();
    products = productData.products;

    // Fetch categories
    const categoryRes = await fetch("https://dummyjson.com/products/category-list");
    categories = await categoryRes.json();

    displayCategories();
    displayProducts(products);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
fetchData();

// 🔹 Display categories
function displayCategories() {
  const catDiv = document.getElementById("categories");
  catDiv.innerHTML = `
    <button class="cat-btn active" data-category="all">All</button>
    ${categories.map(cat => `
      <button class="cat-btn" data-category="${cat}">${cat}</button>
    `).join("")}
  `;

  // Add click event to category buttons
  const catButtons = document.querySelectorAll(".cat-btn");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      filterProducts();
    });
  });
}

// 🔹 Display products
function displayProducts(items) {
  const cards = document.getElementById("cards");
  cards.innerHTML = items.map(p => `
    <div class="card">
      <a href="../pages/add.html?id=${p.id}">
        <img src="${p.thumbnail}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.rating}⭐️</p>
        <p class="price">Price: $${p.price}</p>
      </a>
    </div>
  `).join("");
}

// 🔹 Search + Category filter (combined)
function filterProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  let filtered = products;

  // Filter by category if not "all"
  if (activeCategory !== "all") {
    filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  }

  // Filter by search query
  if (query.trim() !== "") {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
  }

  displayProducts(filtered);
  displaySuggestions(filtered);
}

// 🔹 Display search suggestions
function displaySuggestions(list) {
  const suggestions = document.getElementById("suggestions");
  const query = document.getElementById("searchInput").value.toLowerCase();

  if (query === "") {
    suggestions.style.display = "none";
    return;
  }

  const limited = list.slice(0, 6);
  if (limited.length > 0) {
    suggestions.innerHTML = limited.map(p =>
      `<div class="suggestion-item">${p.title}</div>`
    ).join("");
    suggestions.style.display = "block";
  } else {
    suggestions.innerHTML = `<div class="no-result">No results found</div>`;
    suggestions.style.display = "block";
  }
}

// 🔹 Suggestion click event
document.getElementById("suggestions").addEventListener("click", e => {
  if (e.target.classList.contains("suggestion-item")) {
    document.getElementById("searchInput").value = e.target.textContent;
    document.getElementById("suggestions").style.display = "none";
    filterProducts();
    
  }
});

// 🔹 Search input events
document.getElementById("searchInput").addEventListener("input", filterProducts);
document.getElementById("searchBtn").addEventListener("click", filterProducts);
