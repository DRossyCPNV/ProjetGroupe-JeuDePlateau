// *****************************************************************************
// Fonctions d'affichage des éléments du jeu et animation des pions
// *****************************************************************************
//
//              * Lancement de la fonction principale du jeu, dans gameloop.js,
//                avec un nombre de joueurs en argument
//              * chargement des données depuis cases.json
//
//              - Fonction qui dessine le plateau dans le canvas avec, comme paramètres :
//                  (1) l'image du plateau
//                  (2) l'espacement bord-plateau
//                  (3) la taille du plateau dans le canevas (carré).
//			        -> Puis on appelle la fonction qui anime les pions, en les affichant plusieurs fois, définie dans affichage.js.
//                  -> Ensuite la fonction s'appelle elle-même, de façon récursive.
//
//                  -> switch case actuelle du joueur : on recherche comment et où positionner les pions sur le plateau
//                      -> si la case vaut entre 0 et 5 :
//                          -> On déplace l'origine au centre du plateau et on le pivote, selon l'angle du pion.
//                          -> On récupère les coordonnées d'affichage du pion.
//                          -> On dessine le pion sur le canvas (prend 9 paramètres).
//                          -> On repivote le plateau dans l'autre sens et on remet l'origine en haut à gauche.
//
//                      -> si la case vaut entre 6 et 11 :
//                          -> On déplace l'origine au centre du plateau et on le pivote, de deux fois l'angle du pion.
//                          -> On récupère les coordonnées d'affichage du pion.
//                          -> On dessine le pion sur le canvas.
//                          -> On repivote le plateau deux fois dans l'autre sens et on remet l'origine en haut à gauche.
//
//                      -> si la case vaut entre 12 et 17 :
//                          -> On déplace l'origine au centre du plateau et on le pivote, de trois fois l'angle du pion.
//                          -> On récupère les coordonnées d'affichage du pion.
//                          -> On dessine le pion sur le canvas.
//                          -> On repivote le plateau trois fois dans l'autre sens et on remet l'origine en haut à gauche.
//
//                      -> si la case vaut entre 18 et 23 :
//                          -> On récupère les coordonnées d'affichage du pion.
//                          -> On dessine le pion sur le canvas.
//
//              - Fonction qui calcule les coordonnées de l'emplacement des pions, en prenant en compte la superposition (
//              (prend 7 paramètres)
//                  -> Décalage joueur. Cette variable décale les pions, afin qu'ils ne se superposent pas sur une même case.
//                  -> S'il y a plus de trois pions alignés, on crée une deuxième rangée de pions.
//
//              - Fonction qui pivote le canvas aux coordonnées x;y d'un certain angle
//                  -> On met l'origine au milieu du plateau.
//                  -> On fait une rotation de l'angle donné en paramètre.
//                  -> On remet l'origine en haut à gauche.
//
//              - Fonction d'effacement de tout le canvas
//              - Fonction d'écriture de texte avancée
//
//              - Fonction de lancer de dé, avec tirage de 6 nombres au hasard et stockage dans un tableau
//              - Fonction qui affiche les faces du dé, selon les nombres du tableau
//                  -> Méthode qui va afficher une partie de l'image des faces de dé sur le canvas
//                  -> Stockage de la dernière valeur affichée dans une variable globale
//                  -> Remise à zéro du compteur de faces
//
//              - Fonction qui affiche la valeur sélectionnée sur le slider
//
//              - Fonctions pour afficher/masquer l'overlay des règles du jeu
//                  -> afficher/masquer l'overlay des règles du jeu
//                  -> afficher/masquer l'overlay de victoire
//                      -> On recharge la page html, pour pouvoir commencer une nouvelle partie.
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA2a - octobre 2019 - CPNV
// *****************************************************************************


// Eléments Html
// Démarre la gameloop en fixant le nombre de joueurs dans la partie.
$("#btnPlay").click(function () {
    var nbJoueurs = $("#nbJoueurs").val();
    console.log("Il y a " + nbJoueurs + " Joueurs");
    gameloop(nbJoueurs);
});

// Code d'affichage / masquage du menu des joueurs.
$("#btn-start").click(function () {
    $("#cfg-bg").css("visibility","visible").css("opacity","1");
});
$("#croix").click(function () {
    $("#cfg-bg").css("visibility","hidden").css("opacity","0");
});


// Chargement des données des cases.
$.getJSON('donnees/cases.json', function (data) {
    acartes = data;
});

// Fonction d'affichage du plateau.
// Puis on appelle la fonction qui anime les pions, en les affichant plusieurs fois, définie dans affichage.js.
// Ensuite la fonction s'appelle elle-même, de façon récursive.
function draw(){
    ctx.drawImage(img_plateau, tbplateau, tbplateau, tplateauxy, tplateauxy);
    fnAffichePions();
    requestAnimationFrame(draw);
}


// Fonction d'affichage/animation des pions sur le canvas, exécutée en animationFrame dans la fonction draw()
function fnAffichePions() {

    for (var i = 0; i < joueurs.length; i++) {

        // Paramètres des pions
        var pionxy = [];
        var anglePion = Math.PI/2;
        var jCaseAct = joueurs[i].positionActuelle;

        // On recherche comment et où positionner les pions sur le plateau.
        switch (true) {

            case (jCaseAct >= 0 && jCaseAct < 6):

                // On déplace l'origine au centre du plateau et on le pivote de l'angle du pion.
                fnPivotePlateau(decx, decy, anglePion);

                // On récupère les coordonnées d'affichage du pion, en prenant en compte la superposition.
                pionxy = fnGetCoordonnees(joueurs[i].emplacementCase, jCaseAct, 0, coordCaseDep.X, coordCaseDep.Y, tcoinxy, tcx);

                // On dessine le pion sur le canvas, avec comme paramètres :
                // (1) img : la source
                // (2,3) x, y : les coordonnées x et y du coin haut-gauche où dessiner le pion, sur le canvas
                // (4,5) width, height : la largeur et hauteur voulues pour l'afficher
                ctx.drawImage(imgPion[i], pionxy[0], pionxy[1], pionw, pionh);

                // On repivote le plateau dans l'autre sens et on remet l'origine en haut à gauche.
                fnPivotePlateau(decx, decy, -anglePion);

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
            case (jCaseAct === 24):
                break;
        }
    }
}

/*
Fonction qui calcule les coordonnées de l'emplacement des pions, en prenant en compte la superposition,
avec comme paramètres :
(1) jEmplacementCase: Emplacement occupé sur la case par le joueur actuel
(2) jCaseActuelle: Case sur laquelle se trouve le joueur actuel
(3) facteurSoustraction: Soustraction du numéro de case actuelle, pour afficher correctement les pions
et permettre à la fonction d'être réutilisable.
P.ex: la 6ème, 12ème et 18ème cases redeviennent la case zéro.

(4) caseDepartX: Coordonnées X de la case départ.
(5) caseDepartY: Coordonnées Y de la case départ.
(6) caseCoinW: Largeur en pixels d'une case "coin".
(7) caseW: Largeur en pixels d'une case standard.

*/
function fnGetCoordonnees(jEmplacementCase, jCaseActuelle, facteurSoustraction, caseDepartX, caseDepartY, caseCoinW, caseW) {

    jCaseActuelle -= facteurSoustraction;

    // Décalage joueur. Cette variable décale les pions, afin qu'ils ne se superposent pas sur une même case.
    var decj = jEmplacementCase * pionw;
    var coordxy = [0, 0];

    // S'il y a plus de trois pions alignés, on crée une deuxième rangée de pions.
    if (jEmplacementCase > 2){
        decj = (jEmplacementCase - 3) * pionw;
        coordxy[0] = caseDepartX + (1 * caseCoinW) + (5 * caseW) + decj - (jCaseActuelle * caseW);
        coordxy[1] = caseDepartY + pionh;
    }
    else{
        coordxy[0] = caseDepartX + (1 * caseCoinW) + (5 * caseW) + decj - (jCaseActuelle * caseW);
        coordxy[1] = caseDepartY;
    }

    // On retourne un tableau contenant les coordonnées X et Y du pion
    return coordxy;
}

// Fonction qui pivote le canvas aux coordonnées x;y d'un certain angle.
function fnPivotePlateau(x, y, angle) {

    // On met l'origine au milieu du plateau.
    ctx.translate(x, y);

    // On fait une rotation de l'angle donné en paramètre.
    ctx.rotate(angle);

    // On remet l'origine en haut à gauche.
    ctx.translate(-x, -y);

}


// Effacement de tout le canvas.
function fnEfface() {
    ctx.clearRect(0, 0, c.width, c.height);
}

// Dessine un texte intelligent, dans une couleur donnée et en tenant compte de l'echelle.
function fnText(t, x, y, c) {
    ctx.fillStyle = c;
    ctx.fillText(t, echelle * x, echelle * y);
}

// Tire 6 nombres au hasard entre une valeur min (incluse)
// et une valeur max (incluse) et les stocke dans un tableau.
function fnLancerDe() {

    var minRandom = 0;
    var maxRandom = 59;

    for (var i = 0; i < 6; i++) {
        tabNombres[i] = Math.floor(Math.random() * (maxRandom - minRandom + 1)) + minRandom;
    }

    // timer qui appelle la fonction toutes les 120 milli-secondes, pour l'animation du dé.
    tmrAffiche = setInterval(fnAfficheFaceDe, 120);

}

// Affiche une des 6 faces du dé, selon les nombres du tableau.
function fnAfficheFaceDe() {

    var randomNumber = tabNombres[nbFacesAffichees];
    var faceDe = Math.floor(randomNumber / 10); //génère un nombre aléatoire entre 0 et 5

    // Méthode qui va afficher une partie de l'image des faces de dé sur le canvas.
    // param img (1): la source
    // param sx, sy (2,3): les coordonnées x et y du coin haut-gauche à extraire
    // param swidth, sheight (4,5): la largeur et hauteur à extraire
    // param x, y (6,7): les coordonnées x et y du coin haut-gauche où dessiner l'image sur le canvas
    // param width, height (8,9): la largeur et hauteur voulue pour afficher l'image.
    ctx.drawImage(img_de, 945 - (155 * (faceDe + 1)), 15, 141, 140, 720 * echelle, 100 * echelle, 90 * echelle, 90 * echelle);

    nbFacesAffichees++;

    if (nbFacesAffichees >= 6) {
        ctx.font = 10 * echelle + "pt Arial";

        // Stockage de la dernière valeur affichée dans une variable globale.
        resultatDe = faceDe + 1;

        // Remise à zéro du compteur de faces.
        nbFacesAffichees = 0;
        clearInterval(tmrAffiche);
    }

}


// Fonction qui affiche la valeur sélectionnée sur le slider
function fnAfficherValeurSlider (valSlider) {
    document.getElementById("vitesseAnimSliderValue").innerHTML = valSlider - document.getElementById("vitesseAnimSlider").min + 1;
    document.getElementById('vitesseAnimSliderValue').style.opacity = 1;
}


// Fonctions pour afficher/masquer l'overlay des règles du jeu
function overlayReglesOn() {
    document.getElementById("overlayRegles").style.display = "block";
    document.getElementById("overlayReglesText").style.display = "block";
}

function overlayReglesOff() {
    document.getElementById("overlayRegles").style.display = "none";
    document.getElementById("overlayReglesText").style.display = "none";
}

// Fonctions pour afficher/masquer l'overlay de victoire
function overlayVictoireOn() {
    document.getElementById("overlayVictoire").style.display = "block";
    document.getElementById("overlayVictoireText").style.display = "block";
    document.getElementById("img_diploma").style.display = "block";
}

function overlayVictoireOff() {
    document.getElementById("overlayVictoire").style.display = "none";
    document.getElementById("overlayVictoireText").style.display = "none";
    document.getElementById("img_diploma").style.display = "none";

    // On recharge la page html, pour pouvoir commencer une nouvelle partie.
    location.reload();
}
