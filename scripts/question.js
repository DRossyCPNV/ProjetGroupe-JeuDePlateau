//Ce programme dessine une carte contenant des questions contenue dans un fichier JSON
//Il vérifie également la réponse sélectionner

//Paramètres des cartes questions
var aquestion = [];
var jreponse; //La réponse de l'utilisateur
var breponse; //La bonne réponse
var nbquestion;
var nbaleat;
//La carte est masquée au début du jeu
$('#carte_question').css('display','none');

$.getJSON('donnees/questions.json', function(data) {
    aquestion = data;

    nbquestion = aquestion.length; //Le nombre de carte question

});

function fnAfficheCarte() {

    //Affichage de la div
    $('#carte_question').css('display', 'block');

    //Génération d'un nombre aléatoire
    nbaleat = Math.floor(Math.random() * nbquestion);
    console.log(nbaleat);

    //Affichage de la carte question
    $('#txt_question').html(aquestion[nbaleat].question);
    $('#r1').html(aquestion[nbaleat].r1);
    $('#r2').html(aquestion[nbaleat].r2);
    $('#r3').html(aquestion[nbaleat].r3);
    $('#r4').html(aquestion[nbaleat].r4);

    //On enregistre la bonne réponse dans une variable
    breponse = aquestion[nbaleat].br;
}

function fnVerifReponse() {

    //On enregistre la réponse du joueur
    jreponse = $("input[name='reponse']:checked");

    //Vérification de la réponse donnée par le joueur
    if (breponse == jreponse) {
        alert("Bravo ! Vous avez trouvé la bonne réponse");
        $('#carte_question').css('display','none');
        jreponse.prop("checked", false);
    }
    else {
        alert("Mauvaise réponse !");
        $('#carte_question').css('display','none');
        jreponse.prop("checked", false);
    }
}
