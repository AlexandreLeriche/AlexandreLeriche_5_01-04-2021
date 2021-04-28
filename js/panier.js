// Récupération des données de l'enregistrement local
let registerCamera = JSON.parse(localStorage.getItem("newArticle"));

// Création de l'élément produit
const getElement = document.getElementById("getMe");

const cartRow = document.createElement("div");
cartRow.classList.add("row", "mb-4", "mt-4");

getElement.appendChild(cartRow);

// Condition pour déterminer si le panier contient un ou plusieurs éléments, ou si il est vide
if (registerCamera == null || registerCamera.length === 0) {

    const emptyCartCol = document.createElement("div");
    emptyCartCol.classList.add("col-sm-12", "text-center");

    const emptyCartMessage = document.createElement("h2");
    emptyCartMessage.classList.add("text-danger");
    emptyCartMessage.innerHTML = "Oups ! Votre panier est vide !";

    cartRow.appendChild(emptyCartCol);
    emptyCartCol.appendChild(emptyCartMessage);
} else {
    // Création d'une itération pour compter les éléments dans le panier
    let i = 0;
    for (register of registerCamera) {

        // Création du descriptif du produit ajouté au panier
        const descriptionProductCol = document.createElement("div");
        descriptionProductCol.classList.add("col-sm-5", "text-center", "border-bottom");

        const descriptionProduct = document.createElement("p");
        descriptionProduct.innerHTML = register.cameraName + " avec la lentille " + register.cameraLenses;

        const productQtyCol = document.createElement("div");
        productQtyCol.classList.add("col-sm-3", "text-center", "border-bottom");

        const productQty = document.createElement("p")
        productQty.innerHTML = "Quantité : " + register.cameraQuantity;

        const productPriceCol = document.createElement("div");
        productPriceCol.classList.add("col-sm-2", "text-center", "border-bottom");

        const productPrice = document.createElement("p");
        productPrice.innerHTML = "Prix : " + register.cameraPrice + " €";

        const deleteButtonPriceCol = document.createElement("div");
        deleteButtonPriceCol.classList.add("col-sm-2", "text-center", "border-bottom");

        const deleteButtonPrice = document.createElement("button");
        deleteButtonPrice.classList.add("btn", "btn-warning", "delete-article");
        deleteButtonPrice.id = i++;
        deleteButtonPrice.innerHTML = "Supprimer";

        cartRow.appendChild(descriptionProductCol);
        descriptionProductCol.appendChild(descriptionProduct);
        cartRow.appendChild(productQtyCol);
        productQtyCol.appendChild(productQty);
        cartRow.appendChild(productPriceCol);
        productPriceCol.appendChild(productPrice);
        cartRow.appendChild(deleteButtonPriceCol);
        deleteButtonPriceCol.appendChild(deleteButtonPrice);
    };

    // Création d'une boucle pour sélectionner et supprimer un article du panier
    let deleteAricle = document.getElementsByClassName("delete-article");
    for (let i = 0; i < deleteAricle.length; i++) {
        deleteAricle[i].addEventListener("click", function(event) {
            event.preventDefault();

            // Récupération de l'id de l'article
            let id = this.closest(".delete-article").id;

            // Suppression de l'article
            registerCamera.splice(id, 1);

            // Enregistrement de la suppression dans le local storage
            localStorage.setItem("newArticle", JSON.stringify(registerCamera));
            JSON.parse(localStorage.getItem("newArticle"));
            alert("Article supprimer du panier !")

            // Retour page d'acceuil
            window.location.href = "panier.html";
        });
    };
    
    // Création d'un tableau pour stocker les prix de chaque article
    let priceArticle = []
    for (register of registerCamera) {
        let oneArticle = register.cameraPrice;
        priceArticle.push(oneArticle);
    };

    // Calcul de la valeur total du tableau
    const reductive = (cumulative, currentPrice) => cumulative + currentPrice;
    const totalValue = priceArticle.reduce(reductive, 0);

    // Inserstion du montant total dans la page
    const totalCartValueCol = document.createElement("div");
    totalCartValueCol.classList.add("col-sm-12", "text-center");

    const totalCartValue = document.createElement("h3");
    totalCartValue.classList.add("mt-4")
    totalCartValue.innerHTML = "Montant total de votre commande est de " + totalValue + " €";

    cartRow.appendChild(totalCartValueCol);
    totalCartValueCol.appendChild(totalCartValue);

    // Création du bouton pour mettre tout le panier à la poubelle$
    const deleteAllCartRow = document.createElement("div");
    deleteAllCartRow.classList.add("row","mb-4");

    const deleteAllCartCol = document.createElement("div");
    deleteAllCartCol.classList.add("col-sm-12", "text-center");

    const deleteAllCartButton = document.createElement("button");
    deleteAllCartButton.classList.add("btn", "btn-danger");
    deleteAllCartButton.innerHTML = "Vider le panier";

    getElement.appendChild(deleteAllCartRow);
    deleteAllCartRow.appendChild(deleteAllCartCol);
    deleteAllCartCol.appendChild(deleteAllCartButton);

    // Fonction pour supprimer le panier
    deleteAllCartButton.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.removeItem("newArticle");
        alert("Le panier a été vidé !");
        window.location.href = "panier.html";
    });

    // Verification des données du formaulaire
    let buttonConfirm = document.getElementById("buttonConfirm");

    let prenom = document.getElementById("firstName");
    let nom = document.getElementById("lastName");
    let adresse = document.getElementById("adress");
    let ville = document.getElementById("city");
    let email = document.getElementById("email");

    // Regex
    let validFullNameTownTest = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let validAdressTest = /^[A-Z-a-z-0-9\s]{5,80}$/;
    let validEmailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    buttonConfirm.addEventListener("click", check);

    // Vérification des champs de caractères via regex et envoie du montant total de la commande dans le storage
    function check(event) {
        if (validFullNameTownTest.test(nom.value) == false) {
            event.preventDefault();
            alert("Votre nom à mal été renseigné")
        } else if (validFullNameTownTest.test(prenom.value) == false) {
            event.preventDefault();
            alert("Votre prénom à mal été renseigné")
        } else if (validAdressTest.test(adresse.value) == false) {
            event.preventDefault();
            alert("Votre adresse à mal été renseigné")
        } else if (validFullNameTownTest.test(ville.value) == false) {
            event.preventDefault();
            alert("Votre ville à mal été rensseigné")
        } else if (validEmailTest.test(email.value) == false) {
            event.preventDefault();
            alert("Votre email à mal été renseigné")
        } else {
            event.preventDefault();
            localStorage.setItem('totalValue', totalValue);
            // Création d'un array pour le contact et les produits
            let contact = {
                firstName: nom.value,
                lastName: prenom.value,
                adress: adresse.value,
                city: ville.value,
                email: email.value,
            }

            let products = [];
            //let id = JSON.parse(localStorage.getItem("newArticle"));
            // products.push(id);
            
            for (register of registerCamera) {
                let productsId = register.cameraId;
                products.push(productsId);
            }

            //let orderId = localStorage.setItem("orderData", JSON.stringify(orderId));

            //let valide = {
                //contact,
               // products,
            //}

            // Envoi des données
            fetch ("http://localhost:3000/api/cameras/order", {
                 method: "POST",
                 body: JSON.stringify({contact, products}),
                 mode: 'cors',
                 headers: {
                     "Content-type": "application/json"
                    }
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        localStorage.setItem("orderData", JSON.stringify(data.orderId));
                        window.location.href = "confirmation.html";
                    })
                }
        }
    };