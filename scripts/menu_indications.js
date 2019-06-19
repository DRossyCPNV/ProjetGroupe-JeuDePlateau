/*eslint-env browser*/
//Créer le tableau de référence des modules
var amodules = [];
$.getJSON('donnees/modules.json', function(data) {
    amodules = data;
});

function afficherMenuIndications(){
    //Récupère le nombre de joueurs
    var nbJoueurs = document.getElementById('nbJoueurs').value;
    
    //Affiche et actualise les scores toutes les 500 milisecondes
    creerDivJoueurs(nbJoueurs);
}

function creerDivJoueurs(nbJoueurs) {
    creerDiv = setInterval(function(){

    var boutonAffiche = "";
    
    //Afficher le nombre de joueurs dans la menu des indications
    document.getElementById('menu_indications_tours').innerHTML = 'Nombres de joueurs : ' + nbJoueurs;

    //Créer le divs en fonction du nombre de joueurs
    var divJoueurs = '';
    for (var i = 0; i < nbJoueurs; ++i){

        //Définit la section du joueur i
        var couleur_section = 'section_';
        switch(document.getElementById('sectionJ' + i).value){
            case 'Informatique':   couleur_section += 'info';
                                   break;
            case 'Polyméchanique': couleur_section += 'media';
                                   break;
            case 'Médiamaticien':  couleur_section += 'meca';
                                   break;
            default:               couleur_section = '';
                                   break;
        }
        
        //Affiche les boutons dans la div du joueur actuel
        if (i == jActuel){
            boutonAffiche =   '<div class="menu_indications_joueur_boutons">' + '\n'
                            + '<input type="button" value="Lancer le dé" class="menu_indications_bouton_lancer" onclick="tourSuivant()">' + '\n';
                            // + '</div>' + '\n';
            if(conditionCFC){
                boutonAffiche += '<input type="button" value="Passer CFC" class="btn_cfc menu_indications_bouton_lancer" onclick="fnPasserCFC(jActuel)">' +'\n' + '</div>' + '\n';
            }
            else{
                boutonAffiche+= '</div>' + '\n';
            }
        }
        else {
            boutonAffiche = "";
        }

        //Affiche les modules détenus par le joueur
        var modulesAffiches = "";
        for(var j = 0; j < amodules.length; ++j){
            if(joueurs[i].modulesObtenus[j] == 1){
                modulesAffiches += '<img src="images/modules/' + amodules[j].Nom + '.svg" style="margin: 5px;">' + '\n';
            }
        }

        divJoueurs +=   //Div du joueur
                        '<div id="menu_indications_nomJ' + i + '" class="menu_indications_joueur">' + '\n'

                            //Div contenant les informations relatives au joueur
                            + '<div class="menu_indications_joueur_informations">' + '\n'

                                // Div contenant le nom du joueur
                                + '<div class="menu_indications_joueur_nom">' + '\n'
                                + document.getElementById('nomJ' + i).value
                                + '</div>' + '\n'

                                // Div contenant la section du joueur
                                + '<div class="menu_indications_joueur_section ' + couleur_section + '">' + '\n'
                                + document.getElementById('sectionJ' + i).value
                                + '</div>' + '\n'
                            + '</div>' + '\n'

                            //Div affichant les modules détenus par le joueur
                            + '<div class="menu_indications_joueur_modules">' + '\n'
                            + 'Modules' + '\n'
                                + '<div class="menu_indications_joueur_modules_affiches">' + '\n'
                                + modulesAffiches
                                + '</div>' + '\n'
                            + '</div>' + '\n'

                            //Div affichant les points de savoir du joueur
                            + '<div class="menu_indications_joueur_pointsSavoir">' + '\n'
                            + 'Points de savoir : ' + joueurs[i].argent + '\n'
                            + '</div>' + '\n'

                            //Div affichant (ou pas) le bouton pour lancer le dé
                            + boutonAffiche
                        + '</div>' + '\n';
    }

    //Insérer des divs joueurs dans le code HTML
    document.getElementById('menu_indications_joueurs').innerHTML = divJoueurs;
    }, 1000);
}