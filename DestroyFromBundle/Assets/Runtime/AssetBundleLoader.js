#pragma strict

var labelStyle : GUIStyle;

private var texMemSize = 0;

function Start() {
	var assetBundlePath = System.IO.Path.Combine(Application.streamingAssetsPath, "images.unity3d");
	var numImages = 5;

	while (true) {
		var bundle = AssetBundle.CreateFromFile(assetBundlePath);

		for (var itr = 0; itr < 2; itr++) {
			for (var idx = 0; idx < numImages; idx++) {
				var asset = bundle.Load("image" + idx, Texture2D);
				renderer.material.mainTexture = asset as Texture2D;

				yield WaitForSeconds(0.5);
				
				DestroyImmediate(asset, true);
				
				yield WaitForSeconds(0.5);
			}
		}

		bundle.Unload(true);
	}
}

function Update() {
	texMemSize = 0;
	for (var texture in Resources.FindObjectsOfTypeAll(typeof(Texture))) {
		texMemSize += Profiler.GetRuntimeMemorySize(texture);
	}
}

function OnGUI() {
	var text = "Texture memory size: " + (1.0 * texMemSize / (1024 * 1024)).ToString(".00") + " MB";
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), text, labelStyle);
}
