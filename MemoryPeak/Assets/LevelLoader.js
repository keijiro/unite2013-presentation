#pragma strict

var nextLevel = "";
var style : GUIStyle;

private var labelText = "";

function Start() {
	labelText = "Press the mouse button to load level " + nextLevel;
	while (!Input.GetMouseButtonDown(0)) yield;
	while (!Input.GetMouseButtonUp(0)) yield;
	labelText = "Loading...";
	yield;
	Application.LoadLevel(nextLevel);
}

function OnGUI() {
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), labelText, style);
}
