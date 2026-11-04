/* ADMIN VEHICLE SPAWNER */

const adminCars = [];

window.spawnAdminCar = function(){
 if(crashed) return;

 const color = Number(document.getElementById("spawnColor").value);

 const carGroup = new THREE.Group();

 const bodyMaterial = new THREE.MeshStandardMaterial({
  color: color,
  metalness: .65,
  roughness: .25
 });

 const body = new THREE.Mesh(
  new THREE.BoxGeometry(3.5,1.1,6),
  bodyMaterial
 );
 body.position.y = 1;
 carGroup.add(body);

 const cabin = new THREE.Mesh(
  new THREE.BoxGeometry(2.7,.9,2.8),
  new THREE.MeshStandardMaterial({
   color:0x182b3d,
   metalness:.3,
   roughness:.2
  })
 );
 cabin.position.set(0,1.85,-.1);
 carGroup.add(cabin);

 const wheelMaterial = new THREE.MeshStandardMaterial({
  color:0x090909,
  roughness:.9
 });

 for(const x of [-1.7,1.7]){
  for(const z of [-2,2]){
   const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(.48,.48,.3,16),
    wheelMaterial
   );
   wheel.rotation.z=Math.PI/2;
   wheel.position.set(x,.5,z);
   carGroup.add(wheel);
  }
 }

 // Spawn in front of the player's car
 const distance = 18;
 carGroup.position.set(
  car.position.x - Math.sin(yaw)*distance,
  0,
  car.position.z - Math.cos(yaw)*distance
 );

 carGroup.rotation.y = yaw;

 scene.add(carGroup);
 adminCars.push(carGroup);
};

window.spawnFiveCars = function(){
 for(let i=0;i<5;i++){
  spawnAdminCar();

  const carGroup=adminCars[adminCars.length-1];
  carGroup.position.x += (i-2)*7;
  carGroup.position.z -= i*5;
 }
};

window.clearAdminCars = function(){
 for(const spawnedCar of adminCars){
  scene.remove(spawnedCar);
  spawnedCar.traverse(obj=>{
   if(obj.geometry)obj.geometry.dispose();
   if(obj.material){
    if(Array.isArray(obj.material)){
     obj.material.forEach(m=>m.dispose());
    }else{
     obj.material.dispose();
    }
   }
  });
 }
 adminCars.length=0;
};

// F1 ADMIN MENU
addEventListener("keydown",function(e){
 if(e.key==="F1"){
  e.preventDefault();
  const panel=document.getElementById("adminPanel");
  panel.style.display=
   panel.style.display==="none"?"block":"none";
 }
});
