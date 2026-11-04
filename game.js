function toggleDriving(){
 if(driving){
  driving=false;
  player.position.copy(car.position);
  player.position.x+=4;
  player.rotation.y=yaw;
  player.visible=true;
  showMessage("YOU EXITED THE CAR");
 }else if(dist(player.position,car.position)<8){
  driving=true;
  player.visible=false;
  showMessage("YOU ENTERED THE CAR");
 }else{
  showMessage("GET CLOSER TO YOUR CAR");
 }
}
