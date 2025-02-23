// **************************************************************************************
// Code d'affichage d'une carte question
// **************************************************************************************
// Ce script dessine à l'écran une carte avec une question, contenue dans un fichier JSON
// Il vérifie également la réponse sélectionnée.
//
//              * variables globales des paramètres, pour les cartes questions
//              * carte masquée au début du jeu
//              * acquisition des données Json
//              - fonction d'affichage d'une question au joueur passé en paramètre
//                  -> si la défausse est pleine, on la remet en entier dans le tas et on la remet à 0
//                  -> affichage de la div qui contient la question et masquage de tous les autres éléments
//                  -> génération d'un nombre aléatoire
//                  -> affichage des données de la carte question
//                  -> enregistrement de la bonne réponse dans une variable
//                  -> on met la carte piochée dans la défausse
//                  -> on retire la carte piochée du tas (array)
//              - fonction de vérification de la réponse
//                  -> on masque la div contenant la question, puis on réaffiche
//                     le plateau de jeu, le menu latéral et les éléments du slider
//                  -> enregistrement de la réponse du joueur
//                  -> vérification de la réponse donnée par le joueur
//                      -> si la réponse est correcte : le joueur actuel augmente ses ressources,
//                         du montant de points défini dans la variable globale ptsbr
//                      -> sinon : affichage en alert de la bonne réponse
//                          -> Le tour est fini, on passe au joueur suivant
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA2a - novembre 2019 - CPNV
// **************************************************************************************

// La carte est masquée au début du jeu
$('#carte_question').css('display','none');

$.getJSON('donnees/questions.json', function(data) {
    acquestion = data;

    nbcquestion = acquestion.length; // Le nombre de cartes questions
});

function fnAfficheQuestion() {

    // Si la défausse est pleine, on la remet en entier dans le tas et on la remet à 0.
    if (acquestion.length === 0)
    {
        console.log('Remise défausse dans la pioche.');
        for(let i = 0; i < defausse.length; i++)
        {
            acquestion.push(defausse[i]);
        }
        defausse = [];
    }

    // Affichage de la div qui contient la question et masquage de tous les autres éléments.
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('label[for="vitesseAnimSlider"]').css('display', 'none');
    $('#vitesseAnimSlider').css('display', 'none');
    $('#vitesseAnimSliderValue').css('display', 'none');
    $('#carte_question').css('display', 'block');

    // Génération d'un nombre aléatoire
    var nbaleat = Math.floor(Math.random() * acquestion.length); // compris entre 0 et index max
    console.log(nbaleat);

    // Affichage des données de la carte question
    $('#txt_question').html(acquestion[nbaleat].question);
    $('#r1').html(acquestion[nbaleat].r1);
    $('#r2').html(acquestion[nbaleat].r2);
    $('#r3').html(acquestion[nbaleat].r3);
    $('#r4').html(acquestion[nbaleat].r4);

    // On enregistre la bonne réponse dans une variable
    bonneReponse = acquestion[nbaleat].br;
    txtBonneReponse = acquestion[nbaleat][bonneReponse];

    // On met la carte piochée dans la défausse
    defausse.push(acquestion[nbaleat]);

    // On retire la carte piochée du tas (array)
    acquestion.splice(nbaleat, 1);
}

// Fonction de vérification de la réponse
function fnVerifReponseQuestion() {
    // On masque la div contenant la question, puis on réaffiche le plateau de jeu,
    // le menu latéral et les éléments du slider.
    $('#carte_question').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'block');
    $('label[for="vitesseAnimSlider"]').css('display', 'inline-block');
    $('#vitesseAnimSlider').css('display', 'inline-block');
    $('body').css('background-color','purple');

    // On enregistre la réponse du joueur
    jActuelReponse = $("input[name='reponse']:checked");

    // Vérification de la réponse donnée par le joueur
    if (bonneReponse === jActuelReponse.val())
    {
        alert("Bravo ! Vous avez trouvé la bonne réponse.");

        // Le joueur augmente ses ressources, du montant de points
        // défini dans la variable globale ptsbr (PointsBonneRéponse)
        joueurs[jActuel].argent += ptsbr;
        console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" possède maintenant "+joueurs[jActuel].argent+" points.");

        $('#carte_question').css('display','none');
        jActuelReponse.prop("checked", false);

        // Tour fini, au tour du joueur suivant
        console.log("Tour suivant");
        fnJoueurSuivant();
    }
    else
    {
        alert("Mauvaise réponse ! La bonne réponse était : " + txtBonneReponse);
        $('#carte_question').css('display','none');
        jActuelReponse.prop("checked", false);

        // Tour fini, au tour du joueur suivant
        console.log("Tour suivant");
        fnJoueurSuivant();
    }
}

