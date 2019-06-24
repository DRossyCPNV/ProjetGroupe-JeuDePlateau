//***********************************************************************************
// Code affichant le menu pour définir les options des joueurs, au début du jeu
//***********************************************************************************
//              - Afficher les options des joueurs (nom, section)
//              - Cacher les options des joueurs
//              * clic sur le bouton "Play"
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// **********************************************************************************

$("#nbJoueurs").change(function () {
    var nbJoueurs = $("#nbJoueurs").val();


    // Afficher les options des joueurs (nom, section)
    for(var i = 0;i < nbJoueurs;i++){
        $("#options-joueur"+i.toString()).css("display", "table-row");
    }
    // Cacher les options des joueurs
    for(var i = nbJoueursMax;i >= nbJoueurs;i--){
            $("#options-joueur"+i.toString()).css("display", "none");
        console.log(i);
    }
});

$("#btnPlay").click(function () {
   $("#menu").css("display", "none");
});


