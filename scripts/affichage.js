// *****************************************************************************
// Fonctions de jeu courantes
// *****************************************************************************
//              - lancement de la fonction principale du jeu, dans gameloop.js,
//                avec un nombre de joueurs en argument
//              - chargement des données depuis cases.json
//              - effacement de tout le canvas
//              - écriture de texte avancée
//              - lancer de dé, tirage de 6 nombres au hasard
//              - animations des pions
//              - affichage de texte amélioré
//              - affichage d'une des 6 faces du dé

// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// *****************************************************************************


//Elements html
$("#btnPlay").click(function () {
    var nbJoueurs = $("#nbJoueurs").val();
    console.log("Il y a " + nbJoueurs + " Joueurs");
    gameloop(nbJoueurs);
});

// Données
$.getJSON('donnees/cases.json', function (data) {
    acartes = data;
});


//Effacement de tout le canvas
function fnEfface() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function fnText(t, x, y, c) {
    //Dessine un texte intelligent, dans une couleur donnée et en tenant compte de l'echelle
    ctx.fillStyle = c;
    ctx.fillText(t, echelle * x, echelle * y);
}

function fnLancerDe() {
    //Cette fonction va tirer 6 nombres au hasard

    //Crée un tableau pour stocker les nombres
    var nbAffiche = 0;

    //Stocke des entiers aléatoires entre une valeur min (incluse)
    //et une valeur max (incluse) dans le tableau
    var min = 0;
    var max = 59;

    for (var i = 0; i < 6; i++) {
        tabNombres[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // timer qui appelle la fonction toutes les 120 milli-secondes, pour l'animation du dé.
    tmrAffiche = setInterval(fnAfficheFaceDe, 120);

    return nbAffiche;
}

function fnAfficheFaceDe() {
    //Cette fonction va afficher une des 6 faces du dé, selon les nombres du tableau choisis au hasard
    randomNumber = tabNombres[nbFacesAffichees];
    var faceDe = Math.floor(randomNumber / 10); //génère un nombre aléatoire entre 0 et 5

    // Cette fonction va afficher une image sur le canvas.
    // param img (1): la source
    // param sx, sy (2,3): les coordonnées x et y du coin haut-gauche à extraire
    // param swidth, sheight (4,5): la largeur et hauteur à extraire
    // param x, y (6,7): les coordonnées x et y du coin haut-gauche où dessiner l'image sur le canvas
    // param width, height (8,9): la largeur et hauteur voulue (agrandit ou réduit l'image)
    ctx.drawImage(img_de, 945 - (155 * (faceDe + 1)), 15, 141, 140, 720 * echelle, 8 * echelle, 90 * echelle, 90 * echelle);

    nbFacesAffichees++;

    if (nbFacesAffichees >= 6) {
        ctx.font = 10 * echelle + "pt Arial";
        resultatDe = faceDe + 1;

        //Remise à zéro du compteur
        nbFacesAffichees = 0;
        clearInterval(tmrAffiche);
    }

}

//Cette fonction réaffiche les pions sur le canvas
function fnAffichePions() {

    for (var i = 0; i < joueurs.length; i++) {

        //Paramètres pions
        var pionxy = [];
        var anglePion = Math.PI/2;
        var jCaseAct = joueurs[i].positionActuelle;

        //On recherche comment et où positionner les pions sur le plateau
        switch (true) {

            case (jCaseAct >= 0 && jCaseAct < 6):

                fnPivotePlateau(decx, decy, anglePion); //On déplace l'origine au centre du plateau et on le pivote
                pionxy = fnGetCoordonnees(joueurs[i].emplacementCase, jCaseAct, 0, coordCaseDep.X, coordCaseDep.Y, tcoinxy, tcx); //On récupère les coordonnées d'affichage du pion
                // On dessine le pion sur le canvas
                // param img (1): la source
                // param x, y (2,3): les coordonnées x et y du coin haut-gauche où dessiner le pion sur le canvas
                // param width, height (4,5): la largeur et hauteur voulue (agrandit ou réduit le pion)
                ctx.drawImage(imgPion[i], pionxy[0], pionxy[1], pionw, pionh);

                fnPivotePlateau(decx, decy, -anglePion); //On repivote le plateau et on remet l'origine en haut à gauche

                break;

            case (jCaseAct >= 6 && jCaseAct < 12):

                fnPivotePlateau(decx, decy, anglePion * 2);
                pionxy = fnGetCoordonnees(joueurs[i].emplacementCase, jCaseAct, 6, coordCaseDep.X, coordCaseDep.Y, tcoinxy, tcx);
                ctx.drawImage(imgPion[i], pionxy[0], pionxy[1], pionw, pionh);
                fnPivotePlateau(decx, decy, -anglePion * 2);

                break;

            case (jCaseAct >= 12 && jCaseAct < 18):

                fnPivotePlateau(decx, decy, anglePion * 3);
                pionxy = fnGetCoordonnees(joueurs[i].emplacementCase, jCaseAct, 12, coordCaseDep.X, coordCaseDep.Y, tcoinxy, tcx);
                ctx.drawImage(imgPion[i], pionxy[0], pionxy[1], pionw, pionh);
                fnPivotePlateau(decx, decy, -anglePion * 3);

                break;

            case (jCaseAct >= 18 && jCaseAct < 24):

                pionxy = fnGetCoordonnees(joueurs[i].emplacementCase, jCaseAct, 18, coordCaseDep.X, coordCaseDep.Y, tcoinxy, tcx);
                ctx.drawImage(imgPion[i], pionxy[0], pionxy[1], pionw, pionh);

                break;
            case (jCaseAct == 24):
                break;
        }
    }
}

/*
function: Cette fonction calcule les coordonnées de l'emplacement des pions en prenant en compte la superposition
param jCaseActuelle: Case sur laquelle se trouve le joueur actuel
param facteurSoustraction: Soustraction au numéro de case actuelle pour afficher correctement les pions (et permettre à la fonction d'être réutilisable. ex: la 6ème, 12ème et 18ème cases redeviennent la case zéro).
param jEmplacementCase: Emplacement occupé sur la case par le joueur actuel
param caseDepartX: Coordonnées X de la case départ
param caseDepartY: Coordonnées Y de la case départ
param caseCoinW: Largeur en pixel d'une case "coin"
param caseW: Largeur en pixel d'une case standard

return pionxy: Tableau contenant les coordonnées X et Y du pion
*/
function fnGetCoordonnees(jEmplacementCase, jCaseActuelle, facteurSoustraction, caseDepartX, caseDepartY, caseCoinW, caseW) {

    jCaseActuelle -= facteurSoustraction;

    var decj = jEmplacementCase * pionw; //Décalage joueur. Cette variable décale les pions afin qu'ils ne se superposent pas sur une même case
    var coordxy = [0, 0];

    //S'il y a plus de trois pions aligné, on crée une deuxième rangée de pions.
    if (jEmplacementCase > 2){
        decj = (jEmplacementCase - 3) * pionw;
        coordxy[0] = caseDepartX + (1 * caseCoinW) + (5 * caseW) + decj - (jCaseActuelle * caseW);
        coordxy[1] = caseDepartY + pionh;
    }
    else{
        coordxy[0] = caseDepartX + (1 * caseCoinW) + (5 * caseW) + decj - (jCaseActuelle * caseW);
        coordxy[1] = caseDepartY;
    }

    return coordxy;
}

//Cette fonction pivote le canvas au coordonnées x;y d'un certain angle
function fnPivotePlateau(x, y, angle) {

    //On met l'origine au milieu du plateau
    ctx.translate(x, y);

    //On fait une rotation
    ctx.rotate(angle);

    //On remet l'origine en haut à gauche
    ctx.translate(-x, -y);

}

