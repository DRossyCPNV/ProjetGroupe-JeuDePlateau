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
// SI-CA1a - juin 2019 - CPNV
// **************************************************************************************


//Paramètres des cartes questions
var acquestion = []; //array carte questions
var defausse = [];
var jreponse; //La réponse de l'utilisateur
var breponse; //La bonne réponse
var txtbreponse; //Le texte de la bonne réponse
var nbcquestion; //nb cartes questions
var ptsbr = 500; //Points attribué pour une bonne réponse

//La carte est masquée au début du jeu
$('#carte_question').css('display','none');

$.getJSON('donnees/questions.json', function(data) {
    acquestion = data;

    nbcquestion = acquestion.length; //Le nombre de cartes questions
});

function fnAfficheQuestion(IDjoueur) {

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
    $('#carte_question').css('display', 'block');

    //Génération d'un nombre aléatoire
    var nbaleat = Math.floor(Math.random() * acquestion.length); // compris entre 0 et index max
    console.log(nbaleat);

    //Affichage de la carte question
    $('#txt_question').html(acquestion[nbaleat].question);
    $('#r1').html(acquestion[nbaleat].r1);
    $('#r2').html(acquestion[nbaleat].r2);
    $('#r3').html(acquestion[nbaleat].r3);
    $('#r4').html(acquestion[nbaleat].r4);

    //On enregistre la bonne réponse dans une variable
    breponse = acquestion[nbaleat].br;
    txtbreponse = acquestion[nbaleat][breponse];



    defausse.push(acquestion[nbaleat]); //On met la carte piochée dans la défausse
    acquestion.splice(nbaleat, 1); //On retire la carte piochée du tas
}

function fnVerifReponseQuestion() {
    //On affiche le plateau de jeu
    $('#carte_question').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'flex');
    $('body').css('background-color','purple');

    //On enregistre la réponse du joueur
    jreponse = $("input[name='reponse']:checked");

    //Vérification de la réponse donnée par le joueur
    if (breponse === jreponse.val()) {
        alert("Bravo ! Vous avez trouvé la bonne réponse");

        joueurs[joueurActuel].argent += ptsbr;
        console.log(joueurs[joueurActuel].argent);

        $('#carte_question').css('display','none');
        jreponse.prop("checked", false);
        return true;
    }
    else {
        alert("Mauvaise réponse ! La bonne réponse était: " + txtbreponse);
        $('#carte_question').css('display','none');
        jreponse.prop("checked", false);
        return false;
    }

}

