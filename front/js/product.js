const dataSrc = 'http://localhost:3000/api/products';

const currentUrl = new URL(window.location.href);
const id = currentUrl.searchParams.get("id");

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
    
}

function fetchAProductData() {
    fetch( dataSrc + '/' + id)
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