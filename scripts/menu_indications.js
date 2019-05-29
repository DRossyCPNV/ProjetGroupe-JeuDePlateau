//en fonction du tour changer le background joueur
//en fonction du tour changer afficher le bouton lancer dé
//en fonction du nombre de joueur modifier la taille de la fenêtre en hauteur

setInterval(function creerDivJoueurs () {
    //Récupère le nombre de joueurs
    var nbJoueurs = document.getElementById('nbJoueurs').value;
    
    //Créer un tableau contenant les scores des joueurs
    var pointsSavoirJoueurs = new Array(nbJoueurs);
    pointsSavoirJoueurs[0] = 100; //pour test
    
    //Afficher le nombre de joueurs dans la menu des indications
    document.getElementById('menu_indications_tours').innerHTML = 'Nombres de joueurs : ' + nbJoueurs;

    //Créer le divs en fonction du nombre de joueurs
    var divJoueurs = '';
    for (i = 0; i < nbJoueurs; ++i){

        //Définit la section du joueur i
        var couleur_section = 'section_';
        switch(document.getElementById('sectionJ' + i).value){
            case 'Informatique':   couleur_section += 'info';
                                   break;
            case 'Polyméchanique': couleur_section += 'media';
                                   break;
            case 'Médiamaticien':  couleur_section += 'meca';
                                   break;
            default:               couleur_section = '';
                                   break;
        }

        divJoueurs += '<div id="menu_indications_nomJ' + i + '" class="menu_indications_joueur">' + '\n'
                    + '<div class="menu_indications_joueur_informations">' + '\n'
                    + '<div class="menu_indications_joueur_nom">' + '\n'
                    + document.getElementById('nomJ' + i).value
                    + '</div>' + '\n'
                    + '<div class="menu_indications_joueur_section ' + couleur_section + '">' + '\n'
                    + document.getElementById('sectionJ' + i).value
                    + '</div>' + '\n'
                    + '</div>' + '\n'
                    + '<div class="menu_indications_joueur_modules">' + '\n'
                    + 'Modules' + '\n'
                    + '</div>' + '\n'
                    + '<div class="menu_indications_joueur_pointsSavoir">' + '\n'
                    + 'Points de savoir : ' + pointsSavoirJoueurs[i] + '\n'
                    + '</div>' + '\n'
                    + '</div>' + '\n';
    }

    //Insérer des divs joueurs dans le code HTML
    document.getElementById('menu_indications_joueurs').innerHTML = divJoueurs;
}, 500);