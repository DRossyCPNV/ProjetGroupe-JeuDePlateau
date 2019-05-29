//Ce programme a pour but de séléctionner et d'afficher une carte chance dans le fichier json "chances.json"
//Il a aussi pour but d'appliquer les effets de ces cartes chances sur le ou les joueurs.

//Paramètres des cartes questions
var achance = [];
var nbchance;
var nbaleat;
var attente = 0;
//La carte est masquée au début du jeu
$('#carte_chance').css('display','none');

$.getJSON('donnees/chances.json', function(data) {
    achance = data;

    nbchance = achance.length; //Le nombre de carte chance

});

function fnAfficheChance() {

    //Affichage de la div
    $('body').css('background-color','rgba(0,0,0,.9)'); //Place un fond noir sur le reste de la fenêtre
    $('#plateau_jeu').css('display','none');    //Cache le plateau de jeu
    $('#carte_chance').css('display', 'block'); //Affiche la div carte chance

    //Génération d'un nombre aléatoire
    nbaleat = Math.floor(Math.random() * nbchance);
    console.log(nbaleat);

    //Affichage de la carte chance
    $('#titre_chance').html(achance[nbaleat].titre);    //Affiche le titre de la carte
    $('#txt_chance').html(achance[nbaleat].texte);  //Affiche le texte de la carte
    
}

function fnEffaceChance(){
    attente = 0;
    //Sélection du type d'effet de carte
    switch(achance[nbaleat].effet){
        case 'POINTS':
            fnEffetPoints(achance[nbaleat].id);
            break;
        case 'TOURS':
            fnEffetTours(achance[nbaleat].id);
            break;
        case 'DEPLACEMENT':
            fnEffetDeplacement(achance[nbaleat].id);
            break;
        case 'PROTECTION':
            fnEffetProtection(achance[nbaleat].id);
            break;
        case 'QCM':
            fnEffetQCM(achance[nbaleat].id);
            break;
        default:
            $('#txt_chance').css('color', 'red');
            $('#txt_chance').html("Les effets de la carte ne peuvent pas être appliqués, une erreur est survenue");
            attente = 4000;
            break;
    }
    //affiche un message d'erreur pendant 4 secondes si la carte n'est pas dans une catégories
    setTimeout(function(){
        $('#carte_chance').css('display', 'none');  //Fait disparaître la carte chance
        $('#plateau_jeu').css('display','block');   //Fait réaparaître le plateau de jeu
        $('body').css('background-color','purple'); //Remet l'arrère plan en violet
    },attente)

}

function fnEffetPoints(id){

}

function fnEffetTours(id){

}

function fnEffetDeplacement(id){

}

function fnEffetProtection(id){

}

function fnEffetQCM(id){

}