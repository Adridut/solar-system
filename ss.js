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

function displayOrbits() {
    if (areOrbitsDisplay === 0) {
        for (i = 0; i < solarSystem.length - 1; i++) {
            scene.add(orbits[i]);
        }
        areOrbitsDisplay = 1;
    } else {
        areOrbitsDisplay = 0;

        for (i = 0; i < solarSystem.length - 1; i++) {
            scene.remove(orbits[i]);
        }
    }
}

function displayAxis() {
    if (areAxisDisplay === 0) {
        areAxisDisplay = 1;
        scene.add(axisHelper);
    } else {
        areAxisDisplay = 0;
        scene.remove(axisHelper);
    }
}

function setLight() {

    if (displaySunlight === 0) {
        scene.remove(fullLight);
        scene.add(sunlight);
        scene.add(weakLight);
        displaySunlight = 1;
    } else {
        //Ambientlight
        scene.remove(sunlight);
        scene.remove(weakLight);
        scene.add(fullLight);
        displaySunlight = 0;
    }
}