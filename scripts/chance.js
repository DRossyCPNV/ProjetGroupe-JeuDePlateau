//Ce programme a pour but de séléctionner et d'afficher une carte chance dans le fichier json "chances.json"
//Il a aussi pour but d'appliquer les effets de ces cartes chances sur le ou les joueurs.

//Paramètres des cartes questions
var achance = [];
var nbchance;
var nbaleat;
//La carte est masquée au début du jeu
$('#carte_chance').css('display','none');

$.getJSON('donnees/chances.json', function(data) {
    achance = data;

    nbchance = achance.length; //Le nombre de carte chance

});

function fnAfficheChance() {

    //Affichage de la div
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#carte_chance').css('display', 'block');


    //Génération d'un nombre aléatoire
    nbaleat = Math.floor(Math.random() * nbchance);
    console.log(nbaleat);

    //Affichage de la carte chance
    $('#titre_chance').html(achance[nbaleat].titre);
    $('#txt_chance').html(achance[nbaleat].texte);
}

function fnEffaceChance(){
    $('#carte_chance').css('display', 'none');
    $('#plateau_jeu').css('display','block');
    $('body').css('background-color','white');
}