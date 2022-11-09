var _colors = [{"r":236,"g":185,"b":9}];
var redRV = 220;
var redGV = 50; //less than
//var redBV = 0;
var yellowRV = 190;
var yellowGV = 130;
var yellowBV = 40;
var greenRV = 80; //less than
var greenGV = 120;
var greenBV = 220; //less than
var blueBV = 100;

var trenchCount = 0;
var waterDone = false;

var OuterloopOn= true;
var inTrench = true;
async function onColor(color) {
	if (color.r !== 236 || color.g !== 185 || color.b !== 9) return;
}
registerEvent(EventType.onColor, onColor);

async function startProgram() {
	
	//turn on color sensor
	listenForColorSensor(_colors);
	//start going up hill
	
	await delay(0.05);
	while (OuterloopOn) {
		setSpeed(40);
		
		//moving up hill and searching for yellow square
		if (((getColorChannel("red") > yellowRV) && (getColorChannel("green") > yellowGV)&&(getColorChannel("blue")<yellowBV))&&(trenchCount<3)) {
			await delay(0.3);
			
			await stopRoll();
			
			//setSpeed(4);
			await delay(1);
			//OuterloopOn = false;
			//await delay(0.02);
			
			//await strobe({ r: 255, g: 255, b: 37 }, 0.1, 50);
			//Trench Procedure 1
			await speak("Yellow", true);
			
			//Left Turn Function
			await leftTurn();
			
			await backToWall();
			await forwardToRed();
			
		}
		//detect green
		else if (((getColorChannel("green") > greenGV) && (getColorChannel("blue") < greenBV) && (getColorChannel("red") < greenRV))&&(trenchCount<3))  {
			await stopRoll();
			await roll(0,15,1.5);
			setSpeed(5);
			await delay(0.2);
			OuterloopOn = false;
			await stopRoll();
			await speak("Green", true);
		
			//Left Turn Function
			await leftTurn();
			await backToWall();
			await forwardToRed();
			
			OuterloopOn = true;
			
			
			
		}
		
		//detect blue
		else if ((getColorChannel("blue") > blueBV)&&(!waterDone)) {
			setSpeed(0);						
			setHeading(270);
			resetAim();
			await driveToDistance(0, 25, 214);
			//water tower knocking
			setHeading(270);
			await driveToDistance(270, 10, 10);
			await driveToDistance(270, 10, -10);
			//Finishing top path back to ramp
			setHeading(0);
			await driveToDistance(0,25,214);
			setHeading(270);
			resetAim();
			
			
			
			
		}
		else if ((getColorChannel("blue") > blueBV)&&(!waterDone)){
			setSpeed(0);
			setHeading(270);
			await driveToDistance(270,25,429);
			setHeading(180);
			resetAim();
			setSpeed(25);
			//add in procedure for going to fire thingy maybe
		}
		
		//detect red - dont need to detect red byitself unless in trench
		/*else if ((getColorChannel("red") > redRV) &&(getColorChannel("green") < redGV)) {
			
			
			await strobe({ r: 255, g: 0, b: 0 }, 0.1, 5);
				
		
		}*/
		
		//await speak("Broken from Loop", true);
		await delay(0.025);
		await speak("Main Loop",false);
	
	}
}

async function backToWall() {
	
	await roll(270,-15,5);
	await speak("Back is to wall",false);
	
}
async function leftTurn() {
	//resetAim();
	//var startYaw = getOrientation().yaw;
	//await speak("Yaw : " + startYaw,false);
	//await delay(3);
	while (getOrientation().yaw < 90){
		await rawMotor(0,65, 0.1);
		await speak("Trying to turn",false);
		
	}
	while (getOrientation().yaw > 90){
		await rawMotor(0,-30, 0.1);
		await delay(0.025);
	}
	
	await speak("Yaw : " + getOrientation().yaw,true);

}

async function forwardToRed() {
	setSpeed(30);
	while (inTrench){
		// Check for red
		if ((getColorChannel("red") > redRV) &&(getColorChannel("green") < redGV)){
			setSpeed(0);
			await speak("Detected Red", true);
			await roll(270,-30,5);
			await setHeading(0);
			await speak("Trench Completed", true);
			trenchCount = trenchCount+1;
			await roll (0,80,2);
			inTrench = false;
			
				
		}
		
		await delay(0.025);
	}
}
async function rightTurn() {
	resetAim();
	var startYaw = getOrientation().yaw;
	await speak("Yaw : " + startYaw,false);
	await delay(3);
	while (getOrientation().yaw > -90){
		await rawMotor(20, 0, 0.1);
		await delay(0.025);
	}
	while (getOrientation().yaw < -90){
		await rawMotor(-10,0, 0.1);
		await delay(0.025);
	}
	await speak("Yaw : " + getOrientation().yaw,false);

}
