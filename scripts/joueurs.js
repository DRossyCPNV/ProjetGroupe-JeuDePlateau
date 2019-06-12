//todo Ajouter les méthodes tirer une carte chance et réussir un exam

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
    this.caseActuelle = 0; //permettra de savoir quel action effectuer grace à l'id des cases, la case 0 est la case départ
    this.emplacementCase = id; //emplacement sera différent car l'id est différent
    this.nbTestReussi = 0;
    this.positionActuelle = this.caseActuelle;


    //méthode pour placer le pion du joueur sur la case départ
    this.placerPionCaseDepart = function () {
        that.caseActuelle = 0;
        that.positionActuelle = that.caseActuelle;
        that.emplacementCase = -1;
        that.emplacementCase = emplacementVideCase(that.caseActuelle);
    };
    //methode qui déplace le pion d'un nombre de case en fonction du dé
    this.deplacerPion = function (de) {
        var depart = that.caseActuelle;
        var arrive = that.caseActuelle + de;


        that.emplacementCase = -1;

        //condition pour que les pions s'arrêtent à chaques coins
        if ((that.caseActuelle + de) > 6 && that.caseActuelle < 6) {
            that.caseActuelle = 6;
            that.positionActuelle = that.caseActuelle;
        } else if ((that.caseActuelle + de) > 12 && that.caseActuelle < 12) {
            that.caseActuelle = 12;
            that.positionActuelle = that.caseActuelle;
        } else if ((that.caseActuelle + de) > 18 && that.caseActuelle < 18) {
            that.caseActuelle = 18;
            that.positionActuelle = that.caseActuelle;
        } else if ((that.caseActuelle + de) >= 24 && that.caseActuelle < 24) {
            //quand le pion arrive à la derniere case, caseActuel est remis à zero
            that.caseActuelle = 0;
            that.positionActuelle = that.caseActuelle;
        } else {
            that.caseActuelle += de;

            //fnDeplacerPionFluidement(depart, arrive, 1, that.id, 50);

            that.positionActuelle = that.caseActuelle;
        }
        that.emplacementCase = emplacementVideCase(that.caseActuelle);


    };
    //methode pour placer le pion sur la case CFC
    this.placerCaseCFC = function () {
        that.caseActuelle = -10;
        that.emplacementCase = -1;
        that.emplacementCase = emplacementVideCase(that.caseActuelle);
    };
}

//fonctions qui donne le nombre de joueur se trouvent sur la case demandé
function nbJoueursCase(caseID) {
    nombreJoueurs = 0;
    for (var i = 0; i < joueurs.length; i++) {
        if (joueurs[i].caseActuelle === caseID) {
            nombreJoueurs++;
        }
    }
    return nombreJoueurs;
}

//fonction qui retourne l'emplacement vide d'une case du plateau
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
        if (tabEmplacement[emplacement] != true) {
            return emplacement;
        }
    }
}
function fnDeplacerPionFluidement(depart, arrive, vitesse, idJoueur, temps){
    vitesse /= 5;

    for(var i = depart; i < arrive; i + vitesse){
        setTimeout(function(){
            console.log("coucou");
            joueurs[idJoueur].positionActuelle = i;
        }, temps);

    }

}
