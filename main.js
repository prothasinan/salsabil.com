
    var menuItem = document.getElementById("menuItem");
if(window.innerWidth < 632)
menuItem.style.display = 'none'
if(window.innerWidth > 632)
menuItem.styel.diplay = 'block'


function showmenu(){
    menuItem.style.display = 'block'
   

    
    
}



function hidemenu(){
    menuItem.style.display = 'none'
}
   
   
   

   var cart = document.getElementById('cart')
   function showcart(){
    cart.style.display = 'block'
   };

   function closecart(){
    cart.style.display = 'none'
   };
    

    // making  add to cart 
//cart working js
if  (document.readyState =="loading"){
    document.addEventListener(
        'DOMContentLoaded', ready);
}
else {
    ready();
}
//removing item from cart 
function ready(){
    var removeItems = document.querySelectorAll('.remove-item');

    for (var i = 0; i < removeItems.length; i++) {
        removeItems[i].addEventListener('click', removeItem);
    }
//quantity change 
var quantityInputs = document.querySelectorAll('.cart-quantity'); // Corrected function name
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}
//add item to cart 
var addCart = document.getElementsByClassName('add-cart');
for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
}
saveCartItems()









}





    function removeItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updatetotal()
        saveCartItems();
    }
    function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
       
    }
    updatetotal();
    saveCartItems();
    }


//add cart function
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var tittle = shopProducts.getElementsByClassName('product-tittle')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(tittle, price, productImg);
    updatetotal();
    saveCartItems();
}
function addProductToCart(tittle, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cartbox');
    var cartItems = document.getElementsByClassName('cartcontent')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-tittle');
    for ( var i =0; i< cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == tittle){
            alert('item is already added to cart');
            return;
        }
    }
var cartBoxContent = `<img src="${productImg}" alt="no photo" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-tittle">${tittle}</div>
                <div class="cart-price">${price}</div>
                <input 
                type="number"
                 name="" 
                 id="" 
                 value="1" 
                 class="cart-quantity"
                 />
            </div>
            <!--remove item-->
            <img src="image/removeitem.png" alt="remove" class="remove-item">`
            cartShopBox.innerHTML = cartBoxContent;
            cartItems.append(cartShopBox);
            cartShopBox.getElementsByClassName('remove-item')[0].addEventListener('click', removeItem)
            cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
saveCartItems()
}







    
    //update total
    function updatetotal() {
    var cartcontent = document.querySelector('.cartcontent');
    var cartBoxes = cartcontent.querySelectorAll('.cartbox');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace('tk', '')); // Remove 'tk' and parse as a float
        var quantity = quantityElement.value;
        total += price * quantity; // Calculate the subtotal for each item and add it to the total
    }
    total = Math.round(total *100) / 100;
    document.querySelector('.total-price').innerText = 'tk' + total.toFixed(2); // Display the total with two decimal places
    //save item to local storage
    localStorage.setItem('cartTotal', total);
}





//keep item in cart even after refreshing 
// Save cart items to local storage
function saveCartItems() {
    var cartContent = document.getElementsByClassName('cartcontent')[0];
    var cartBoxes = cartContent.getElementsByClassName('cartbox');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var tittleElement = cartBox.getElementsByClassName('cart-product-tittle')[0];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        var item = {
            tittle: tittleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart items from local storage
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.tittle, item.price, item.productImg);

            // Get the last cart box element (the one that was just added)
            var cartBoxes = document.getElementsByClassName('cartbox');
            var cartBox = cartBoxes[cartBoxes.length - 1];

            // Access the quantity element within the cartBox
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }

    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.getElementsByClassName('total-price')[0].innerText = 'tk' + cartTotal;
    }
}

// Call the loadCartItems function when the page loads to populate the cart
loadCartItems();





var activebtn1 = document.getElementsByClassName('activebtn1');
var activebtn2 = document.getElementsByClassName('activebtn2');
var activebtn3 = document.getElementsByClassName('activebtn3');

function activebtn2(){
    activebtn2[0].style.background = '#ff523b';
    activebtn1[0].style.background = '#fff';
}






