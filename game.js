function cylinder(parent, x, y, z, radius, height, material, segments = 12) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, segments),
    material
  );
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}
