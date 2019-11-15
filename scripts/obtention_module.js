// **************************************************************************************
// Obtention d'un module
// **************************************************************************************
// Ce script permet d'acheter une carte module en dépensant des points de savoir.
//
//              * La carte est masquée au début du jeu
//
//              - Fonction d'achat de module
//                  -> Si le joueur ne possède pas le module
//                      -> Si le joueur a assez de ressources pour l'acheter
//                          -> On affiche la div pour l'achat du module
//                      -> S'il n'a pas assez de ressources,
//                          -> Le tour est fini, on passe au joueur suivant
//                  -> Si le joueur possède déjà le module
//                      -> Le tour est fini, on passe au joueur suivant
//
//              - Fonction d'affichage des données de la carte module
//                      -> Affichage de la div d'achat de module et masquage du plateau,
//                         du menu latéral et des éléments du slider
//                      -> Affichage des données de la carte module
//
//              - Fonction de clic sur "Acheter module"
//              - Fonction pour effacer la fenêtre d'achat de module
//                  -> On masque la carte d'achat de module, puis réaffiche le plateau de jeu,
//                     le menu latéral et les éléments du slider.
//                  -> Le tour est fini, on passe au joueur suivant
//
//              - Fonction qui retourne l'index auquel se trouve une valeur dans un array
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA2a - novembre 2019 - CPNV
// **************************************************************************************


// La carte est masquée au début du jeu
$('#carte_module').css('display','none');

// Fonction d'achat de module
function fnAcheterModule(idCase) {
    caseAchetee = idCase;                   // variable globale, permet de passer l'id de la case en argument
                                            // dans Monopoly.html, lorsqu'on clique sur le bouton "Acheter".

    // Si le joueur ne possède pas le module
    if(joueurs[jActuel].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] === 0)
    {

        // Si le joueur a assez de ressources pour l'acheter
        if(joueurs[jActuel].argent >= acartes[idCase].prix)
        {

            // On affiche la div pour l'achat du module
            fnAfficheAchatModule(idCase);

        // S'il n'a pas assez de ressources
        } else
        {
            // Tour fini, au tour du joueur suivant
            console.log("Tour suivant");
            fnJoueurSuivant();
        }

    // Si le joueur possède déjà le module
    } else
    {
        // Tour fini, au tour du joueur suivant
        console.log("Tour suivant");
        fnJoueurSuivant();
    }
}

// Fonction d'affichage de la fenêtre achat de module
function fnAfficheAchatModule(idCase) {
    // Affichage de la div d'achat de module et masquage du plateau, du menu latéral et des éléments du slider
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('label[for="vitesseAnimSliderValue"]').css('display', 'none');
    $('label[for="vitesseAnimSlider"]').css('display', 'none');
    $('#vitesseAnimSlider').css('display', 'none');
    $('#carte_module').css('display', 'block');

    // Affichage des données de la carte module
    $('#titre_module').html("Achat d'un module " + acartes[idCase].titre);
    $('#txt_module').html("Voulez-vous acheter le module " + acartes[idCase].texte + " pour " + acartes[idCase].prix + " ?");
}

// Fonction de clic sur "Acheter module"
function fnClicAcheterModule(idCase) {

    console.log("idAcheteur" + jActuel);
    console.log("idCase" + idCase);

    // On déduit le prix de la carte module de l'argent du joueur
    joueurs[jActuel].argent -= acartes[idCase].prix;
    joueurs[jActuel].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] = 1;
    fnEffacerModule();
}

// Fonction pour effacer la fenêtre d'achat de module
function fnEffacerModule(){

    // On masque la carte d'achat de module, puis réaffiche le plateau de jeu,
    // le menu latéral et les éléments du slider.
    $('#carte_module').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'block');
    $('label[for="vitesseAnimSlider"]').css('display', 'inline-block');
    $('#vitesseAnimSlider').css('display', 'inline-block');
    $('body').css('background-color','purple');

    // Tour fini, au tour du joueur suivant
    console.log("Tour suivant");
    fnJoueurSuivant();
}

// Fonction qui retourne l'index auquel se trouve une valeur dans un array
// Code from Crayon Violent @ https://stackoverflow.com/questions/8313350/javascript-indexof-on-an-array-of-objects
function getIndexOf(a,v) {
    var l = a.length;
    for (var k=0;k<l;k++)
    {
        if (a[k].Nom==v)
        {
            return k;
        }
    }
    return false;
}