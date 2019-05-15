var couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];

function maker(n) {
    var arr = [];
    for(i = 0 ; i<n;i++) {
        arr.push(new Joueur("test", couleursPions[i], 500, "coucou"));
    }
    return arr;
}

function Joueur(nom, couleur, argent_depart, section){
    this.nom = nom;
    this.couleur = couleur;
    this.argent_depart = argent_depart;
    this.section = section;

    var cordX = coordCaseDep.X, cordY = coordCaseDep.Y;
    var imgPion = new Image();
    imgPion.src = "images/pions/" + couleur + ".png";

    this.placerPionCaseDepart = function () {
        imgPion.onload = function () {
            ctx.drawImage(imgPion, cordX, cordY, 20 * echelle, 35 * echelle);
        }

    };
    this.deplacerPion = function(){

    };
}
