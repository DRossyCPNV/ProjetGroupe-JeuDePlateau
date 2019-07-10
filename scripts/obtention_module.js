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
// SI-CA1a - juillet 2019 - CPNV
// **************************************************************************************



//La carte est masquée au début du jeu
$('#carte_module').css('display','none');

function fnAcheterModule(idCase) {
    caseAchetee = idCase;                   // variable globale, permet de passer l'id de la case en argument
                                            // dans Monopoly.html, lorsqu'on clique sur le bouton "Acheter"

    //Si le joueur ne possède pas le module
    if(joueurs[jActuel].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] === 0){

        //Si le joueur a assez de ressources pour l'acheter
        if(joueurs[jActuel].argent >= acartes[idCase].prix){

            //On affiche la div pour l'achat du module
            fnAfficheAchatModule(idCase);

        //S'il n'a pas assez de ressources
        } else {
            joueurSuivant();
        }

    //Si le joueur possède déjà le module
    } else {
        joueurSuivant();
    }
}

function fnAfficheAchatModule(idCase) {
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

function fnClickAcheterModule(idCase) {

    console.log("idAcheteur" + jActuel);
    console.log("idCase" + idCase)

    // on déduit le prix de la carte module de l'argent du joueur
    joueurs[jActuel].argent -= acartes[idCase].prix;
    joueurs[jActuel].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] = 1;
    fnEffacerModule();

}

function fnEffacerModule(){
    //On affiche le plateau de jeu, le menu latéral et le slider
    $('#carte_module').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'block');
    $('#vitesseAnims').css('display', 'inline-block');
    $('#vitesseAnimSlider').css('display', 'inline-block');
    $('body').css('background-color','purple');

    joueurSuivant();                    // fonction définie dans joueur.js

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