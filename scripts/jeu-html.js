

$("#nbJoueurs").change(function () {
    var nbJoueurs = $("#nbJoueurs").val();


    //afficher
    for(var i = 0;i <= nbJoueurs;i++){
        $("#options-joueur"+i.toString()).css("display", "table-row");
    }
    //cacher
    for(var i = nbJoueursMax;i > nbJoueurs;i--){
            $("#options-joueur"+i.toString()).css("display", "none");
        console.log(i);
    }
});

$("#btnPlay").click(function () {
   $("#menu").css("display", "none");
});


