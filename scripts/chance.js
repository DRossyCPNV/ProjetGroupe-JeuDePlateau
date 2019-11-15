// **************************************************************************************
// Code d'affichage des cartes chance et application de leurs effets
// **************************************************************************************//
//
//              * Paramètres des cartes chance
//              * Carte masquée au début du jeu
//              * Acquisition des données Json
//
//              - Fonction d'affichage d'une carte chance au joueur passé en paramètre
//                  -> affichage de la Div
//                  -> génération d'un nombre aléatoire
//                  -> affichage de la carte chance
//              - Fonction qui efface la carte chance et réaffiche le plateau de jeu
//              - Fonction qui efface la carte de choix d'une cible et exécute les effets de la carte
//                  switch sur l'effet, codé dans chances.json :
//
//                      -> POINTS
//                          -> Si l'on donne de l'argent à un autre joueur
//                          -> Si l'on reçoit de l'argent
//                          -> Si l'on reçoit et donne de l'argent
//                              -> Recevoir
//                              -> Choix de la cible à qui donner
//
//                      -> TOURS
//                          -> La prochaine fois que le joueur lance le dé, rien ne se passe et on passe au joueur suivant
//
//                      -> DEPLACEMENT
//                          -> Déplacer le joueur actuel et vérifier les actions qu'il doit effectuer
//                          -> Relance le dé automatiquement
//                          -> Déplace un joueur cible
//
//                      -> PROTECTION
//                          -> Enclencher la protection du joueur pour la prochaine attaque dont il est la cible
//
//                      -> QCM
//                          -> Pose une question au joueur
//
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA2a - novembre 2019 - CPNV
// **************************************************************************************

// La carte est masquée au début du jeu
$('#carte_chance').css('display','none');

$.getJSON('donnees/chances.json', function(data) {
    achance = data;

    // Le nombre de cartes chance disponibles
    nbchance = achance.length;
});

function fnAfficheChance() {
    console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" affiche une carte chance.");

    // Affichage de la div contenant la question chance,
    // masquage du plateau, du menu latéral et des éléments du slider.
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('label[for="vitesseAnimSlider"]').css('display', 'none');
    $('#vitesseAnimSlider').css('display', 'none');
    $('#vitesseAnimSliderValue').css('display', 'none');
    $('#carte_chance').css('display', 'block');

    // Génération d'un nombre aléatoire
    nbaleat = Math.floor(Math.random() * nbchance);

    // Affichage de la carte chance
    $('#titre_chance').html(achance[nbaleat].titre);
    $('#txt_chance').html(achance[nbaleat].texte);
}

// Efface la carte chance et réaffiche le plateau de jeu, le menu latéral et les éléments du slider.
function fnEffaceChance(){
    $('#carte_chance').css('display', 'none');
    $('#plateau_jeu').css('display', 'inline');
    $('#menu_indications').css('display', 'block');
    $('label[for="vitesseAnimSlider"]').css('display', 'inline-block');
    $('#vitesseAnimSlider').css('display', 'inline-block');
    $('body').css('background-color','purple');

    fnExecuteChance();
}


// Exécute les effets de la carte
function fnExecuteChance(){
    console.log("Nombre de joueurs : " +nbJoueurs);
    console.log("Le joueur de couleur " + joueurs[jActuel].couleur + " est le joueur actuel.");
    var nomJoueurs = "";

    switch(achance[nbaleat].effet)
    {

        case 'POINTS':

            switch(achance[nbaleat].valeur_1)
            {

            // Si l'on donne de l'argent à un autre joueur
            case 0:

                // (style de la carte défini dans style.css)
                $('#choix_cible').css('display', 'block');
                $('#titre_cible').html("Choisissez un joueur cible:");

                    for(let i = 0; i < nbJoueurs; i++)
                    {
                        console.log("valeur de I: " +i);
                        if(joueurs[i] !== joueurs[jActuel])
                        {
                            nomJoueurs += "<input type='radio' name='joueur' value='" + joueurs[i].id + "'> <label>" + joueurs[i].nom + "</label><br>";
                        }
                    }
                    nomJoueurs += "<br><br><input type=\"button\" value=\"Choisir\" onclick=\"fnExecuteCibleArgent();\">"
                    $('#form_cibles').html(nomJoueurs);
                    console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" a donné de l'argent.");
            break;

            // Si l'on perd ou reçoit de l'argent
            default:

                if(achance[nbaleat].valeur_2 === 0)
                {

                    // Si le joueur a activé une protection
                    if(joueurs[jActuel].protection == 1 && achance[nbaleat].valeur_1 < 0)
                    {

                        // La protection est utilisée
                        joueurs[jActuel].protection = 0;
                        alert("La protection du joueur de couleur " + joueurs[jActuel].couleur + " a été utilisée.");

                        // Remise de l'image par défaut du pion
                        imgPion[jActuel].src = "images/pions/" + couleursPions[jActuel] + ".png";
                    }

                    // Si le joueur n'a pas de protection activée
                    else
                    {

                        if (achance[nbaleat].valeur_1 < 0 && joueurs[jActuel].argent <= Math.abs(achance[nbaleat].valeur_1))
                        {
                            console.log("Le joueur de couleur " + joueurs[jActuel].couleur + " est à sec !");
                            joueurs[jActuel].argent = 0;
                        }
                        else
                        {
                            joueurs[jActuel].argent += achance[nbaleat].valeur_1;
                        }
                    }
                }

                // Si l'on reçoit et donne de l'argent
                else
                {

                    // partie où l'on reçoit
                    if(achance[nbaleat].valeur_1<0 && joueurs[jActuel].argent <= Math.abs(achance[nbaleat].valeur_1))
                    {
                        console.log("Le joueur de couleur " + joueurs[jActuel].couleur + " est à sec !");
                        joueurs[jActuel].argent = 0;

                    } else
                    {
                        joueurs[jActuel].argent += achance[nbaleat].valeur_1;
                    }

                    // partie choix de la cible
                    $('#choix_cible').css('display', 'block');
                    $('#titre_cible').html("Choisissez un joueur cible :");

                        for(var i = 0; i < nbJoueurs; i++)
                        {
                            if(joueurs[i] !== joueurs[jActuel])
                            {
                                nomJoueurs += "<input type='radio' name='joueur' value='"+ joueurs[i].id +"'> <label>" + joueurs[i].nom + "</label><br>";
                            }
                        }

                    nomJoueurs += "<br><br><input type=\"button\" value=\"Choisir\" onclick=\"fnExecuteCibleArgent();\">"
                    console.log("Choix d'un joueur cible");
                    $('#form_cibles').html(nomJoueurs);
                }

            // Tour fini, au tour du joueur suivant
            console.log("Tour suivant");
            fnJoueurSuivant();
            break;
            }
        break;

        case 'TOURS':
            switch(achance[nbaleat].valeur_1)
            {
                case 1:
                    // La prochaine fois que le joueur lance le dé, rien ne se passe et on passe au joueur suivant.
                    joueurs[jActuel].passeTour = 1;
                    console.log("Passe-tour activé pour le joueur de couleur " + joueurs[jActuel].couleur);

                    // Tour fini, au tour du joueur suivant
                    console.log("Tour suivant");
                    fnJoueurSuivant();
                    break;

                default:
                    break;
            }
        break;

        case 'DEPLACEMENT':
            switch(achance[nbaleat].valeur_1)
            {
                case 0:
                    // Déplace le pion du joueur actuel
                    joueurs[jActuel].deplacerPion((-joueurs[jActuel].caseActuelle+achance[nbaleat].valeur_2));

                    // Vérifie les actions que le joueur doit effectuer
                    fnActionCase(joueurs[jActuel]);
                    break;
                case 1:
                    // Termine le tour pour permettre d'afficher à nouveau le bouton "lancer le dé"
                    // et que le joueur actuel fasse un deuxième tour.
                    tourFini = true;
                    break;

                case 2:
                    // Sélection du joueur cible à déplacer
                    $('#choix_cible').css('display', 'block');
                    $('#titre_cible').html("Choisissez un joueur cible :");

                    for(let i = 0; i < nbJoueurs; i++)
                    {
                        if(joueurs[i] !== joueurs[jActuel])
                        {
                            nomJoueurs += "<input type='radio' name='joueur' value='" + joueurs[i].id + "'> <label>" + joueurs[i].nom + "</label><br>";
                        }
                    }
                    nomJoueurs += "<br><br><input type=\"button\" value=\"Choisir\" onclick=\"fnExecuteCibleDeplacement();\">"
                    $('#form_cibles').html(nomJoueurs);
                    
                    break;
                default:
                    break;
            }
        break;

        case 'PROTECTION':
            switch(achance[nbaleat].valeur_1)
            {
                case 1:
                    // On enclenche la protection du joueur pour la prochaine attaque dont il est la cible
                    joueurs[jActuel].protection = 1;

                    // L'image du pion du joueur actuel est maintenant celle où il est protégé par un casque
                    imgPion[jActuel].src = "images/pions/" + couleursPions[jActuel] + "_protection" + ".png";
                    break;
                default:
                    break;
            }

        // Tour fini, au tour du joueur suivant
        console.log("Tour suivant");
        fnJoueurSuivant();
        break;

        case 'QCM':
            // Poser une question
            fnAfficheQuestion();
            break;
        default:
            break;
    }

}

function fnExecuteCibleArgent () {
    // Efface la div de choix de cible
    $('#choix_cible').css('display', 'none');

    // Si aucune cible n'a été sélectionnée
    if(document.querySelector('input[name="joueur"]:checked') === null)
    {
        console.log("Pas de choix sélectionné");

        // Réaffiche la div de choix de cible
        fnExecuteChance();
    }
    // Applique l'effet au joueur ciblé
    else
    {

        for(let i = 0; i < nbJoueurs; i++)
        {

            if(joueurs[i].id == document.querySelector('input[name="joueur"]:checked').value)
            {

                // Si le joueur a activé une protection
                if(joueurs[i].protection == 1 && achance[nbaleat].valeur_1 < 0)
                {

                    console.log("Le joueur de couleur " + joueurs[jActuel].couleur + " a utilisé sa protection.");
                    joueurs[i].protection = 0;
                }

                // Si le joueur n'a pas de protection activée
                else
                {

                    if (achance[nbaleat].valeur_2 < 0 && joueurs[i].argent <= Math.abs(achance[nbaleat].valeur_2))
                    {
                        joueurs[i].argent = 0;
                        console.log("Le joueur de couleur " + joueurs[jActuel].couleur + " est à sec !");
                    } else
                    {
                        joueurs[i].argent += achance[nbaleat].valeur_2;
                    }
                }
                console.log("Le joueur de couleur "+joueurs[i].couleur+" possède maintenant "+joueurs[i].argent);
            }
        }

        // Tour fini, au tour du joueur suivant
        console.log("Tour suivant");
        fnJoueurSuivant();
    }
}

function fnExecuteCibleDeplacement() {
    // Efface la div de choix de cible
    $('#choix_cible').css('display', 'none');

    // Si aucune cible n'a été sélectionnée
    if(document.querySelector('input[name="joueur"]:checked') === null)
    {
        console.log("Pas de choix sélectioné");
        fnExecuteChance();
    }
    // Applique l'effet au joueur ciblé
    else
    {

        for(let i = 0; i < nbJoueurs; i++)
        {
            if(joueurs[i].id == document.querySelector('input[name="joueur"]:checked').value)
            {
                // Si la destination est la case GO, on déplace le pion dessus
                if(achance[nbaleat].valeur_2 === 0)
                {
                    joueurs[i].deplacerPion(-joueurs[i].caseActuelle);
                }
                // Sinon on déplace le pion du nombre de cases indiquée sur la carte chance
                else
                {
                    joueurs[i].deplacerPion((-joueurs[i].caseActuelle+achance[nbaleat].valeur_2));
                }
            }
        }

        // Tour fini, au tour du joueur suivant
        console.log("Tour suivant");
        fnJoueurSuivant();
    }
}