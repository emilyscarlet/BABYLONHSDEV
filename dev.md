# Code Documentation


## element 1
Animation.ts
```Javascript
import { Animation, Color3, Vector3 } from "@babylonjs/core";

interface PositionArray {
    frame: number;
    value: number;
}

interface ScaleArray {
    frame: number;
    value: Vector3;
}

interface colorArray {
    frame: number;
    value: Color3;
}

export const frameRate = 30;

export function createxSlide(frameRate: number){
    const xSlide = new Animation(
        "xSlide",
        "position.x",
        frameRate,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesX: PositionArray[] = [];
    keyFramesX.push({ frame: 0, value: 2 });
    keyFramesX.push({ frame: frameRate, value: -2 });
    keyFramesX.push({ frame: (2 * frameRate)-1, value: (-2 + (4 * ( frameRate /2) / ((frameRate/2) -1))) });

    xSlide.setKeys(keyFramesX);
    return xSlide
}

export function createySlide(frameRate: number){
    const ySlide = new Animation(
        "ySlide",
        "position.y",
        frameRate,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesY: PositionArray[] = [];
    keyFramesY.push({ frame: 0, value: 2 });
    keyFramesY.push({ frame: frameRate / 2, value: 1 });
    keyFramesY.push({ frame: frameRate, value: 2 });
    keyFramesY.push({ frame: frameRate* 3 / 2, value: 4 });
    keyFramesY.push({ frame: 2 * frameRate, value: 2 });

    ySlide.setKeys(keyFramesY);

    return ySlide
}

export function createxRotate(frameRate: number){
    const xRotation = new Animation(
        "xRotation",
        "rotation.x",
        frameRate,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesRX: PositionArray[]= [];
    keyFramesRX.push({ frame: 0, value: 0 });
    keyFramesRX.push({ frame: frameRate, value: Math.PI });
    keyFramesRX.push({ frame: 2 * frameRate, value: Math.PI * 2 });

    xRotation.setKeys(keyFramesRX);

    return xRotation
}

export function createyRotate(frameRate: number){
    const yRotation = new Animation(
        "yRotation",
        "rotation.y",
        frameRate,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesRY: PositionArray[]= [];
    keyFramesRY.push({ frame: 0, value: 0 });
    keyFramesRY.push({ frame: frameRate, value: Math.PI });
    keyFramesRY.push({ frame: 2 * frameRate, value: Math.PI * 2 });

    yRotation.setKeys(keyFramesRY);

    return yRotation
}

export function createV3scaling(frameRate: number) {
    const v3scaling = new Animation(
        "v3Scaling",
        "scaling",
        frameRate,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesv3s: ScaleArray[] = [];
    keyFramesv3s.push({ frame: 0, value: new Vector3(1, 2, 3) }),
    keyFramesv3s.push({ frame: 0.66 * frameRate, value: new Vector3(2, 3, 1) });
    keyFramesv3s.push({ frame: 1.32 * frameRate, value: new Vector3(3, 1, 2) });
    keyFramesv3s.push({ frame: 2 * frameRate, value: new Vector3(1, 2, 3) });

    v3scaling.setKeys(keyFramesv3s);

    return v3scaling;
}


export function createColorShift(frameRate: number) {
    const colorShift = new Animation(
        "color3",
        "material.diffuseColor",
        frameRate,
        Animation.ANIMATIONTYPE_COLOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesC3: colorArray [] = [];
    keyFramesC3.push({ frame: 0, value: new Color3(1, 0.5, 0.2) }),
    keyFramesC3.push({ frame: 0.66 * frameRate, value: new Color3(0.5, 0.2, 1) });
    keyFramesC3.push({ frame: 1.32 * frameRate, value: new Color3(0.2, 1, 0.5) });
    keyFramesC3.push({ frame: 2 * frameRate, value: new Color3(1, 0.5, 0.2) });

   colorShift.setKeys(keyFramesC3);

    return colorShift;
}
```
createRunScene.ts
```javascript
import {  } from "@babylonjs/core";

import { SceneData } from "./interfaces";


export default function createRunScene(runScene: SceneData) {
  runScene.scene.onAfterRenderObservable.add(() => {
  // No action, this is a static scene
  });
}
```

createStartScene.ts
```javascript
import { SceneData } from "./interfaces";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  HemisphericLight,
  PointLight,
  SpotLight,
  DirectionalLight,
  Color3,
  ShadowGenerator,
  Engine,
  Texture,
} from "@babylonjs/core";


function createGround(scene: Scene) {
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 3, height: 3 },
    scene
  );
  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.backFaceCulling = false;
  ground.material = groundMaterial;
  groundMaterial.diffuseColor = new Color3(0.1, 1, 0.5);
  return ground;
}

function createSphere(scene: Scene) {
  let sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1, segments: 32 },
    scene
  );
  sphere.position.y = 0;
  var texture = new StandardMaterial("grass1", scene);
  texture.emissiveTexture = new Texture("./src/assets/textures/lavatile.jpg", scene);
  sphere.material = texture;
  return sphere;
}

function createBox(scene: Scene) {
  let box = MeshBuilder.CreateBox(
    "box",
    { width: 1, height: 1 },
    scene
  );
  box.position.x = -1;
  box.position.y = 1;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}

function createCylinder(scene: Scene) {
  let cylinder = MeshBuilder.CreateCylinder(
    "cylinder",
    { height: 1, diameter: 0.7 },
    scene
  );
  cylinder.position.x = 1;
  cylinder.position.y = 1;
  cylinder.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  cylinder.material = texture;
  return cylinder;
}

function createCone(scene: Scene) {
  let cone = MeshBuilder.CreateCylinder(
    "cone",
    { height: 1, diameterBottom: 0.7, diameterTop: 0 },
    scene
  );
  cone.position.x = 1;
  cone.position.y = 1;
  cone.position.z = -1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  cone.material = texture;
  return cone;
}

function createTriangle(scene: Scene) {
  let triangle = MeshBuilder.CreateCylinder(
    "triangle",
    { height: 1, diameter: 0.7, tessellation: 3 },
    scene
  );
  triangle.position.x = -1;
  triangle.position.y = 1;
  triangle.position.z = -1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  triangle.material = texture;
  return triangle;
}

function createCapsule(scene: Scene) {
  let capsule = MeshBuilder.CreateCapsule(
    "capsule",
    { radius: 0.35, height: 1, radiusTop: 0.1 },
    scene
  );
  capsule.position.x = -1;
  capsule.position.y = -1;
  capsule.position.z = -1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 0.6, 0.6);
  capsule.material = texture;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  capsule.material = texture;
  return capsule;
}

function createTorus(scene: Scene) {
  let torus = MeshBuilder.CreateTorus(
    "torus",
    { diameter: 0.7, thickness: 0.6, tessellation: 10 },
    scene
  );
  torus.position.x = -1;
  torus.position.y = -1;
  torus.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(0.6, 0.6, 1);
  torus.material = texture;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  torus.material = texture;
  return torus;
}

function createTube(scene: Scene) {
  const myPath = [
    new Vector3(0.85, -0.85, 0.85),
    new Vector3(0.35, -0.35, 0.35),
  ];

  const tube = MeshBuilder.CreateTube(
    "tube",
    { path: myPath, radius: 0.4, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  tube.material = texture;
  return tube;
}

function createExtrusion(scene: Scene) {
  const myShape = [
    new Vector3(0, 0.7, 0),
    new Vector3(0.2, 0.2, 0),
    new Vector3(0.7, 0, 0),
    new Vector3(0.2, -0.2, 0),
    new Vector3(0, -0.7, 0),
    new Vector3(-0.2, -0.2, 0),
    new Vector3(-0.7, 0, 0),
    new Vector3(-0.2, 0.2, 0),
  ];

  const myPath = [
    new Vector3(0.75, -0.75, -0.2),
    new Vector3(0.75, -0.75, -1.2),
  ];

  const extrusion = MeshBuilder.ExtrudeShape(
    "star",
    {
      shape: myShape,
      closeShape: true,
      path: myPath,
      sideOrientation: Mesh.DOUBLESIDE,
    },
    scene
  );

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  extrusion.material = texture;
  return extrusion;
}

function createOctahedron(scene: Scene) {
  let octahedron = MeshBuilder.CreatePolyhedron(
    "oct",
    { type: 1, size: 0.35 },
    scene
  );
  octahedron.position.x = 0;
  octahedron.position.y = 2.5;
  octahedron.position.z = 0;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/reflectivity.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  octahedron.material = texture;
  return octahedron;
}

function createPlane(scene: Scene) {
  let plane = MeshBuilder.CreatePlane(
    "plane",
    { size: 3, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );
  plane.position.y = 0;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/wood.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  plane.material = texture;
  return plane;
}

function createPlane2(scene: Scene) {
  let plane = MeshBuilder.CreatePlane(
    "plane",
    { size: 3, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );
  plane.position.y = 0;
  plane.rotation = new Vector3(0, Math.PI / 2, 0);

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture("./src/assets/textures/wood.jpg", scene);
  texture.diffuseColor = new Color3(1, 1, 1);
  plane.material = texture;
  return plane;
}

function createLight(scene: Scene) {
  const light = new HemisphericLight(
    "light",
    new Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 0.6 , 0.6);
  light.specular = new Color3(0, 1, 0.4);
  light.groundColor = new Color3(0, 0.2, 0.7);
  return light;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 15,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {

  let scene = new Scene(engine);
  scene.ambientColor = new Color3(1, 1, 1);

  let ground = createGround(scene);
  let sphere = createSphere(scene);
  let box = createBox(scene);
  let cylinder = createCylinder(scene);
  let cone = createCone(scene);
  let triangle = createTriangle(scene);
  let capsule = createCapsule(scene);
  let torus = createTorus(scene);
  let plane = createPlane(scene);
  let tube = createTube(scene);
  let extrusion = createExtrusion(scene);
  let octahedron = createOctahedron(scene);
  let plane2 = createPlane2(scene);
  let lightHemispheric = createLight(scene);
  let camera =createArcRotateCamera(scene);

  let that: SceneData = {
    scene,
    ground,
    sphere,
    box,
    cylinder,
    cone,
    triangle,
    capsule,
    torus,
    plane,
    tube,
    extrusion,
    octahedron,
    plane2,
    lightHemispheric,
    camera
  };
  return that;
}
```
index.ts
```javascript
import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import createRunScene from "./createRunScene";
import "./main.css";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
createRunScene(startScene);

eng.runRenderLoop(() => {
  startScene.scene.render();
});
```

interfaces.ts
```javascript
import {
  Scene,
  Mesh,
  HemisphericLight,
  Camera,
} from "@babylonjs/core";

export interface SceneData {
  scene: Scene,
  ground: Mesh,
  sphere: Mesh,
  box: Mesh,
  cylinder: Mesh,
  cone: Mesh,
  triangle: Mesh,
  capsule: Mesh,
  torus: Mesh,
  plane: Mesh,
  tube: Mesh,
  extrusion: Mesh,
  octahedron: Mesh,
  plane2: Mesh,
  lightHemispheric: HemisphericLight,
  camera: Camera
}
```

main.css
```css
body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

#renderCanvas {
    width: 100%;
    height: 100%;
}
```
index.html
``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shapes</title>
    </head>
    <body> </body>
</html>
<!DOCTYPE html>
<!--https://bootstrap-cheatsheet.themeselection.com/-->
<!--https://getbootstrap.com/docs/5.3/getting-started/introduction/-->
<!--https://blog.getbootstrap.com/ -->
<!--https://www.jsdelivr.com/package/npm/bootstrap -->
<!--https://www.lipsum.com/  -->

<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container-fluid py-5 text-start text-sm-center" >
    <h1 class="display-5 fw-bold">Welcome to my website!</h1>
    <p class="col-md-8 fs-4"><p>Please select games to view games that you want to play!</p>
  </div>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="/assets/icon.png" alt="logo" width="30" height="30"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarBasic">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">Home</a></li>
              <li><a class="dropdown-item" href="/element1/">element 1</a></li>
              <li><a class="dropdown-item" href="/element2/">element 2</a></li>
              <li><a class="dropdown-item" href="/element03/">element 3</a></li>
              <li><a class="dropdown-item" href="/element4/">element 4</a></li>
              <li><a class="dropdown-item" href="/element5/">element 5</a></li>
            </ul>
          </li>

</body>
<script type="module" src="./src/index.ts"></script>
</html>
```
## Element 2
createRunScene
```javascript
import {} from "@babylonjs/core";

import { SceneData } from "./interface ";

export default function createRunScene(runScene: SceneData) {
 

  runScene.scene.onAfterRenderObservable.add(() => {});
}
```
createStartScene
```javascript
import { SceneData } from "./interface ";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  HemisphericLight,
  Color3,
  Engine,
  Texture,
  CubeTexture,
  Nullable,
  Vector4,
  InstancedMesh,
  SpriteManager,
  Sprite
} from "@babylonjs/core";

function createTerrain(scene: Scene) {
    //Create large ground for valley environment
    const largeGroundMat = new StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new Texture(
      "./assets/environments/valleygrass.png"
    );
  
    const largeGround = MeshBuilder.CreateGroundFromHeightMap(
      "largeGround",
      "./assets/environments/villageheightmap.png",
      {
        width: 150,
        height: 150,
        subdivisions: 20,
        minHeight: 0,
        maxHeight: 10,
      },
      scene
    );
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;
  }

  function createGround(scene: Scene) {
    const groundMaterial = new StandardMaterial("groundMaterial");
    groundMaterial.diffuseTexture = new Texture(
      "./assets/environments/villagegreen.png"
    );
    groundMaterial.diffuseTexture.hasAlpha = true;
    groundMaterial.backFaceCulling = false;
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 24, height: 24 },
      scene
    );
    ground.material = groundMaterial;
    ground.position.y = 0.01;
    return ground;
  }

  function createSky(scene: Scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(
      "./assets/textures/skybox/skybox",
      scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    return skybox;
  }

  function createBox(style: number) {
    //style 1 small style 2 semi detatched
    const boxMat = new StandardMaterial("boxMat");
    const faceUV: Vector4[] = []; // faces for small house
    if (style == 1) {
      boxMat.diffuseTexture = new Texture("./assets/textures/cubehouse.png");
      faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //rear face
      faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //front face
      faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); //right side
      faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); //left side
      // faceUV[4] would be for bottom but not used
      // faceUV[5] would be for top but not used
    } else {
      boxMat.diffuseTexture = new Texture("./assets/textures/semihouse.png");
      faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); //rear face
      faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); //front face
      faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); //right side
      faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); //left side
      // faceUV[4] would be for bottom but not used
      // faceUV[5] would be for top but not used
    }
    
    const box = MeshBuilder.CreateBox("box", {
      width: style,
      height: 1,
      faceUV: faceUV,
      wrap: true,
    });
    box.position = new Vector3(0, 0.5, 0);
    box.scaling = new Vector3(1, 1, 1);
    box.material = boxMat;
    return box;
  }


  function createRoof(style: number) {
    const roof = MeshBuilder.CreateCylinder("roof", {
      diameter: 1.3,
      height: 1.2,
      tessellation: 3,
    });
    roof.scaling.x = 0.75;
    roof.scaling.y = style * 0.85;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("./assets/textures/roof.jpg");
    roof.material = roofMat;
    return roof;
  }

  function createCar(scene: Scene) {
    const spriteManagerTrees = new SpriteManager(
      "carManager",
      "./assets/textures/car.png",
      2000,
      { width: 512, height: 1024 },
      scene
    );
  
    //We create trees at random positions
    for (let i = 0; i < 500; i++) {
      const tree: Sprite = new Sprite("car", spriteManagerTrees);
      tree.position.x = Math.random() * -30;
      tree.position.z = Math.random() * 20 + 8;
      tree.position.y = 0.2;
    }
  
    for (let i = 0; i < 500; i++) {
      const tree = new Sprite("car", spriteManagerTrees);
      tree.position.x = Math.random() * 25 + 7;
      tree.position.z = Math.random() * -35 + 8;
      tree.position.y = 0.2;
    }
    // nothing returned by this function
  }
    
  function createHouse(scene: Scene, style: number) {
    const box = createBox(style);
    const roof = createRoof(style);
    const house = Mesh.MergeMeshes(
      [box, roof],
      true,
      false,
      undefined,
      false,
      true
    );
    // last true allows combined mesh to use multiple materials
    return house;
  }

  function createHouses(scene: Scene, style: number) {
    //Start by locating one each of the two house types then add others
  
    if (style == 1) {
      // show 1 small house
      createHouse(scene, 1);
    }
    if (style == 2) {
      // show 1 large house
      createHouse(scene, 2);
    }
    if (style == 3) {
      // show estate
      const houses: Nullable<Mesh>[] = [];
      // first two houses are original meshes
      houses[0] = createHouse(scene, 1);
      houses[0]!.rotation.y = -Math.PI / 16;
      houses[0]!.position.x = -6.8;
      houses[0]!.position.z = 2.5;
  
      houses[1] = createHouse(scene, 2);
      houses[1]!.rotation.y = -Math.PI / 16;
      houses[1]!.position.x = -4.5;
      houses[1]!.position.z = 3;
  
      //next houses are cloned instances of first two
      const ihouses: InstancedMesh[] = [];
      const places: number[][] = []; //each entry is an array [house type, rotation, x, z]
  
      places.push([2, -Math.PI / 16, -1.5, 4]);
      places.push([2, -Math.PI / 3, 1.5, 6]);
      places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
      places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
      places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
      places.push([1, (5 * Math.PI) / 4, 0, -1]);
      places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
      places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
      places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
      places.push([2, Math.PI / 1.9, 4.75, -1]);
      places.push([1, Math.PI / 1.95, 4.5, -3]);
      places.push([2, Math.PI / 1.9, 4.75, -5]);
      places.push([1, Math.PI / 1.9, 4.75, -7]);
      places.push([2, -Math.PI / 3, 5.25, 2]);
      places.push([1, -Math.PI / 3, 6, 4]);
  
      for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1) {
          ihouses[i] = houses[0]!.createInstance("house" + i);
        } else {
          ihouses[i] = houses[1]!.createInstance("house" + i);
        }
        ihouses[i].rotation.y = places[i][1];
        ihouses[i].position.x = places[i][2];
        ihouses[i].position.z = places[i][3];
      }
    }
    // nothing returned by this function
  }

  function createTrees(scene: Scene) {
    const spriteManagerTrees = new SpriteManager(
      "treesManager",
      "./assets/sprites/tree.png",
      2000,
      { width: 512, height: 1024 },
      scene
    );
  
    //We create trees at random positions
    for (let i = 0; i < 500; i++) {
      const tree: Sprite = new Sprite("tree", spriteManagerTrees);
      tree.position.x = Math.random() * -30;
      tree.position.z = Math.random() * 20 + 8;
      tree.position.y = 0.2;
    }
  
    for (let i = 0; i < 500; i++) {
      const tree = new Sprite("tree", spriteManagerTrees);
      tree.position.x = Math.random() * 25 + 7;
      tree.position.z = Math.random() * -35 + 8;
      tree.position.y = 0.2;
    }
    // nothing returned by this function
  }

  function createHemisphericLight(scene: Scene) {
    const light = new HemisphericLight(
      "light",
      new Vector3(2, 1, 0), // move x pos to direct shadows
      scene
    );
    light.intensity = 0.8;
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 0.8, 0.8);
    light.groundColor = new Color3(0, 0.2, 0.7);
    return light;
  }

  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 25,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene
    );
    camera.lowerRadiusLimit = 9;
    camera.upperRadiusLimit = 25;
    camera.lowerAlphaLimit = 0;
    camera.upperAlphaLimit = Math.PI * 2;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2.02;
  
    camera.attachControl(true);
    return camera;
  }

  export default function createStartScene(engine: Engine) {
    let scene   = new Scene(engine);
    let ground  = createGround(scene);
    let sky     = createSky(scene);
    let car     = createCar(scene);
    let lightHemispheric = createHemisphericLight(scene);
    createHouses(scene, 3);
    createTrees(scene);
    createTerrain(scene);
    let camera  = createArcRotateCamera(scene);
  
  
    let that: SceneData = {
      scene,
      ground,
      sky,
      lightHemispheric,
      camera
    };
    return that;
  }
```
index.ts
```javascript
import { Engine} from "@babylonjs/core";
import createStartScene from "./createStartScene";
import createRunScene from "./createRunScene";
import "./main.css";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
createRunScene(startScene);

eng.runRenderLoop(() => {
  startScene.scene.render();
});
```

interface.ts
```javascript
import {
    Scene,
    Mesh,
    HemisphericLight,
    Camera,
  } from "@babylonjs/core";
  
  export interface SceneData {
    scene: Scene;
    ground: Mesh;
    sky: Mesh;
    lightHemispheric: HemisphericLight;
    camera: Camera;
  }
```

index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shapes</title>
    </head>
    <body> </body>
</html>
<!DOCTYPE html>
<!--https://bootstrap-cheatsheet.themeselection.com/-->
<!--https://getbootstrap.com/docs/5.3/getting-started/introduction/-->
<!--https://blog.getbootstrap.com/ -->
<!--https://www.jsdelivr.com/package/npm/bootstrap -->
<!--https://www.lipsum.com/  -->

<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container-fluid py-5 text-start text-sm-center" >
    <h1 class="display-5 fw-bold">Welcome to my website!</h1>
    <p class="col-md-8 fs-4"><p>Please select games to view games that you want to play!</p>
  </div>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="/assets/icon.png" alt="logo" width="30" height="30"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarBasic">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/element1/">element 1</a></li>
              <li><a class="dropdown-item" href="/element2/">element 2</a></li>
              <li><a class="dropdown-item" href="/element03/">element 3</a></li>
              <li><a class="dropdown-item" href="/element4/">element 4</a></li>
              <li><a class="dropdown-item" href="/element5/">element 5</a></li>
            </ul>
          </li>

</body>
<script type="module" src="./src/index.ts"></script>
</html>
```
## Element 03
characterActionManager.ts
```javascript
import {
  IncrementValueAction,
  PredicateCondition,
  SetValueAction,
} from "@babylonjs/core/Actions";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core";

export function characterActionManager(scene: Scene, character: Mesh) {
  character.actionManager = new ActionManager(scene);
  let pickItem = { flag: false };

  scene.actionManager.registerAction(
    new IncrementValueAction(
      ActionManager.OnEveryFrameTrigger,
      character,
      "rotation.y",
      0.1,
      new PredicateCondition(
        character.actionManager as ActionManager,
        function () {
          return pickItem.flag == true;
        }
      )
    )
  );

  character.actionManager.registerAction(
    new SetValueAction(ActionManager.OnPickDownTrigger, pickItem, "flag", true)
  );

  character.actionManager.registerAction(
    new SetValueAction(
      ActionManager.OnLongPressTrigger,
      pickItem,
      "flag",
      false
    )
  );
}
```

collisionDecleration.ts
```javascript
import { SceneData } from "./interfaces ";
import HavokPhysics, { HavokPhysicsWithBindings } from "@babylonjs/havok";
import { AbstractMesh, HavokPlugin, ISceneLoaderAsyncResult, PhysicsAggregate, PhysicsShapeType, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";

// https://doc.babylonjs.com/typedoc/classes/BABYLON.HavokPlugin
let initializedHavok: any;

HavokPhysics().then((havok) => {
  initializedHavok = havok;
});

const havokInstance: HavokPhysicsWithBindings = await HavokPhysics();
const hk: HavokPlugin = new HavokPlugin(true, havokInstance);


export function collisionDeclaration(runScene : SceneData){

    var collideCB = function (collision: {
        // log collisions
        collider: { transformNode: { name: any } };
        point: any;
        distance: any;
        impulse: any;
        normal: any;
      }) {
        console.log(
          "collideCB",
          collision.collider.transformNode.name,
          collision.point,
          collision.distance,
          collision.impulse,
          collision.normal
        );
      };
      hk.onCollisionObservable.add(collideCB);
    
      runScene.scene.enablePhysics(new Vector3(0, -9.8, 0), hk);
    
    // let playerAggregate: PhysicsAggregate;
      
    //collisions
    
      const groundAggregate = new PhysicsAggregate(
        runScene.ground,
        PhysicsShapeType.BOX,
        { mass: 0, restitution: 0.2, friction: 0.7 },
        runScene.scene
      );
      groundAggregate.body.setCollisionCallbackEnabled(true);
    
      const boxAggregate = new PhysicsAggregate(
        runScene.box1,
        PhysicsShapeType.BOX,
        { mass: 1, restitution: 0.3, friction: 0.7 },
        runScene.scene
      );
      boxAggregate.body.setCollisionCallbackEnabled(true);
    
      const boxAggregate2 = new PhysicsAggregate(
        runScene.box2,
        PhysicsShapeType.BOX,
        { mass: 0.5, restitution: 0.3, friction: 0.7 },
        runScene.scene
      );
      boxAggregate2.body.setCollisionCallbackEnabled(true);
    
      runScene.player!.then((result: void | ISceneLoaderAsyncResult) => {
        let character: AbstractMesh = result!.meshes[0];
        character.rotation = new Vector3(0, 0.5, 0);
    
        const playerAggregate = new PhysicsAggregate(
          character,
          PhysicsShapeType.CAPSULE,
          { mass: 0.1, restitution: 1, friction: 1 },
          runScene.scene
        );
        playerAggregate.body.setMassProperties({
          inertia: new Vector3(0, 0.0, 0.0), 
        });
        playerAggregate.body.setAngularVelocity(new Vector3(0, 12, 0));
        
        playerAggregate.body.applyImpulse (new Vector3(0, 0, 0),character.position);

        playerAggregate.body.disablePreStep = false;
        playerAggregate.body.setCollisionCallbackEnabled(true);
        
      });
}
```
createRunScene.ts
```javascript
import { AbstractMesh, ActionManager, CubeTexture, Mesh, _ENVTextureLoader } from "@babylonjs/core";
import { SceneData } from "./interfaces ";
import {
  keyActionManager,
  keyDownMap,
  keyDownHeld,
  getKeyDown,
} from "./keyActionManager";
import { characterActionManager } from "./characterActionManager";

import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Helpers/sceneHelpers";
export default function createRunScene(runScene: SceneData) {
  runScene.scene.actionManager = new ActionManager(runScene.scene);
  keyActionManager(runScene.scene);

  const environmentTexture = new CubeTexture(
    "assets/textures/industrialSky.env",
    runScene.scene
  );
  const skybox = runScene.scene.createDefaultSkybox(
    environmentTexture,
    true,
    10000,
    0.1
  );
  runScene.audio.stop();
  runScene.scene.onBeforeRenderObservable.add(() => {
    // check and respond to keypad presses

    if (getKeyDown() == 1 && (keyDownMap["m"] || keyDownMap["M"])) {
      keyDownHeld();
      if (runScene.audio.isPlaying) {
        runScene.audio.stop();
      } else {
        runScene.audio.play();
      }
    }

    runScene.player.then((result) => {
      let character: AbstractMesh = result!.meshes[0];
      if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
        character.position.x -= 0.1;
        character.rotation.y = (3 * Math.PI) / 2;
      }
      if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
        character.position.z -= 0.1;
        character.rotation.y = (2 * Math.PI) / 2;
      }
      if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
        character.position.x += 0.1;
        character.rotation.y = (1 * Math.PI) / 2;
      }
      if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
        character.position.z += 0.1;
        character.rotation.y = (0 * Math.PI) / 2;
      }
    });
  });

// add incremental action to player
  runScene.player.then((result) => {  
    let characterMesh = result!.meshes[0];
    characterActionManager(runScene.scene, characterMesh as Mesh);
  });

  runScene.scene.onAfterRenderObservable.add(() => {});
  
}
```
createStartScene.ts
```javascript
import { SceneData } from "./interfaces ";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  HemisphericLight,
  Color3,
  Engine,
  Texture,
  SceneLoader,
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Sound,
  AnimationPropertiesOverride
} from "@babylonjs/core";

function backgroundMusic(scene: Scene): Sound{
  let music = new Sound("music", "./assets/audio/arcade-kid.mp3", scene,  null ,
   {
      loop: true,
      autoplay: true
  });

  Engine.audioEngine!.useCustomUnlockedButton = true;

  // Unlock audio on first user interaction.
  window.addEventListener('click', () => {
    if(!Engine.audioEngine!.unlocked){
        Engine.audioEngine!.unlock();
    }
}, { once: true });
  return music;
}

function createGround(scene: Scene) {
  const groundMaterial = new StandardMaterial("groundMaterial");
  const groundTexture = new Texture("./assets/textures/wood.jpg");
  groundTexture.uScale  = 4.0; //Repeat 5 times on the Vertical Axes
  groundTexture.vScale  = 4.0; //Repeat 5 times on the Horizontal Axes
  groundMaterial.diffuseTexture = groundTexture;
 // groundMaterial.diffuseTexture = new Texture("./assets/textures/wood.jpg");
  groundMaterial.diffuseTexture.hasAlpha = true;

  groundMaterial.backFaceCulling = false;
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 15, height: 15, subdivisions: 4 },
    scene
  );

  ground.material = groundMaterial;
  return ground;
}



function createHemisphericLight(scene: Scene) {
  const light = new HemisphericLight(
    "light",
    new Vector3(2, 1, 0), // move x pos to direct shadows
    scene
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 0.8, 0.8);
  light.groundColor = new Color3(0, 0.2, 0.7);
  return light;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 15,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.lowerRadiusLimit = 9;
  camera.upperRadiusLimit = 25;
  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = Math.PI * 2;
  camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = Math.PI / 2.02;

  camera.attachControl(true);
  return camera;
}

function createBox1(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { width: 1, height: 1 }, scene);
  box.position.x = -1;
  box.position.y = 4;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture(
    "./assets/textures/reflectivity.png",
    scene
  );
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}

function createBox2(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { width: 1, height: 1 }, scene);
  box.position.x = -0.7;
  box.position.y = 8;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture(
    "./assets/textures/reflectivity.png",
    scene
  );
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}


function importMeshA(scene: Scene, x: number, y: number) {
  let item: Promise<void | ISceneLoaderAsyncResult> =
    SceneLoader.ImportMeshAsync(
      "",
      "./assets/models/men/",
      "dummy3.babylon",
      scene
    );

  item.then((result) => {
    let character: AbstractMesh = result!.meshes[0];
    character.position.x = x;
    character.position.y = y + 0.1;
    character.scaling = new Vector3(1, 1, 1);
    character.rotation = new Vector3(0, 1.5, 0);
  });
  return item;
}


export default function createStartScene(engine: Engine) {
  let scene = new Scene(engine);
  let audio = backgroundMusic(scene);
  let lightHemispheric = createHemisphericLight(scene);
  let camera = createArcRotateCamera(scene);
  let box1 = createBox1(scene);
  let box2 = createBox2(scene);
  let player = importMeshA(scene, 0, 0);
  let ground = createGround(scene);

  let that: SceneData = {
    scene,
    audio,
    lightHemispheric,
    camera,
    box1,
    box2,
    player,
    ground,
  };
  return that;
}
```
index.ts
```javascript
import { Engine} from "@babylonjs/core";
import createStartScene from "./createStartScene";
import createRunScene from "./createRunScene";
import "./main.css";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
createRunScene(startScene);

eng.runRenderLoop(() => {
  startScene.scene.render();
});
```
interfaces.ts
```javascript
import {
  Scene,
  Sound,
  Mesh,
  HemisphericLight,
  Camera,
  ISceneLoaderAsyncResult,
} from "@babylonjs/core";
import { ThinTAAPostProcess } from "@babylonjs/core/PostProcesses/thinTAAPostProcess";

export interface SceneData {
  scene: Scene;
  importMesh?: any;
  audio: Sound;
  lightHemispheric: HemisphericLight;
  camera: Camera;
  box1: Mesh;
  box2: Mesh;
  player: Promise<void | ISceneLoaderAsyncResult>;
  ground: Mesh;
}

that.importMesh = importPlayerMesh(that.scene, 0.0);
```
keyActionManager.ts
```javascript
import { ExecuteCodeAction } from "@babylonjs/core/Actions";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { Scene } from "@babylonjs/core/scene";
export let keyDownMap: Boolean[] = [];
let keyDown:number = 0;
export function keyDownHeld(){ keyDown = 2}; 
export function getKeyDown():number {return keyDown};

export function keyActionManager(scene: Scene) {
    scene.actionManager.registerAction(
        new ExecuteCodeAction(
          {
            trigger: ActionManager.OnKeyDownTrigger,
          },
          function (evt) {
            if (keyDown == 0){keyDown ++}
            keyDownMap[evt.sourceEvent.key] = true;
          }
        )
      );
      scene.actionManager.registerAction(
        new ExecuteCodeAction(
          {
            trigger: ActionManager.OnKeyUpTrigger,
          },
          function (evt) {
            keyDown = 0;
            keyDownMap[evt.sourceEvent.key] = false;
          }
        )
      );
      return scene.actionManager;
    }
```

index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shapes</title>
    </head>
    <body> </body>
</html>
<!DOCTYPE html>
<!--https://bootstrap-cheatsheet.themeselection.com/-->
<!--https://getbootstrap.com/docs/5.3/getting-started/introduction/-->
<!--https://blog.getbootstrap.com/ -->
<!--https://www.jsdelivr.com/package/npm/bootstrap -->
<!--https://www.lipsum.com/  -->

<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container-fluid py-5 text-start text-sm-center" >
    <h1 class="display-5 fw-bold">Welcome to my website!</h1>
    <p class="col-md-8 fs-4"><p>Please select games to view games that you want to play!</p>
  </div>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="/assets/icon.png" alt="logo" width="30" height="30"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarBasic">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/element1/">element 1</a></li>
              <li><a class="dropdown-item" href="/element2/">element 2</a></li>
              <li><a class="dropdown-item" href="/element03/">element 3</a></li>
              <li><a class="dropdown-item" href="/element4/">element 4</a></li>
              <li><a class="dropdown-item" href="/element5/">element 5</a></li>
            </ul>
          </li>

</body>

<script type="module" src="./src/index.ts"></script>
</html>
```
vite.config.ts
```javascript
// vite.config.ts
import { defineConfig } from "vite";
export default defineConfig({
  // config options
  server: {
    fs: {
      // Allow serving files outside of the root
      allow: ["../.."],
    },
  },
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
    esbuildOptions: {
      target: "esnext",
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
        }
    },
  },
  build: {
    target: "esnext",
  },
  esbuild: {
    target: "esnext",
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
      }
  },
});

// https://forum.babylonjs.com/t/importing-and-implementing-havok-in-vite-react-ts-project-fails/48441/4
```
## element 4

bakedAnimation.ts
```javascript


import { Scene } from "@babylonjs/core/scene";
import { AnimationPropertiesOverride, AnimationRange, Nullable, Skeleton } from "@babylonjs/core";

var animating:Boolean = false;
var walkRange:Nullable<AnimationRange>;
var runRange:Nullable<AnimationRange>;
var leftRange:Nullable<AnimationRange>;
var rightRange:Nullable<AnimationRange>;
var idleRange:Nullable<AnimationRange>;
var animScene:Scene;
var animSkeleton:Skeleton;




export function bakedAnimations(myscene: Scene, skeleton: Skeleton){
  
   // use baked in animations
   animScene = myscene;
   animSkeleton = skeleton;
   skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
   skeleton.animationPropertiesOverride.enableBlending = true;
   skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
   skeleton.animationPropertiesOverride.loopMode = 1;

   walkRange = skeleton.getAnimationRange("YBot_Walk");
   runRange = skeleton.getAnimationRange("YBot_Run");
   leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
   rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");
   idleRange = skeleton.getAnimationRange("YBot_Idle");
   console.log(idleRange);
   

}

export function walk(){
  animScene.beginAnimation(animSkeleton, walkRange!.from, walkRange!.to, true);
}

export function run(){
  animScene.beginAnimation(animSkeleton, runRange!.from, runRange!.to, true);
}

export function left(){
  animScene.beginAnimation(animSkeleton, leftRange!.from, leftRange!.to, true);
}

export function right(){
  animScene.beginAnimation(animSkeleton, rightRange!.from, rightRange!.to, true);
}

export function idle(){
  animScene.beginAnimation(animSkeleton, idleRange!.from, idleRange!.to, true);
}

export function stopAnimation(){
  animScene.stopAnimation(animSkeleton);
}

export function getAnimating():Boolean{return animating};

export function toggleAnimating(){animating = !animating};

export function info(){
  console.log(idleRange!.from, idleRange!.to);
}
```
characterActionManager.ts
```javascript
import {
  ExecuteCodeAction,
  IncrementValueAction,
  PredicateCondition,
  SetValueAction,
} from "@babylonjs/core/Actions";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { Scene } from "@babylonjs/core/scene";
import { AbstractMesh, Mesh } from "@babylonjs/core";

export function characterActionManager(scene: Scene, character: Mesh) {
  character.actionManager = new ActionManager(scene);
  let pickItem = { flag: false };

  scene.actionManager.registerAction(
    new IncrementValueAction(
      ActionManager.OnEveryFrameTrigger,
      character,
      "rotation.y",
      0.1,
      new PredicateCondition(
        character.actionManager as ActionManager,
        function () {
          return pickItem.flag == true;
        }
      )
    )
  );

  character.actionManager.registerAction(
    new SetValueAction(ActionManager.OnPickDownTrigger, pickItem, "flag", true)
  );

  character.actionManager.registerAction(
    new SetValueAction(
      ActionManager.OnLongPressTrigger,
      pickItem,
      "flag",
      false
    )
  );
}

```

collisionDecleration.ts
```javascript
import { SceneData } from "./interfaces";
import HavokPhysics, { HavokPhysicsWithBindings } from "@babylonjs/havok";
import { AbstractMesh, HavokPlugin, ISceneLoaderAsyncResult, PhysicsAggregate, PhysicsShapeType, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";

// https://doc.babylonjs.com/typedoc/classes/BABYLON.HavokPlugin
let initializedHavok: any;

HavokPhysics().then((havok) => {
  initializedHavok = havok;
});

const havokInstance: HavokPhysicsWithBindings = await HavokPhysics();
const hk: HavokPlugin = new HavokPlugin(true, havokInstance);


export function collisionDeclaration(runScene : SceneData){

    var collideCB = function (collision: {
        // log collisions
        collider: { transformNode: { name: any } };
        point: any;
        distance: any;
        impulse: any;
        normal: any;
      }) {
        console.log(
          "collideCB",
          collision.collider.transformNode.name,
          collision.point,
          collision.distance,
          collision.impulse,
          collision.normal
        );
      };
      hk.onCollisionObservable.add(collideCB);
    
      runScene.scene.enablePhysics(new Vector3(0, -9.8, 0), hk);
    
    // let playerAggregate: PhysicsAggregate;
      
    //collisions
    
      const groundAggregate = new PhysicsAggregate(
        runScene.ground,
        PhysicsShapeType.BOX,
        { mass: 0, restitution: 0.2, friction: 0.7 },
        runScene.scene
      );
      groundAggregate.body.setCollisionCallbackEnabled(true);
    
      const boxAggregate = new PhysicsAggregate(
        runScene.box1,
        PhysicsShapeType.BOX,
        { mass: 1, restitution: 0.3, friction: 0.7 },
        runScene.scene
      );
      boxAggregate.body.setCollisionCallbackEnabled(true);
    
      const boxAggregate2 = new PhysicsAggregate(
        runScene.box2,
        PhysicsShapeType.BOX,
        { mass: 0.5, restitution: 0.3, friction: 0.7 },
        runScene.scene
      );
      boxAggregate2.body.setCollisionCallbackEnabled(true);
    
      runScene.player!.then((result: void | ISceneLoaderAsyncResult) => {
        let character: AbstractMesh = result!.meshes[0];
        character.rotation = new Vector3(0, 0.5, 0);
    
        const playerAggregate = new PhysicsAggregate(
          character,
          PhysicsShapeType.CAPSULE,
          { mass: 0.1, restitution: 1, friction: 1 },
          runScene.scene
        );
        playerAggregate.body.setMassProperties({
          inertia: new Vector3(0.0, 1, 0.0), 
        });
        playerAggregate.body.setAngularVelocity(new Vector3(0, 12, 0));
        
        playerAggregate.body.applyImpulse (new Vector3(0, 0, 0),character.position);

        playerAggregate.body.disablePreStep = false;
        playerAggregate.body.setCollisionCallbackEnabled(true);
        
      });
}


```
createRunScene.ts
```javascript
import {
  AbstractMesh,
  ActionManager,
  CubeTexture,
  Mesh,
  Skeleton,
  _ENVTextureLoader,
} from "@babylonjs/core";

import { SceneData } from "./interfaces";

import {
  keyActionManager,
  keyDownMap,
  keyDownHeld,
  getKeyDown,
} from "./keyActionManager";

import { characterActionManager } from "./characterActionManager";

import {
  bakedAnimations,
  walk,
  idle,
  getAnimating,
  toggleAnimating,
} from "./bakedAnimations";

import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Helpers/sceneHelpers";

// havok physics collisions
import { collisionDeclaration } from "./collisionDeclaration";

export default function createRunScene(runScene: SceneData) {
  
  collisionDeclaration(runScene);
  runScene.scene.actionManager = new ActionManager(runScene.scene);
  keyActionManager(runScene.scene);

  const environmentTexture = new CubeTexture(
    "assets/textures/industrialSky.env",
    runScene.scene
  );
  const skybox = runScene.scene.createDefaultSkybox(
    environmentTexture,
    true,
    10000,
    0.1
  );
  runScene.audio.stop();

  // add baked in animations to player
  runScene.player.then((result) => {
    let skeleton: Skeleton = result!.skeletons[0];
    bakedAnimations(runScene.scene, skeleton);
  });

  runScene.scene.onBeforeRenderObservable.add(() => {
    // check and respond to keypad presses

    if (getKeyDown() == 1 && (keyDownMap["m"] || keyDownMap["M"])) {
      keyDownHeld();
      if (runScene.audio.isPlaying) {
        runScene.audio.stop();
      } else {
        runScene.audio.play();
      }
    }

    runScene.player.then((result) => {
      let characterMoving: Boolean = false;
      let character: AbstractMesh = result!.meshes[0];

      if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
        character.position.x -= 0.1;
        character.rotation.y = (3 * Math.PI) / 2;
        characterMoving = true;
      }
      if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
        character.position.z -= 0.1;
        character.rotation.y = (2 * Math.PI) / 2;
        characterMoving = true;
      }
      if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
        character.position.x += 0.1;
        character.rotation.y = (1 * Math.PI) / 2;
        characterMoving = true;
      }
      if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
        character.position.z += 0.1;
        character.rotation.y = (0 * Math.PI) / 2;
        characterMoving = true;
      }

      if (getKeyDown() && characterMoving) {
        if (!getAnimating()) {
          walk();
          toggleAnimating();
        }
      } else {
        if (getAnimating()) {
          idle();
          toggleAnimating();
        }
      }
    });
  });

  // add incremental action to player
  runScene.player.then((result) => {
    let characterMesh = result!.meshes[0];
    characterActionManager(runScene.scene, characterMesh as Mesh);
  });

  runScene.scene.onAfterRenderObservable.add(() => {});
}

```
gameScene
```javascript
import { SceneData } from "./interfaces";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  HemisphericLight,
  Color3,
  Engine,
  Texture,
  SceneLoader,
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Sound,
} from "@babylonjs/core";
import createRunScene from "./createRunScene";

function backgroundMusic(scene: Scene): Sound{
  let music = new Sound("music", "./assets/audio/arcade-kid.mp3", scene,  null ,
   {
      loop: true,
      autoplay: true
  });

  Engine.audioEngine!.useCustomUnlockedButton = true;

  // Unlock audio on first user interaction.
  window.addEventListener('click', () => {
    if(!Engine.audioEngine!.unlocked){
        Engine.audioEngine!.unlock();
    }
}, { once: true });
  return music;
}

function createGround(scene: Scene) {
  const groundMaterial = new StandardMaterial("groundMaterial");
  const groundTexture = new Texture("./assets/textures/wood.jpg");
  groundTexture.uScale  = 4.0; //Repeat 5 times on the Vertical Axes
  groundTexture.vScale  = 4.0; //Repeat 5 times on the Horizontal Axes
  groundMaterial.diffuseTexture = groundTexture;
 // groundMaterial.diffuseTexture = new Texture("./assets/textures/wood.jpg");
  groundMaterial.diffuseTexture.hasAlpha = true;

  groundMaterial.backFaceCulling = false;
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 15, height: 15, subdivisions: 4 },
    scene
  );

  ground.material = groundMaterial;
  return ground;
}



function createHemisphericLight(scene: Scene) {
  const light = new HemisphericLight(
    "light",
    new Vector3(2, 1, 0), // move x pos to direct shadows
    scene
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 0.8, 0.8);
  light.groundColor = new Color3(0, 0.2, 0.7);
  return light;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 15,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.lowerRadiusLimit = 9;
  camera.upperRadiusLimit = 25;
  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = Math.PI * 2;
  camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = Math.PI / 2.02;

  camera.attachControl(true);
  return camera;
}

function createBox1(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { width: 1, height: 1 }, scene);
  box.position.x = -1;
  box.position.y = 4;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture(
    "./assets/textures/reflectivity.png",
    scene
  );
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}

function createBox2(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { width: 1, height: 1 }, scene);
  box.position.x = -0.7;
  box.position.y = 8;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture(
    "./assets/textures/reflectivity.png",
    scene
  );
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}


function importMeshA(scene: Scene, x: number, y: number) {
  let item: Promise<void | ISceneLoaderAsyncResult> =
    SceneLoader.ImportMeshAsync(
      "",
      "./assets/models/men/",
      "dummy3.babylon",
      scene
    );

  item.then((result) => {
    let character: AbstractMesh = result!.meshes[0];
    character.position.x = x;
    character.position.y = y + 0.1;
    character.scaling = new Vector3(1, 1, 1);
    character.rotation = new Vector3(0, 1.5, 0);

  });
  return item;
}

export default function gameScene(engine: Engine) {
  let scene = new Scene(engine);
  let audio = backgroundMusic(scene);
  let lightHemispheric = createHemisphericLight(scene);
  let camera = createArcRotateCamera(scene);
  let box1 = createBox1(scene);
  let box2 = createBox2(scene);
  let player = importMeshA(scene, 0, 0);
  let ground = createGround(scene);

  let that: SceneData = {
    scene,
    audio,
    lightHemispheric,
    camera,
    box1,
    box2,
    player,
    ground,
  };

  createRunScene(that);
  return that;
}

```
index.ts
```javascript
import { Engine} from "@babylonjs/core";
import menuScene from "./menuScene";
import gameScene from "./gameScene";
import "./main.css";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let scene;
let scenes: any[] = [];

let eng = new Engine(canvas, true, {}, true);

scenes[0] = menuScene(eng);
scenes[1] = gameScene(eng);

scene = scenes[0].scene;
setSceneIndex(0);

export default function setSceneIndex(i: number) {
  eng.runRenderLoop(() => {
      scenes[i].scene.render();
  });
}   

```
interfaces.ts
```javascript
import {
  Scene,
  Sound,
  Mesh,
  HemisphericLight,
  Camera,
  ISceneLoaderAsyncResult,
} from "@babylonjs/core";

export interface SceneData {
  scene: Scene;
  audio: Sound;
  lightHemispheric: HemisphericLight;
  camera: Camera;
  box1: Mesh;
  box2: Mesh;
  player: Promise<void | ISceneLoaderAsyncResult>;
  ground: Mesh;
}

```
keyActionManager.ts
```javascript
import { ExecuteCodeAction } from "@babylonjs/core/Actions";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { Scene } from "@babylonjs/core/scene";

export let keyDownMap: Boolean[] = [];
let keyDown: number = 0;
export function keyDownHeld() {
  keyDown = 2;
}
export function getKeyDown(): number {
  return keyDown;
}

export function keyActionManager(scene: Scene) {
  scene.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnKeyDownTrigger,
      },
      function (evt) {
        if (keyDown == 0) {
          keyDown++;
        }
        keyDownMap[evt.sourceEvent.key] = true;
      }
    )
  );
  scene.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnKeyUpTrigger,
      },
      function (evt) {
        keyDown = 0;
        keyDownMap[evt.sourceEvent.key] = false;
      }
    )
  );
  return scene.actionManager;
}

```

menuScene.ts
```javascript

import setSceneIndex from "./index";

import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3,
    CubeTexture,
    Sound
  } from "@babylonjs/core";
  import * as GUI from "@babylonjs/gui";
 
  //----------------------------------------------------

  function createText(scene: Scene, theText: string, x: string, y: string, s: string, c: string, advtex) {
    let text = new GUI.TextBlock();
    text.text = theText;
    text.color = c;
    text.fontSize = s;
    text.fontWeight = "bold"; //can add parameter for this if you wish
    text.left = x;
    text.top = y;
    advtex.addControl(text);
    return text;
  }

  function createRectangle(scene: Scene, w: string, h: string, x: string, y: string, cr: number, c: string, t: number, bg: string, advtext) {
    let rectangle = new GUI.Rectangle();
    rectangle.width = w;
    rectangle.height = h;
    rectangle.left = x;
    rectangle.top = y;
    rectangle.cornerRadius = cr;
    rectangle.color = c;
    rectangle.thickness = t;
    rectangle.background = bg;
    advtext.addControl(rectangle);
    return rectangle;
  }

  function createSceneButton(scene: Scene, name: string, index: string, x: string, y: string, advtex) {
    let button = GUI.Button.CreateSimpleButton(name, index);
        button.left = x;
        button.top = y;
        button.width = "160px";
        button.height = "60px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "purple";

        const buttonClick = new Sound("MenuClickSFX", "./audio/menu-click.wav", scene, null, {
          loop: false,
          autoplay: false,
        });

        button.onPointerUpObservable.add(function() {
            console.log("THE BUTTON HAS BEEN CLICKED");
            buttonClick.play();
            setSceneIndex(1);
        });
        advtex.addControl(button);
        return button;
 }

  //----------------------------------------------------------------------------------------------
  //Create Skybox
  function createSkybox(scene: Scene) {
    //Skybox
    const skybox = MeshBuilder.CreateBox("skyBox", {size:150}, scene);
	  const skyboxMaterial = new StandardMaterial("skyBox", scene);
	  skyboxMaterial.backFaceCulling = false;
	  skyboxMaterial.reflectionTexture = new CubeTexture("textures/skybox", scene);
	  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	  skyboxMaterial.specularColor = new Color3(0, 0, 0);
	  skybox.material = skyboxMaterial;
    return skybox;
  }

 
  function createHemiLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.8;
    return light;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
 
  //----------------------------------------------------------
  //BOTTOM OF CODE - MAIN RENDERING AREA FOR YOUR SCENE
  export default function menuScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      advancedTexture: GUI.AdvancedDynamicTexture;
      textBG: GUI.Rectangle;
      titleText: GUI.TextBlock;
      button1: GUI.Button;
      button2: GUI.Button;
      skybox: Mesh;
      hemiLight: HemisphericLight;
      camera: Camera;
    }
  
    //let that: SceneData = { scene: new Scene(engine) };
    
    //----------------------------------------------------------
    let scene = new Scene(engine);
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
    let textBG = createRectangle(scene, "300px", "100px", "0px", "-200px", 20, "white", 4, "purple", advancedTexture);
    let titleText = createText(scene, "THE GAME", "0px", "-200px", "45", "white", advancedTexture);
    let button1 = createSceneButton(scene, "but1", "Start Game", "0px", "-75px", advancedTexture);
    let button2 = createSceneButton(scene, "but2", "Options", "0px", "0px", advancedTexture);

    let skybox = createSkybox(scene);
    //Scene Lighting & Camera
    let hemiLight = createHemiLight(scene);
    let camera = createArcRotateCamera(scene);
    
    let that: SceneData = {
      scene,
      advancedTexture,
      textBG,
      titleText,
      button1,
      button2,
      skybox,
      hemiLight,
      camera
    };
    
    return that;
  }  //----------------------------------------------------
```

index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shapes</title>
    </head>
    <body> </body>
</html>
<!DOCTYPE html>
<!--https://bootstrap-cheatsheet.themeselection.com/-->
<!--https://getbootstrap.com/docs/5.3/getting-started/introduction/-->
<!--https://blog.getbootstrap.com/ -->
<!--https://www.jsdelivr.com/package/npm/bootstrap -->
<!--https://www.lipsum.com/  -->

<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container-fluid py-5 text-start text-sm-center" >
    <h1 class="display-5 fw-bold">Welcome to my website!</h1>
    <p class="col-md-8 fs-4"><p>Please select games to view games that you want to play!</p>
  </div>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="/assets/icon.png" alt="logo" width="30" height="30"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarBasic">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/element1/">element 1</a></li>
              <li><a class="dropdown-item" href="/element2/">element 2</a></li>
              <li><a class="dropdown-item" href="/element03/">element 3</a></li>
              <li><a class="dropdown-item" href="/element4/">element 4</a></li>
              <li><a class="dropdown-item" href="/element5/">element 5</a></li>
            </ul>
          </li>

</body>
<script type="module" src="./src/index.ts"></script>
</html>
```
# element 5

## gui
guiScene.ts
```javascript

import setSceneIndex from "./../index";

import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3,
    CubeTexture,
    Sound
  } from "@babylonjs/core";
  import * as GUI from "@babylonjs/gui";
 
  //----------------------------------------------------

  function createText(scene: Scene, theText: string, x: string, y: string, s: string, c: string, advtex) {
    let text = new GUI.TextBlock();
    text.text = theText;
    text.color = c;
    text.fontSize = s;
    text.fontWeight = "bold"; //can add parameter for this if you wish
    text.left = x;
    text.top = y;
    advtex.addControl(text);
    return text;
  }

  function createRectangle(scene: Scene, w: string, h: string, x: string, y: string, cr: number, c: string, t: number, bg: string, advtext) {
    let rectangle = new GUI.Rectangle();
    rectangle.width = w;
    rectangle.height = h;
    rectangle.left = x;
    rectangle.top = y;
    rectangle.cornerRadius = cr;
    rectangle.color = c;
    rectangle.thickness = t;
    rectangle.background = bg;
    advtext.addControl(rectangle);
    return rectangle;
  }

  function createSceneButton(scene: Scene, name: string, note: string, index: number, x: string, y: string, advtex) {
    let button = GUI.Button.CreateSimpleButton(name, note);
        button.left = x;
        button.top = y;
        button.width = "80px";
        button.height = "30px";
        button.color = "white";
        button.cornerRadius = 20;
        button.background = "purple";

        /*
        const buttonClick = new Sound("MenuClickSFX", "./audio/menu-click.wav", scene, null, {
          loop: false,
          autoplay: false,
        });
        */

        button.onPointerUpObservable.add(function() {
            console.log("THE BUTTON HAS BEEN CLICKED");
           // buttonClick.play();
            setSceneIndex(index -1);
        });
        advtex.addControl(button);
        return button;
 }

 function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene,
  );
  camera.attachControl(true);
  return camera;
}
  
  //----------------------------------------------------------
  //BOTTOM OF CODE - MAIN RENDERING AREA FOR YOUR SCENE
  export default function menuScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      advancedTexture: GUI.AdvancedDynamicTexture;
      button1: GUI.Button;
      button2: GUI.Button;
      camera: Camera;
    }
  
    //let that: SceneData = { scene: new Scene(engine) };
    
    //----------------------------------------------------------
    let scene = new Scene(engine);
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
    var button1 = createSceneButton(scene,"but1", "1",1,"-150px", "120px", advancedTexture);
    var button2 = createSceneButton(scene,"but2", "2", 2,"-50px", "120px", advancedTexture);
    var button3 = createSceneButton(scene,"but2", "2", 2,"-50px", "120px", advancedTexture);
    var button4 = createSceneButton(scene,"but2", "2", 2,"-50px", "120px", advancedTexture);
    var camera = createArcRotateCamera(scene);

 
    let that: SceneData = {
      scene,
      advancedTexture,
      button1,
      button2,
      camera
    };
    
    return that;
  }  //----------------------------------------------------
```
## scene 1


createStartScene.ts
```javascript
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
  } from "@babylonjs/core";
  
  
  function createBox(scene: Scene) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position.y = 3;
    return box;
  }

  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    return sphere;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    return ground;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      box?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.box = createBox(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }
```

index.ts
```javascript
import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import './main.css';

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
eng.runRenderLoop(() => {
    startScene.scene.render();
});   
```

## scene2
createStart Scene.ts
```javascript
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3
  } from "@babylonjs/core";
  
  
  function createCylinder(scene: Scene) {
    let cylinder = MeshBuilder.CreateCylinder(
      "cylinder",
      { height: 1, diameter: 0.7 },
      scene
    );
    cylinder.position.x = 1;
    cylinder.position.y = 1;
    cylinder.position.z = 1;
  
    var texture = new StandardMaterial("reflective", scene);
    texture.ambientTexture = new Texture("./assets/reflectivity.png", scene);
    texture.diffuseColor = new Color3(1, 1, 1);
    cylinder.material = texture;
    return cylinder;
  }

  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    return sphere;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    return ground;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      cylinder?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.cylinder = createCylinder(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }
```
index.ts
```javascript
import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import './main.css';

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
eng.runRenderLoop(() => {
    startScene.scene.render();
});   
```
## scene3
createStart Scene.ts
```javascript
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    Texture,
    StandardMaterial,
    Color3
  } from "@babylonjs/core";
  
  
  function createTorus(scene: Scene) {
    let torus = MeshBuilder.CreateTorus(
      "torus",
      { diameter: 0.7, thickness: 0.6, tessellation: 10 },
      scene
    );
    torus.position.x = -1;
    torus.position.y = 2;
    torus.position.z = 1;
  
    var texture = new StandardMaterial("reflective", scene);
    texture.ambientTexture = new Texture("./assets/reflectivity.png", scene);
    texture.diffuseColor = new Color3(1, 1, 1);
    torus.material = texture;

    return torus;
  }

  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    return sphere;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    return ground;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      torus?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.torus = createTorus(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }
```
index.ts
```javascript
import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import './main.css';

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
eng.runRenderLoop(() => {
    startScene.scene.render();
});   
```
## scene4
createStart Scene.ts
```javascript
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    Texture,
    StandardMaterial,
    Color3
  } from "@babylonjs/core";
  
  
  function createTube(scene: Scene) {
    const myPath = [
      new Vector3(1.85, 0.85, 0.85),
      new Vector3(1.35, 0.35, 0.35),
    ];
  
    const tube = MeshBuilder.CreateTube(
      "tube",
      { path: myPath, radius: 0.4, sideOrientation: Mesh.DOUBLESIDE },
      scene
    );
  
    var texture = new StandardMaterial("reflective", scene);
    texture.ambientTexture = new Texture("./assets/reflectivity.png", scene);
    texture.diffuseColor = new Color3(1, 1, 1);
    tube.material = texture;
    return tube;
  }

  
  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
  }
  
  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      scene,
    );
    sphere.position.y = 1;
    return sphere;
  }
  
  function createGround(scene: Scene) {
    let ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene,
    );
    return ground;
  }
  
  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      tube?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }
  
    let that: SceneData = { scene: new Scene(engine) };
    // that.scene.debugLayer.show();
  
    that.tube = createTube(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
  }
```
index.ts
```javascript
import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import './main.css';

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

let eng = new Engine(canvas, true, {}, true);
let startScene = createStartScene(eng);
eng.runRenderLoop(() => {
    startScene.scene.render();
});   
```

index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Shapes</title>
    </head>
    <body> </body>
</html>
<!DOCTYPE html>
<!--https://bootstrap-cheatsheet.themeselection.com/-->
<!--https://getbootstrap.com/docs/5.3/getting-started/introduction/-->
<!--https://blog.getbootstrap.com/ -->
<!--https://www.jsdelivr.com/package/npm/bootstrap -->
<!--https://www.lipsum.com/  -->

<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container-fluid py-5 text-start text-sm-center" >
    <h1 class="display-5 fw-bold">Welcome to my website!</h1>
    <p class="col-md-8 fs-4"><p>Please select games to view games that you want to play!</p>
  </div>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="/assets/icon.png" alt="logo" width="30" height="30"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarBasic">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/element1/">element 1</a></li>
              <li><a class="dropdown-item" href="/element2/">element 2</a></li>
              <li><a class="dropdown-item" href="/element03/">element 3</a></li>
              <li><a class="dropdown-item" href="/element4/">element 4</a></li>
              <li><a class="dropdown-item" href="/element5/">element 5</a></li>
            </ul>
          </li>

</body>
<script type="module" src="./src/index.ts"></script>
</html>
```

vite.config.ts
```javascript
// vite.config.ts
import { defineConfig } from "vite";
export default defineConfig({
  // config options
  server: {
    fs: {
      // Allow serving files outside of the root
      allow: ["../.."],
    },
  },
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
    esbuildOptions: {
      target: "esnext",
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
        }
    },
  },
  build: {
    target: "esnext",
  },
});

// https://forum.babylonjs.com/t/importing-and-implementing-havok-in-vite-react-ts-project-fails/48441/4
```
# Babylonproj

index.html
```html
<!DOCTYPE html>
<!--https://bootstrap-cheatsheet.themeselection.com/-->
<!--https://getbootstrap.com/docs/5.3/getting-started/introduction/-->
<!--https://blog.getbootstrap.com/ -->
<!--https://www.jsdelivr.com/package/npm/bootstrap -->
<!--https://www.lipsum.com/  -->

<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
  <div class="container-fluid py-5 text-start text-sm-center" >
    <h1 class="display-5 fw-bold">Welcome to my website!</h1>
    <p class="col-md-8 fs-4"><p>Please select games to view games that you want to play!</p>
  </div>

  <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="assets/icon.png" alt="logo" width="30" height="30"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarBasic">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Games
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="/element1/">element 1</a></li>
              <li><a class="dropdown-item" href="/element2/">element 2</a></li>
              <li><a class="dropdown-item" href="/element03/">element 3</a></li>
              <li><a class="dropdown-item" href="/element4/">element 4</a></li>
              <li><a class="dropdown-item" href="/element5/">element 5</a></li>
            </ul>
          </li>
          
        <!--  Remove disabled link and search
        <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>

        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
          -->
      </div>
    </div>
  </nav>  
  
<!--https://getbootstrap.com/docs/5.3/layout/grid/ -->  
<div class="container-fluid mt-3">
  <div class="row">
    <div class="col-sm-4">
      <h3 style="text-align: center;">Fortnite</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div class="col-sm-4">
      <h3 style="text-align: center;">Ratchet & Clank: Rift Apart</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
    <div class="col-sm-4">
      <h3 style="text-align: center;">Splatoon 3</h3>        
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
    </div>
  </div>
</div>



<!-- Carousel https://getbootstrap.com/docs/5.3/components/carousel/ -->
<div id="demo" class="carousel slide" data-bs-ride="carousel">

    <!-- Indicators/dots -->
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
    </div>
    
    <!-- The slideshow/carousel -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="assets/fortnite.jpg" alt="Fortnite" class="d-block" style="width:100%">
        <div class="carousel-caption">
          <h3 style="background-color: black;">Fortnite</h3>
          <p style="background-color: black;">A game by Epic Games!</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="assets/ratchetandclank.jpg" alt="Ratchet & Clank" class="d-block" style="width:100%">
        <div class="carousel-caption">
          <h3 style="background-color: black;">Ratchet & Clank: Rift Apart</h3>
          <p style="background-color: black;">A game by Insomniac Games!</p>
        </div> 
      </div>
      <div class="carousel-item">
        <img src="assets/splatoon3.jpg" alt="Splatoon 3" class="d-block" style="width:100%">
        <div class="carousel-caption">
          <h3 style="background-color: black;">Splatoon 3</h3>
          <p style="background-color: black;">A game by Nintendo Entertainment Planning & Development!</p>
        </div>  
      </div>
    </div>
    
    <!-- Left and right controls/icons -->
    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>





</body>
</html>

```

pachage-lock.json
```json
{
  "name": "testproj",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "testproj",
      "version": "0.0.0",
      "devDependencies": {
        "typescript": "~5.6.2",
        "vite": "^5.4.10"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild/node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.49",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.49.tgz",
      "integrity": "sha512-OCVPnIObs4N29kxTjzLfUryOkvZEq+pf8jTF0lg8E7uETuWHA+v7j3c/xJmiqpX450191LlmZfUKkXxkTry7nA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss/node_modules/nanoid": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.7.tgz",
      "integrity": "sha512-eSRppjcPIatRIMC1U6UngP8XFcz8MQWGQdt1MTBQ7NaAmvXDfvNxbvWV3x2y6CdEUciCSsDHDQZbhYaB8QEo2g==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/postcss/node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/postcss/node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.27.4.tgz",
      "integrity": "sha512-RLKxqHEMjh/RGLsDxAEsaLO3mWgyoU6x9w6n1ikAzet4B3gI2/3yP6PWY2p9QzRTh6MfEIXB3MwsOY0Iv3vNrw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.6"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.27.4",
        "@rollup/rollup-android-arm64": "4.27.4",
        "@rollup/rollup-darwin-arm64": "4.27.4",
        "@rollup/rollup-darwin-x64": "4.27.4",
        "@rollup/rollup-freebsd-arm64": "4.27.4",
        "@rollup/rollup-freebsd-x64": "4.27.4",
        "@rollup/rollup-linux-arm-gnueabihf": "4.27.4",
        "@rollup/rollup-linux-arm-musleabihf": "4.27.4",
        "@rollup/rollup-linux-arm64-gnu": "4.27.4",
        "@rollup/rollup-linux-arm64-musl": "4.27.4",
        "@rollup/rollup-linux-powerpc64le-gnu": "4.27.4",
        "@rollup/rollup-linux-riscv64-gnu": "4.27.4",
        "@rollup/rollup-linux-s390x-gnu": "4.27.4",
        "@rollup/rollup-linux-x64-gnu": "4.27.4",
        "@rollup/rollup-linux-x64-musl": "4.27.4",
        "@rollup/rollup-win32-arm64-msvc": "4.27.4",
        "@rollup/rollup-win32-ia32-msvc": "4.27.4",
        "@rollup/rollup-win32-x64-msvc": "4.27.4",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/rollup/node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.27.4.tgz",
      "integrity": "sha512-2Y3JT6f5MrQkICUyRVCw4oa0sutfAsgaSsb0Lmmy1Wi2y7X5vT9Euqw4gOsCyy0YfKURBg35nhUKZS4mDcfULw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-android-arm64": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.27.4.tgz",
      "integrity": "sha512-wzKRQXISyi9UdCVRqEd0H4cMpzvHYt1f/C3CoIjES6cG++RHKhrBj2+29nPF0IB5kpy9MS71vs07fvrNGAl/iA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.27.4.tgz",
      "integrity": "sha512-PlNiRQapift4LNS8DPUHuDX/IdXiLjf8mc5vdEmUR0fF/pyy2qWwzdLjB+iZquGr8LuN4LnUoSEvKRwjSVYz3Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.27.4.tgz",
      "integrity": "sha512-o9bH2dbdgBDJaXWJCDTNDYa171ACUdzpxSZt+u/AAeQ20Nk5x+IhA+zsGmrQtpkLiumRJEYef68gcpn2ooXhSQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.27.4.tgz",
      "integrity": "sha512-NBI2/i2hT9Q+HySSHTBh52da7isru4aAAo6qC3I7QFVsuhxi2gM8t/EI9EVcILiHLj1vfi+VGGPaLOUENn7pmw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.27.4.tgz",
      "integrity": "sha512-wYcC5ycW2zvqtDYrE7deary2P2UFmSh85PUpAx+dwTCO9uw3sgzD6Gv9n5X4vLaQKsrfTSZZ7Z7uynQozPVvWA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.27.4.tgz",
      "integrity": "sha512-9OwUnK/xKw6DyRlgx8UizeqRFOfi9mf5TYCw1uolDaJSbUmBxP85DE6T4ouCMoN6pXw8ZoTeZCSEfSaYo+/s1w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.27.4.tgz",
      "integrity": "sha512-Vgdo4fpuphS9V24WOV+KwkCVJ72u7idTgQaBoLRD0UxBAWTF9GWurJO9YD9yh00BzbkhpeXtm6na+MvJU7Z73A==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.27.4.tgz",
      "integrity": "sha512-pleyNgyd1kkBkw2kOqlBx+0atfIIkkExOTiifoODo6qKDSpnc6WzUY5RhHdmTdIJXBdSnh6JknnYTtmQyobrVg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.27.4.tgz",
      "integrity": "sha512-caluiUXvUuVyCHr5DxL8ohaaFFzPGmgmMvwmqAITMpV/Q+tPoaHZ/PWa3t8B2WyoRcIIuu1hkaW5KkeTDNSnMA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-powerpc64le-gnu": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-powerpc64le-gnu/-/rollup-linux-powerpc64le-gnu-4.27.4.tgz",
      "integrity": "sha512-FScrpHrO60hARyHh7s1zHE97u0KlT/RECzCKAdmI+LEoC1eDh/RDji9JgFqyO+wPDb86Oa/sXkily1+oi4FzJQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.27.4.tgz",
      "integrity": "sha512-qyyprhyGb7+RBfMPeww9FlHwKkCXdKHeGgSqmIXw9VSUtvyFZ6WZRtnxgbuz76FK7LyoN8t/eINRbPUcvXB5fw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.27.4.tgz",
      "integrity": "sha512-PFz+y2kb6tbh7m3A7nA9++eInGcDVZUACulf/KzDtovvdTizHpZaJty7Gp0lFwSQcrnebHOqxF1MaKZd7psVRg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.27.4.tgz",
      "integrity": "sha512-Ni8mMtfo+o/G7DVtweXXV/Ol2TFf63KYjTtoZ5f078AUgJTmaIJnj4JFU7TK/9SVWTaSJGxPi5zMDgK4w+Ez7Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.27.4.tgz",
      "integrity": "sha512-5AeeAF1PB9TUzD+3cROzFTnAJAcVUGLuR8ng0E0WXGkYhp6RD6L+6szYVX+64Rs0r72019KHZS1ka1q+zU/wUw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.27.4.tgz",
      "integrity": "sha512-yOpVsA4K5qVwu2CaS3hHxluWIK5HQTjNV4tWjQXluMiiiu4pJj4BN98CvxohNCpcjMeTXk/ZMJBRbgRg8HBB6A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.27.4.tgz",
      "integrity": "sha512-KtwEJOaHAVJlxV92rNYiG9JQwQAdhBlrjNRp7P9L8Cb4Rer3in+0A+IPhJC9y68WAi9H0sX4AiG2NTsVlmqJeQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/rollup/node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.27.4",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.27.4.tgz",
      "integrity": "sha512-3j4jx1TppORdTAoBJRd+/wJRGCPC0ETWkXOecJ6PPZLj6SptXkrXcNqdj0oclbKML6FkQltdz7bBA3rUSirZug==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/rollup/node_modules/@types/estree": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.6.tgz",
      "integrity": "sha512-AYnb1nQyY49te+VRAVgmzfcgjYS91mY5P0TKUDCLEM+gNnA+3T6rWITXRLYCpahpqSQbN5cE+gHpnPyXjHWxcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/typescript": {
      "version": "5.6.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.6.3.tgz",
      "integrity": "sha512-hjcS1mhfuyi4WW8IWtjP7brDrG2cuDZukyrYrSauoXGNgx0S7zceP07adYkJycEr56BOUTNPzbInooiN3fn1qw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/vite": {
      "version": "5.4.11",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.11.tgz",
      "integrity": "sha512-c7jFQRklXua0mTzneGW9QVyxFjUgwcihC4bXEtujIo2ouWCe1Ajt/amn2PCxYnhYfd5k09JX3SB7OYWFKYqj8Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    }
  }
}

```

package.json
```json
{
  "name": "testproj",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  
  "scripts": {
    "dev": "vite --host",
    "element1build": "vite build element1",
    "element1preview": "vite preview element1 --host",

     "element2build": "vite build element2",
    "element2preview": "vite preview element2 --host",

     "element3build": "vite build element3",
    "element3preview": "vite preview element3 --host",

     "element4build": "vite build element4",
    "element4preview": "vite preview element4 --host",

     "element5build": "vite build element5",
    "element5preview": "vite preview element5 --host"

  },
  "devDependencies": {
    "typescript": "~5.6.2",
    "vite": "^5.4.10"
  }
}

```

tsconfig.ts
```json
{
  "compilerOptions": {
    "target": "ESNext", // choose our ECMA/JavaScript version (all modern browsers support ES6 so it's your best bet)
    "lib": [ // choose our default ECMA/libraries to import
      "dom", // mandatory for all browser-based apps
      "es6" // mandatory for targeting ES6
    ],
    "useDefineForClassFields": true, // enable latest ECMA runtime behavior with older ECMA/JavaScript versions (delete this line if target: "ESNext" or "ES2022"+)
    "module": "ESNext", // use the latest ECMA/JavaScript syntax for our import statements and such
    "moduleResolution": "node", // ensures we are using CommonJS for our npm packages
    "noResolve": false, // disable TypeScript from automatically detecting/adding files based on import statements and etc (it's less helpful than you think)
    "isolatedModules": true, // allows our code to be processed by other transpilers, such as preventing non-module TS files (you could delete this since we're only using base TypeScript)
    "removeComments": true, // remove comments from our outputted code to save on space (look into terser if you want to protect the outputted JS even more)
    "esModuleInterop": true, // treats non-ES6 modules separately from ES6 modules (helpful if module: "ESNext")
    "noImplicitAny": false, // usually prevents code from using "any" type fallbacks to prevent untraceable JS errors, but we'll need this disabled for our example code
    "noUnusedLocals": false, // usually raises an error for any unused local variables, but we'll need this disabled for our example code
    "noUnusedParameters": true, // raises an error for unused parameters
    "noImplicitReturns": true, // raises an error for functions that return nothing
    "skipLibCheck": true, // skip type-checking of .d.ts files (it speeds up transpiling)
    // Vite takes care of building everything, not tsc.
    "noEmit": true, // disable TypeScript from emitting any JS files (we'll be using Vite for that)
  },
  "include": ["src"] // specify location(s) of .ts files
}
```

vite.sonfig.ts
```javascript
// vite.config.ts
import { defineConfig } from "vite";
export default defineConfig({
  // config options
  server: {
    fs: {
      // Allow serving files outside of the root
      allow: ["../.."],
    },
  },
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
    esbuildOptions: {
      target: "esnext",
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
        }
    },
  },
  build: {
    target: "esnext",
  },
});

// https://forum.babylonjs.com/t/importing-and-implementing-havok-in-vite-react-ts-project-fails/48441/4
```