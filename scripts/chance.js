// **************************************************************************************
// Code d'affichage d'une carte chance
// **************************************************************************************
// Ce script dessine à l'écran une carte chance, contenue dans un fichier JSON.
// Il applique également les effets décrits sur la carte.
//
//              * paramètres des cartes chance
//              * carte masquée au début du jeu
//              * acquisition des données Json
//              - fonction d'affichage d'une carte chance au joueur passé en paramètre
//                  - affichage de la Div
//                  - génération d'un nombre aléatoire
//                  - affichage de la carte chance
//              - fonction de vérification de la réponse
//              - effacer la carte et réafficher le plateau de jeu
//              - exécute les effets de la carte
//                - effet POINTS
//                  - si l'on donne de l'argent à un autre joueur
//                  - si l'on reçoit de l'argent
//                  - si l'on reçoit et donne de l'argent
//                      - recevoir
//                      - choix de la cible à qui donner
//                - effet TOURS
//                    - la prochaine fois que le joueur lance le dé, rien ne se passe et on passe au joueur suivant
//                - effet DEPLACEMENT
//                  - déplacer le joueur actuel et vérifier les actions qu'il doit effectuer
//                  - relance le dé automatiquement
//                  - déplace un joueur cible
//                - effet PROTECTION
//                  - enclencher la protection du joueur pour la prochaine attaque dont il est la cible
//                - effet QCM
//                  - pose une question au joueur
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// **************************************************************************************

// Paramètres des cartes chance
var achance = [];                                   // stocke l'array des cartes
var nbchance;                                       // stocke le nombre de cartes
var nbaleat;                                        // stocke la carte qui sera tirée au hasard
var nbJoueurs =  document.getElementById("nbJoueurs").value;//$("#nbJoueurs").val();

// La carte est masquée au début du jeu
$('#carte_chance').css('display','none');

$.getJSON('donnees/chances.json', function(data) {
    achance = data;

    nbchance = achance.length; //Le nombre de carte chance

});

function fnAfficheChance(IDjoueur) {
    console.log("Joueur ID "+IDjoueur);
    // Affichage de la div et masquage du plateau, du menu latéral et du slider
    $('body').css('background-color','rgba(0,0,0,.9)');
    $('#plateau_jeu').css('display','none');
    $('#menu_indications').css('display', 'none');
    $('#vitesseAnims').css('display', 'none');
    $('#vitesseAnimSlider').css('display', 'none');
    $('#carte_chance').css('display', 'block');


    // Génération d'un nombre aléatoire
    nbaleat = Math.floor(Math.random() * nbchance);

    // Affichage de la carte chance
    $('#titre_chance').html(achance[nbaleat].titre);
    $('#txt_chance').html(achance[nbaleat].texte);

}

function fnEffaceChance(){
    // Effacer la carte et réafficher le plateau de jeu, le menu latéral et le slider
    $('#carte_chance').css('display', 'none');
    $('#plateau_jeu').css('display','inline');
    $('#menu_indications').css('display', 'block');
    $('#vitesseAnims').css('display', 'block');
    $('#vitesseAnimSlider').css('display', 'block');
    $('body').css('background-color','purple');
    fnExecuteChance();
}

// Exécute les effets de la carte
function fnExecuteChance(){
    console.log("nombre de joueurs: " +nbJoueurs);
    console.log("Joueur Actuel : " +jActuel);
    var nomJoueurs = "";
    switch(achance[nbaleat].effet){
        case 'POINTS':
            switch(achance[nbaleat].valeur_1){
                case 0:
                    // Si l'on donne de l'argent à un autre joueur
                    $('#choix_cible').css('display', 'block');                  // style de la carte défini dans style.css
                    $('#titre_cible').html("Choisissez un joueur cible:");

                    for(var i = 0; i < nbJoueurs; i++){
                        console.log("valeur de I: " +i);
                        if(joueurs[i] !== joueurs[jActuel]) {
                            nomJoueurs += "<input type='radio' name='joueur' value='" + joueurs[i].id + "'> <label>" + joueurs[i].nom + "</label><br>";
                        }
                    }
                    nomJoueurs += "<br><br><input type=\"button\" value=\"Choisir\" onclick=\"fnEffaceChoix();\">";
                    $('#form_cibles').html(nomJoueurs);
                    console.log("donne de l'argent");
                    break;
                default:
                    // Si l'on reçoit de l'argent
                    if(achance[nbaleat].valeur_2 === 0){
                        if(joueurs[jActuel].protection === 1 && achance[nbaleat].valeur_1 < 0){

                            joueurs[jActuel].protection = 0;
                        }
                        else {
                            if (achance[nbaleat].valeur_1 < 0 && joueurs[jActuel].argent <= Math.abs(achance[nbaleat].valeur_1)) {
                                joueurs[jActuel].argent = 0;
                            }
                            else {
                                joueurs[jActuel].argent += achance[nbaleat].valeur_1;
                            }
                        }
                        console.log("Recevoir de l'argent");
                        console.log("Argent du " +joueurs[jActuel].nom +" "+joueurs[jActuel].argent);
                    }
                    else{
                        // Si l'on reçoit et donne de l'argent
                        // Recevoir
                        if(achance[nbaleat].valeur_1<0 && joueurs[jActuel].argent <= Math.abs(achance[nbaleat].valeur_1)){
                            joueurs[jActuel].argent = 0;
                        }
                        else{
                            joueurs[jActuel].argent += achance[nbaleat].valeur_1;
                        }
                        //Choix de la cible
                        $('#choix_cible').css('display', 'block');
                        $('#titre_cible').html("Choisissez un joueur cible:");

                        for(var i = 0; i < nbJoueurs; i++){
                            if(joueurs[i] !== joueurs[jActuel]) {
                                nomJoueurs += "<input type='radio' name='joueur' value='"+ joueurs[i].id +"'> <label>" + joueurs[i].nom + "</label><br>";
                            }
                        }

                        nomJoueurs += "<br><br><input type=\"button\" value=\"Sélectionner\" onclick=\"fnEffaceChoix();\">";

                        $('#form_cibles').html(nomJoueurs);
                        console.log("Recevoir et donner de l'argent");
                        console.log("Argent du " +joueurs[jActuel].nom +" "+joueurs[jActuel].argent);
                    }
                    break;
            }
            break;
        case 'TOURS':
            switch(achance[nbaleat].valeur_1){
                case 1:
                    //la prochaine fois que le joueur lance le dé, rien ne se passe et on passe au joueur suivant
                    console.log("passe tour avant: " +joueurs[jActuel].passeTour );
                    joueurs[jActuel].passeTour = 1;
                    console.log("passe tour après: " +joueurs[jActuel].passeTour );
                    break;
                default:
                    break;
            }
            break;
        case 'DEPLACEMENT':
            switch(achance[nbaleat].valeur_1){
                case 0:
                    //Déplace le joueur actuel
                    //Deplacer le pion
                    joueurs[jActuel].deplacerPion((-joueurs[jActuel].caseActuelle+achance[nbaleat].valeur_2));

                    //vérifier les actions que le joueur doit effectuer
                    actionCase(joueurs[jActuel]);
                    break;
                case 1:
                    //relance le dé automatiquement
                    tourJoueur(jActuel);
                    break;
                case 2:
                    //Déplace un joueur cible
                    //Séléction du joueur cible
                    $('#choix_cible').css('display', 'block');
                    $('#titre_cible').html("Choisissez un joueur cible:");
                    for(var i = 0; i < nbJoueurs; i++){
                        if(joueurs[i] !== joueurs[jActuel]) {
                            nomJoueurs += "<input type='radio' name='joueur' value='" + joueurs[i].id + "'> <label>" + joueurs[i].nom + "</label><br>";
                        }
                    }
                    nomJoueurs += "<br><br><input type=\"button\" value=\"Choisir\" onclick=\"fnEffaceChoixDeplacement();\">";
                    $('#form_cibles').html(nomJoueurs);
                    
                    break;
                default:
                    break;
            }
            break;
        case 'PROTECTION':
            switch(achance[nbaleat].valeur_1){
                case 1:
                    //on enclenche la protection du joueur pour la prochaine attaque dont il est la cible
                    joueurs[jActuel].protection = 1;
                    break;
                default:
                    break;
            }
            break;
        case 'QCM':
            //poser une question
            fnAfficheQuestion();
            break;
        default:
            break;
    }
}

function fnEffaceChoix() {
    //Efface la div de choix de cible
    $('#choix_cible').css('display', 'none');
    //Réaffiche la div de choix de cible si aucune cible n'a été sélectionnée
    if(document.querySelector('input[name="joueur"]:checked') === null){
        console.log("Pas de choix sélectioné");
        fnExecuteChance();
    }
    else{   //Applique l'effet à la cible
        for(var i = 0; i < nbJoueurs; i++){
            if(joueurs[i].id === document.querySelector('input[name="joueur"]:checked'.value)){
                if(joueurs[i].protection === 1 && achance[nbaleat].valeur_1 < 0){
                    joueurs[i].protection = 0;
                }
                else {
                    if (achance[nbaleat].valeur_2 < 0 && joueurs[i].argent <= Math.abs(achance[nbaleat].valeur_2)) {
                        joueurs[i].argent = 0;
                    }
                    else {
                        joueurs[i].argent += achance[nbaleat].valeur_2;
                    }
                }
                console.log(joueurs[i].nom+" a "+joueurs[i].argent);
            }

        }
    }
}

function fnEffaceChoixDeplacement() {
    //efface la div de choix de cible
    $('#choix_cible').css('display', 'none');
    //applique l'effet au joueur ciblé
    if(document.querySelector('input[name="joueur"]:checked') === null){
        console.log("Pas de choix sélectioné");
        fnExecuteChance();
    }
    else{
        for(var i = 0; i < nbJoueurs; i++){
            if(joueurs[i].id === document.querySelector('input[name="joueur"]:checked').value){
                //Deplacer le pion

                if(achance[nbaleat].valeur_2 === 0){    //Si la destination est GO
                    joueurs[i].deplacerPion(-joueurs[i].caseActuelle);
                }
                else{                                   //Sinon
                    joueurs[i].deplacerPion((-joueurs[i].caseActuelle+achance[nbaleat].valeur_2));
                }


            }

        }
    }

}