// Fonction async pour la récupération des données
const getCameras = async function() {
  try {
    // Création d'une variable await pour attendre la réponse fetch
    let response = await fetch("http://localhost:3000/api/cameras/");
    // Création de la condition si tout c'est bien passé
    if (response.status === 200) {
      let cameras = await response.json();

      for (let camera of cameras) {
        // Appel de l'id
        let container = document.getElementById("getMe");
        // Création de tous les éléments des produits
        
        let column = document.createElement("div");
        column.classList.add("col-12", "col-lg-4", "text-center");

        let card = document.createElement("div");
        card.classList.add("card", "border-dark", "shadow", "mb-3");
        
        let cardImages = document.createElement("img");
        cardImages.classList.add("card-img-top");
        cardImages.setAttribute("src", camera.imageUrl);       
        cardImages.setAttribute("alt", "Image de" + camera.name);
        console.log(cardImages)

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let cardTitle = document.createElement("h3");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = camera.name;

        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerHTML = camera.description;
    
        let productPrice = document.createElement("p");
        productPrice.classList.add("text-right");
        productPrice.innerHTML = camera.price / 100 + " €"; 

        let cardLink = document.createElement("a");
        cardLink.classList.add("btn", "btn-primary", "stretched-link");
        cardLink.textContent = "Voir le produit " + camera.name;
        cardLink.href = "produit.html?id=" + camera._id;

        // Implémentation des éléments
        container.appendChild(column);
        column.appendChild(card);
        card.appendChild(cardImages);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(cardLink);
      }
      // Condition else si erreur
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