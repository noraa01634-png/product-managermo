let productName=document.getElementById("productName")
let productPrice=document.getElementById("productPrice")
let productQuantity=document.getElementById("productQuantity")
let saveBtn=document.getElementById("saveBtn")
let message=document.getElementById("message")
let productList=document.getElementById("productList")

let products = []
let editindex=null

let savedProduct =localStorage.getItem("products")
if(savedProduct !== null){
    products=JSON.parse(savedProduct);
}

function saveProducts(){
    localStorage.setItem("products",JSON.stringify(products))
}

function displayProducts (){
    productList.innerHTML=""

    products.forEach(function(product,index){
        productList.innerHTML += `
        
        <div class="product-card">
     <h3>${product.name}</h3>       
    <p>price : ${product.price}</p>
    <p>Quantity : ${product.quantity}</p>
    <button onclick="editProduct(${index})">Edit</button>
    <button onclick="deleteProduct(${index})">Delete</button>
        </div>
       `
    })
}
saveBtn.addEventListener("click",function(){

    let product = {
        name : productName.value,
        price : productPrice.value,
        quantity : productQuantity.value
    }

if(editindex === null){
    products.push(product)
    message.textContent = "product added succesfully"
}else{
     products[editindex]= product
     editindex=null
     saveBtn.textContent="save Product"
     message.textContent="Product uptaded succesfully"
}

saveProducts()
displayProducts()


productName.value=""
productPrice.value=""
productQuantity.value=""

})
function editProduct(index){
   productName.value= products[index].name
    productPrice.value=products[index].price
    productQuantity.value=products[index].quantity

    editindex = index
    saveBtn.textContent = " Update product"
}
function deleteProduct(index){
    products.splice(index,1)
    

    saveProducts()
    displayProducts()

    message.textContent = "Product deleted succesfully"
}
displayProducts()
