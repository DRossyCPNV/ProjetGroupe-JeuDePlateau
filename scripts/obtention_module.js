//La carte est masquée au début du jeu
$('#carte_module').css('display','none');

function fnAcheterModule(idAcheteur, idCase) {
    /*
    nous sommes sur d'etre sur une case module
        si le joueur ne possède pas le module alors
            on regarde sil a assez d'argent
                on lui demande sil veut acheter
                    si oui on lui soustrait largent et on ajoute le module
                    sinon rien
            on ne fait rien
        on ne fait rien
     */
    //Si le joueur ne possède pas le module
    if(joueurs[idAcheteur].modulesObtenus[getIndexOf(amodules, acartes[idCase].texte)] == 0){
        //On vérifie s'il a assez de ressources pour l'acheter
        if(joueurs[idAcheteur].argent >= acartes[idCase].prix){
            //On affiche la div pour l'achat du module
            fnAfficheAchatModule(idCase);
        }
    }
}

function fnAfficheAchatModule(idCase) {
    //Affichage de la div
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#carte_module').css('display', 'block');

    //Affichage de la carte module
    $('#titre_module').html("Achat d'un module " + acartes[idCase].titre);
    $('#txt_module').html("Voulez-vous acheter le module " + acartes[idCase].texte + " pour " + acartes[idCase].prix + " ?");
}

function fnEffacerModule(){
    $('#carte_module').css('display', 'none');
    $('#plateau_jeu').css('display','block');
    $('body').css('background-color','purple');
}

function fnClickAcheterModule() {
    var acheteur = joueurs[jActuel];

    acheteur.argent -= acartes[acheteur.caseActuelle].prix;//acartes[joueurs[jActuel].caseActuelle]
    acheteur.modulesObtenus[getIndexOf(amodules, acartes[acheteur.caseActuelle].texte)] = 1;
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