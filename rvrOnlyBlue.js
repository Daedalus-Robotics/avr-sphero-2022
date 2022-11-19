var lengthToWater =214;
async function startProgram() {
	//await speak("Blue",false);
	
	
	
	await driveToDistance(0,80,406);
	
	stopRoll();
	await roll(0,50,1.75);
	await delay(1);
	setHeading(270);


	await driveToDistance(270, 80, (lengthToWater-15));
	stopRoll();

	//water tower knocking
	setHeading(90);
	await roll(0, -100, 1.5 );
	await roll(0, 25,3);
	await driveToDistance(270,50,lengthToWater);
	setHeaing(180);
	await roll(180,40,1);
	resetAim();
	
	
	await driveToDistance(0,80, 1069);
	
	stopRoll();
	await roll(0,50,1.75);
	await delay(1);
	setHeading(270);


	await driveToDistance(270, 80, (lengthToWater-15));
	stopRoll();

	//water tower knocking
	setHeading(90);
	await roll(0, -100, 1.5 );
	await roll(0, 25,3);
	await driveToDistance(270,50,lengthToWater);
	setHeaing(180);
	await roll(180,40,1);
	resetAim();
	
	await driveToDistance(0,80,533);
	await driveToDistance(270, 40,161);
	
			
}
