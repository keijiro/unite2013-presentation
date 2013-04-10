#pragma strict

@MenuItem("Tool/Build Asset Bundle")
static function BuildAssetBundleTool() {
	var options = BuildAssetBundleOptions.UncompressedAssetBundle;
	var assets = new UnityEngine.Object[5];
	for (var i = 0; i < assets.Length; i++) {
		var path = "Assets/Images/image" + i + ".png";
		assets[i] = AssetDatabase.LoadMainAssetAtPath(path);
	}
    BuildPipeline.BuildAssetBundle(null, assets, "Assets/StreamingAssets/images.unity3d", options);
}
