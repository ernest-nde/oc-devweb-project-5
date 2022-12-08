const items = JSON.parse(localStorage.getItem('localData'));
console.log(items);

const cartItemsSection = document.getElementById('cart__items');

function cartCharged() {

    for (let item of items) {
        // Section article
        let article = document.createElement('article');
        article.classList.add('cart__item');
        article.setAttribute('data-id', item.id);
        article.setAttribute('data-color', item.color);

        // Partie image
        let cartItemImgDiv = document.createElement('div');
        cartItemImgDiv.classList.add('cart__item__img');

        let cartItemImg = document.createElement('img');
        cartItemImg.setAttribute('src', item.image);
        cartItemImg.setAttribute('alt', item.alt);

        // Partie du contenue de l'item ajouté au panier
        let cartItemContent = document.createElement('div');
        cartItemContent.classList.add('cart__item__content');

        let cartItemContentDescription = document.createElement('div');
        cartItemContentDescription.classList.add('cart__item__content_description');

        let h2 = document.createElement('h2');
        h2.innerText = item.name;

        let colorLabel = document.createElement('p');
        colorLabel.innerText = item.color;

        let priceLabel = document.createElement('p');
        priceLabel.innerText = item.price +' €';
        priceLabel.style.fontStyle = 'italic';

        cartItemContentDescription.appendChild(h2);
        cartItemContentDescription.appendChild(colorLabel);
        cartItemContentDescription.appendChild(priceLabel);

        let cartItemContentSettings = document.createElement('div');
        cartItemContentSettings.classList.add('cart__item__content_settings');

        let cartItemContentSettingsQuantity = document.createElement('div');
        cartItemContentSettingsQuantity.classList.add('cart__item__content_settings_quantity');
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

        let quantitylabel = document.createElement('p');
        quantitylabel.innerText = 'Qté : '; 
        cartItemContentSettingsQuantity.appendChild(quantitylabel);

        let itemQuantity = document.createElement('input');
        itemQuantity.type = 'number';
        itemQuantity.classList.add('itemQuantity');
        itemQuantity.setAttribute('name', 'itemQuantity');
        itemQuantity.setAttribute('min', '1');
        itemQuantity.setAttribute('max', '100');
        itemQuantity.setAttribute('value', item.quantity);
        cartItemContentSettingsQuantity.appendChild(itemQuantity);

        let cartItemContentSettingsDelete = document.createElement('div');
        cartItemContentSettingsDelete.classList.add('cart__item__content_settings_delete');
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        let deleteItem = document.createElement('p');
        deleteItem.classList.add('deleteItem');
        deleteItem.innerText = 'Supprimer';
        deleteItem.style.fontStyle = 'italic';
        deleteItem.style.cursor = 'pointer';
        cartItemContentSettingsDelete.appendChild(deleteItem);


        cartItemsSection.appendChild(article);
        article.appendChild(cartItemImgDiv);
        article.appendChild(cartItemContent);
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemImgDiv.appendChild(cartItemImg);

    }
    
}

cartCharged();