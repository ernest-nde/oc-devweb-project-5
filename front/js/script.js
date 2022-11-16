const dataSrc = 'http://localhost:3000/api/products';

function itemTemplate(data) {
    // Recupération du conteneur de la section des items
    let items = document.getElementById('items');

    /** Model de base d'un item
     * <a href="./product.html?id=42">
            <article>
                <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                <h3 class="productName">Kanap name1</h3>
                <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
        </a>
     */
    // Lien de base
    let itemLink = document.createElement('a');
    itemLink.setAttribute('href', './product.html?id=' + data._id);

    // Article
    let article = document.createElement('article');
    itemLink.appendChild(article);

    // Ajout des images
    let img = document.createElement('img');
    img.setAttribute('src', data.imageUrl);
    img.setAttribute('alt', data.altTxt);
    article.appendChild(img);

    // Ajout des titres aux items
    let h3 = document.createElement('h3');
    h3.classList.add('productName');
    h3.innerText = data.name;
    article.appendChild(h3);

    // Ajout des descriptions aux items
    let p = document.createElement('p');
    p.classList.add('productDescription');
    p.innerText = data.description;
    article.appendChild(p);

    // Ajout de l'ensemble à la section des items
    items.appendChild(itemLink);
}

function getAllItems() {
    fetch(dataSrc)
    .then( response => { return response.json() } )
    .then( resources => {
        for (let resource of resources) {
            itemTemplate(resource);
        }
    })
    .catch( error => {
        alert("Erreur : " + error.message);
    });
}
getAllItems();

