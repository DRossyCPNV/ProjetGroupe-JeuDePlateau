function draw(){
    ctx.drawImage(img_plateau, 10, 10, 770 * echelle, 770 * echelle);
    fnAffichePions();
    requestAnimationFrame(draw);
}