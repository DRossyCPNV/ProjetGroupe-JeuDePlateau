// *****************************************************************************
// Fonction d'animation
// *****************************************************************************
//              - dessine dans le canvas une image fournie en argument,
//				depuis un coin haut-gauche X et Y, dans une largeur X et hauteur Y.
//				Puis appelle la fonction qui affiche les pions et
//				elle-même de façon récursive (fonction encore en beta, requestAnimationFrame)
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// *****************************************************************************

function draw(){
    ctx.drawImage(img_plateau, tbplateau, tbplateau, tplateauxy, tplateauxy);
    fnAffichePions();
    requestAnimationFrame(draw);
}