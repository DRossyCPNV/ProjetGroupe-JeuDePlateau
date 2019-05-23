//todo ajouter une fonction qui s'occupera juste d'afficher les élément dans le canvas. Toute les position sont calculées ailleurs.
// **************************************************************
// Modulopoly - Gameloop
// JCY, Laurent Barraud, Bastian Chollet, Guillaume Duvoisin,
// Guilain Mbayo, David Rossy & Luca Coduri - SI-CA1a - mai 2019
// **************************************************************

//load files
var img_case_standart = new Image();
img_case_standart.src = ".\\images\\plateau\\Case_Standard.svg";
var img_case_coin = new Image();
img_case_coin.src = ".\\images\\plateau\\Case_Coin.svg";
var img_fond = new Image();
img_fond.src = ".\\images\\plateau\\Fond.svg";
var img_plateau = new Image();
img_plateau.src = "images/plateau/Plateau_avec_WIDTH-HEIGHT.svg";
/////////////

//element html
$("#btnPlay").click(function () {
    var nbJoueurs = $("#nbJoueurs").val();
    console.log(nbJoueurs);
    fnJeu(nbJoueurs);
});

//Ce programme va devenir un programme de dessin
//avec des boutons pour dessiner différentes choses

var c = document.getElementById("plateau_jeu");
var ctx = c.getContext("2d");

// Le reste du script ici....
var img = new Image();
img.src = "images/six-faces-de.jpg";

//paramètre de dessin
var echelle = 1.7; //pour pouvoir zoomer
var angle = 0;// pour pouvoir tourner
var decx = 400;
var decy = 400; //origine au milieu du plateau de jeu
var tcx = 78;//taille carte en x
var tcy = 98;
var tcoinxy = 192;
var tcfcxy = 194;
const ncartes = 5;//nombre de carte par cot� (sans compter les coins)
var joueurs;
const nbJoueursMax = 6;
var nbJoueurJouant = 0;
var acartes = [];
var coordCaseDep = {X: 30,Y: 680};

// parametres du dé
var tabNombres = new Array(); // tableau qui contient les nombres générés aléatoirement
var nbFacesAffichees = 0; // compte le nombre de fois qu'une face de dé est affichée
var resultatDe = 0; // stocke la dernière valeur affichée par le dé, utilisée pour le déplacement des pions.

//Donnees
$.getJSON('donnees/cases.json', function (data) {
    acartes = data;
});



function fnEfface() {
    //Effacement du canvas

    ctx.clearRect(0, 0, c.width, c.height);

}

// function fnCarte(n) {
//
//
//     ctx.lineWidth = 2 * echelle;//2 pixels de largeur de trait
//     var angle = (acartes[n].cote - 1) * Math.PI / 2;
//     ctx.rotate(angle);
//
//     ctx.drawImage(img_case_standart, (ncartes / 2 - acartes[n].ordre) * tcx * echelle, ncartes / 2 * tcx * echelle + 50 , tcx * echelle, tcy * echelle - 50);
//
//     ctx.textAlign = "center";
//     ctx.font = 8 * echelle + "pt Arial";
//     fnText(acartes[n].titre, (ncartes / 2 + 0.5 - acartes[n].ordre) * tcx, (ncartes / 2) * tcx + 0.5 * tcy, "black");
//
//     ctx.textAlign = "center";
//     ctx.font = 5 * echelle + "pt Arial";
//     fnText(acartes[n].texte, (ncartes / 2 + 0.5 - acartes[n].ordre) * tcx, (ncartes / 2) * tcx + 0.5 * tcy + 10, "dimgray");
//
//     ctx.rotate(-angle);
//
// }

//cette fonction dessine les coins du plateau de jeu
// function fnCoin(n) {
//     var angle = (n + 1) * Math.PI / 2;
//     ctx.rotate(angle);
//     ctx.translate(-decx, -decy);
//     ctx.drawImage(img_case_coin, 18 + 7 * tcx * echelle, tcx / 2 * echelle - 25, 2 * tcx * echelle, 2 * tcx * echelle)
//     ctx.translate(decx, decy);
//     ctx.rotate(-angle);
//     console.log("je dessine les coins");
//
// }

function fnRect(x, y, lx, ly, c1, c2) {
    //Cette fonction dessine un rectangle
    //Dessine un texte intelligent, dans une couleur donnée tenant compte du coté et de l'échelle

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
    //Dessine un texte intelligent, dans une couleur donnée tenant compte de l'echelle
    ctx.fillStyle = c;
    ctx.fillText(t, echelle * x, echelle * y);
}

function fnDraw(img, p1, p2, p3, p4, p5, p6, p7, p8)
{
	//Dessine une image intelligente, à l'échelle.

			//Dessine l'image déclarée au début du fichier, avec (1) la source, (2,3) les coordonnées x et y du coin haut-gauche, (4,5) la largeur et hauteur,
		// (6,7) les coordonnées x et y du coin haut-gauche où dessiner l'image sur le canvas, (8,9) la largeur et hauteur voulue.
	ctx.drawImage(img, p1, p2, p3, p4, p5 * echelle, p6 * echelle, p7 * echelle, p8 * echelle);
}


function fnJeu(nbJoueurs) {
    nbJoueurJouant = nbJoueurs;
    //Cette fonction dessind le plateau de jeu entier et place les pions en fonction du nombre de joueur
    ctx.translate(decx, decy); //on place l'origine en decx, decy

    //Dessin du carr� (plateau jaune)
    // fnRect(30 - decx, 30 - decy, 2 * tcy + ncartes * tcx +1, 2 * tcy + ncartes * tcx + 1, "black", "black");
    ctx.strokeWidth = 10;
    ctx.strokeStyle = "black";//couleur du trait
    ctx.strokeRect(16 - decx, 16 - decy, 768, 768);
    ctx.drawImage(img_plateau, 18 - decx, 18 - decy, 765, 765);

    // //Dessin de touts les coins
    // for (i = 0; i < 4; i++) {
    //     fnCoin(i);
    // }


    // //Dessin de toutes les cartes
    // for (i = 0; i < acartes.length; i++) {
    //     fnCarte(i);
    // }
    ctx.translate(-decx, -decy); //on place l'origine en decx,

    //crée les joueurs en fonction du nombre de joueurs selectionnés dans le menu
    joueurs = maker(nbJoueurs);
    for (var i = 0; i < nbJoueurs; i++) {
        console.log("joueur : " + i + ", Nom: " + joueurs[i].nom + ", Couleur: " + joueurs[i].couleur + ", Section: " + joueurs[i].section);
    }

    for (i = 0; i < nbJoueurs; i++) {
        joueurs[i].placerPionCaseDepart();
    }
    console.log(joueurs[1].argent);
    joueurs[1].argent = 10;
    console.log(joueurs[1].argent);

}

function fnLancerDe() {
	//Cette fonction va tirer 6 nombres au hasard

	//Crée un tableau pour stocker les nombres
	var nbAffiche = 0;

	//Stocke des entiers aléatoires entre une valeur min (incluse)
	//et une valeur max (incluse) dans le tableau
	var min = 0;
	var max = 59;

	for(var i=0; i<6; i++) {
		tabNombres[i] = Math.floor(Math.random() * (max - min +1)) + min;
	}

	// timer qui appelle la fonction toutes les 120 milli-secondes, pour l'animation du dé.
	tmrAffiche = setInterval(fnAfficheFaceDe, 120);



	return nbAffiche;
}

function fnAfficheFaceDe() {
	//Cette fonction va afficher une des 6 faces du dé, selon les nombres du tableau choisis au hasard

	randomNumber = tabNombres[nbFacesAffichees];
	var faceDe= Math.floor(randomNumber/10); //génère un nombre aléatoire entre 0 et 5

			//Appelle la fonction qui dessine la face du dé intelligemment, à l'échelle.
			fnDraw(img, 796-(156.2*faceDe), 15, 141, 140, 550, 23, 58, 58);

	nbFacesAffichees++;

		if (nbFacesAffichees >= 6)
		{
			ctx.font = 6 * echelle + "pt Arial";
			resultatDe = faceDe+1;
			fnText("Vous avez fait "+resultatDe+".", 580, 100, "chocolate");

			//Remise à zéro du compteur
			nbFacesAffichees = 0;
			clearInterval(tmrAffiche);
		}

}


