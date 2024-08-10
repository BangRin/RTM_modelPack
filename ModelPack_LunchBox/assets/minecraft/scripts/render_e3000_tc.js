var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.org.lwjgl.input);
importPackage(Packages.org.lwjgl.util.vector);//Vector3f
importPackage(Packages.jp.ngt.rtm)
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.rtm.entity.train);
importPackage(Packages.jp.ngt.rtm.entity.train.util);
importPackage(Packages.jp.ngt.rtm.entity.train.util.TrainState);
importPackage(Packages.jp.ngt.rtm.entity.train.util.TrainState.TrainStateType);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.net.minecraft.util);
importPackage(Packages.jp.kaiz.atsassistmod.api);

var dataMap;

function init(par1, par2){
	main = renderer.registerParts(
		new Parts(
			"body-in",
			"in1",
			"in2",
			"in3",
			"in4",
			"light",
			"obj2",
			"obj3"));

	main_notLight = render.registerParts(
		new Parts(
		"body",
		"body-cab_door",
		"cab",
		"cab1",
		"cab2",
		"cabwall",
		"cooler",
		"direction_screen",
		"panta2",
		"shadow",
		"under-Mc",
		"under-Tc",
		"logo",
		"obj1",
		"wiper"
	));

	mc = renderer.registerParts(new Parts("c_ctrl"));
	doorLB = renderer.registerParts(new Parts("door_LB"));
	doorLF = renderer.registerParts(new Parts("door_LF"));
	doorRB = renderer.registerParts(new Parts("door_RB"));
	doorRF = renderer.registerParts(new Parts("door_RF"));

	meterPanel = renderer.registerParts(new Parts("meter_speed", "meter_brake"));
	needleSpeed = renderer.registerParts(new Parts("needle_speed"));
	needleBlack = renderer.registerParts(new Parts("needle_black"));
	needleRed = renderer.registerParts(new Parts("needle_red"));

	lcd = renderer.registerParts(new Parts("lcd"));
}

function render(entity, pass, par3) {

	TCC = TrainControllerClientManager.getTCC(entity);
	doorM = 0.59;
	GL11.glPushMatrix();

	if(entity != null){
		var notch = entity.getNotch();
		//var doorL = renderer.sigmoid(entity.doorMoveR / 60) * 0.59;
		//var doorR = renderer.sigmoid(entity.doorMoveL / 60) * 0.59;
		var roMc = notch * -8;
	}

	

	if (pass == 0) {
		main.render(renderer);
		main_notLight.render(renderer);
		render_door(entity, doorM);
		render_meter(entity);
	}

	if (pass == 1) {

	}

	if (pass > 1) {
		main.render(renderer);
		main_notLight.render(renderer);
		render_door(entity, doorM);
		render_meter(entity);
	}

	var varsion = MCVersionChecker();
	var st1 = 8;

	if (entity != null) { 
		if (varsion == "1.7.10" || varsion == "1.8.9" || varsion == "1.9.4") {
			st1 = entity.getTrainStateData(1) + 8;
		} else {
			st1 = entity.getVehicleState(TrainState.getStateType(1)) + 8;
		}

		dataMap = entity.getResourceState().getDataMap();
	}

	GL11.glPushMatrix();
	renderer.rotate(roMc, 'X', 0, 0.85, 7.83);
	mc.render(renderer);
	GL11.glPopMatrix();

	GL11.glPopMatrix();

	RenderInnerLCD(entity, dataMap);

}

function render_meter(entity) {
	var roSpeed = 0.0,
		roBlack = 0.0,
		roRed = 0.0;

	if (entity != null) {


		var speed = entity.getSpeed() * 72.0;
		roSpeed = speed * 2.0054 - 30;

		roBlack = entity.brakeCount * 3 * 0.494 - 45;
		roRed = entity.brakeAirCount * 0.085 - 79;
	}

	meterPanel.render(renderer);

	GL11.glPushMatrix();
	renderer.rotate(-80, "X", 0.4084, 1.078, 8.1200);
	renderer.rotate(-roSpeed, "Y", 0.4084, 1.078, 8.1200);
	needleSpeed.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	renderer.rotate(-80, "X", 0.5711, 1.0790, 8.1190);
	renderer.rotate(-roBlack, "Y", 0.5711, 1.0790, 8.1190);
	needleBlack.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	renderer.rotate(-80, "X", 0.5711, 1.0780, 8.1200);
	renderer.rotate(-roRed, "Y", 0.5711, 1.0780, 8.1200);
	needleRed.render(renderer);
	GL11.glPopMatrix();
}

function render_door(entity, doorMove) {

	var doorL = 0.0,
		doorR = 0.0;

	try {
		doorL = renderer.sigmoid(entity.doorMoveL / 60) * doorMove;
		doorR = renderer.sigmoid(entity.doorMoveR / 60) * doorMove;
	} catch (e) { }

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, -doorL);
	doorLB.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, doorL);
	doorLF.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, -doorR);
	doorRB.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	GL11.glTranslatef(0, 0, doorR);
	doorRF.render(renderer);
	GL11.glPopMatrix();
}

function RenderInnerLCD(entity, dataMap) {
	GLHelper.disableLighting();
	if (entity != null) {
		GL11.glPushMatrix();
		var selStationName = dataMap.getString("bitmapLCD_fileName");
		if (selStationName == "") selStationName = "temp";
		var textureRoute = new ResourceLocation("minecraft", "textures/train/e3000/lcd/" + selStationName + ".png");
		NGTUtilClient.bindTexture(textureRoute);
		lcd.render(renderer);
		GL11.glPopMatrix();
	}
	GLHelper.enableLighting();
}

function MCVersionChecker() {
	var varsion = RTMCore.VERSION;
	if (varsion.indexOf("1.7.10") >= 0) return "1.7.10";
	else if (varsion.indexOf("2.0") >= 0) return "1.8.9";
	else if (varsion.indexOf("2.1") >= 0) return "1.9.4";
	else if (varsion.indexOf("2.2") >= 0) return "1.10.2";
	else if (varsion.indexOf("2.4") >= 0) return "1.12.2";
	else return "unknown";
}
