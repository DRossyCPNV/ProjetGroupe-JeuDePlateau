//********************************************************************************************************************
// Gameloop
//********************************************************************************************************************
//              * event JQuery du clic sur le bouton-verif : vérification si la réponse à la question a été validée
//              - fonction principale qui liera toutes les autres (gameloop)
//              - fonction qui gère le tour d'un joueur et prend un ID de joueur en argument
//              - fonction qui gère l'action définie à une case où s'est arrêté l'ID de joueur passé en argument
//                    switch :
//                          -> normal (= cartes) - demande si le joueur veut acheter la case
//                          -> questions - on attend que la réponse soit validée, si oui on incrémente les points
//                          -> chance - on attend une seconde de plus que la durée normale de déplacement
//                                      avant d'afficher la carte
//                          -> CFC - <à définir>
//
//              - fonction sleep qui attend la fin d'exécution du setTimeOut avant de poursuivre celle passée en paramètre
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// ********************************************************************************************************************

//permet de vérifier si la réponse à la question a été validée
$("#btn-verif").click(function () {
    $(this).data('clicked', true);
});

//sorties de la boucle pour y accéder partout dans le script
var jActuel = 0;
var nbJoueurJouant = nbJoueurs;
//cette fonction est la principale qui lie toutes les autres pour rendre le jeu fonctionnel
function gameloop(nbJoueurs) {

    //crée les joueurs
    joueurs = maker(nbJoueurs);
    //message d'info dans la console
    for (var i = 0; i < nbJoueurs; i++) {
        // pour test
        console.log("joueur : " + i + ", Nom: " + joueurs[i].nom + ", Couleur: " + joueurs[i].couleur + ", Section: " + joueurs[i].section + ", id: " + joueurs[i].id + ", emplacement: " + joueurs[i].emplacementCase + ", case actuel: " + joueurs[i].caseActuelle);
    }
    //placer tous les joueurs sur la case départ
    for (i = 0; i < nbJoueurs; i++) {
        joueurs[i].placerPionCaseDepart();
    }

    draw();
}
//Cette fonction est appelée à chaque fois que l'on appuie sur lancer le dé
function tourSuivant(){
//$("#btn_cfc").click(function () { // https://css-tricks.com/snippets/jquery/click-once-and-unbind/
    //désactive le bouton lancer le dé tant que la fonction n'est pas terminée;
    if(joueurs[jActuel].passeTour === 0){
        $("#btn-lancerDe").attr('disabled', 'disabled');
        console.log("je disable le bouton");

        //crée un nombre aléatoire
        fnLancerDe();

        //attendre que le dé aie fini de tourner
        sleep(1000).then(() => {
            tourJoueur(jActuel);
            console.log('le problème est la');
            if (jActuel < nbJoueurJouant - 1) {
                jActuel++;
            } else {
                jActuel = 0;
            }
        });
    }
    else{
        joueurs[jActuel].passeTour = 0;
        if (jActuel < nbJoueurJouant - 1) {
            jActuel++;
        } else {
            jActuel = 0;
        }
    }


// });
}

//fonction qui représente le tour d'un joueur
function tourJoueur(joueurId) {
    var nbCarteObtenue = 0;
    for(var i = 0; i <=joueurs[joueurId].modulesObtenus.length; i++){   //condition 5 cartes modules
        if(joueurs[joueurId].modulesObtenus[i] === 1){
            nbCarteObtenue++;
        }
    }
    var section = false;
    for(var i = 0; i < joueurs[joueurId].modulesObtenus.length; i++){   //condition carte section
        if(joueurs[joueurId].modulesObtenus[i].Theme === joueurs[joueurId].section){
            section = true;
        }
    }
    // code de triche
    // nbCarteObtenue = 5;
    // section = true;
    ///////////////////
    if(nbCarteObtenue >=5 && section ===true && joueurs[joueurId].argent >= ptsCFC){    //Si les conditions pour le cfc sont remplies
        conditionCFC = true;
        console.log(joueurs[joueurId].nom + ": " + joueurs[joueurId].argent + " / " + ptsCFC);
        joueurs[joueurId].deplacerPion(resultatDe);
        console.log("je me déplace de: " + resultatDe);
    }
    else {
        conditionCFC = false;
        $('.menu_indications_joueur_boutons').html('<input type="button" value="Lancer le dé" class="menu_indications_bouton_lancer" onclick="tourSuivant()">');
        //Déplacer le pion en fonction du résultat du dé
        joueurs[joueurId].deplacerPion(resultatDe);
        console.log("je me déplace de: " + resultatDe);
    }
    //vérifier les actions que le joueur doit effectuer
    console.log("le déplacement prend " + dureeDeplacementMS + "ms");
    actionCase(joueurs[joueurId]);

    //réactiver le bouton à la fin du tour;
    $("#btn-lancerDe").removeAttr('disabled');

}

function actionCase(joueurActuel) {

    var caseToCheck = joueurActuel.caseActuelle;
    var typeDeCase = acartes[caseToCheck].type;

    switch (true) {
        //case coin
        case (typeDeCase === "normal"):
            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                fnAcheterModule(joueurActuel.id, caseToCheck);
                //demander si le joueur veut acheter la case
            });

            break;

        case (typeDeCase === "question"):

            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                console.log(joueurActuel.id);
                //poser une question
                fnAfficheQuestion(joueurActuel.id);

                // on attend que la réponse soit validée
                // while($("#btn-verif").data('clicked')){
                //     fnAfficheQuestion(joueurActuel.id);
                // }
                // if (fnVerifReponseQuestion() === true) {
                //     joueurActuel.nbTestReussi++;
                //     console.log("Voici mes points" + joueurActuel.nbTestReussi);
                //     $("#id").data('clicked', false);
                // }
            });

            break;
        case (typeDeCase === "chance"):
            console.log(typeDeCase);
            //case chance
            sleep(dureeDeplacementMS + 1000).then(() => {
                fnAfficheChance(joueurActuel.id);
            });

            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function  fnPasserCFC(joueurId) {
    console.log("passe ton cfc " +joueurId);
    joueurs[joueurId].caseActuelle = 24;

    //case CFC
    fnLancerDe();
    sleep(2000).then(() => {
        if(resultatDe >= 4){
            console.log("Gagné !!!");
            // window.location = "victoire.html";
            clearInterval(creerDiv);
            $("body").load("victoire.html");
        }
        else{
            console.log("T'as raté ton CFC pas de bol!");
            joueurs[joueurId].deplacerPion(-joueurs[joueurId].caseActuelle);
            joueurs[joueurId].argent -= 1000;
            //passer au joueur suivant
            jActuel++;
        }
    });


}