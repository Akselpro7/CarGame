
function updatePhysics(dt){
  const forward=keys["w"]||keys["arrowup"];
  const backward=keys["s"]||keys["arrowdown"];
  const left=keys["a"]||keys["arrowleft"];
  const right=keys["d"]||keys["arrowright"];
  const handbrake=keys[" "];

  if(forward) velocity+=18*dt;

  if(backward){
    if(velocity>1) velocity-=34*dt;
    else velocity-=9*dt;
  }

  if(!forward && !backward){
    if(velocity>0) velocity=Math.max(0,velocity-0.55*dt);
    if(velocity<0) velocity=Math.min(0,velocity+0.55*dt);
  }

  if(handbrake) velocity*=Math.max(0,1-2.5*dt);

  const steeringInput=(left?1:0)-(right?1:0);
  steer=smooth(steer,steeringInput,dt*5);

  const speedFactor=Math.min(Math.abs(velocity)/12,1);
  const direction=velocity>=0?1:-1;

  yaw+=steer*1.15*speedFactor*direction*dt;

  car.position.x-=Math.sin(yaw)*velocity*dt;
  car.position.z-=Math.cos(yaw)*velocity*dt;

  car.position.y=Math.sin(performance.now()*0.012)*0.012*
    Math.min(Math.abs(velocity)/10,1);

  car.rotation.y=yaw;
  car.rotation.z=steer*0.035*speedFactor;

  wheelSteer[0].rotation.y=-steer*0.42;
  wheelSteer[1].rotation.y=-steer*0.42;

  for(const wheel of wheels){
    wheel.rotation.x-=velocity*dt*1.8;
  }

  steeringAssembly.rotation.z=-steer*0.75;

  leftArm.rotation.z=-steer*0.10;
  rightArm.rotation.z=-steer*0.10;

  const kmh=Math.round(Math.abs(velocity)*3.6);
  speedDisplay.textContent=kmh.toLocaleString("en-US");

  let gear="1";
  if(velocity<0) gear="R";
  else if(kmh>260) gear="6";
  else if(kmh>180) gear="5";
  else if(kmh>120) gear="4";
  else if(kmh>65) gear="3";
  else if(kmh>25) gear="2";
  else if(kmh<2) gear="N";

  gearDisplay.textContent="GEAR: "+gear;
  rpmDisplay.textContent="RPM: "+Math.round(
    850+Math.min(Math.abs(velocity)*280,7800)
  ).toLocaleString("en-US");

  statusDisplay.textContent=handbrake?"HANDBRAKE":
    backward?"BRAKING / REVERSE":
    forward?"ACCELERATING":"FREE ROAM";
}
