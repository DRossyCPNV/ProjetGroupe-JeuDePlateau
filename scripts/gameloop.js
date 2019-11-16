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
// SI-CA2a - novembre 2019 - CPNV
// ********************************************************************************************************************

// event JQuery du clic sur le bouton-verif : vérification si la réponse à la question a été validée
$("#btn-verif").click(function () {
    $(this).data('clicked', true);
});

// Fonction principale qui lie toutes les autres pour rendre le jeu fonctionnel
function gameloop(nbJoueurs) {

    // crée les joueurs
    joueurs = maker(nbJoueurs);
    for (var i = 0; i < nbJoueurs; i++)
    {
        // message d'info dans la console, pour test
        console.log("joueur : " + i + ", Nom: " + joueurs[i].nom + ", Couleur: " + joueurs[i].couleur + ", Section: " + joueurs[i].section + ", id: " + joueurs[i].id + ", emplacement: " + joueurs[i].emplacementCase + ", case actuel: " + joueurs[i].caseActuelle);
    }
    // place tous les joueurs sur la case départ
    for (i = 0; i < nbJoueurs; i++)
    {
        joueurs[i].placerPionCaseDepart();
    }

    // appelle la fonction écrite dans affichage.js, pour afficher le plateau et animer les pions.
    draw();
}

// Fonction qui représente le tour d'un joueur.
//  -> appelle la fonction de joueur.js qui déplace le pion
//     avec la fonction définie dans joueurs.js, en lui passant en paramètre le résultat du dé
//  -> vérification du temps que prend le déplacement
//  -> on attend que le pion arrive sur la case, puis on appelle la fonction
//     qui effectue les actions liées à la case au joueur
//
function fnTourJoueur() {

    // On déplace le pion du résultat du dé avec la fonction définie dans joueurs.js
    joueurs[jActuel].deplacerPion(resultatDe);

    // Vérification du temps que prend le déplacement
    console.log("je me déplace de: " + resultatDe + " cases en " + dureeDeplacementMS + "ms");

    // On attend que le pion arrive sur la case,
    // puis on appelle la fonction qui effectue les actions liées à la case au joueur
    fnSleep(dureeDeplacementMS + 500).then(() => {
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

    switch (true)
    {

        case (typeDeCase === "normal"):

            // Attend que le pion aie fini de se déplacer
            fnSleep(dureeDeplacementMS + 1000).then(() => {
                console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" est arrivé sur une case de type "+typeDeCase);

                // Demande si le joueur actuel veut acheter la case. Fonction définie dans obtention_module.js.
                fnAcheterModule(caseToCheck);
            });

        break;

        case (typeDeCase === "question"):

            // Attend que le pion aie fini de se déplacer
            fnSleep(dureeDeplacementMS + 1000).then(() => {
                console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" est arrivé sur une case de type "+typeDeCase);

                // Affiche une carte question au joueur actuel. Fonction définie dans question.js
                fnAfficheQuestion();

            });

            break;
        case (typeDeCase === "chance"):
            // Attend que le pion aie fini de se déplacer
            fnSleep(dureeDeplacementMS + 1000).then(() => {
                console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" est arrivé sur une case de type "+typeDeCase);

                // Affiche une carte chance au joueur actuel. Fonction définie dans chance.js
                fnAfficheChance();
            });

            break;
        case (typeDeCase === "cfc"):
            fnLancerDe();

            // Attend que le pion aie fini de se déplacer
            fnSleep(2000).then(() => {
                console.log("Le joueur de couleur "+joueurs[jActuel].couleur+" est arrivé sur la case de type "+typeDeCase);

                if(resultatDe >= 4)
                {
                    console.log("C'est gagné !!!");

                    // Stoppe le timer qui affiche et actualise les scores toutes les secondes.
                    clearInterval(creerDiv);
                    $('#plateau_jeu').css('display', 'none');
                    $('#menu_indications').css('display', 'none');
                    $('label[for="vitesseAnimSlider"]').css('display', 'none');
                    $('#vitesseAnimSlider').css('display', 'none');
                    $('body').css('background-color','black');

                    // Affiche un overlay de victoire avec l'image du CFC
                    overlayVictoireOn()
                }
                else
                {
                    alert("CFC raté, pas de bol !");
                    console.log("CFC raté, pas de bol!");

                    // Replace le pion sur la case d'où il était parti
                    joueurs[jActuel].deplacerPion(-joueurs[jActuel].caseActuelle);

                    // Retire 1000 points pour le passage du CFC
                    joueurs[jActuel].argent -= 1000;

                    // Tour fini, au tour du joueur suivant
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