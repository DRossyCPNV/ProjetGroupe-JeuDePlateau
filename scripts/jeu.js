	//Ce programme va devenir un programme de dessin 
	//avec des boutons pour dessiner différentes choses

	var c = document.getElementById("plateau_jeu");
	var ctx = c.getContext("2d");
	
	// Le reste du script ici...
	var img= new Image();
	
	//paramètre de dessin
	var echelle=1.2; //pour pouvoir zoomer
	var angle=0;// pour pouvoir tourner
	var decx=400; var decy=400; //origine au milieu du plateau de jeu
	var tcx=50;//taille carte en x
	var tcy=100;
	var ncartes=9;//nombre de carte par coté (sans compter les coins)
	
	//Données
	var cartes = [{titre:"SI-CA1a",texte:"fpa info 1° année, les meilleurs !!!",couleur:"blue",cote:1,ordre:1},
					{titre:"SI-CA2a",texte:"fpa info 2° année, CFC au bout !!!",couleur:"blue",cote:2,ordre:2},
					{titre:"SI-C1",texte:"cfc info 1° année, facile !!!",couleur:"red",cote:3,ordre:4},
					{titre:"SI-C2",texte:"cfc info 2° année, ça vient dur !!!",couleur:"red",cote:1,ordre:5}];
					
	var JScartes = JSON.stringify(cartes,null, "\t"); //convertir en vrai JSON
	var acartes= JSON.parse(JScartes); //convertir en tableau

	
	function fnEfface(){
	//Effacement du canvas
		ctx.clearRect(0,0,c.width,c.height);
	}
	
	function fnCarte(n){
	//Cette fonction dessine une carte
	
		//dessin du rectangle autour
		ctx.lineWidth=2*echelle;//2 pixels de largeur de trait
		
		//Si on n'est pas dans la rangée 1, il faut tourner
		var angle= (acartes[n].cote-1)*Math.PI/2;
		ctx.rotate(angle);
		
		//Dessin du cadre de la carte
		fnRect((ncartes/2-acartes[n].ordre)*tcx,ncartes/2*tcx,tcx,tcy,"lightgreen","black");
		//Dessin du haut de la carte
		fnRect((ncartes/2-acartes[n].ordre)*tcx,ncartes/2*tcx,tcx,tcy*0.2,acartes[n].couleur,"black");
				
		//Ecriture
		ctx.textAlign="center";
		ctx.font=8*echelle + "pt Arial";
		fnText(acartes[n].titre,(ncartes/2+0.5-acartes[n].ordre)*tcx,(ncartes/2)*tcx+0.5*tcy,"black")

		//
		ctx.rotate(-angle);
		
	}
	
	function fnRect(x,y,lx,ly,c1,c2){
	//Cette fonction dessine un rectangle 
	//Dessine un texte intelligent, dans une couleur donnée tenant compte du coté et de l'échelle

		if (c1!=0){
			ctx.fillStyle=c1;//couleur du trait			
			ctx.fillRect(echelle*x,echelle*y,echelle*lx,echelle*ly);
		}
		if (c2!=0){
			ctx.strokeStyle=c2;//couleur du trait
			ctx.strokeRect(echelle*x,echelle*y,echelle*lx,echelle*ly);
		}
	}
	function fnText(t,x,y,c){
		//Dessine un texte intelligent, dans une couleur donnée tenant compte de l'échelle
		ctx.fillStyle=c;
		ctx.fillText(t,echelle*x,echelle*y);
	}
	
	function fnJeu(){
		//Cette fonction dessind le plateau de jeu entier
		ctx.translate(decx,decy); //on place l'origine en decx, decy
		
		//Dessin du carré (plateau jaune)
		fnRect(-ncartes/2*tcx-tcy,-ncartes/2*tcx-tcy,2*tcy+ncartes*tcx,2*tcy+ncartes*tcx,"yellow","black")
		
		//Dessin de toutes les cartes
		for (i=0;i<acartes.length;i++) {
			fnCarte(i);
		
		}
		ctx.translate(-decx,-decy); //on place l'origine en decx, 
	
	}
	