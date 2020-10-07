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