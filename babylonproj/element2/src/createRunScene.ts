import {} from "@babylonjs/core";

import { SceneData } from "./interface ";

export default function createRunScene(runScene: SceneData) {
 

  runScene.scene.onAfterRenderObservable.add(() => {});
}