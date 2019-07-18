//********************************************************************************************************************
// Gameloop - fonctions principales du jeu qui lient toutes les autres
//********************************************************************************************************************
//
//              * event JQuery du clic sur le bouton-verif : vérification si la réponse à la question a été validée
//              - fonction principale qui lie toutes les autres pour rendre le jeu fonctionnel (gameloop)
//                  -> crée les joueurs
//                  -> place tous les joueurs sur la case départ
//                  -> appelle la fonction définie dans affichage.js, pour afficher le plateau et animer les pions.
//
//              - fonction qui représente le tour d'un joueur
//                  -> vérifie quelles cartes modules ont été obtenues
//                  -> teste si les conditions pour tenter le CFC sont remplies
//                  -> appelle la fonction de joueur.js qui déplace le pion, en lui passant en paramètre le résultat du dé
//                  -> vérification du temps que prend le déplacement
//                  -> vérifie les actions que le joueur doit effectuer avant de passer au tour suivant
//
//              - fyonction qui vérifie les actions que le joueur doit effectuer
//                    switch :
//                          -> normal (= cartes) - demande si le joueur veut acheter la case
//                          -> questions - on attend que la réponse soit validée, si oui on incrémente les points
//                          -> chance - on attend une seconde de plus que la durée normale de déplacement
//                                      avant d'afficher la carte
//                          -> CFC - lance le dé, si le résultat est plus grand ou égal à 4,
//
//              - fonction qui attend la fin d'exécution du setTimeOut, avant de poursuivre celle passée en paramètre
//              - fonction pour tenter de passer le CFC et gagner la partie si un 4 ou plus sort au dé
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juillet 2019 - CPNV
// ********************************************************************************************************************

// event JQuery du clic sur le bouton-verif : vérification si la réponse à la question a été validée
$("#btn-verif").click(function () {
    $(this).data('clicked', true);
});

// Fonction principale qui lie toutes les autres pour rendre le jeu fonctionnel
function gameloop(nbJoueurs) {

    // crée les joueurs
    joueurs = maker(nbJoueurs);
    for (var i = 0; i < nbJoueurs; i++) {
        // message d'info dans la console, pour test
        console.log("joueur : " + i + ", Nom: " + joueurs[i].nom + ", Couleur: " + joueurs[i].couleur + ", Section: " + joueurs[i].section + ", id: " + joueurs[i].id + ", emplacement: " + joueurs[i].emplacementCase + ", case actuel: " + joueurs[i].caseActuelle);
    }
    // place tous les joueurs sur la case départ
    for (i = 0; i < nbJoueurs; i++) {
        joueurs[i].placerPionCaseDepart();
    }

    // appelle la fonction écrite dans affichage.js, pour afficher le plateau et animer les pions.
    draw();
}

// Fonction qui représente le tour d'un joueur.
//  -> vérifie quelles cartes modules ont été obtenues
//  -> teste si les conditions pour tenter le CFC sont remplies
//  -> appelle la fonction de joueur.js qui déplace le pion
//     avec la fonction définie dans joueurs.js, en lui passant en paramètre le résultat du dé
//  -> vérification du temps que prend le déplacement
//  -> on attend que le pion arrive sur la case, puis on appelle la fonction
//     qui effectue les actions liées à la case au joueur
//
function fnTourJoueur() {

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

    // On déplace le pion du résultat du dé avec la fonction définie dans joueurs.js
    joueurs[jActuel].deplacerPion(resultatDe);

    // Vérification du temps que prend le déplacement
    console.log("je me déplace de: " + resultatDe + " cases en " + dureeDeplacementMS + "ms");

    // On attend que le pion arrive sur la case,
    // puis on appelle la fonction qui effectue les actions liées à la case au joueur
    fnSleep(dureeDeplacementMS + 1000).then(() => {
        fnActionCase();
    });

}

// Fonction qui vérifie les actions que le joueur doit effectuer
//  -> si la case est une case normale : appel de la fonction fnAcheterModule
//    (demande si le joueur veut acheter la case)
//  -> si la case est une case question : appel de la fonction fnAfficheQuestion
//    (pose une question au joueur actuel)
//  -> si la case est une case chance : appel de la fonction fnAfficheChance
//  -> si la case est la case CFC : on ne fait rien (code de cette case écrit dans la fonction fnPasserCFC)
// Puis on termine le tour de jeu.
function fnActionCase() {

    var caseToCheck = joueurs[jActuel].caseActuelle;
    var typeDeCase = acartes[caseToCheck].type;

    switch (true) {

        case (typeDeCase === "normal"):
            fnSleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);

                //demande si le joueur veut acheter la case. Fonction définie dans obtention_module.js.
                fnAcheterModule(caseToCheck);
            });

            break;

        case (typeDeCase === "question"):

            fnSleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                console.log(joueurs[jActuel]);

                //poser une question
                fnAfficheQuestion();

            });

            break;
        case (typeDeCase === "chance"):
            console.log(typeDeCase);
            fnSleep(dureeDeplacementMS + 1000).then(() => {

                fnAfficheChance();
            });

            break;
        case (typeDeCase === "cfc"):
            fnLancerDe();
            fnSleep(2000).then(() => {
                if(resultatDe >= 4){
                    console.log("C'est gagné !!!");
                    clearInterval(creerDiv);
                    $('#plateau_jeu').css('display', 'none');
                    $('#menu_indications').css('display', 'none');
                    $('label[for="vitesseAnimSlider"]').css('display', 'none');
                    $('#vitesseAnimSlider').css('display', 'none');
                    $('body').css('background-color','black');
                    overlayVictoireOn()
                }
                else{
                    alert("CFC raté, pas de bol !");
                    console.log("CFC raté, pas de bol!");
                    joueurs[jActuel].deplacerPion(-joueurs[jActuel].caseActuelle);
                    joueurs[jActuel].argent -= 1000;

                    // Passer au joueur suivant
                    console.log("Tour suivant");
                    fnJoueurSuivant();
                }
            });


            break;
    }

}

// fonction qui attend la fin d'exécution du setTimeOut, avant de poursuivre celle passée en paramètre
function fnSleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// fonction pour tenter de passer le CFC et gagner la partie si un 4 ou plus sort au dé
function  fnPasserCFC(jActuel) {
    console.log("Le joueur " + joueurs.couleur + " se présente aux examens !");
    joueurs[jActuel].caseActuelle = 24;

    // On attend que le pion arrive sur la case,
    // puis on appelle la fonction qui effectue les actions liées à la case au joueur
    fnSleep(dureeDeplacementMS + 1000).then(() => {
        joueurs[jActuel].placerCaseCFC();
        fnActionCase();
    });
}