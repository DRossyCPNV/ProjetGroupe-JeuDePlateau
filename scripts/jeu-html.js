// *****************************************************************************
// Options des joueurs dans le menu
// *****************************************************************************
//              - changement du nombre de joueurs
//              - afficher les options des joueurs (nom, section)
//              - cacher les options des joueurs
//
// Laurent Barraud, Bastian Chollet, Luca Coduri,
// Guillaume Duvoisin, Guilain Mbayo & David Rossy
// Un projet mandaté par M. Chavey.
// SI-CA1a - juin 2019 - CPNV
// *****************************************************************************

$("#nbJoueurs").change(function () {
    var nbJoueurs = $("#nbJoueurs").val();


    //afficher les options des joueurs (nom, section)
    for(var i = 0;i < nbJoueurs;i++){
        $("#options-joueur"+i.toString()).css("display", "table-row");
    }
    //cacher les options des joueurs
    for(var i = nbJoueursMax;i >= nbJoueurs;i--){
            $("#options-joueur"+i.toString()).css("display", "none");
        console.log(i);
    }
});

$("#btnPlay").click(function () {
   $("#menu").css("display", "none");
});


