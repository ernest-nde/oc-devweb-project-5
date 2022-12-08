const dataSrc = 'http://localhost:3000/api/products';

let currentUrl = new URL(window.location.href);
let itemID = currentUrl.searchParams.get("id");

function productTemplate(itemData) {
    // Modification du titre de la page
    document.title = itemData.name;

    /**
     * Insertion de l'image du produit sur la page
     * Création de l'élément HTML <img>,
     * Ajout du lien de lien de l'image avec le texte alternatif,
     * Intégration de l'image à son conteneur <div>
     * 
     * @param {*} itemData
     */
    let contentImg = document.querySelector('.item__img');
    let productImg = document.createElement('img');
    productImg.setAttribute('src', itemData.imageUrl);
    productImg.setAttribute('alt', itemData.altTxt);
    contentImg.appendChild(productImg);

    /**
     * Insertion du nom du produit
     * Insertion du prix du produit
     * Insertion de la description du produit
     * @param {*} itemData
     */
    let contentTitle = document.getElementById('title');
    contentTitle.innerText = itemData.name;

    let contentPrice = document.getElementById('price');
    contentPrice.innerText = itemData.price;

    let ContentDescription = document.getElementById('description');
    ContentDescription.innerText = itemData.description;

    /**
     * Insertion des différentes couleurs d'un produit
     * @param {*} itemData
     */
    let contentColors = document.getElementById('colors');
    
    let allColors = itemData.colors;
    
    for(color in allColors) {
        let contentColorsOption = document.createElement('option');
        contentColorsOption.value = color;
        contentColorsOption.text = allColors[color];
        contentColors.appendChild(contentColorsOption);
    }
    
    addItemToCart(itemData);

}

function fetchAProductData() {
    fetch( dataSrc + '/' + itemID)
    .then(response => {
        return response.json();
    })
    .then(aProductData => {
        productTemplate(aProductData);
    })
    .catch( error => {
        alert(" Erreur : " + error );
    })
}
fetchAProductData();


function addItemToCart( item ) {
    const addToCart = document.getElementById('addToCart');

    addToCart.addEventListener('click', () => {

        const colors = document.getElementById("colors");
        const color = colors.options[colors.selectedIndex].text;

        const quantity = document.getElementById("quantity").value;

            
        let cartItem = {
            id: itemID,
            name: item.name,
            image: item.imageUrl,
            alt: item.altTxt,
            price: item.price,
            color: color,
            quantity: parseInt(quantity)
        }

        let localStorageDatas = JSON.parse(localStorage.getItem("localData"));

        const confirmNotification = () => {
            if (confirm("Nouvel Item ajouté au panier!\nAller vers le panier ?")) {
                window.location.href = "./cart.html";
            }
        }

        if(localStorageDatas) {
            let isItemExist = localStorageDatas.find( (item) => item.id === cartItem.id && item.color === cartItem.color);
            if(isItemExist) {
                isItemExist.quantity = isItemExist.quantity + cartItem.quantity;
                localStorage.setItem("localData", JSON.stringify(localStorageDatas));
                confirmNotification();
            } else {
                localStorageDatas.push(cartItem);
                localStorage.setItem("localData", JSON.stringify(localStorageDatas));
                confirmNotification();
            }

        } else {
            let localStorageDatas = [];
            localStorageDatas.push(cartItem);
            localStorage.setItem("localData", JSON.stringify(localStorageDatas));
            confirmNotification();
        }
            
    });
    
}