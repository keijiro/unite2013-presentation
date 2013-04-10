#pragma strict

@MenuItem("Tool/Build Independent Bundles")
static function BuildIndependentBundlesTool() {
	var options =  BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets | BuildAssetBundleOptions.UncompressedAssetBundle;

	var assets0 = [AssetDatabase.LoadMainAssetAtPath("Assets/Prefabs/Prefab0.prefab")];
	BuildPipeline.BuildAssetBundle(assets0[0], assets0, "Assets/StreamingAssets/i0.unity3d", options);

	var assets1 = [AssetDatabase.LoadMainAssetAtPath("Assets/Prefabs/Prefab1.prefab")];
	BuildPipeline.BuildAssetBundle(assets1[0], assets1, "Assets/StreamingAssets/i1.unity3d", options);
}

@MenuItem("Tool/Build Dependent Bundles")
static function BuildDependentBundlesTool() {
	var options =  BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets | BuildAssetBundleOptions.UncompressedAssetBundle | BuildAssetBundleOptions.DeterministicAssetBundle;

	BuildPipeline.PushAssetDependencies();

	var assets0 = [AssetDatabase.LoadMainAssetAtPath("Assets/Prefabs/Prefab0.prefab")];
	BuildPipeline.BuildAssetBundle(assets0[0], assets0, "Assets/StreamingAssets/d0.unity3d", options);

	BuildPipeline.PushAssetDependencies();

	var assets1 = [AssetDatabase.LoadMainAssetAtPath("Assets/Prefabs/Prefab1.prefab")];
	BuildPipeline.BuildAssetBundle(assets1[0], assets1, "Assets/StreamingAssets/d1.unity3d", options);

	BuildPipeline.PopAssetDependencies();
	BuildPipeline.PopAssetDependencies();
}
