// Authors : Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// SI-CA2a - november 2019 - updated in 2026 - CPNV school

//***********************************************************************************
// Code affichant le menu pour définir les options des joueurs, au début du jeu
//***********************************************************************************
//              - Afficher les options des joueurs (nom, section)
//              - Cacher les options des joueurs
//              * clic sur le bouton "Play"

$("#nbJoueurs").change(function () {
    var nbJoueurs = parseInt($("#nbJoueurs").val());
    var nbJoueursMax = 6;

    // Afficher les options des joueurs (nom, section)
    for (var i = 0; i < nbJoueurs; i++) {
        $("#options-joueur" + i).css("display", "table-row");
    }

    // Cacher les options des joueurs restants
    for (var j = nbJoueurs; j < nbJoueursMax; j++) {
        $("#options-joueur" + j).css("display", "none");
    }
});

$("#btnPlay").click(function () {
   $("#menu").css("display", "none");
});




