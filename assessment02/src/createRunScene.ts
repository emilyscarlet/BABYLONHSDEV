import { AbstractMesh, ActionManager, CubeTexture, SceneLoader } from "@babylonjs/core";
import { SceneData } from "./interfaces ";
import {
  keyActionManager,
  keyDownMap,
  keyDownHeld,
  getKeyDown,
} from "./keyActionManager";

export default function createRunScene(runScene: SceneData) {
  runScene.scene.actionManager = new ActionManager(runScene.scene);
  keyActionManager(runScene.scene);

  const environmentTexture = new CubeTexture(
    "assets/textures/skybox/skybox_pz.jpg",
    runScene.scene
  );
  const skybox = runScene.scene.createDefaultSkybox(
    environmentTexture,
    true,
    10000,
    0.1
  );

  let keyDownMap: any[] = [];
function importPlayerMesh(scene, x: number, y: number) {
let item = SceneLoader.ImportMesh("", "./models/", "dummy3.babylon", scene,
function(newMeshes) {
let mesh = newMeshes[0];
scene.onBeforeRenderObservable.add(()=> {
if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
mesh.position.z += 0.1;
mesh.rotation.y = 0;
}
if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
mesh.position.x -= 0.1;
mesh.rotation.y = 3 * Math.PI / 2;
}
if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
mesh.position.z -= 0.1;
mesh.rotation.y = 2 * Math.PI / 2;
}
if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
mesh.position.x += 0.1;
mesh.rotation.y = Math.PI / 2;
}
});
});
return item;
}
}