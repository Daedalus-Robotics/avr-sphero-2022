var lengthToWater =190;
var n = 0;
async function startProgram() {
	//await speak("Blue",false);
	
	
	
	await driveToDistance(0,80,520);
	
	stopRoll();
	//await roll(0,50,1.75);
	await delay(1);
	setHeading(90);


	await driveToDistance(90, 80, lengthToWater);
	stopRoll();

	//water tower knocking
	await driveToDistance(0, -70, 50);
	while (n<12){
		
		await driveToDistance(0, 25,25);
		await driveToDistance(0,-50,25);
		n++;
	}
	await driveToDistance(0,25,66);
	await delay(10);
	await driveToDistance(90,50,lengthToWater);
	setHeading(180);
	
	resetAim();
	
	//rolling down hill to other side
	await driveToDistance(0,80, 685);
	await driveToDistance(0,80,436);
	
	
	await driveToDistance(270, 80, lengthToWater);
	stopRoll();

	//water tower knocking
	await driveToDistance(0, -70, 66);
	while (n<12){
		
		await driveToDistance(0, 25,25);
		await driveToDistance(0,-50,25);
		n++;
	}
	await driveToDistance(0,25,66);
	
	await driveToDistance(270,50,lengthToWater);
	setHeading(180);
	
	resetAim();
	
	
	
	
	
			
}
