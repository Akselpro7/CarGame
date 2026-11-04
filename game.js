function cylinder(parent,x,y,z,radius,height,mat,segments=12){
 const mesh=new THREE.Mesh(
  new THREE.CylinderGeometry(radius,radius,height,segments),
  mat
 );
 mesh.position.set(x,y,z);
 parent.add(mesh);
 return mesh;
}

function rand(a,b){
 return a+Math.random()*(b-a);
}

function dist(a,b){
 return Math.hypot(a.x-b.x,a.z-b.z);
}
