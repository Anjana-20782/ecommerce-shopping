const data=``;
async function fetchProducts()
{
 try{
      const res=await fetch(`https://dummyjson.com/products`)
   const data=await res.json()
    console.log(data);
    
    let str=""
   data.products.forEach(element => {
   
    str+=`
    <div class="card">
        <img src="${element.thumbnail}">
        <h3>${element.title}</h3>
        <h5>${element.rating}</h5>
        <p class="price">Price :${element.price}</p>
    </div>
    `;
   });
   document.getElementById("cards").innerHTML=str;
}
catch(error){
    console.log("Error fetching data:",error);
}
}
fetchProducts()