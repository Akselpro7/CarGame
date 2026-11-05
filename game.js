  // ================= CAR =================
  const car = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff2a6d, metalness: 0.7, roughness: 0.25 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x88aacc, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.65 });
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xd2a679 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0x222233 });

  // Main body
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 5), bodyMat);
  body.position.y = 0.7;
  car.add(body);

  // Hood
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.25, 1.4), bodyMat);
  hood.position.set(0, 1.05, 1.7);
  car.add(hood);

  // Cabin glass
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.65, 2.5), glassMat);
  cabin.position.set(0, 1.3, -0.25);
  car.add(cabin);

  // Trunk
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.35, 1.1), bodyMat);
  trunk.position.set(0, 1.0, -2.1);
  car.add(trunk);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const wheels = [];
  [[-1.15, 1.55], [1.15, 1.55], [-1.15, -1.65], [1.15, -1.65]].forEach(([x, z]) => {
    const w = new THREE.Mesh(wheelGeo, wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(x, 0.42, z);
    car.add(w);
    wheels.push(w);
  });

  // ===== INTERIOR =====
  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 3.4), darkMat);
  floor.position.set(0, 0.85, -0.2);
  car.add(floor);

  // Dashboard
  const dash = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.35, 0.6), darkMat);
  dash.position.set(0, 1.25, 1.15);
  car.add(dash);

  // Center console
  const console = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 1.6), darkMat);
  console.position.set(0, 1.05, 0.2);
  car.add(console);

  // Seats
  // Driver seat
  const driverSeat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.85), seatMat);
  driverSeat.position.set(-0.55, 1.05, -0.3);
  car.add(driverSeat);
  const driverBack = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 0.15), seatMat);
  driverBack.position.set(-0.55, 1.4, -0.7);
  car.add(driverBack);

  // Passenger seat
  const passSeat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.85), seatMat);
  passSeat.position.set(0.55, 1.05, -0.3);
  car.add(passSeat);
  const passBack = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 0.15), seatMat);
  passBack.position.set(0.55, 1.4, -0.7);
  car.add(passBack);

  // ===== DRIVER =====
  // Body
  const driverBody = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.35), shirtMat);
  driverBody.position.set(-0.55, 1.45, -0.25);
  car.add(driverBody);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), skinMat);
  head.position.set(-0.55, 1.85, -0.2);
  car.add(head);

  // Arms (holding steering wheel)
  const armGeo = new THREE.BoxGeometry(0.12, 0.12, 0.45);
  const leftArm = new THREE.Mesh(armGeo, shirtMat);
  leftArm.position.set(-0.75, 1.45, 0.15);
  leftArm.rotation.x = -0.6;
  car.add(leftArm);

  const rightArm = new THREE.Mesh(armGeo, shirtMat);
  rightArm.position.set(-0.35, 1.45, 0.15);
  rightArm.rotation.x = -0.6;
  car.add(rightArm);

  // Steering wheel
  const steering = new THREE.Mesh(
    new THREE.TorusGeometry(0.28, 0.04, 8, 24),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  steering.position.set(-0.55, 1.35, 0.55);
  steering.rotation.x = -0.4;
  car.add(steering);

  // Hands on wheel
  const handGeo = new THREE.SphereGeometry(0.07, 8, 8);
  const leftHand = new THREE.Mesh(handGeo, skinMat);
  leftHand.position.set(-0.75, 1.32, 0.55);
  car.add(leftHand);

  const rightHand = new THREE.Mesh(handGeo, skinMat);
  rightHand.position.set(-0.35, 1.32, 0.55);
  car.add(rightHand);

  scene.add(car);
  car.position.set(0, 0, 0);
