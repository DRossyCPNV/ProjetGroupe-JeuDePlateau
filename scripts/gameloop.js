//********************************************************************************************************************
// Gameloop - fonctions principales du jeu qui lient toutes les autres
//********************************************************************************************************************
//              * event JQuery du clic sur le bouton-verif : vérification si la réponse à la question a été validée
//              - fonction principale qui rend le jeu fonctionnel
//              - fonction appelée à chaque fois que l'on appuie sur le bouton lancer le dé
//                  -> désactive le bouton
//                  -> appelle la fonction qui crée un nombre aléatoire
//                  -> attend que le dé aie fini de tourner
//                  -> appelle la fonction qui représente le tour d'un joueur
//
//              - fonction qui représente le tour d'un joueur
//                  -> vérifie quelles cartes modules ont été obtenues
//                  -> teste si les conditions pour tenter le CFC sont remplies
//                  -> appelle la fonction de joueur.js qui déplace le pion, en lui passant en paramètre le résultat du dé
//                  -> vérification du temps que prend le déplacement
//                  -> vérifie les actions que le joueur doit effectuer avant de passer au tour suivant
//
//              - fonction qui gère l'action définie à une case où s'est arrêté le joueur actuel
//                    switch :
//                          -> normal (= cartes) - demande si le joueur veut acheter la case
//                          -> questions - on attend que la réponse soit validée, si oui on incrémente les points
//                          -> chance - on attend une seconde de plus que la durée normale de déplacement
//                                      avant d'afficher la carte
//                          -> CFC - ne fait rien, code géré plus bas par la fonction fnPasserCFC(jActuel)
//
//              - fonction sleep qui attend la fin d'exécution du setTimeOut, avant de poursuivre celle passée en paramètre
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// ********************************************************************************************************************

// permet de vérifier si la réponse à la question a été validée
$("#btn-verif").click(function () {
    $(this).data('clicked', true);
});

// fonction principale qui rend le jeu fonctionnel
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

    // appel de la fonction écrite dans anim.js, pour afficher le plateau et animer les pions.
    draw();
}

// Fonction appelée à chaque fois que l'on appuie sur lancer le dé.
//  - désactive le bouton lancer le dé tant que la fonction n'est pas terminée
//  - appelle la fonction qui crée un nombre aléatoire
//  - attend que le dé aie fini de tourner
//  - appelle la fonction qui représente le tour d'un joueur
function tourSuivant(){

    if(joueurs[jActuel].passeTour === 0){

        // crée un nombre aléatoire puis fait défiler le dé, définie dans affichage.js
        fnLancerDe();

        // attendre que le dé aie fini de tourner
        sleep(3500).then(() => {
            tourJoueur();})
    }
    else{
        joueurs[jActuel].passeTour = 0;
        joueurSuivant();
    }
}

// Fonction qui représente le tour d'un joueur.
//  - vérifie quelles cartes modules ont été obtenues
//  - teste si les conditions pour tenter le CFC sont remplies
//  - appelle la fonction de joueur.js qui déplace le pion, en lui passant en paramètre le résultat du dé
//  - vérification du temps que prend le déplacement
//  - vérifie les actions que le joueur doit effectuer avant de passer au tour suivant
function tourJoueur() {

    // Vérifie quelles cartes modules ont été obtenues
    var nbCarteObtenue = 0;
    for(var i = 0; i <=joueurs[jActuel].modulesObtenus.length; i++){   //condition 5 cartes modules obtenues
        if(joueurs[jActuel].modulesObtenus[i] === 1){
            nbCarteObtenue++;
        }
    }
    var section = false;
    for(var j = 0; j < joueurs[jActuel].modulesObtenus.length; j++){   //condition carte section obtenue
        if(joueurs[jActuel].modulesObtenus[j].Theme === joueurs[jActuel].section){
            section = true;
        }
    }
    //code de triche
    //  nbCarteObtenue = 5;
    //  section = true;
    ///////////////////

    // Teste si les conditions pour tenter le CFC sont remplies
    if(nbCarteObtenue >=5 && section ===true && joueurs[jActuel].argent >= ptsCFC){    //si les conditions pour le cfc sont remplies
        conditionCFC = true;
        console.log(joueurs[jActuel].nom + ": " + joueurs[jActuel].argent + " / " + ptsCFC);
    }
    else {
        conditionCFC = false;
    }

    // Appelle la fonction de joueur.js qui déplace le pion, en lui passant en paramètre le résultat du dé,
    // puis vérifie que le joueur a effectué toutes les actions liées à la case
    sleep( joueurs[jActuel].deplacerPion(resultatDe)).then(() => {
        actionCase();
    });

    console.log("je me suis déplacé de: " + resultatDe + " cases en " + dureeDeplacementMS + "ms");
}

// Fonction qui vérifie les actions que le joueur doit effectuer
//  -> si la case est une case normale : appel de la fonction fnAcheterModule
//    (demande si le joueur veut acheter la case)
//  -> si la case est une case question : appel de la fonction fnAfficheQuestion
//    (pose une question au joueur actuel)
//  -> si la case est une case chance : appel de la fonction fnAfficheChance
//  -> si la case est la case CFC : on ne fait rien (code de cette case écrit dans la fonction fnPasserCFC)
// Puis on termine le tour de jeu.
function actionCase() {

    var caseToCheck = joueurs[jActuel].caseActuelle;
    var typeDeCase = acartes[caseToCheck].type;

    switch (true) {

        case (typeDeCase === "normal"):
            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);

                //demande si le joueur veut acheter la case
                fnAcheterModule(caseToCheck);
            });

            break;

        case (typeDeCase === "question"):

            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                console.log(joueurs[jActuel]);

                //poser une question
                fnAfficheQuestion();

            });

            break;
        case (typeDeCase === "chance"):
            console.log(typeDeCase);
            sleep(dureeDeplacementMS + 1000).then(() => {

                fnAfficheChance();
            });

            break;
        case (typeDeCase === "cfc"):
            // ne rien faire, code géré plus bas par la fonction fnPasserCFC(jActuel)
            break;
    }

    tourFini = true;                     // variable globale
    console.log("Tour suivant");
    joueurSuivant();                    // fonction définie dans joueur.js

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function  fnPasserCFC(jActuel) {
    console.log("Passer ton cfc " + jActuel);
    joueurs[jActuel].caseActuelle = 24;

    //case CFC
    fnLancerDe();
    sleep(2000).then(() => {
        if(resultatDe >= 4){
            console.log("C'est gagné !!!");
            clearInterval(creerDiv);
            overlayVictoireOn()
        }
        else{
            alert("CFC raté, pas de bol !");
            console.log("CFC raté, pas de bol!");
            joueurs[jActuel].deplacerPion(-joueurs[jActuel].caseActuelle);
            joueurs[jActuel].argent -= 1000;
            //passer au joueur suivant
            console.log("Tour suivant");
            joueurSuivant();
        }
    });


}