// ********************************************************************************
// Variables globales à tout le jeu
// ********************************************************************************
// Ce script stocke toutes les variables globales, auxquelles on doit pouvoir accéder en permanence.
//
//             * paths des fichiers
//             * initialisation du canvas
//             * paramètres de dessin, affichage et liste des joueurs
//             * paramètres du plateau
//             * paramètres du dé
//             * paramètres des pions
//             * paramètres du jeu
//             * paramètres des cartes questions
//             * paramètres des cartes chances
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA2a - novembre 2019 - CPNV
// *****************************************************************************

// Chargement des fichiers
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
var echelle = 1.3; // pour pouvoir zoomer
var angle = 0; // pour pouvoir tourner
const ncartes = 5; // nombre de carte par coté (sans compter les coins)
var joueurs; // tableau des joueurs
const nbJoueursMax = 6;
var acartes = []; // tableau des cartes


// Paramètres du plateau
var tcx = 60 * echelle;
var tcy = 75 * echelle; // taille petite case en x et y
var tcoinxy = 150 * echelle; // taille case coin (carré)
var tcfcxy = 150 * echelle; // taille case cfc (carré)
var tplateauxy = 600 * echelle; // taille du plateau (carré)
var tbplateau = 10; // espacement bord plateau - canevas
var decx = tbplateau + (300 * echelle);
var decy = tbplateau + (300 * echelle); // origine au milieu du plateau de jeu
var coordCaseDep = {X: 12 * echelle + tbplateau, Y: 546 * echelle + tbplateau};
var coordCaseCFC = {X: tplateauxy / 2, Y: tplateauxy / 2};

// Paramètres du dé
var tabNombres = []; // tableau qui contient les nombres générés aléatoirement
var nbFacesAffichees = 0; // compte le nombre de fois qu'une face de dé est affichée
var resultatDe = 0; // stocke la dernière valeur affichée par le dé, utilisée pour le déplacement des pions.

// Paramètres des pions
var pionw = 12 * echelle;   // largeur (width) des pions
var pionh = 20 * echelle; // hauteur (height) des pions
const couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];
var imgPion = [];

for (var i = 0; i < nbJoueursMax; i++){
    imgPion[i] = new Image();
    imgPion[i].src = "images/pions/" + couleursPions[i] + ".png";
}

// Paramètres du jeu
const ptsCFC = 1000;                                                                // points requis pour tenter d'obtenir le CFC
var nbCarteObtenue = 0;                                                             // nombre de cartes modules obtenues
var section = false;                                                                // condition d'une carte module de section obtenue
var conditionCFC = false;                                                           // détermine si les conditions pour obtenir le CFC sont remplies
                                                                                    // cela va afficher ou non le bouton "Passer le cfc", selon le code de menu_indications.js
var caseAchetee;                                                                    // stocke l'id de la case que le joueur actuel veut acheter
var jActuel = 0;                                                                    // stocke l'id du joueur dont c'est le tour
var tourFini = true;                                                                // détermine si le tour du joueur actuel est fini
                                                                                    // (initialisée à true, pour pouvoir commencer le premier tour)
var creerDiv;                                                                       // stocke le menu d'indication des joueurs
var vitesseAnimSlider = document.getElementById('vitesseAnimSlider');     // stocke la vitesse d'animation réglée sur le slider
var deplacement = vitesseAnimSlider.value / 100;                                    // déplacement en pourcents d'une case: 1 = 100% 0 = 0%,
                                                                                    // la vitesse peut-être modifiée à l'aide du slider
var dureeDeplacementMS;                                                             // stocke la vitesse d'animation en micro-secondes
var tempsInterval = 5;                                                              // temps en millisecondes entre chaque déplacement

// Paramètres des cartes questions
var acquestion = []; // array carte questions
var defausse = [];  // fait de se débarrasser d'une carte inutile
var jActuelReponse; // la réponse de l'utilisateur
var bonneReponse; // la bonne réponse
var txtBonneReponse; // le texte de la bonne réponse
var nbcquestion; // nombre de cartes questions
var ptsbr = 500; // points attribués pour une bonne réponse

// Paramètres des cartes chance
var achance = [];                                   // stocke l'array des cartes
var nbchance;                                       // stocke le nombre de cartes
var nbaleat;                                        // stocke la carte qui sera tirée au hasard
var nbJoueurs =  document.getElementById("nbJoueurs").value;


