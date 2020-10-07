function createPlanet(p) {
    const img = new THREE.TextureLoader().load(p.texture);
    geometry = new THREE.SphereBufferGeometry(p.size * planetSize, 32, 32);
    if (p.name === "Sun" || p.name === "EarthNightMap") {
        material = new THREE.MeshBasicMaterial({map: img});
    } else {
        material = new THREE.MeshPhongMaterial({map: img});
    }

    //Bump for solid planets
    if (p.id <= 4 && p.id > 0) {
        material.bumpMap = THREE.ImageUtils.loadTexture(p.bump);
        material.bumpScale = planetSize / 30
    }

    //Specular for the Earth
    if (p.name === "Earth") {
        material.specularMap = THREE.ImageUtils.loadTexture('./textures/earthspec.jpg');
        material.specular = new THREE.Color('#222222'); //Color more dark => Less glowing
    }


    let planet = new THREE.Mesh(geometry, material);
    planet.receiveShadow = true;
    planet.castShadow = true;
    planet.position.set(p.position * planetDistanceFromSun, 0, 0);

    return planet
}

function setBackground() {
    if (!isBackgroundDisplay) {
        scene.add(bg);
        isBackgroundDisplay = true;
    } else {
        scene.remove(bg);
        isBackgroundDisplay = false;
    }
}

function generatePlanets() {
    for (i = 0; i < solarSystemData.length; i++) {
        var planet = solarSystemData[i];
        solarSystem[i] = createPlanet(planet);
        scene.add(solarSystem[i]);
    }

    //Add earth clouds
    solarSystem[6].add(createEarthClouds());

    //Add rings
    solarSystem[1].add(createRing(1024, 72, solarSystemData[1].ringTexture, solarSystemData[1].ringTrans,
        solarSystemData[1].size - 1, solarSystemData[1].size - 3));

    solarSystem[2].add(createRing(915, 64, solarSystemData[2].ringTexture, solarSystemData[2].ringTrans,
        solarSystemData[2].size - 4, solarSystemData[2].size - 8));

}

function createOrbits() {
    let orbits = new Array(8);
    for (i = 0; i < solarSystem.length - 1; i++) {
        var s = solarSystemData[i];
        var geometry = new THREE.TorusBufferGeometry(-(s.position) * planetDistanceFromSun, (s.size * planetSize / 10), 16, 100);
        var material = new THREE.MeshBasicMaterial({color: 0x6897bb});
        orbits[i] = new THREE.Mesh(geometry, material);
        //Orbits are looking down
        orbits[i].lookAt(0, -100, 0);
    }
    return orbits
}

function displayOrbits() {

    if (!areOrbitsDisplay) {
        for (i = 0; i < solarSystem.length - 1; i++) {
            scene.add(orbits[i]);
        }
        areOrbitsDisplay = true;
    } else {

        for (i = 0; i < solarSystem.length - 1; i++) {
            scene.remove(orbits[i]);
        }

        areOrbitsDisplay = false;

    }
}

function displayAxis() {
    if (!areAxisDisplay) {
        areAxisDisplay = true;
        scene.add(axisHelper);
    } else {
        areAxisDisplay = false;
        scene.remove(axisHelper);
    }
}

function setLight() {

    if (!displaySunlight) {
        scene.remove(fullLight);
        scene.add(sunlight);
        scene.add(weakLight);
        displaySunlight = true;
    } else {
        //Ambientlight
        scene.remove(sunlight);
        scene.remove(weakLight);
        scene.add(fullLight);
        displaySunlight = false;
    }
}