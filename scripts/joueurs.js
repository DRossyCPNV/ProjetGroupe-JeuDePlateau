// ********************************************************************************
// Création des joueurs, attribution de leurs paramètres et déplacements des pions
// ********************************************************************************
// Ce script a pour but de créer des objets joueur, leur attribuer des paramètres,
// et gérer le déplacement des pions en les animant à la vitesse définie par le slider sur Monopoly_base.html.
//
//              - fonction pour créer un tableau objet joueur
//              - attribution des paramètres à l'objet joueur
//              -> méthode pour placer un pion sur la case départ
//              -> méthode pour un déplacement du pion en fonction du résultat du dé
//              -> méthode pour placer le pion sur la case CFC
//              - fonction qui donne le nombre de joueur se trouvant sur la case passée en paramètre
//              - fonction qui retourne l'emplacement vide d'une case du plateau
//              - fonction qui déplace le pion fluidement
//              - fonction qui déplace le pion fluidement jusqu'à un emplacement vide d'une case
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// *****************************************************************************

//Fonction pour créer un tableau objet joueur, n étant le nombre de joueurs
function maker(n) {
    var arr = [];
    for (i = 0; i < n; i++) {
        var nomJoueur = $("#nomJ" + i).val();
        var sectionJoueur = $("#sectionJ" + i).val();
        arr.push(new Joueur(i, nomJoueur, couleursPions[i], 500, sectionJoueur));
    }
    return arr;
}

//L'objet joueur, contient un id, la couleur de pion, une sommme d'argent de départ et une section
function Joueur(id, nom, couleur, argent_depart, section) {
    var that = this;
    this.id = id;
    this.nom = nom;
    this.couleur = couleur;
    this.argent = argent_depart;
    this.section = section;
    this.caseActuelle = 0;   // permettra de savoir quel action effectuer grace à l'id des cases, la case 0 est la case départ
    this.emplacementCase = id; // l'emplacement sera différent car l'id est différent
    this.nbTestReussi = 0;
    this.positionActuelle = this.caseActuelle;
    this.passeTour = 0;
    this.protection = 0;
    this.modulesObtenus = new Array(amodules.length).fill(0); //1 = vrai / 0 = faux


    // méthode pour placer le pion du joueur sur la case départ
    this.placerPionCaseDepart = function () {
        that.caseActuelle = 0;
        that.positionActuelle = that.caseActuelle;
        that.emplacementCase = -1;
        that.emplacementCase = emplacementVideCase(that.caseActuelle);
    };
    // methode qui déplace le pion d'un nombre de case en fonction du dé
    this.deplacerPion = function (de) {
        var caseDepart = that.caseActuelle;
        var caseArrive = that.caseActuelle + de;
        var deplacement = vitesseAnimSlider.value / 100; //deplacement en pourcent d'une case: 1 = 100% 0 = 0%, la vitesse peut-être modifié à l'aide d'un slider
        var tempsInterval = 5; //temps en miliseconde entre chaque deplacement
        dureeDeplacementMS  = (caseArrive-caseDepart)/deplacement*tempsInterval;
        that.emplacementCase = -1;

        // condition pour que les pions s'arrêtent à chaques coins
        if ((that.caseActuelle + de) > 6 && that.caseActuelle < 6) {
            that.caseActuelle = 6;
            fnDeplacerPionFluidement(caseDepart, 6, deplacement, that.id, tempsInterval);
            that.positionActuelle = that.caseActuelle;
        } else if ((that.caseActuelle + de) > 12 && that.caseActuelle < 12) {
            that.caseActuelle = 12;
            fnDeplacerPionFluidement(caseDepart, 12, deplacement, that.id, tempsInterval);
            that.positionActuelle = that.caseActuelle;
        } else if ((that.caseActuelle + de) > 18 && that.caseActuelle < 18) {
            that.caseActuelle = 18;
            fnDeplacerPionFluidement(caseDepart, 18, deplacement, that.id, tempsInterval);
            that.positionActuelle = that.caseActuelle;
        } else if ((that.caseActuelle + de) >= 24 && that.caseActuelle < 24) {
            // quand le pion arrive à la derniere case, caseActuelle est remise à zero
            that.caseActuelle = 0;
            fnDeplacerPionFluidement(caseDepart, 23.9, deplacement, that.id, tempsInterval);
            that.positionActuelle = that.caseActuelle;
        } else {
            that.caseActuelle += de;

            fnDeplacerPionFluidement(caseDepart, caseArrive, deplacement, that.id, tempsInterval);

            that.positionActuelle = that.caseActuelle;

        }
        that.emplacementCase = emplacementVideCase(that.caseActuelle);


    };
    // methode pour placer le pion sur la case CFC
    this.placerCaseCFC = function () {
        that.caseActuelle = -10;
        that.emplacementCase = -1;
        that.emplacementCase = emplacementVideCase(that.caseActuelle);
    };
}

// fonction qui donne le nombre de joueur se trouvant sur la case passée en paramètre
function nbJoueursCase(caseID) {
    nombreJoueurs = 0;
    for (var i = 0; i < joueurs.length; i++) {
        if (joueurs[i].caseActuelle === caseID) {
            nombreJoueurs++;
        }
    }
    return nombreJoueurs;
}

// fonction qui retourne l'emplacement vide d'une case du plateau
function emplacementVideCase(caseID) {

    // Crée un nouveau tableau de la taille de joueurs validés.
    // Il sera rempli a true pour les valeurs déjà prise, par défaut il est rempli de false.
    var tabEmplacement = new Array(joueurs.length).fill(false);
    for (var i = 0; i < tabEmplacement.length; i++) {
        if (joueurs[i].caseActuelle === caseID) {

            // Condition pour sélectionner que les joueurs qui se trouvent sur un emplacement entre 0 et 5.
            if (joueurs[i].emplacementCase < joueurs.length || joueurs[i].emplacementCase > -1) {

                // On dit que l'emplacement de la case où est le joueur est occupée.
                tabEmplacement[joueurs[i].emplacementCase] = true;
            }
        }
    }
    // Quitte la boucle et renvoie le premier emplacement disponible.
    for (var emplacement = 0; emplacement < nbJoueursCase(caseID); emplacement++) {
        if (tabEmplacement[emplacement] !== true) {
            return emplacement;
        }
    }
}
// Cette fonction déplace le pion petit à petit jusqu'à la case d'arrivée
function fnDeplacerPionFluidement(caseDepart, caseArrive, vitesse, idJoueur, temps) {
    vitesse /= 5;

    var mouvement = caseDepart;



    var interval = setInterval(function () {
        if(mouvement > caseArrive){
            clearInterval(interval);
        }else{
            mouvement += vitesse;
            joueurs[idJoueur].positionActuelle = mouvement;
        }
    }, temps);

}
