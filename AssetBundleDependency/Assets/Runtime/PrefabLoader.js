#pragma strict

var prefix = "d";

function Start() {
	var path1 = System.IO.Path.Combine(Application.streamingAssetsPath, prefix + "0.unity3d");
	var path2 = System.IO.Path.Combine(Application.streamingAssetsPath, prefix + "1.unity3d");

	yield WaitForSeconds(0.5);

	var bundle1 = AssetBundle.CreateFromFile(path1);
	Instantiate(bundle1.mainAsset, Vector3(0, -0.5, 0), Quaternion.identity);

	yield WaitForSeconds(0.5);

	var bundle2 = AssetBundle.CreateFromFile(path2);
	Instantiate(bundle2.mainAsset, Vector3(0, 0.5, 0), Quaternion.identity);
}
