// Récupération de l'ID de la commande
//let orderId = localStorage.getItem('orderData');

// Récuparation du montant de la commande
//const savePrice = localStorage.getItem("totalValue");

// Récupération des données
//let registerCamera = JSON.parse(localStorage.getItem("newArticle"));

if (localStorage.getItem("orderData") && localStorage.getItem("totalValue") && localStorage.getItem("newArticle")) {
    const savePrice = localStorage.getItem("totalValue");
    const orderId = localStorage.getItem("orderData");
    const registerCamera = JSON.parse(localStorage.getItem("newArticle"));
    //const orderId = orderData.orderId;



// Création des éléments pour le numéro de commande
const getElement1 = document.getElementById("getMe1");

const paragraphOrderId = document.createElement("p");
paragraphOrderId.innerHTML = "Bonjour, nous vous confirmons l'enregistrement de votre commande : " + orderId;

//const uniqueId = document.createElement("p");
//uniqueId.innerHTML += "${orderId}";

getElement1.appendChild(paragraphOrderId);
//paragraphOrderId.appendChild(uniqueId);

// Création des éléments pour le détail de la commande
const getElement2 = document.getElementById("getMe2");

const orderDetailRow = document.createElement("div");
orderDetailRow.classList.add("row", "mt-4");

const orderDetailCol = document.createElement("div");
orderDetailCol.classList.add("col-sm-12", "text-center", "mt-4", "mb-4");

const orderDetailParagraph = document.createElement("p");
orderDetailParagraph.innerHTML = "Voici le détail de votre commande :";

getElement2.appendChild(orderDetailRow);
orderDetailRow.appendChild(orderDetailCol);
orderDetailCol.appendChild(orderDetailParagraph);

// Récupération du détail de la commande
let i = 0;
for (register of registerCamera) {
    
    const productDetailCol = document.createElement("div");
    productDetailCol.classList.add("col-sm-5", "text-center");

    const productDetailParagraph = document.createElement("p");
    productDetailParagraph.innerHTML = register.cameraName + " avec la lentille " + register.cameraLenses;

    const productQuantityCol = document.createElement("div");
    productQuantityCol.classList.add("col-sm-3", "text-center");

    const productQuantityParagraph = document.createElement("p");
    productQuantityParagraph.innerHTML = "Quantité : " + register.cameraQuantity;

    const productPriceCol = document.createElement("div");
    productPriceCol.classList.add("col-sm-4", "text-center");

    const productPriceParagraph = document.createElement("p");
    productPriceParagraph.innerHTML = "Prix : " + register.cameraPrice + " €";

    orderDetailRow.appendChild(productDetailCol);
    productDetailCol.appendChild(productDetailParagraph);
    orderDetailRow.appendChild(productQuantityCol);
    productQuantityCol.appendChild(productQuantityParagraph);
    orderDetailRow.appendChild(productPriceCol);
    productPriceCol.appendChild(productPriceParagraph);
};

// Création du montant total de al commande
const getElement3 = document.getElementById("getMe3");

const totalValue = document.createElement("h3");
totalValue.innerHTML = "Le montant total de votre commande est de " + savePrice + " €";

getElement3.appendChild(totalValue);

// Suppression des données du local storage
localStorage.clear();

}





