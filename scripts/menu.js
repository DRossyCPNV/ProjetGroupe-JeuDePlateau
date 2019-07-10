// **************************************************************************************
// Code d'affichage / masquage du menu des joueurs
// **************************************************************************************
// Ce script a pour but de sélectionner et d'afficher une carte chance depuis le fichier Json "chances.json"
// Il a aussi pour but d'appliquer les effets de ces cartes chances sur le ou les joueurs.
//
//              - créer un tableau objet joueur
//              - attribution des paramètres au joueur (id, couleur de pion, somme d'argent de départ et section)
//              - placement des pions sur la case départ
//              - placement d'un pion sur la case CFC
//              - retourne le nombre de joueurs se trouvant sur une case passée en paramètre
//              - retourne le prochain emplacement vide d'une case sur le plateau
//              - déplace le pion petit à petit jusqu'à une case d'arrivée
//              - déplace le pion petit à petit jusqu'à un emplacement vide d'une case
//
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juillet 2019 - CPNV
// **************************************************************************************


$("#btn-start").click(function () {
    $("#cfg-bg").css("visibility","visible").css("opacity","1");
});
$("#croix").click(function () {
    $("#cfg-bg").css("visibility","hidden").css("opacity","0");
});
