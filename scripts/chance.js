//Ce programme a pour but de sélectionner et d'afficher une carte chance dans le fichier json "chances.json"
//Il a aussi pour but d'appliquer les effets de ces cartes chances sur le ou les joueurs.

//Paramètres des cartes questions
var achance = [];
var nbchance;
var nbaleat;
var joueurActuel = 0;
var nbJoueurs =  document.getElementById("nbJoueurs").value;//$("#nbJoueurs").val();
//La carte est masquée au début du jeu
$('#carte_chance').css('display','none');

$.getJSON('donnees/chances.json', function(data) {
    achance = data;

    nbchance = achance.length; //Le nombre de carte chance

});

function fnAfficheChance(IDjoueur) {
    console.log("Joueur ID "+IDjoueur);
    //Affichage de la div
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#carte_chance').css('display', 'block');


    //Génération d'un nombre aléatoire
    nbaleat = Math.floor(Math.random() * nbchance);

    //Affichage de la carte chance
    $('#titre_chance').html(achance[nbaleat].titre);
    $('#txt_chance').html(achance[nbaleat].texte);
    joueurActuel = IDjoueur;

}

function fnEffaceChance(){
    $('#carte_chance').css('display', 'none');
    $('#plateau_jeu').css('display','block');
    $('body').css('background-color','purple');
    fnExecuteChance();
}

function fnExecuteChance(){
    console.log("nombre de joueurs: " +nbJoueurs);
    console.log("Joueur Actuel : " +joueurActuel);
    var nomJoueurs = "";
    switch(achance[nbaleat].effet){
        case 'POINTS':
            switch(achance[nbaleat].valeur_1){
                case 0:
                    //Si donner argent autre joueur
                    $('#choix_cible').css('display', 'block');
                    $('#titre_cible').html("Choisissez un joueur cible:");

                    for(var i = 0; i < nbJoueurs; i++){
                        if(joueurs[i] !== joueurs[joueurActuel]) {
                            nomJoueurs += "<input type='radio' name='joueur' value='" + joueurs[i].id + "'> <label>" + joueurs[i].nom + "</label><br>";
                        }
                    }
                    nomJoueurs += "<br><br><input type=\"button\" value=\"Dessiner Chance\" onclick=\"fnEffaceChoix();\">"
                    $('#form_cibles').html(nomJoueurs);

                    break;
                default:
                    //Si recevoir argent
                    if(achance[nbaleat].valeur_2 === 0){
                        if(achance[nbaleat].valeur_1<0 && joueurs[joueurActuel].argent <= Math.abs(achance[nbaleat].valeur_1)){
                            joueurs[joueurActuel].argent = 0;
                        }
                        else{
                            joueurs[joueurActuel].argent += achance[nbaleat].valeur_1;
                        }
                        console.log("Argent du " +joueurs[joueurActuel].nom +" "+joueurs[joueurActuel].argent);
                    }
                    else{
                        //Si recevoir et donner argent
                        if(achance[nbaleat].valeur_1<0 && joueurs[joueurActuel].argent <= Math.abs(achance[nbaleat].valeur_1)){
                            joueurs[joueurActuel].argent = 0;
                        }
                        else{
                            joueurs[joueurActuel].argent += achance[nbaleat].valeur_1;
                        }

                        $('#choix_cible').css('display', 'block');
                        $('#titre_cible').html("Choisissez un joueur cible:");

                        for(var i = 0; i < nbJoueurs; i++){
                            if(joueurs[i] !== joueurs[joueurActuel]) {
                                nomJoueurs += "<input type='radio' name='joueur' value='"+ joueurs[i].id +"'> <label>" + joueurs[i].nom + "</label><br>";
                            }
                        }

                        nomJoueurs += "<br><br><input type=\"button\" value=\"Séléctionner\" onclick=\"fnEffaceChoix();\">"

                        $('#form_cibles').html(nomJoueurs);
                    }
                    break;
            }
            break;
        case 'TOURS':
            break;
        case 'DEPLACEMENT':
            break;
        case 'PROTECTION':
            break;
        case 'QCM':
            break;
        default:
            break;
    }
}

function fnEffaceChoix() {
    $('#choix_cible').css('display', 'none');
    for(var i = 0; i < nbJoueurs; i++){
        if(joueurs[i].id == document.querySelector('input[name="joueur"]:checked').value){
            if(joueurs[i].argent<=achance[nbaleat].valeur_2){
                joueurs[i].argent = 0;
            }
            else{
                joueurs[i].argent += achance[nbaleat].valeur_2;
            }

            console.log(joueurs[i].nom+" a "+joueurs[i].argent);
        }

    }

}