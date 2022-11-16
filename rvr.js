var _colors = [{"r":236,"g":185,"b":9}];
var redRV = 120;
var redGV = 50; //less than
//var redBV = 0;
var yellowRV = 190;
var yellowGV = 130;
var yellowBV = 60;
var greenRV = 20; //less than
var greenGV = 70;
var greenBV = 100; //less than
var blueBV = 100;

var trenchCount = 0;
var waterDone = false;
var trenchLength =0;
var OuterloopOn= true;
var inTrench = true;
var lengthToFire = 150; //cm from end of color to perpendicular fire house
var lengthMidToHouse = 50// cm from middle of thing to the inside of fire house
var lengthToWater =214 //cm from blue square to water tower
async function onColor(color) {
	if (color.r !== 236 || color.g !== 185 || color.b !== 9) return;
}
registerEvent(EventType.onColor, onColor);

async function startProgram() {
	
	//turn on color sensor
	listenForColorSensor(_colors);
	//start going up hill
	
	while (OuterloopOn) {
		setSpeed(30);
		//await speak(("R"+getColorChannel("red")+"G"+getColorChannel("green")+"B"+getColorChannel("blue")), false);

		//moving up hill and searching for yellow square
		if (((getColorChannel("red") > yellowRV) && (getColorChannel("green") > yellowGV)&&(getColorChannel("blue")<yellowBV))&&(!((getColorChannel("red") > 200) && (getColorChannel("green") > 200)&&(getColorChannel("blue")>200)))) {
			await delay(0.5);
			
			await stopRoll();
			
			//setSpeed(4);
			

			//Trench Procedure 1
			await speak("Yellow", true);
			
			//Left Turn Function
			setHeading(270);
			//await leftTurn();
			
			await backToWall();
			await forwardToRed();
			
		}
		//detect green
		else if (((getColorChannel("green") > greenGV) && (getColorChannel("blue") < greenBV) && (getColorChannel("red") < greenRV))&&(!((getColorChannel("red") > 200) && (getColorChannel("green") > 200)&&(getColorChannel("blue")>200))))  {
			await stopRoll();
			
			OuterloopOn = false;
			
			//await speak("Green", true);
		
			//Left Turn Function
			await leftTurn();
			await backToWall();
			await forwardToRed();
			
			OuterloopOn = true;
			
			
			
		}
		
		//detect blue
		else if (((getColorChannel("blue") > blueBV)&&(!waterDone))&&(getColorChannel("blue")<220)) {
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
		else if ((getColorChannel("blue") > blueBV)&&(waterDone)){
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
		//await speak("Main Loop",true);
	
	}
}

async function backToWall() {
	
	await roll(270,-15,3);
	await speak("Back is to wall",false);
	
}
async function leftTurn() {
	//resetAim();
	//var startYaw = getOrientation().yaw;
	//await speak("Yaw : " + startYaw,false);
	//await delay(3);
	while (getOrientation().yaw < 90){
		await rawMotor(0,45, 0.05);
		await speak("Trying to turn",false);
		
	}
	while (getOrientation().yaw > 90){
		await rawMotor(0,-10, 0.1);
		await delay(0.025);
	}
	
	//await speak("Yaw : " + getOrientation().yaw,true);

}

async function forwardToRed() {
	setSpeed(50);
	while (inTrench){
		// Check for red
		if ((getColorChannel("red") > redRV) &&(getColorChannel("green") < redGV)){
			
			setSpeed(0);
			//Pushing bean bags into trench
			await roll(270,85,0.3);
			//await speak("Detected Red", true);
			
			//Exiting trench
			await driveToDistance(270, -35, trenchLength);
			//await setHeading(0);
			await rightTurn();
			await speak("Trench Completed", true);
			
			await roll (0,50,1);
			inTrench = false;
			
				
		}
		
		await delay(0.025);
	}
}
async function rightTurn() {
	
	while (getOrientation().yaw > -90){
		await speak(getOrientation().yaw);
		await rawMotor(30,0, 0.1);
		await speak("Trying to turn",false);
		
	}
	while (getOrientation().yaw < -90){
		await rawMotor(-10,0, 0.1);
		await delay(0.025);
		await speak("Correcting Turn",false);
	}
	await speak("Done Turn",true);

}
async function completeSide() {
	await driveToDistance(0, 100,953); //Entire Side length
	setSpeed(0);						
	setHeading(270);
	resetAim();
	await driveToDistance(0, 25, lengthToWater);
	//water tower knocking
	setHeading(270);
	await driveToDistance(270, 10, 10);
	await driveToDistance(270, 10, -10);
	//Finishing top path back to ramp
	setHeading(0);
	await driveToDistance(0,25,lengthToWater);
	setHeading(270);
	resetAim();
	await driveToDistance(0,80,351); //Smaller Side Length
}
async function fireHouse() {
	await driveToDistance(0, 50, lengthToFire);
	setHeading(270);
	await driveToDistance(270, 50,lengthMidToHouse);
}
