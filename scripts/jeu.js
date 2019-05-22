//todo ajouter une fonction qui s'occupera juste d'afficher les élément dans le canvas. Toute les position sont calculées ailleurs.

//element html
$("#btnPlay").click(function () {
    var nbJoueurs = $("#nbJoueurs").val();
    console.log(nbJoueurs);
    fnJeu(nbJoueurs);
});

//Ce programme va devenir un programme de dessin
//avec des boutons pour dessiner diff�rentes choses

var c = document.getElementById("plateau_jeu");
var ctx = c.getContext("2d");

// Le reste du script ici....
var img = new Image();

//param�tre de dessin
var echelle = 1.7; //pour pouvoir zoomer
var angle = 0;// pour pouvoir tourner
var decx = 400;
var decy = 400; //origine au milieu du plateau de jeu
var tcx = 50;//taille carte en x
var tcy = 100;
const ncartes = 5;//nombre de carte par cot� (sans compter les coins)
var joueurs;
const nbJoueursMax = 6;
var nbJoueurJouant = 0;
var acartes = [];
var coordCaseDep = {
    X: 15,
    Y: 385,
};

//Donn�es
$.getJSON('donnees/cases.json', function(data) {
    acartes = data;
});



function fnEfface() {
    //Effacement du canvas

    ctx.clearRect(0, 0, c.width, c.height);

}

function fnCarte(n) {
    //Cette fonction dessine une carte

    //dessin du rectangle autour
    ctx.lineWidth = 2 * echelle;//2 pixels de largeur de trait

    //Si on n'est pas dans la rang�e 1, il faut tourner
    var angle = (acartes[n].cote - 1) * Math.PI / 2;
    ctx.rotate(angle);

    //Dessin du cadre de la carte
    fnRect((ncartes / 2 - acartes[n].ordre) * tcx, ncartes / 2 * tcx, tcx, tcy, "lightgreen", "black");
    //Dessin du haut de la carte
    fnRect((ncartes / 2 - acartes[n].ordre) * tcx, ncartes / 2 * tcx, tcx, tcy * 0.2, acartes[n].couleur, "black");

    //Ecriture
    ctx.textAlign = "center";
    ctx.font = 8 * echelle + "pt Arial";
    fnText(acartes[n].titre, (ncartes / 2 + 0.5 - acartes[n].ordre) * tcx, (ncartes / 2) * tcx + 0.5 * tcy, "black");

    ctx.textAlign = "center";
    ctx.font = 5 * echelle + "pt Arial";
    fnText(acartes[n].texte, (ncartes / 2 + 0.5 - acartes[n].ordre) * tcx, (ncartes / 2) * tcx + 0.5 * tcy + 10, "dimgray");

    //
    ctx.rotate(-angle);

}

function fnRect(x, y, lx, ly, c1, c2) {
    //Cette fonction dessine un rectangle
    //Dessine un texte intelligent, dans une couleur donn�e tenant compte du cot� et de l'�chelle

    if (c1 != 0) {
        ctx.fillStyle = c1;//couleur du trait
        ctx.fillRect(echelle * x, echelle * y, echelle * lx, echelle * ly);
    }
    if (c2 != 0) {
        ctx.strokeStyle = c2;//couleur du trait
        ctx.strokeRect(echelle * x, echelle * y, echelle * lx, echelle * ly);
    }
}

function fnText(t, x, y, c) {
    //Dessine un texte intelligent, dans une couleur donn�e tenant compte de l'�chelle
    ctx.fillStyle = c;
    ctx.fillText(t, echelle * x, echelle * y);
}

function fnJeu(nbJoueurs) {
    nbJoueurJouant = nbJoueurs;
    //Cette fonction dessind le plateau de jeu entier et place les pions en fonction du nombre de joueur
    ctx.translate(decx, decy); //on place l'origine en decx, decy

    //Dessin du carr� (plateau jaune)
    fnRect(-ncartes / 2 * tcx - tcy, -ncartes / 2 * tcx - tcy, 2 * tcy + ncartes * tcx, 2 * tcy + ncartes * tcx, "yellow", "black");

    //Dessin de toutes les cartes
    for (i = 0; i < acartes.length; i++) {
        fnCarte(i);

    }
    ctx.translate(-decx, -decy); //on place l'origine en decx,

    //crée les joueurs en fonction du nombre de joueurs selectionnés dans le menu
    joueurs = maker(nbJoueurs);
    for(var i = 0;i < nbJoueurs;i++){
        console.log("joueur : "+ i +", Nom: "+joueurs[i].nom+", Couleur: "+joueurs[i].couleur+", Section: "+joueurs[i].section);
    }

    for (i = 0; i<nbJoueurs; i++){
        joueurs[i].placerPionCaseDepart();
    }

    joueurs[1].argent = 10;

}

//Cette réaffiche les pions sur le canvas
function fnAffichePions() {


    //Variable de test pour positionner les pions
    joueurs[0].deplacerPion(18);
    joueurs[1].deplacerPion(3);
    joueurs[2].deplacerPion(6);
    joueurs[3].deplacerPion(10);
    joueurs[4].deplacerPion(12);
    joueurs[5].deplacerPion(20);


    for (var i = 0; i < joueurs.length; i++ ) {

        var imgPion = new Image();
        imgPion.src = "images/pions/" + joueurs[i].couleur + ".png";

        var j = joueurs[i].caseActuelle;

        //On fait en sorte que les pions ne puissent pas dépasser la case de départ et qu'il s'y arrêtent obligatoirement
        if (j >= 24) {
            j = 0;
        }

        //Coordonnées des pions
        var pionx;
        var piony;
        var anglePion = Math.PI/2;

        switch (true) {

            case (j == 0):

                fnPivotePlateau(decx, decy, anglePion);

                pionx = coordCaseDep.X + 7 * tcx;
                piony = coordCaseDep.Y;
                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                fnPivotePlateau(decx, decy, -anglePion);

                break;

            case (j > 0 && j < 6):


                fnPivotePlateau(decx, decy, anglePion);

                pionx = coordCaseDep.X + (6 * tcx) - (j - 1) * tcx;
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                fnPivotePlateau(decx, decy, -anglePion);

                break;

            case (j == 6):

                fnPivotePlateau(decx, decy, anglePion * 2);

                pionx = coordCaseDep.X + 7 * tcx; //On avance de 6 cases par côté. Une case coin vaut 2 cases modules. On déplace donc le pion de 7 cases
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                fnPivotePlateau(decx, decy, -anglePion * 2);

                break;

            case (j > 6 && j < 12):

                fnPivotePlateau(decx, decy, anglePion * 2);

                pionx = coordCaseDep.X + 7 * tcx - (j - 6) * tcx; //On déplace le pion de 7 cases modules (on le met dans le coin en bout de ligne) puis on soustrait sa position actuelle au nombre de cases totale en bout de ligne....... ZE COMMENT PAS CLAIR
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                fnPivotePlateau(decx, decy, -anglePion * 2);

                break;

            case (j == 12):

                fnPivotePlateau(decx, decy, anglePion * 3);

                pionx = coordCaseDep.X + 7 * tcx;
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                fnPivotePlateau(decx, decy, -anglePion * 3);

                break;

            case (j > 12 && j < 18):

                fnPivotePlateau(decx, decy, anglePion * 3);

                pionx = coordCaseDep.X + 7 * tcx - (j - 12) * tcx;
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                fnPivotePlateau(decx, decy, -anglePion * 3);

                break;

            case (j == 18):

                pionx = coordCaseDep.X + 7 * tcx;
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                break;

            case (j > 18 && j < 24):

                pionx = coordCaseDep.X + 7 * tcx - (j - 18) * tcx;
                piony = coordCaseDep.Y;

                ctx.drawImage(imgPion, pionx * echelle, piony * echelle, 15 * echelle, 25 * echelle);

                break;
        }
    }
}

//Cette fonction pivote le canvas au coordonnées x;y d'un certaint angle
function fnPivotePlateau(x, y, angle) {

    //On met l'origine au milieu du plateau
    ctx.translate(x, y);

    //On fait une rotation
    ctx.rotate(angle);

    //On remet l'origine en haut à gauche
    ctx.translate(-x, -y);

}


	