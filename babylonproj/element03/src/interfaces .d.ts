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