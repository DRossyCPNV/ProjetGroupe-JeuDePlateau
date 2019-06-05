/*eslint-env browser*/

//en fonction du tour changer le background joueur
//en fonction du tour changer afficher le bouton lancer dé
function afficherMenuIndications(){
    //Récupère le nombre de joueurs
    var nbJoueurs = document.getElementById('nbJoueurs').value;
    
    //Crée le tableau contenant les points des joueurs
    var pointsSavoirJoueurs = new Array(nbJoueurs);
    
    //Initialise le tableau contenant les points des joueurs
    for (var i = 0; i < nbJoueurs; ++i){
        pointsSavoirJoueurs[i] = 10;
    }
    
    //Affiche et actualise les scores toutes les 500 milisecondes
    setInterval(creerDivJoueurs(nbJoueurs, pointsSavoirJoueurs), 500);
}

function creerDivJoueurs(nbJoueurs, pointsSavoirJoueurs) {
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
                            + '</div>' + '\n'
                            //Div affichant les points de savoir du joueur
                            + '<div class="menu_indications_joueur_pointsSavoir">' + '\n'
                            + 'Points de savoir : ' + pointsSavoirJoueurs[i] + '\n'
                            + '</div>' + '\n'
                            //Div affichant (ou pas) le bouton pour lancer le dé
                            + '<div class="menu_indications_joueur_boutons">' + '\n'
                            + '<input type="button" value="Lancer le dé" class="menu_indications_bouton_lancer">' + '\n'
                            + '</div>' + '\n'
                        + '</div>' + '\n';
    }

    //Insérer des divs joueurs dans le code HTML
    document.getElementById('menu_indications_joueurs').innerHTML = divJoueurs;
}