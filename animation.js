function rotationAroundSun() {

    for (i = 0; i < solarSystem.length - 1; i++) {
        solarSystem[i].position.x += ((solarSystem[i].position.z / solarSystemData[i].speed * speedAdjustment) * time);
        solarSystem[i].position.z += -((solarSystem[i].position.x / solarSystemData[i].speed * speedAdjustment) * time);
    }
}


function selfRotation() {
    for (i = 0; i < solarSystem.length; i++) {
        solarSystem[i].rotation.y += ((rotationAjustment / solarSystemData[i].rotation) * time);
    }
}

//Timer
function incrementSeconds() {
    seconds += 1;
    modelTime += time;
    el.innerText = "You have been here for " + seconds + " seconds, "
        + modelTime + " days according to this model. \n 1 real second = " + time + " model day(s)";
}

function render() {

    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    i = 0;
    j = 0;

    if (intersects[0]) {
        while (i < solarSystem.length) {
            if (intersects[0].object === solarSystem[i]) {
                planetName.innerText = solarSystemData[i].name;

                if (click) {
                    console.log(solarSystemData[i].name);
                    newX = solarSystem[i].position.x;
                    while (j < solarSystem.length) {
                        //TODO make sure planets still rotate around sun and not the new (0,0,0) planet
                        solarSystem[j].position.set(solarSystem[j].position.x - newX, 0, 0);
                        sunlight.position.set(solarSystem[9].position.x, solarSystem[9].position.y, solarSystem[9].position.z);
                        camera.position.set(0, 0, solarSystemData[i].size);
                        j = j + 1;
                    }
                    // camera.position.set(solarSystem[i].position.x, solarSystem[i].position.y, solarSystem[i].position.z + 400);
                    // camera.lookAt(solarSystem[i].position.x, solarSystem[i].position.y, solarSystem[i].position.z);
                    // controls.update();
                    click = false
                }
            }
            i = i + 1;
        }
    } else {
        planetName.innerText = '';
    }


    renderer.render(scene, camera);

}

// function calculateDistanceAcceleration(state) {
//     return state.dValue * Math.pow(state.aSpeed, 2) -
//         (g * 1.98855 * Math.pow(10, 30)) / Math.pow(state.dValue, 2);
// }
//
// function calculateAngleAcceleration(state) {
//     return -2.0 * state.dSpeed * state.aSpeed / state.dValue;
//  }
//
// function newValue(currentValue, time, derivative) {
//     return (currentValue + time * derivative);
// }