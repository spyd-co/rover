import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader, StandardMaterial, Color3, Color4 } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials/grid"
import SceneTool from "./scenetool"
import * as GUI from "@babylonjs/gui";

class App {
    constructor() {

        async function loadAndSpinMesh(meshFile: string, scene: Scene, speed: number, axis: Vector3) {
            //load mesh with wireframe

            // let advancedTexture =
            //     GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            // let gui = await advancedTexture.parseFromSnippetAsync("#d04p4z");

            SceneLoader.Append("/assets/mesh/", meshFile, scene, function (newScene) {

                let i = 0;
                newScene.meshes.forEach(function (mesh) {
                    //mesh.position = new Vector3(0, i * 150, 0);
                    i++;
                    mesh.material = new GridMaterial("")
                    console.log(i.toString() + ":" + mesh);
                })
                //mesh.rotation = axis;

                // let mat = new StandardMaterial("mat_wireframe", scene);
                // mat.emissiveColor = new Color3(0.13, 0.13, 0.13);

                // mat.zOffset = 10;
                // mat.wireframe = true;

                // mesh.enableEdgesRendering(10);
                // mesh.edgesWidth = 5;
                // mesh.edgesColor = new Color4(0.55, 0.55, 0.55, 0.42);

                // mesh.material = mat;

                //console.log(mesh);

                // scene.beginAnimation(mesh, 0, 100, true, speed);

                // mesh[0].material.dispose();


            });
        }

        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        //canvas.style.width = "100%";
        //canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        //set background color to white
        scene.clearColor = new Color4(1, 1, 1, 1);

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", -2, 1.2, 85,
            new Vector3(0, 20, 0), scene);
        camera.attachControl(canvas, true);

        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        light1.intensity = 0.7;

        //var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        loadAndSpinMesh("sphere.glb", scene, 2, new Vector3(0, 1, 0));

        var scenetool = new SceneTool();
        scenetool.drawAxises(scene);
        //scenetool.showInfoCamera(scene, camera);




        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }


}
new App();