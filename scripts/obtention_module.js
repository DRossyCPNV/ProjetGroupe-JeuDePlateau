// **************************************************************************************
// Obtention d'un module
// **************************************************************************************
// Ce script permet d'acheter une carte module en dépensant des points de savoir.
//
//              - Fonction d'achat de module
//              - Fonction d'affichage de la fenêtre achat de module
//              - Fonction effacer fenêtre achat de module
//              - Fonction de clic sur "Acheter module"
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// **************************************************************************************



//La carte est masquée au début du jeu
$('#carte_module').css('display','none');
var caseAchetee;

function fnAcheterModule(idCase) {
    caseAchetee = idCase;

    //Si le joueur ne possède pas le module
    if(joueurs[jActuel].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] === 0){
        //On vérifie s'il a assez de ressources pour l'acheter
        if(joueurs[jActuel].argent >= acartes[idCase].prix){
            //On affiche la div pour l'achat du module
            fnAfficheAchatModule(idAcheteur, idCase);
        }
    }
}

function fnAfficheAchatModule(idAcheteur, idCase) {
    //Affichage de la div et masquage du plateau, du menu latéral et du slider
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('#vitesseAnims').css('display', 'none');
    $('#vitesseAnimSlider').css('display', 'none');
    $('#carte_module').css('display', 'block');

    //Affichage de la carte module
    $('#titre_module').html("Achat d'un module " + acartes[idCase].titre);
    $('#txt_module').html("Voulez-vous acheter le module " + acartes[idCase].texte + " pour " + acartes[idCase].prix + " ?");

}

function fnClickAcheterModule(idAcheteur, idCase) {

    console.log("idAcheteur" + idAcheteur);
    console.log("idCase" + idCase)
    var acheteur = joueurs[idAcheteur];

    // on déduit le prix de la carte module de l'argent du joueur
    acheteur.argent -= acartes[idCase].prix;
    acheteur.modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] = 1;
    fnEffacerModule();
}

function fnEffacerModule(){
    //On affiche le plateau de jeu, le menu latéral et le slider
    $('#carte_module').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'block');
    $('#vitesseAnims').css('display', 'block');
    $('#vitesseAnimSlider').css('display', 'block');
    $('body').css('background-color','purple');
}

//Code from Crayon Violent @ https://stackoverflow.com/questions/8313350/javascript-indexof-on-an-array-of-objects
function getIndexOf(a,v) {
    var l = a.length;
    for (var k=0;k<l;k++) {
        if (a[k].Nom==v) {
            return k;
        }
    }
    return false;
}