// *****************************************************************************
// Fonction d'affichage du plateau
// *****************************************************************************
//              -  dessine le plateau dans le canvas avec, comme paramètres,
//                l'image du plateau, l'espacement bord-plateau et la taille du plateau dans le canevas (carré).
//				Puis on appelle la fonction qui affiche les pions, ensuite elle-même de façon récursive.
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