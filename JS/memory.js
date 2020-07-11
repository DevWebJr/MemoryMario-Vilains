var nbImageSelectionne = 0; //contient 0 si aucune image selectionnée, 1 sinon
var img; //image en cours
var imgp; //image precedente
var nbPairTrouvee = 0; //nombre de pair trouvée
var nbClick = 0; //nombre de clic
var zoneMessage = document.getElementById("message");
var zoneNbClick = document.getElementById("nbClick");
var zoneNbPairTrouvee = document.getElementById("nbPair");

function retourne(image, recto) {
    //methode qui affiche une image ou pas en fonction du 2eme argument
    if (recto) {
        image.style.visibility = 'visible';
        image.style.width = '100%';
    } else {
        image.style.visibility = 'hidden';
        image.style.width = '0%';
    }
}

function verifPair(img, imgp) {
    //methode qui verifie si les 2 images passées en argument sont identiques
    if (imgp.src == img.src) {
        //gagné, les images sont identiques
        nbPairTrouvee++;
        //on ne les retourne pas
        //comme seul les cartes partys sont cliquables et quelles ne sont plus affichées, il n'y a rien à faire
    } else {
        //on cache les images cliquées
        setTimeout(function () { //le timeout permet d'attendre avant de réaliser l'action
            retourne(img, false); //on cache l'image
            retourne(img.parentNode.getElementsByClassName("party")[0], true); // on remet la party visible
/*
Pour trouver la party correspondante à l'image, 
on remonte au parent :  img.parentNode
et on cherche l'img de class party : getElementsByClassName("party")
on prend la 1ere occurance : [0]
*/
            retourne(imgp, false); // on cache la 2eme image
            retourne(imgp.parentNode.getElementsByClassName("party")[0], true);// on remet la party visible de la 2eme image

        }, 800);
    }
}

function gestionClick(e) {
    // gère le clic sur une image
    nbImageSelectionne++; // on augmente le nombre d'images selectionnee
    if (nbImageSelectionne <= 2) { //evite de gérer les clics supplementaires
        imageClickee = e.target; //recupere la party cliquée
        // on cherche l'image qui correspond à la party cliquée
        img = imageClickee.parentNode.getElementsByClassName("dessin")[0];
        retourne(imageClickee, false); //on cache la party
        retourne(img, true); //on affiche l'image
        //test si 1er cliquée
        if (nbImageSelectionne == 1) {
            //on met à jour image precedente et on met a jour attente
            imgp = img;
        } else {
            //on compare l'image cliquée avec la precedente
            verifPair(img, imgp);
            nbImageSelectionne -= 2;
            if (nbPairTrouvee == 8) {
                zoneMessage.innerHTML = "Vous avez gagnez";
            }
        }
        nbClick++;
        zoneNbClick.innerHTML = nbClick;
        zoneNbPairTrouvee.innerHTML = nbPairTrouvee;
    }
}

function initgame() {
    // on reinitialise les variables
    nbClick = 0;
    nbPairTrouvee = 0;
    nbImageSelectionne = 0;
    img = null;
    impg = null;
    zoneNbClick.innerHTML = nbClick;
    zoneNbPairTrouvee.innerHTML = nbPairTrouvee;
    zoneMessage.innerHTML = "";
    var images = [];
    //on prepare un tableau avec les numéros des 16 images
    index = 0;
    for (let i = 1; i <= 8; i++) {
        //la clé est un nombre aleatoire pour permettre le tri aleatoire
        images[index++] = i //numero de l'image
        images[index++] = i;
    }
    //on affecte les images aux cases
    var mesImg = document.getElementsByClassName("dessin"); // on recupere toutes les img dessin
    var mespartys = document.getElementsByClassName("party"); // on recupere toutes les img partys
    for (let index = 0; index < 16; index++) {

        console.log(images);
        console.log(images.length);
        //nombre aleatoire       
        alea = Math.ceil(Math.random() * images.length - 1);
        //on affecte une image au hasard
        mesImg[index].src = "../Images/" + images[alea] + ".jpg";
        console.log(alea + "  " + images[alea]);
        //on retire l'image du tableau
        images.splice(alea, 1);
        //on ajoute le listener
        mespartys[index].addEventListener("click",gestionClick);
        // on masque les images (utile pour le reinit)
        retourne(mespartys[index], true);
        retourne(mesImg[index], false)
    }
}

function solution() {
    //permet d'afficher toutes les images et cacher toutes les partys
    var mespartys = document.getElementsByClassName("party");
    for (let i = 0; i < mespartys.length; i++) {
        retourne(mespartys[i], false);
        retourne(mespartys[i].parentNode.getElementsByClassName("dessin")[0], true);

    }
}

//on crée les evenements sur les boutons
document.getElementById("Reinitialiser").addEventListener("click", initgame);
document.getElementById("Solution").addEventListener("click", solution);
//on initialise le jeu
initgame();