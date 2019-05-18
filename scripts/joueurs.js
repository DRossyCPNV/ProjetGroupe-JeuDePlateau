//les couleurs de pions disponibles
const couleursPions = ["rouge", "bleuClair", "bleuFonce", "orange", "violet", "vert"];

//Function pour crée un tableau objet joueur, n étant le nombre de joueur
function maker(n) {
    var arr = [];
    for(i = 0 ; i<n;i++) {
        var nomJoueur = $("#nomJ" + i).val();
        var sectionJoueur = $("#sectionJ" + i).val();
        arr.push(new Joueur(i, nomJoueur, couleursPions[i], 500, sectionJoueur));
    }
    return arr;
}
//L'objet joueur, contient un id, la couleur de pion, une sommme d'argent de départ, une section
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

    //fonction pour placer le pion du joueur sur la case départ
    this.placerPionCaseDepart = function () {
        //quand l'image a chargée
        imgPion.onload = function () {
            //si on est au 3 eme pion
            if(id > 2){
                // (id - 3) car l'id commence à 0. Cela permettra de décaler le pion de chaque joueurs.
                ctx.drawImage(imgPion, ((that.id - 3)*(15 * echelle)) + coordCaseDep.X, (25 * echelle) + coordCaseDep.Y, 15 * echelle, 25 * echelle);
            }else{
                ctx.drawImage(imgPion, ((that.id)*(15 * echelle)) + coordCaseDep.X, coordCaseDep.Y, 15 * echelle, 25 * echelle);
            }
        }

    };
    this.deplacerPion = function(de){
        caseActuel += de;

    };
}
