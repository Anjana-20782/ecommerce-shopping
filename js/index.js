async function fetchProducts() {
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();

    let str = "";
    data.products.forEach(element => {
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
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
fetchProducts();


   