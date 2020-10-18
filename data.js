//Planets data

const planetSize = 1 / 2;
const sunSize = 0.5;
const earthSize = 1;


const solarSystemData = [
    {
        name: "TEST",
        texture: './textures/neptunemap.jpg',
        size: 27.7,
        position: -700,
        speed: 0,
        rotation: 0.671,
        mass: 1.02413*10^26,
        id: 9
    },
    {
        name: "Neptune",
        texture: './textures/neptunemap.jpg',
        size: 7.7,
        position: -731.1,
        speed: 60190.03,
        rotation: 0.671,
        mass: 1.02413*10^26,
        id: 8
    },
    {
        name: "Uranus",
        texture: './textures/uranusmap.jpg',
        size: 10,
        position: -604.6,
        speed: 30687.15,
        rotation: -0.718,
        mass: 8.6810*10^25,
        id: 7,
        ringTexture: './textures/uranusringcolour.jpg',
        ringTrans:'./textures/uranusringtrans.gif'
    },
    {
        name: "Saturn",
        texture: './textures/saturnmap.jpg',
        size: 23.4,
        position: -474.2,
        speed: 10755.70,
        rotation: 0.437,
        mass: 5.6834*10^26,
        id: 6,
        ringTexture: './textures/saturnringcolor.jpg',
        ringTrans: './textures/saturnringpattern.gif'
    },
    {
        name: "Jupiter",
        texture: './textures/jupitermap.jpg',
        size: 28.5,
        position: -379.1,
        // position: 778340000,
        speed: 4332.82,
        rotation: 0.423,
        mass: 1.8982*10^27,
        id: 5,
        dValue: 1.496 * Math.pow(10, 11),
        dSpeed: 0,
        aValue: Math.PI / 6,
        aSpeed: 1.990986 *  Math.pow(10, -7)
    },
    {
        name: "Mars",
        texture: './textures/marsmap.jpg',
        bump: './textures/marsbump.jpg',
        size: 1.4,
        position: -312.4,
        speed: 686.98,
        rotation: 1.02,
        mass: 6.4171 * 10^23,
        id: 4
    },
    {
        name: "EarthNightMap",
        texture: './textures/earthlights.jpg',
        bump: './textures/earthbump.jpg',
        size: 2.6 * earthSize,
        position: -303.2,
        speed: 365.26,
        mass: 5.97237 * 10^24,
        rotation: 1
    },
    {
        name: "Earth",
        texture: './textures/earthmap.jpg',
        bump: './textures/earthbump.jpg',
        size: 2.6 * earthSize,
        position: -303.2 + (earthSize * planetSize) / 10, //A value is added to separate the two earth maps
        speed: 365.26,
        rotation: 1,
        mass: 5.97237 * 10^24,
        id: 3
    },
    {
        name: "Venus",
        texture: './textures/venusmap.jpg',
        bump: './textures/venusbump.jpg',
        size: 2.5,
        position: -295.3,
        speed: 224.7,
        rotation: -243.02,
        mass: 4.8675 * 10^24,
        id: 2
    },
    {
        name: "Mercury",
        texture: './textures/mercurymap.jpg',
        bump: './textures/mercurybump.jpg',
        size: 1.0,
        position: -288.41,
        speed: 87.97,
        rotation: 58.55,
        mass: 3.3011 * 10^23,
        id: 1
    },
    {
        name: "Sun",
        texture: './textures/sunmap.jpg',
        size: 283.4 * sunSize,
        position: 0,
        rotation: 26,
        mass: 1.9885*10^30,
        id: 0
    }
];