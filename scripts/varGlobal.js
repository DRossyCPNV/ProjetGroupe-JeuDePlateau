//Chargement des fichiers
var img_case_standard = new Image();
img_case_standard.src = ".\\images\\plateau\\Case_Standard.svg";
var img_case_coin = new Image();
img_case_coin.src = ".\\images\\plateau\\Case_Coin.svg";
var img_fond = new Image();
img_fond.src = ".\\images\\plateau\\Fond.svg";
var img_plateau = new Image();
img_plateau.src = "images/plateau/Plateau_avec_WIDTH-HEIGHT.svg";
var img = new Image();
img.src = "images/six-faces-de.jpg";
/////////////



//Initialisation du canvas
var c = document.getElementById("plateau_jeu");
var ctx = c.getContext("2d");




// Le reste du script ici....
var img = new Image();
img.src = "images/six-faces-de.jpg";

//paramètre de dessin
var echelle = 1; //pour pouvoir zoomer
var angle = 0;// pour pouvoir tourner
var decx = 397.5 * echelle;
var decy = 397.5 * echelle; //origine au milieu du plateau de jeu
var tcx = 76;//taille petite case en x
var tcy = 94.5;
var tcoinxy = 189; //Taille case coin (carré)
var tcfcxy = 189; //Taille case cfc (carré)
const ncartes = 5;//nombre de carte par cot� (sans compter les coins)
var joueurs; //tableau des joueurs
const nbJoueursMax = 6;
var acartes = []; //tableau des cartes
var coordCaseDep = {X: 15,Y: 710};

// Parametres du dé
var tabNombres = new Array(); // tableau qui contient les nombres générés aléatoirement
var nbFacesAffichees = 0; // compte le nombre de fois qu'une face de dé est affichée
var resultatDe = 0; // stocke la dernière valeur affichée par le dé, utilisée pour le déplacement des pions.

//Paramètre des pions
const couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];
var imgPion = [];

for (var i = 0; i < nbJoueursMax; i++){
    imgPion[i] = new Image();
    imgPion[i].src = "images/pions/" + couleursPions[i] + ".png";
}

