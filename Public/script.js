async function loadWishlist(){

const response = await fetch('/products');
const products = await response.json();

let output = `
<table>
<tr>
<th>Status</th>
<th>Product</th>
<th>Current Price</th>
<th>Target Price</th>
<th>Action</th>
</tr>
`;

products.forEach(product => {

output += `
<tr>
<td>${product.productName}</td>
<td>₹${product.currentPrice}</td>
<td>₹${product.targetPrice}</td>
<td>
${product.currentPrice <= product.targetPrice
? "🔥 Price Dropped"
: "⏳ Tracking"}
</td>
<td>
<button onclick="deleteProduct('${product._id}')">
Delete
</button>
</td>
</tr>
`;

});

output += `</table>`;

const wishlist = document.getElementById('wishlistData');

if(wishlist){
wishlist.innerHTML = output;
}

}

async function deleteProduct(id){

await fetch('/delete-product/'+id,{

method:'DELETE'

});

loadWishlist();

}
loadWishlist();