var lengthToWater =190;
var n = 0;
var distanceUpFirstRamp = 480;
var distanceToFire = 520;
async function startProgram() {
	//await speak("Blue",false);
	
	
	
	await driveToDistance(0,255,distanceUpFirstRamp);
	
	stopRoll();
	//await roll(0,50,1.75);
	await delay(1);
	setHeading(270);


	await driveToDistance(270, 200, lengthToWater);
	stopRoll();

	//water tower knocking
	await driveToDistance(0, -70, 66);
	while (n<12){
		
		await driveToDistance(0, 200,25);
		await driveToDistance(0,-70,40);
		n++;
	}
	await driveToDistance(0,100,66);
	
	await driveToDistance(270,200,lengthToWater);
	setHeading(185);
	await delay(2);
	resetAim();
	
	//rolling down hill to other side
	/*await driveToDistance(0,100, 685);
	
	await driveToDistance(0,100,630);
	
	
	await driveToDistance(270, 80, lengthToWater);
	stopRoll();

	//water tower knocking
	await driveToDistance(0, -70, 66);
	while (n<12){
		
		await driveToDistance(0, 150,25);
		await driveToDistance(0,-70,40);
		n++;
	}
	await driveToDistance(0,25,66);
	
	await driveToDistance(270,50,lengthToWater);
	*/
	
	//Autonomous Parking
	
	await driveToDistance(0,80,distanceToFire);
	await driveToDistance(270,80,188);
	/*
	
	await delay(4);
	
	//VICTORY DANCE WOHOOOOOO
	for(let degIndex =0;degIndex<100000;degIndex++){
		
		var r = Math.random() * (255);
		var g = Math.random() * (255);
		var b = Math.random() * (255);
		//await speak(r + " " + g + " " + b + " ", true);
		setMainLed({ r: r, g: g, b: b });
		await rawMotor(-100,100,0.01);
		//await delay(0.1);
		
		
		await delay(0.025);
	*/
	
	
	
	
	
	
			
}
