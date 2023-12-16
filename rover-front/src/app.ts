import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader, StandardMaterial, Color3, Color4 } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials/grid"

class App {
    constructor() {

        function loadAndSpinMesh(meshFile: string, scene: Scene, speed: number, axis: Vector3) {
            //load mesh with wireframe
            SceneLoader.Append("/assets/mesh/", meshFile, scene, function (newScene) {
                var mesh = newScene.meshes[0];
                //mesh.rotation = axis;

                // let wireFrameMaterial = new StandardMaterial("mat_wireframe", scene);
                // wireFrameMaterial.emissiveColor = new Color3(0.13, 0.13, 0.13);

                // wireFrameMaterial.zOffset = 10;

                // mesh.enableEdgesRendering(10);
                // mesh.edgesWidth = 5;
                // mesh.edgesColor = new Color4(0.55, 0.55, 0.55, 0.42);

                // mesh.material = wireFrameMaterial;

                console.log(mesh);

                mesh.material = new GridMaterial("")

                //scene.beginAnimation(mesh, 0, 100, true, speed);
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

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        //var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        loadAndSpinMesh("sphere.glb", scene, 2, new Vector3(0, 1, 0));

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