// ********************************************************************************
// Variables globales à tout le jeu
// ********************************************************************************
// Ce script stocke toutes les variables globales, auxquelles on doit pouvoir accéder en permanence.
//
//             * paths des fichiers
//             * initialisation du canvas
//             * paramètres de dessin
//             * paramètres du plateau
//             * paramètres du dé
//             * paramètres des pions
//             * html
//             * paramètres des points requis pour tenter d'obtenir le cfc
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// *****************************************************************************

// Chargement des fichiers
var img_case_standard = new Image();
img_case_standard.src = ".\\images\\plateau\\Case_Standard.svg";
var img_case_coin = new Image();
img_case_coin.src = ".\\images\\plateau\\Case_Coin.svg";
var img_fond = new Image();
img_fond.src = ".\\images\\plateau\\Fond.svg";
var img_plateau = new Image();
img_plateau.src = "images/plateau/Plateau_avec_WIDTH-HEIGHT.svg";
var img_de = new Image();
img_de.src = "images/six-faces-de.png";

// Initialisation du canvas
var c = document.getElementById("plateau_jeu");
var ctx = c.getContext("2d");

// Paramètres de dessin, affichage et liste des joueurs
var echelle = 1.3; //pour pouvoir zoomer
var angle = 0;// pour pouvoir tourner
const ncartes = 5;//nombre de carte par coté (sans compter les coins)
var joueurs; //tableau des joueurs
const nbJoueursMax = 6;
var acartes = []; //tableau des cartes


// Paramètres du plateau
var tcx = 60 * echelle;
var tcy = 75 * echelle; //taille petite case en x et y
var tcoinxy = 150 * echelle; //Taille case coin (carré)
var tcfcxy = 150 * echelle; //Taille case cfc (carré)
var tplateauxy = 600 * echelle; //Taille du plateau (carré)
var tbplateau = 10; //Espacement bord plateau - Canevas
var decx = tbplateau + (300 * echelle);
var decy = tbplateau + (300 * echelle); //origine au milieu du plateau de jeu
var coordCaseDep = {X: 12 * echelle + tbplateau, Y: 546 * echelle + tbplateau};

// Paramètres du dé
var tabNombres = new Array(); // tableau qui contient les nombres générés aléatoirement
var nbFacesAffichees = 0; // compte le nombre de fois qu'une face de dé est affichée
var resultatDe = 0; // stocke la dernière valeur affichée par le dé, utilisée pour le déplacement des pions.

//Paramètres des pions
var pionw = 12 * echelle;
var pionh = 20 * echelle; //Taille des pions
const couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];
var imgPion = [];

for (var i = 0; i < nbJoueursMax; i++){
    imgPion[i] = new Image();
    imgPion[i].src = "images/pions/" + couleursPions[i] + ".png";
}

// Html
var vitesseAnimSlider = document.getElementById('vitesseAnimSlider');
var dureeDeplacementMS;

// Paramètres des points requis pour tenter d'obtenir le cfc
const ptsCFC = 1000;
var conditionCFC = false;

var creerDiv;
