// *****************************************************************************************************
// Code du panneau latéral d'indication des joueurs
// *****************************************************************************************************
// Ce script a pour but d'afficher un panneau latéral sur la droite du plateau
// avec le nom du joueur, sa section, les modules obtenus, ses points de savoir et un emplacement
// pour le bouton "Lancer le dé".
//
//              - Crée le tableau de référence des modules
//              - Affiche le menu des indications.
//                  ->  Récupère le nombre de joueurs.
//                  ->  Affiche et actualise les scores toutes les secondes.
//              - Crée les Div des joueurs, affiche et actualise les scores toutes les secondes.
//                  -> Affiche le nombre de joueurs dans le menu des indications.
//                  -> Crée les divs en fonction du nombre de joueurs.
//                  -> Boucle parcourant tous les joueurs.
//                      -> Définit la section de chaque joueur
//                      -> Affiche les boutons "Lancer le dé" et "Passer le CFC" dans la div du
//                         joueur actuel, si le tour de jeu vient de finir et qu'il n'a pas encore cliqué dessus.
//                          -> Lorsqu'on clique sur "Lancer le dé", le bouton se masque, le tour de jeu commence
//                             et le dé est lancé.
//                             On attend qu'il aie fini de tourner, puis on appelle la fonction qui gère le tour du joueur.
//                          -> Si les conditions sont remplies, le bouton "Passer le CFC" s'affiche.
//                             -> Lorsqu'on clique sur "Passer le CFC", le bouton se masque et la fonction de passage
//                                du CFC se lance.
//                      -> Si le tour est en cours ou que c'est la div des autres joueurs,
//                         on désactive les deux boutons "Lancer le dé" et "Passer le CFC".
//                      -> Affiche le pion duquel c'est le tour.
//                      -> Affiche les modules détenus par le joueur.
//                      -> Boucle parcourant tous les modules détenus.
//                      -> Construction dynamique des Div des joueurs.
//                          -> Div du joueur
//                          -> Div contenant les informations relatives au joueur
//                          -> Div contenant le nom du joueur
//                          -> Div affichant (ou pas) le pion du joueur actuel si c'est son tour de jouer
//                             ainsi que la protection si elle a été activée.
//                          -> Div contenant la section du joueur
//                          -> Div affichant les modules détenus par le joueur
//                          -> Div affichant les points de savoir du joueur
//                          -> Affichage du bouton "Lancer le dé" et "Passer le CFC"
//                             si c'est son tour de jouer et que les conditions sont remplies.
//                      -> Injection des divs joueurs dans le code HTML.
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA2a - novembre 2019 - CPNV
// **************************************************************************************

// Crée le tableau de référence des modules
var amodules = [];
$.getJSON('donnees/modules.json', function(data) {
    amodules = data;
});

// Affiche le menu des indications.
function fnAfficherMenuIndications(){
    $('#game').css('display', 'block');
    // Récupère le nombre de joueurs
    var nbJoueurs = document.getElementById('nbJoueurs').value;

    fnCreerDivJoueurs(nbJoueurs);
}

// Crée les Div des joueurs
function fnCreerDivJoueurs(nbJoueurs) {

    // Affiche et actualise les scores toutes les secondes.
    creerDiv = setInterval(function(){

    var boutonAffiche = "";

    // Affiche le nombre de joueurs dans le menu des indications.
    document.getElementById('menu_indications_tours').innerHTML = 'Nombre de joueurs : ' + nbJoueurs;

    // Crée les divs en fonction du nombre de joueurs.
    var divJoueurs = '';

    // Boucle parcourant tous les joueurs.
    for (var i = 0; i < nbJoueurs; ++i)
    {
        // Définit la section de chaque joueur.
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
        
        // Affiche les boutons "Lancer le dé" et "Passer le CFC" dans la div du
        // joueur actuel, si le tour de jeu vient de finir et qu'il n'a pas encore cliqué dessus.
        // Lorsqu'on clique sur "Lancer le dé", le bouton se masque, le tour de jeu commence
        // et le dé est lancé. On attend qu'il aie fini de tourner, puis on appelle la fonction qui gère le tour du joueur.
        // Lorsqu'on clique sur "Passer le CFC", le bouton se masque et la fonction de passage du CFC se lance.
        if (i === jActuel && tourFini === true)
        {
            boutonAffiche =   '<div class="menu_indications_joueur_boutons">' + '\n'
                            + '<input type="button" value="Lancer le dé" class="menu_indications_joueur_boutons_lancer" onclick="$(this).hide(); tourFini = false; fnLancerDe(); fnSleep(1000).then(() => { fnTourJoueur(jActuel); });">' + '\n';

            // Si les trois conditions sont remplies, cette variable vaut "true" et le bouton "Passer le CFC" s'affiche.
            if(conditionCFC)
            {
                boutonAffiche += '<input type="button" value="Passer le CFC" class="btn_cfc menu_indications_joueur_boutons_lancer" onclick="$(this).hide(); menu_indications_joueur_boutons_lancer.hide(); fnPasserCFC(jActuel);">' +'\n' + '</div>' + '\n';
            }
            else
            {
                boutonAffiche+= '</div>' + '\n';
            }
        }
        else
        {
            // Si le tour est en cours ou que c'est la div des autres joueurs,
            // on désactive les deux boutons "Lancer le dé" et "Passer le CFC".
            boutonAffiche = "";
        }

        var pionAffiche = '';

        // Affiche le pion duquel c'est le tour.
        if (i === jActuel)
        {
            if (joueurs[jActuel].protection === 1)
            {
                pionAffiche = '<img class="menu_indications_joueur_pion" src="images/pions/' + couleursPions[i] + '_protection' + '.png" alt="rappel du pion du joueur actuel, avec protection">' + '\n';
            }
            else
            {
                pionAffiche = '<img class="menu_indications_joueur_pion" src="images/pions/' + couleursPions[i] + '.png" alt="rappel du pion du joueur actuel">' + '\n';
            }

        } else
        {
            pionAffiche = '\n';
        }

        // Affiche les modules détenus par le joueur.
        var modulesAffiches = "";

        // Boucle parcourant tous les modules détenus.
        for(var j = 0; j < amodules.length; ++j)
        {
            if(joueurs[i].modulesObtenus[j] === 1)
            {
                modulesAffiches += '<img src="images/modules/' + amodules[j].Nom + '.svg" style="margin: 2px; width: 20%" alt="modules détenus">' + '\n';
            }
        }

        // Construction dynamique des Div des joueurs.
        divJoueurs +=   // Div du joueur
                        '<div id="menu_indications_nomJ' + i + '" class="menu_indications_joueur">' + '\n'

                            // Div contenant les informations relatives au joueur
                            + '<div class="menu_indications_joueur_informations">' + '\n'

                                // Div contenant le nom du joueur
                                + '<div class="menu_indications_joueur_nom">' + '\n'
                                + document.getElementById('nomJ' + i).value
                                + '</div>' + '\n'

                                // Div affichant (ou pas) le pion du joueur actuel si c'est son tour de jouer
                                // ainsi que la protection si elle a été activée.
                                + '<div class="menu_indications_joueur_pion">' + '\n'
                                + pionAffiche + '\n'
                                + '</div>' + '\n'

                                // Div contenant la section du joueur
                                + '<div class="menu_indications_joueur_section ' + couleur_section + '">' + '\n'
                                + document.getElementById('sectionJ' + i).value
                                + '</div>' + '\n'
                            + '</div>' + '\n'

                            // Div affichant les modules détenus par le joueur
                            + '<div class="menu_indications_joueur_modules">' + '\n'
                            + 'Modules' + '\n'
                                + '<div class="menu_indications_joueur_modules_affiches">' + '\n'
                                + modulesAffiches
                                + '</div>' + '\n'
                            + '</div>' + '\n'

                            // Div affichant les points de savoir du joueur
                            + '<div class="menu_indications_joueur_points">' + '\n'
                            + 'Points de savoir : ' + joueurs[i].argent
                            + '</div>' + '\n'

                            // Affichage du bouton "Lancer le dé" et "Passer le CFC"
                            // si c'est son tour de jouer et que les conditions sont remplies.
                            + boutonAffiche
                        + '</div>' + '\n';
    }

    // Injection des divs joueurs dans le code HTML
    document.getElementById('menu_indications_joueurs').innerHTML = divJoueurs;
    }, 1000);
}