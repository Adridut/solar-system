_RingGeometry = function ( innerRadius, outerRadius, thetaSegments ) {

    THREE.Geometry.call( this );

    innerRadius	= innerRadius || 0;
    outerRadius	= outerRadius || 50;
    thetaSegments	= thetaSegments	|| 8;

    var normal	= new THREE.Vector3( 0, 0, 1 );

    for(var i = 0; i < thetaSegments; i++ ){
        var angleLo	= (i / thetaSegments) *Math.PI*2;
        var angleHi	= ((i+1) / thetaSegments) *Math.PI*2;

        var vertex1	= new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
        var vertex2	= new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
        var vertex3	= new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
        var vertex4	= new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

        this.vertices.push( vertex1 );
        this.vertices.push( vertex2 );
        this.vertices.push( vertex3 );
        this.vertices.push( vertex4 );


        var vertexIdx	= i * 4;

        // Create the first triangle
        var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
        var uvs = [];

        var uv = new THREE.Vector2(0, 0);
        uvs.push(uv);
        var uv = new THREE.Vector2(1, 0);
        uvs.push(uv);
        var uv = new THREE.Vector2(0, 1);
        uvs.push(uv);

        this.faces.push(face);
        this.faceVertexUvs[0].push(uvs);

        // Create the second triangle
        var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
        var uvs = [];

        var uv = new THREE.Vector2(0, 1);
        uvs.push(uv);
        var uv = new THREE.Vector2(1, 0);
        uvs.push(uv);
        var uv = new THREE.Vector2(1, 1);
        uvs.push(uv);

        this.faces.push(face);
        this.faceVertexUvs[0].push(uvs);
    }

    // this.computeCentroids();
    this.computeFaceNormals();

    this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), outerRadius );

};
_RingGeometry.prototype = Object.create( THREE.Geometry.prototype );

createRing	= function(width, height, texture, trans, innerRadius, outerRadius){
    // create destination canvas
    var canvasResult	= document.createElement('canvas');
    canvasResult.width	= width;
    canvasResult.height	= height;
    var contextResult	= canvasResult.getContext('2d');

    var imageMap	= new Image();
    imageMap.addEventListener("load", function() {

        var canvasMap	= document.createElement('canvas');
        canvasMap.width	= imageMap.width;
        canvasMap.height= imageMap.height;
        var contextMap	= canvasMap.getContext('2d');
        contextMap.drawImage(imageMap, 0, 0);
        var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

        var imageTrans	= new Image();
        imageTrans.addEventListener("load", function(){
            var canvasTrans		= document.createElement('canvas');
            canvasTrans.width	= imageTrans.width;
            canvasTrans.height	= imageTrans.height;
            var contextTrans	= canvasTrans.getContext('2d');
            contextTrans.drawImage(imageTrans, 0, 0);
            var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
            // merge dataMap + dataTrans into dataResult
            var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height);
            for(var y = 0, offset = 0; y < imageMap.height; y++){
                for(var x = 0; x < imageMap.width; x++, offset += 4){
                    dataResult.data[offset]	= dataMap.data[offset];
                    dataResult.data[offset+1]	= dataMap.data[offset+1];
                    dataResult.data[offset+2]	= dataMap.data[offset+2];
                    dataResult.data[offset+3]	= 255 - dataTrans.data[offset]/2
                }
            }
            // update texture with result
            contextResult.putImageData(dataResult,0,0);
            material.map.needsUpdate = true;
        });
        imageTrans.src	= trans;
    }, false);
    imageMap.src	= texture;

    var geometry	= new _RingGeometry(innerRadius, outerRadius, 64);
    var material	= new THREE.MeshPhongMaterial({
        map		: new THREE.Texture(canvasResult),
        side		: THREE.DoubleSide,
        transparent	: true,
        opacity		: 0.8
    });
    var mesh	= new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.lookAt(new THREE.Vector3(0.5,-4,1));
    return mesh
};

//Mostly took from http://jeromeetienne.github.io/threex.planets/examples/select.html#Earth
function createEarthClouds() {

    // create destination canvas
    var canvasResult = document.createElement('canvas');
    canvasResult.width = 1024;
    canvasResult.height = 512;
    var contextResult = canvasResult.getContext('2d');

    // load earthcloudmap
    var imageMap = new Image();
    imageMap.addEventListener("load", function () {

        // create dataMap ImageData for earthcloudmap
        var canvasMap = document.createElement('canvas');
        canvasMap.width = imageMap.width;
        canvasMap.height = imageMap.height;
        var contextMap = canvasMap.getContext('2d');
        contextMap.drawImage(imageMap, 0, 0);
        var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

        // load earthcloudmaptrans
        var imageTrans = new Image();
        imageTrans.addEventListener("load", function () {
            // create dataTrans ImageData for earthcloudmaptrans
            var canvasTrans = document.createElement('canvas');
            canvasTrans.width = imageTrans.width;
            canvasTrans.height = imageTrans.height;
            var contextTrans = canvasTrans.getContext('2d');
            contextTrans.drawImage(imageTrans, 0, 0);
            var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
            // merge dataMap + dataTrans into dataResult
            var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height);
            for (var y = 0, offset = 0; y < imageMap.height; y++) {
                for (var x = 0; x < imageMap.width; x++, offset += 4) {
                    dataResult.data[offset] = dataMap.data[offset];
                    dataResult.data[offset + 1] = dataMap.data[offset + 1];
                    dataResult.data[offset + 2] = dataMap.data[offset + 2];
                    dataResult.data[offset + 3] = 255 - dataTrans.data[offset];
                }
            }
            // update texture with result
            contextResult.putImageData(dataResult, 0, 0);
            cloudMaterial.map.needsUpdate = true;
        });
        imageTrans.src = './textures/earthcloudmaptrans.jpg';
    }, false);
    imageMap.src = './textures/earthcloudmap.jpg';

    var cloudGeometry = new THREE.SphereGeometry((2.6 * planetSize * earthSize), 32, 32);
    var cloudMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.Texture(canvasResult),
        side: THREE.DoubleSide,
        opacity: 0.8,
        transparent: true,
        depthWrite: false
    });
    var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    return cloudMesh;
}


//Raycaster
// window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    event.preventDefault();
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    click = false;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function onDocumentClick(event) {

    event.preventDefault();
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    click = true;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}