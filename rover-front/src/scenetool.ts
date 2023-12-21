import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader, StandardMaterial, Color3, Color4, Camera } from "@babylonjs/core";

//import GUI from babylonjs-gui
import * as GUI from "@babylonjs/gui";

export default class SceneTool {

    drawAxises(scene: Scene): Mesh[] {
        let axisX = MeshBuilder.CreateLines(
            "axisx",
            {
                points: [new Vector3(-10, 0, 0), new Vector3(1000, 0, 0)],
            },
            scene
        );
        let axisY = MeshBuilder.CreateLines(
            "axisy",
            {
                points: [new Vector3(0, -10, 0), new Vector3(0, 1000, 0)],
            },
            scene
        );

        let axisZ = MeshBuilder.CreateLines(
            "axisz",
            {
                points: [new Vector3(0, 0, -10), new Vector3(0, 0, 1000)],
            },
            scene
        );

        axisX.color = new Color3(1, 0, 0); // Red color
        axisY.color = new Color3(0, 1, 0); // Green color = new Color3(1, 0, 0); // Red color
        axisZ.color = new Color3(0, 0, 1); // Green color

        return [axisX, axisY, axisZ];
    }

    showInfoCamera(scene: Scene, camera: any) {
        let advancedTexture =
            GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let rect = new GUI.Rectangle();
        rect.heightInPixels = 40;
        rect.widthInPixels = 200;
        //rect.width = "100%";
        rect.thickness = 0;
        // rect.color = "black";
        rect.alpha = 0.8;
        rect.background = "black";

        rect.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(rect);

        let textBlock = new GUI.TextBlock();
        //textBlock.text = "Camera Info";
        textBlock.color = "white";
        //set background color to black with opacity 0.5
        //textBlock.background = "black";

        //textBlock.alpha = 0.7;
        //textBlock.fontSizeInPixels = 12;

        textBlock.fontSize = "10px";

        rect.addControl(textBlock);
        textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        scene.registerBeforeRender(function () {
            textBlock.text =
                "Position: " +
                camera.position +
                "\n" +
                "Rotation: " +
                camera.rotation +
                "\n" +
                "Alpha: " +
                camera.alpha +
                ", Beta: " +
                camera.beta +
                ", Radius: " +
                camera.radius;
        });
    }
}
