#pragma strict

import System.IO;

var method = 0;

function Start() {
	while (!Caching.ready) yield;

	if (method == 0) {
		var bundle = AssetBundle.CreateFromFile(System.IO.Path.Combine(Application.streamingAssetsPath, "uncompressed.unity3d"));
	}

	if (method == 1) {
		var fileBuffer = System.IO.File.ReadAllBytes(System.IO.Path.Combine(Application.streamingAssetsPath, "compressed.unity3d"));
		var request = AssetBundle.CreateFromMemory(fileBuffer);
		yield request;
		bundle = request.assetBundle;
	}

	if (method == 2) {
		var www = WWW("http://");
		yield www;
		bundle = www.assetBundle;
	}

	if (method == 3) {
		www = WWW("file://");
		yield www;
		bundle = www.assetBundle;
	}

	if (method == 4) {
		www = WWW.LoadFromCacheOrDownload("http://", 0);
		yield www;
		www.Dispose();

		www = WWW.LoadFromCacheOrDownload("http://", 0);
		yield www;

		bundle = www.assetBundle;
	}

	if (method == 5) {
		Caching.CleanCache();
		www = WWW.LoadFromCacheOrDownload("http://", 0);
		yield www;
		bundle = www.assetBundle;
	}

	var assets = bundle.LoadAll();
	while (true) {
		for (var i = 0; i < assets.Length; i++) {
			renderer.material.mainTexture = assets[i] as Texture2D;
			yield;
		}
	}
}
