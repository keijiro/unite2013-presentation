#pragma strict

static private var numImages = 20;

static private function BuildAssetBundle(destPath : String, options : BuildAssetBundleOptions) {
	var assets = new Texture2D[numImages];

	for (var i = 0; i < numImages; i++) {
		assets[i] = AssetDatabase.LoadMainAssetAtPath("Assets/Images/image" + i.ToString("00") + ".png") as Texture2D;
	}

	BuildPipeline.BuildAssetBundle(null, assets, destPath, options);
}

@MenuItem("Tool/Build Compressed Bundle")
static function ToolBuildCompressedBundle() {
	BuildAssetBundle("Assets/StreamingAssets/compressed.unity3d", 0);
}

@MenuItem("Tool/Build Uncompressed Bundle")
static function ToolBuildUncompressedBundle() {
	BuildAssetBundle("Assets/StreamingAssets/uncompressed.unity3d", BuildAssetBundleOptions.UncompressedAssetBundle);
}
