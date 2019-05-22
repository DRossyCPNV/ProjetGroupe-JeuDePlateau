//todo Ajouter les méthodes tirer une carte chance et réussir un exam
//les couleurs de pions disponibles
const couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];

//Function pour crée un tableau objet joueur, n étant le nombre de joueur
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
    this.caseActuelle = 0; //permettra de savoir quel action effectuer grace à l'id des cases, la case 0 est la case départ
    this.emplacementCase = -1;

    var cordX = 0, cordY = 0;
    var imgPion = new Image();
    imgPion.src = "images/pions/" + couleur + ".png";

    //fonction pour placer le pion du joueur sur la case départ
    this.placerPionCaseDepart = function () {
        that.caseActuelle = 0;
        that.emplacementCase = emplacementVideCase(that.caseActuelle);
        //Par la suite le dessin sera géré par une autre fonction.
        //quand l'image a chargée
        imgPion.onload = function () {
            //si on est au 3 eme pion
            if (id > 2) {
                // (id - 3) car l'id commence à 0. Cela permettra de décaler le pion de chaque joueurs.
                ctx.drawImage(imgPion, ((that.id - 3) * (15 * echelle)) + coordCaseDep.X, (25 * echelle) + coordCaseDep.Y, 15 * echelle, 25 * echelle);
            } else {
                ctx.drawImage(imgPion, ((that.id) * (15 * echelle)) + coordCaseDep.X, coordCaseDep.Y, 15 * echelle, 25 * echelle);
            }
            console.log("je dessine les pions");
        }

    };
    //methode qui déplace le pion d'un nombre de case en fonction du dé
    this.deplacerPion = function (de) {
        that.caseActuelle += de;
        that.emplacementCase = emplacementVideCase(that.caseActuelle);


    };
    //methode pour placer le pion sur la case CFC
    this.placerCaseCFC = function () {
        that.caseActuelle
        that.emplacementCase = emplacementVideCase(that.caseActuelle);
    };
}

//fonctions qui donne le nombre de joueur se trouvent sur la case demandé
function nbJoueursCase(caseID) {
    nombreJoueurs = 0;
    for (var i = 0; i < nbJoueurJouant; i++) {
        if (joueurs[i].caseActuelle == caseID) {
            nombreJoueurs++;
        }
    }
    return nombreJoueurs;
}

//fonction qui retourne l'emplacement vide d'une case du plateau
function emplacementVideCase(caseID) {
    //ce tableau sera rempli a true pour les valeurs déjà prise
    var tabEmplacement = new Array(nbJoueursMax).fill(false);
    for (var i = 0; i < nbJoueurJouant; i++) {
        if (joueurs[i].caseActuelle == caseID) {
            if (joueurs[i].emplacementCase < nbJoueursMax || joueurs[i].emplacementCase > -1) {
                tabEmplacement[joueurs[i].emplacementCase] = true;
            }
        }
    }
    //quitte la boucle au premier emplacement vide
    for (var emplacement = 0; emplacement < nbJoueursCase(); emplacement++) {
        if (tabEmplacement[emplacement] == false) {
            return emplacement;
        }
    }
}
