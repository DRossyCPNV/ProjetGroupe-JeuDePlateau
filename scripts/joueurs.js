//les couleurs de pions disponibles
const couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];

//Function pour crée un tableau objet joueur
function maker(n) {
    var arr = [];
    for(i = 0 ; i<n;i++) {
        var nomJoueur = $("#nomJ" + i).val();
        var sectionJoueur = $("#sectionJ" + i).val();
        arr.push(new Joueur(i, nomJoueur, couleursPions[i], 500, sectionJoueur));
    }
    return arr;
}

function Joueur(id, nom, couleur, argent_depart, section){
    var that = this;
    this.id = id;
    this.nom = nom;
    this.couleur = couleur;
    this.argent_depart = argent_depart;
    this.section = section;
    this.caseActuel = 0; //permettra de savoir quel action effectuer grace à l'id des cases, la case 0 est la case départ

    var cordX = 0, cordY = 0;
    var imgPion = new Image();
    imgPion.src = "images/pions/" + couleur + ".png";

    this.placerPionCaseDepart = function () {
        imgPion.onload = function () {
            if(id > 2){
                ctx.drawImage(imgPion, ((that.id - 3)*(15 * echelle)) + coordCaseDep.X, (25 * echelle) + coordCaseDep.Y, 15 * echelle, 25 * echelle);// (id) car l'id commence à 0. Cela permettra de décaler le pion de chaque joueurs.
                console.log("un petit modulo est passé");
            }else{
                ctx.drawImage(imgPion, ((that.id)*(15 * echelle)) + coordCaseDep.X, coordCaseDep.Y, 15 * echelle, 25 * echelle);// (id) car l'id commence à 0. Cela permettra de décaler le pion de chaque joueurs.
            }
        }

    };
    this.deplacerPion = function(de){
        caseActuel += de;

    };
}
