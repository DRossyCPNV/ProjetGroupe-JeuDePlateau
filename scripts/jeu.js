//Ce programme va devenir un programme de dessin
//avec des boutons pour dessiner differentes choses

var c = document.getElementById("plateau_jeu");
var ctx = c.getContext("2d");

// Le reste du script ici....
var img = new Image();
img.src = "images/six-faces-de.jpg";

//parametre de dessin
var echelle = 1.7; //pour pouvoir zoomer
var angle = 0;// pour pouvoir tourner
var decx = 400;
var decy = 400; //origine au milieu du plateau de jeu
var tcx = 50;//taille carte en x
var tcy = 100;
const ncartes = 5;//nombre de carte par cote (sans compter les coins)
var acartes = [];

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

    //Si on n'est pas dans la rangee 1, il faut tourner
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
    //Dessine un texte intelligent, dans une couleur donn�e tenant compte du cote et de l'echelle

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
    //Dessine un texte intelligent, dans une couleur donnee tenant compte de l'echelle
    ctx.fillStyle = c;
    ctx.fillText(t, echelle * x, echelle * y);
}

function fnJeu() {
    //Cette fonction dessine le plateau de jeu entier
    ctx.translate(decx, decy); //on place l'origine en decx, decy

    //Dessin du carre (plateau jaune)
    fnRect(-ncartes / 2 * tcx - tcy, -ncartes / 2 * tcx - tcy, 2 * tcy + ncartes * tcx, 2 * tcy + ncartes * tcx, "yellow", "black");

    //Dessin de toutes les cartes
    for (i = 0; i < acartes.length; i++) {
        fnCarte(i);

    }
    ctx.translate(-decx, -decy); //on place l'origine en decx,

}

function fnLancerDe() {
	//Cette fonction va afficher neuf faces du dé au hasard et s'arrêter sur la dixième.
	
	//Crée un tableau pour stocker les nombres
	var tabNombres = new Array();
	
	//Stocke des entiers aléatoires entre une valeur min (incluse)
	//et une valeur max (incluse) dans le tableau
	var min = 1;
	var max = 60;
	tabNombres[0] = Math.floor(Math.random() * (max - min +1)) + min;
	tabNombres[1] = Math.floor(Math.random() * (max - min +1)) + min;
	tabNombres[2] = Math.floor(Math.random() * (max - min +1)) + min;
	tabNombres[3] = Math.floor(Math.random() * (max - min +1)) + min;
	tabNombres[4] = Math.floor(Math.random() * (max - min +1)) + min;
	tabNombres[5] = Math.floor(Math.random() * (max - min +1)) + min;
	var nbChoisi = 0;
	
		for(var i=0; i<tabNombres.length; i++) {
			
			randomNumber = tabNombres[i];
		
				if (randomNumber <= 10) {
					//Dessine l'image déclarée au début du fichier, avec (1) la source, (2,3) les coordonnées x et y du coin haut-gauche, (4,5) la largeur et hauteur, 
					// (6,7) les coordonnées x et y du coin haut-gauche où dessiner l'image sur le canvas, (8,9) la largeur et hauteur voulue.
					// dessine la face "6"
					ctx.drawImage(img, 15, 15, 141, 140, 935, 40, 101, 100);	
					nbChoisi = 6;
			
				} else if (randomNumber > 10 && randomNumber <= 20) {
					// dessine la face "5"
					ctx.drawImage(img, 172, 15, 141, 140, 935, 40, 101, 100);	
					nbChoisi = 5;
				
				} else if (randomNumber > 20 && randomNumber <= 30) {
					// dessine la face "4"
					ctx.drawImage(img, 329, 15, 141, 140, 935, 40, 101, 100);	
					nbChoisi = 4;
				
				} else if (randomNumber > 30 && randomNumber <= 40) {
					// dessine la face "3"
					ctx.drawImage(img, 484, 15, 141, 140, 935, 40, 101, 100);	
					nbChoisi = 3;
			
				} else if (randomNumber > 40 && randomNumber <= 50) {
					// dessine la face "2"
					ctx.drawImage(img, 640, 15, 141, 140, 935, 40, 101, 100);	
					nbChoisi = 2;
				
				
				} else if (randomNumber > 50) {		
					// dessine la face "1"
					ctx.drawImage(img, 796, 15, 141, 140, 935, 40, 101, 100);	
					nbChoisi = 1;
				}
					
		
		}
  
  
	return nbChoisi;
}
		