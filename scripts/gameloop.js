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

//sortie de la boucle pour y accéder partout dans le script
var jActuel = 0;
var nbJoueurJouant = nbJoueurs;
//cette fonction sera la fonction principale qui liera toutes les autres pour rendre le jeu fonctionnel
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

    //appel de la fonction écrite dans anim.js, pour afficher le plateau et animer les pions.
    draw();
}

// Fonction appelée à chaque fois que l'on appuie sur lancer le dé.
//  - désactive le bouton lancer le dé tant que la fonction n'est pas terminée
//  - appelle la fonction qui crée un nombre aléatoire
//  - attend que le dé aie fini de tourner
//  - appelle la fonction qui représente le tour d'un joueur
function tourSuivant(){

    //désactive le bouton lancer le dé tant que la fonction n'est pas terminée;
    // source: https://css-tricks.com/snippets/jquery/click-once-and-unbind/
    if(joueurs[jActuel].passeTour === 0){
        $(".menu_indications_bouton_lancer").hide();
        console.log("je disable le bouton lancer dé");

        //crée un nombre aléatoire
        fnLancerDe();

        //attendre que le dé aie fini de tourner
        sleep(1000).then(() => {
            tourJoueur(jActuel);

            // changement du joueur actuel
            if (jActuel < document.getElementById('nbJoueurs').value - 1) {
                jActuel++;

            } else {
                jActuel = 0;
            }
        });
    }
    else{
        joueurs[jActuel].passeTour = 0;
        if (jActuel < document.getElementById('nbJoueurs').value - 1) {
            jActuel++;

        } else {
            jActuel = 0;
        }
    }
}

// Fonction qui représente le tour d'un joueur.
//  - vérifie quelles cartes modules ont été obtenues
//  - teste si les conditions pour tenter le CFC sont remplies
//  - appelle la fonction qui déplace le pion avec comme paramètre le résultat du dé
//  - vérifie les actions que le joueur doit effectuer
//  - réactive le bouton "lancer dé" à la fin du tour
function tourJoueur(joueurId) {
    var nbCarteObtenue = 0;
    for(var i = 0; i <=joueurs[joueurId].modulesObtenus.length; i++){   //condition 5 cartes modules obtenues
        if(joueurs[joueurId].modulesObtenus[i] === 1){
            nbCarteObtenue++;
        }
    }
    var section = false;
    for(var j = 0; j < joueurs[joueurId].modulesObtenus.length; j++){   //condition carte section obtenue
        if(joueurs[joueurId].modulesObtenus[j].Theme === joueurs[joueurId].section){
            section = true;
        }
    }
    //code de triche
    //  nbCarteObtenue = 5;
    //  section = true;
    ///////////////////

    if(nbCarteObtenue >=5 && section ===true && joueurs[joueurId].argent >= ptsCFC){    //si les conditions pour le cfc sont remplies
        conditionCFC = true;
        console.log(joueurs[joueurId].nom + ": " + joueurs[joueurId].argent + " / " + ptsCFC);
    }
    else {
        conditionCFC = false;
    }

    // Déplacer le pion avec la fonction codée dans joueurs.js, en lui passant en paramètre le résultat du dé
    joueurs[joueurId].deplacerPion(resultatDe);
    console.log("je me déplace de: " + resultatDe);
    // vérification du temps que prend le déplacement
    console.log("le déplacement prend " + dureeDeplacementMS + "ms");
    // vérifier les actions que le joueur doit effectuer
    actionCase(joueurs[joueurId]);

}

//Fonction qui vérifie les actions que le joueur doit effectuer
//  - si la case est une case normale : appel de la fonction fnAcheterModule
//    (demande si le joueur veut acheter la case)
//  - si la case est une case question : appel de la fonction fnAfficheQuestion
//    (pose une question au joueur actuel)
//  - si la case est une case chance : appel de la fonction fnAfficheChance
//  - si la case est la case CFC : on ne fait rien (code de cette case écrit dans la fonction fnPasserCFC)
function actionCase(jActuel) {

    var caseToCheck = jActuel.caseActuelle;
    var typeDeCase = acartes[caseToCheck].type;

    switch (true) {

        case (typeDeCase === "normal"):
            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);

                //demande si le joueur veut acheter la case
                fnAcheterModule(jActuel.id, caseToCheck);
            });

            break;

        case (typeDeCase === "question"):

            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                console.log(jActuel.id);

                //poser une question
                fnAfficheQuestion(jActuel.id);

            });

            break;
        case (typeDeCase === "chance"):
            console.log(typeDeCase);
            sleep(dureeDeplacementMS + 1000).then(() => {

                fnAfficheChance(jActuel.id);
            });

            break;
        case (typeDeCase === "cfc"):
            // ne rien faire, code géré plus bas par la fonction fnPasserCFC(joueurId) {
            break;
    }

    jActuel++;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function  fnPasserCFC(joueurId) {
    console.log("Passer ton cfc " +joueurId);
    joueurs[joueurId].caseActuelle = 24;

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
            joueurs[joueurId].deplacerPion(-joueurs[joueurId].caseActuelle);
            joueurs[joueurId].argent -= 1000;
            //passer au joueur suivant
            jActuel++;
        }
    });


}