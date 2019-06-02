/*todo
*  - Attendre que le dé soit lancé
*  - Actualiser l'affichage des éléments sur le plateau
*  - Regarder l'effet qu'a la case sur la quel le joueur se trouve actuellement
*  - appliquer l'effet
*  - joueur suivant
*  - Recommencer
* */

//cette fonction sera la fonction principale qui liera toutes les autres pour rendre le jeu fonctionnel
function gameloop(nbJoueurs){
    nbJoueurJouant = nbJoueurs;
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

    //L'origine est placée en decx, decy
    //ctx.translate(decx, decy);

    ctx.drawImage(img_plateau, 18 , 18 , 765 * echelle, 765 * echelle);
    fnAffichePions();

    $("#btn-lancerDe").click(function () { // https://css-tricks.com/snippets/jquery/click-once-and-unbind/
        //désactive le bouton lancer le dé le temps que la fonction n'est pas terminé;
        $("#btn-lancerDe").attr('disabled','disabled');
        console.log("je disable le bouton");


        tourJoueur(0);


    });
}
//fonction qui représente le tour d'un joueur
function tourJoueur(joueurId){
    //crée un nombre aléatoire
    fnLancerDe();
    //Dlplacer le pion en fonction du résultat du dé
    joueurs[joueurId].deplacerPion(resultatDe);

    //redéssiner le plateau de jeu
    ctx.drawImage(img_plateau, 18 , 18 , 765 * echelle, 765 * echelle);

    //redéssiner les pions
    fnAffichePions();

    //vérifier les actions que le joueur doit effectuer
    actionCase(joueurs[joueurId]);

    //appliquer les effet s'il y en a

    //réactiver le bouton à la fin du tour;
    $("#btn-lancerDe").removeAttr('disabled');
}

function actionCase(joueur){

    caseToCheck = joueur.caseActuelle;

    switch (true) {
        //case coin
        case ((caseToCheck % 6) === 0):
            //poser une question
            break;
        //case chance
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
}