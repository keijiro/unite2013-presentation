#pragma strict

import System.IO;

var method = 0;
var urlOnFileServer = "https://github.com/keijiro/unite2013-presentation/raw/master/AssetBundleComparison/Assets/StreamingAssets/compressed.unity3d";

var labelStyle : GUIStyle;
private var labelText = "";

function Start() {
	var compressedFilePath = System.IO.Path.Combine(Application.streamingAssetsPath, "compressed.unity3d");
	var uncompressedFilePath = System.IO.Path.Combine(Application.streamingAssetsPath, "uncompressed.unity3d");

	while (!Caching.ready) yield;

	labelText = "Loading (asset bundle)";

	if (method == 0) {
		var bundle = AssetBundle.CreateFromFile(uncompressedFilePath);
	}

	if (method == 1) {
		var fileBuffer = System.IO.File.ReadAllBytes(compressedFilePath);
		var request = AssetBundle.CreateFromMemory(fileBuffer);
		yield request;
		bundle = request.assetBundle;
	}

	if (method == 2) {
		var www = WWW(urlOnFileServer);
		yield www;
		bundle = www.assetBundle;
	}

	if (method == 3) {
		www = WWW("file://" + compressedFilePath);
		yield www;
		bundle = www.assetBundle;
	}

	if (method == 4) {
		Caching.CleanCache();
		yield;

		www = WWW.LoadFromCacheOrDownload(urlOnFileServer, 0);
		yield www;

		bundle = www.assetBundle;
	}

	if (method == 5) {
		www = WWW.LoadFromCacheOrDownload(urlOnFileServer, 0);
		yield www;

		bundle = www.assetBundle;
	}

	labelText = "Loaded (asset bundle)";

	yield WaitForSeconds(1.0);

	labelText = "LoadAll";
	var assets = bundle.LoadAll();
	labelText = "Loaded (assets)";

	yield WaitForSeconds(1.0);

	labelText = "";

	for (var i = 0; i < assets.Length; i++) {
		renderer.material.mainTexture = assets[i] as Texture2D;
		yield WaitForSeconds(0.01);
	}

	if (www) www.Dispose();
	bundle.Unload(false);

	labelText = "Unloaded (asset bundle)";

	for (i = 0; i < assets.Length; i++) {
		renderer.material.mainTexture = assets[i] as Texture2D;
		yield WaitForSeconds(0.01);
	}

	renderer.material.mainTexture = null;
	assets = null;
	yield Resources.UnloadUnusedAssets();

	labelText = "Done";
}

function OnGUI() {
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), labelText, labelStyle);
}
