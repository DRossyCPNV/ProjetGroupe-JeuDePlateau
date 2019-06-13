function draw(){
    ctx.drawImage(img_plateau, tbplateau, tbplateau, tplateauxy, tplateauxy);
    fnAffichePions();
    requestAnimationFrame(draw);
}