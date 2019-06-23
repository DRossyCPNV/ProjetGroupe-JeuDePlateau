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
var joueurAchetant;
var caseAchetee;

function fnAcheterModule(idAcheteur, idCase) {
    joueurAchetant = idAcheteur;
    caseAchetee = idCase;

    //Si le joueur ne possède pas le module
    if(joueurs[idAcheteur].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] == 0){
        //On vérifie s'il a assez de ressources pour l'acheter
        if(joueurs[idAcheteur].argent >= acartes[idCase].prix){
            //On affiche la div pour l'achat du module
            fnAfficheAchatModule(idAcheteur, idCase);
        }
    }
}

function fnAfficheAchatModule(idAcheteur, idCase) {
    //Affichage de la div
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('#carte_module').css('display', 'block');

    //Affichage de la carte module
    $('#titre_module').html("Achat d'un module " + acartes[idCase].titre);
    $('#txt_module').html("Voulez-vous acheter le module " + acartes[idCase].texte + " pour " + acartes[idCase].prix + " ?");

    /*
    $("#acheterModule").on("click", function () {
        fnClickAcheterModule(idAcheteur, idCase);
    })

    $("#passerModule").on("click", function () {
        fnEffacerModule();
    })*/
}

function fnEffacerModule(){
    $('#carte_module').css('display', 'none');
    $('#plateau_jeu').css('display','block');
    $('#menu_indications').css('display', 'block');
    $('body').css('background-color','purple');
}

function fnClickAcheterModule(idAcheteur, idCase) {

    console.log("idAcheteur" + idAcheteur);
    console.log("idCase" + idCase)
    var acheteur = joueurs[idAcheteur];

    acheteur.argent -= acartes[idCase].prix;//acartes[joueurs[jActuel].caseActuelle]
    acheteur.modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] = 1;
    fnEffacerModule();
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