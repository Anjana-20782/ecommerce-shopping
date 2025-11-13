// 🛒 Fetch all products
async function fetchProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    displayProducts(data.products);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// 💡 Display products in cards
function displayProducts(products) {
  let str = "";
  products.forEach(element => {
    str += `
      <div class="card">
        <a href="../pages/add.html?id=${element.id}">
          <img src="${element.thumbnail}" alt="${element.title}">
          <h3>${element.title}</h3>
          <p>${element.rating}⭐️</p>
          <p class="price">Price: $${element.price}</p>
        </a>
      </div>
    `;
  });
  document.getElementById("cards").innerHTML = str;
}

// Load all initially
fetchProducts();

// 🔍 Live Search
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  suggestions.innerHTML = "";

  if (query === "") {
    suggestions.style.display = "none";
    fetchProducts(); // show all again
    return;
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();

    if (data.products.length === 0) {
      suggestions.innerHTML = "<p>No products found</p>";
      suggestions.style.display = "block";
      return;
    }

    data.products.slice(0, 8).forEach(product => {
      const p = document.createElement("p");
      p.textContent = product.title;

      // 🔥 When clicking suggestion → show that product only
      p.addEventListener("click", () => {
        searchInput.value = product.title;
        displayProducts([product]); // show only selected item
        suggestions.style.display = "none";
      });

      suggestions.appendChild(p);
    });

    suggestions.style.display = "block";
  } catch (error) {
    console.error("Error fetching products:", error);
    suggestions.innerHTML = "<p>Error loading results</p>";
    suggestions.style.display = "block";
  }
});

// Hide box when clicking outside
document.addEventListener("click", e => {
  if (!e.target.closest(".search")) suggestions.style.display = "none";
});
