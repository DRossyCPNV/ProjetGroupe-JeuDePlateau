/*todo
*  - Attendre que le dé soit lancé.
*  - Actualiser l'affichage des éléments sur le plateau
*  - Regarder l'effet qu'a la case sur la quel le joueur se trouve actuellement
*  - appliquer l'effet
*  - joueur suivant
*  - Recommencer
* */
//permet de vérifier si la réponse à la question à été validée
$("#btn-verif").click(function () {
    $(this).data('clicked', true);
});

//cette fonction sera la fonction principale qui liera toutes les autres pour rendre le jeu fonctionnel
function gameloop(nbJoueurs) {
    var nbJoueurJouant = nbJoueurs;
    var jActuel = 0;
    //crée les joueurs
    joueurs = maker(nbJoueurs);
    //message d'info dans la console
    for (var i = 0; i < nbJoueurs; i++) {
        // pour test
        console.log("joueur : " + i + ", Nom: " + joueurs[i].nom + ", Couleur: " + joueurs[i].couleur + ", Section: " + joueurs[i].section + ", id: " + joueurs[i].id + ", emplacement: " + joueurs[i].emplacementCase + ", case actuel: " + joueurs[i].caseActuelle);
    }
    //placer tout les joueur sur la case départ
    for (i = 0; i < nbJoueurs; i++) {
        joueurs[i].placerPionCaseDepart();
    }

    draw();

    $("#btn-lancerDe").click(function () { // https://css-tricks.com/snippets/jquery/click-once-and-unbind/
        //désactive le bouton lancer le dé le temps que la fonction n'est pas terminé;
        if(joueurs[jActuel].passeTour === 0){
            $("#btn-lancerDe").attr('disabled', 'disabled');
            console.log("je disable le bouton");

            //crée un nombre aléatoire
            fnLancerDe();

            //attendre que le dé a finit de tourner
            sleep(1000).then(() => {
                tourJoueur(jActuel);
            });
        }
        else{
            joueurs[jActuel].passeTour = 0;
        }
        if (jActuel < nbJoueurJouant - 1) {
            jActuel++;
        } else {
            jActuel = 0;
        }

    });
}

//fonction qui représente le tour d'un joueur
function tourJoueur(joueurId) {

    //Deplacer le pion en fonction du résultat du dé
    joueurs[joueurId].deplacerPion(resultatDe);
    console.log("je met déplace de: " + resultatDe);

    //vérifier les actions que le joueur doit effectuer
    console.log("le déplacement prend " + dureeDeplacementMS + "ms");
    actionCase(joueurs[joueurId]);

    //appliquer les effet s'il y en a

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
                //demander si le joueur veut acheter la case
            });

            break;

        case (typeDeCase === "question"):

            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                console.log(joueurActuel.id);
                //poser une question
                fnAfficheQuestion(joueurActuel.id);

                // //on attend que la réponse soit validée
                // while($("#btn-verif").data('clicked')){
                //     fnAfficheQuestion(joueurActuel.id);
                // }
                // if (fnVerifReponseQuestion() === true) {
                //     joueurActuel.nbTestReussi++;
                //     console.log("Voici mes point" + joueurActuel.nbTestReussi);
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
        case (typeDeCase === "cfc"):
            sleep(dureeDeplacementMS + 1000).then(() => {
                console.log(typeDeCase);
                //case CFC
            });

            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}