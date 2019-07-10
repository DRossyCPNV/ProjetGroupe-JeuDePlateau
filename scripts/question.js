// **************************************************************************************
// Code d'affichage d'une carte question
// **************************************************************************************
// Ce script dessine à l'écran une carte avec une question, contenue dans un fichier JSON
// Il vérifie également la réponse sélectionnée.
//
//              * paramètres des cartes questions
//              * carte masquée au début du jeu
//              * acquisition des données Json
//              - fonction d'affichage d'une question au joueur passé en paramètre
//              - fonction de vérification de la réponse
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juillet 2019 - CPNV
// **************************************************************************************


//Paramètres des cartes questions
var acquestion = []; // array carte questions
var defausse = [];  // fait de se débarrasser d'une carte inutile
var jreponse; // la réponse de l'utilisateur
var breponse; // la bonne réponse
var txtbreponse; // le texte de la bonne réponse
var nbcquestion; // nombre de cartes questions
var ptsbr = 500; // points attribué pour une bonne réponse

//La carte est masquée au début du jeu
$('#carte_question').css('display','none');

$.getJSON('donnees/questions.json', function(data) {
    acquestion = data;

    nbcquestion = acquestion.length; //Le nombre de cartes questions
});

function fnAfficheQuestion() {

    //Si la défausse est pleine, on la remet en entier dans le tas, et on remet la défausse à 0
    if (acquestion.length === 0) {
        console.log('Remise défausse dans pioche.');
        for(var i = 0; i < defausse.length; i++) {
            acquestion.push(defausse[i]);
        }
        defausse = [];
    }

    //Affichage de la div
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('#vitesseAnims').css('display', 'none');
    $('#vitesseAnimSlider').css('display', 'none');
    $('#carte_question').css('display', 'block');

    //Génération d'un nombre aléatoire
    var nbaleat = Math.floor(Math.random() * acquestion.length); // compris entre 0 et index max
    console.log(nbaleat);

    //Affichage de la carte question et masquage du plateau, du menu latéral et du slider
    $('#txt_question').html(acquestion[nbaleat].question);
    $('#r1').html(acquestion[nbaleat].r1);
    $('#r2').html(acquestion[nbaleat].r2);
    $('#r3').html(acquestion[nbaleat].r3);
    $('#r4').html(acquestion[nbaleat].r4);

    //On enregistre la bonne réponse dans une variable
    breponse = acquestion[nbaleat].br;
    txtbreponse = acquestion[nbaleat][breponse];

    //On met la carte piochée dans la défausse
    defausse.push(acquestion[nbaleat]);

    //On retire la carte piochée du tas (array)
    acquestion.splice(nbaleat, 1);
}

function fnVerifReponseQuestion() {
    //On affiche le plateau de jeu, le menu latéral et le slider
    $('#carte_question').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'block');
    $('#vitesseAnims').css('display', 'inline-block');
    $('#vitesseAnimSlider').css('display', 'inline-block');
    $('body').css('background-color','purple');

    //On enregistre la réponse du joueur
    jreponse = $("input[name='reponse']:checked");

    //Vérification de la réponse donnée par le joueur
    if (breponse === jreponse.val()) {
        alert("Bravo ! Vous avez trouvé la bonne réponse");

        joueurs[jActuel].argent += ptsbr;
        console.log(joueurs[jActuel].argent);

        $('#carte_question').css('display','none');
        jreponse.prop("checked", false);

    }
    else {
        alert("Mauvaise réponse ! La bonne réponse était : " + txtbreponse);
        $('#carte_question').css('display','none');
        jreponse.prop("checked", false);
    }

    joueurSuivant();

}

