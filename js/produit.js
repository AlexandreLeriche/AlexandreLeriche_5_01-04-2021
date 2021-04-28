// Const de recherche de l'id dans l'url
const urlSelection = window.location.search;
const urlRecieve = new URLSearchParams (urlSelection);
const id = urlRecieve.get ("id");

// Fonction async pour la récupération des données
const getCameras = async function() {
    try {
        // Création d'une variable await pour attendre la réponse fetch et recupérer l'id
        let response = await fetch ("http://localhost:3000/api/cameras/" + id);
        // Création de la condition si tout c'est bien passé
        if (response.status === 200) {
            let cameras = await response.json();

            // Appel de l'id
            const getId = document.getElementById("getMe");
            // Création du titre du produit
            const titleElement = document.createElement("h1");
            titleElement.classList.add("text-center");
            titleElement.innerHTML = cameras.name;

            getId.appendChild(titleElement);

            // Appel de l'id
            const getId2 = document.getElementById("getMe2");
            // Création des éléments du produits
            let row = document.createElement("div");
            row.classList.add("text-center");

            let column = document.createElement("div");
            column.classList.add();

            let card = document.createElement("div");
            card.classList.add("card", "border-dark", "shadow", "mb-3");

            let cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.setAttribute ("src", cameras.imageUrl);
            cardImage.setAttribute("alt", cameras.name);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let cardTitle = document.createElement("h2");
            cardTitle.classList.add("card-title");
            cardTitle.innerHTML = cameras.name;

            let cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.innerHTML = cameras.description;

            getId2.appendChild(row);
            row.appendChild(column);
            column.appendChild(card);
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            // Création du choix de personalisation

            // Appel de la div
            const getId3 = document.getElementById("getMe3");
            // Création du formulaire de personnalisation
            let row2 = document.createElement("div");
            row2.classList.add("row");

            let column2 = document.createElement("div");
            column2.classList.add("col-12", "col-lg-4");

            const formGroup = document.createElement("div");
            formGroup.classList.add("form-group");

            const label = document.createElement("label");
            label.innerHTML = "Choisissez votre lentille :";

            const select = document.createElement("select");
            select.classList.add("form-control");
            select.setAttribute("name", "lentille pour" + cameras.name);

            // Création d'une boucle pour récupérer les lentilles
            const lentille = cameras.lenses;

            for (i = 0; i < lentille.length; i++) {
                const lentilleOption = document.createElement("option");
                select.appendChild(lentilleOption);
                lentilleOption.innerHTML = lentille [i];
                lentilleOption.setAttribute("value", lentille[i]);
            }

            const totalPrice = document.createElement("div");
            totalPrice.classList.add("col-12", "col-lg-3", "d-flex","align-items-lg-center", "justify-content-center", "mb-lg-0", "mb-3");
            totalPrice.innerHTML = "Prix : " + cameras.price / 100 + " €";

            // Création du bouton ajouter au panier et de l'enregistrement
            const boutonColumn = document.createElement("button");
            boutonColumn.classList.add("btn", "btn-primary", "col-12", "col-lg-3", "d-flex", "align-items-lg-center", "justify-content-center");
            boutonColumn.type = "submit";
            boutonColumn.name = "panier";
            boutonColumn.innerHTML = "Àjouter au panier";

            // Création d'un eventListener pour le clique du bouton panier
            boutonColumn.addEventListener("click", function (back) {
                back.preventDefault();

                // Création des données de l'enregistrement
                let cameraChoice = {
                    cameraName: cameras.name,
                    cameraId: cameras._id,
                    cameraLenses: select.value,
                    cameraPrice: cameras.price / 100,
                    cameraQuantity: 1,
                };

                // Enregistrement des données
                let cameraStorage = JSON.parse(localStorage.getItem("newArticle"));

                if (cameraStorage) {
                    cameraStorage.push(cameraChoice);
                    localStorage.setItem("newArticle", JSON.stringify(cameraStorage));

                    // Création du message pour informer l'user
                    if (window.confirm(cameras.name + " a été ajouté à votre panier. Pour visualisez votre panier, cliquez sur 'OK', sinon cliquez sur 'Annuler' pour revenir à la page d'accueil.")) {
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    cameraStorage = [];
                    cameraStorage.push(cameraChoice);
                    localStorage.setItem("newArticle", JSON.stringify(cameraStorage));

                    if (window.confirm(cameras.name + " a été ajouté à votre panier. Pour visualisez votre panier, cliquez sur 'OK', sinon cliquez sur 'Annuler' pour revenir à la page d'accueil.")) {
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }
            });

            getId3.appendChild(row2);
            row2.appendChild(column2);
            row2.appendChild(totalPrice);
            row2.appendChild(boutonColumn);
            column2.appendChild(formGroup);
            formGroup.appendChild(label);
            formGroup.appendChild(select);

        } else {
            console.error(response.status);
            alert(response.status);
        }
    } catch (error) {
        alert(error);
    }
}
// Fonction de lancement
getCameras();