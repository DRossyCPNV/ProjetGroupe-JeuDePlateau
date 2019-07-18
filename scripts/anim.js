// *****************************************************************************
// Fonction d'animation des pions et d'affichage du plateau
// *****************************************************************************
//              -   dessine le plateau dans le canvas avec, comme paramètres :
//                  (1) l'image du plateau
//                  (2) l'espacement bord-plateau
//                  (3) la taille du plateau dans le canevas (carré).
//				    Puis on appelle la fonction qui affiche les pions, définie dans affichage.js.
//	                Ensuite la fonction s'appelle elle-même, de façon récursive.
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juillet 2019 - CPNV
// *****************************************************************************

function draw(){
    ctx.drawImage(img_plateau, tbplateau, tbplateau, tplateauxy, tplateauxy);
    fnAffichePions();
    requestAnimationFrame(draw);
}