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
			"body",
			"body-in",
			"window",
			"in1",
			"in2",
			"cooler",
			"direction_screen",
			"light",
			"logo",
			"obj1",
			"obj2",
			"obj3",
			"panta2",
			"shadow",
			"under-Mc",
			"under-Tc",
			"wiper"));
	doorLF = renderer.registerParts(new Parts("door_LF"));
	doorLB = renderer.registerParts(new Parts("door_LB"));
	doorRF = renderer.registerParts(new Parts("door_RF"));
	doorRB = renderer.registerParts(new Parts("door_RB"));

	lcd = renderer.registerParts(new Parts("lcd"));

	pantabase = renderer.registerParts(new Parts("panta_D2"));
	pantaD21 = renderer.registerParts(new Parts("panta_D2_1"));
	pantaD22 = renderer.registerParts(new Parts("panta_D2_2"));
	pantaD23 = renderer.registerParts(new Parts("panta_D2_3"));
	pantaD24 = renderer.registerParts(new Parts("panta_D2_4"));
	pantaD25 = renderer.registerParts(new Parts("panta_D2_5"));
}

function render_panta(entity, pantaDistance, pantaType) {
	var pantaState = 0.0,
		pDis = pantaDistance;

	try {
		pantaState = renderer.sigmoid(entity.pantograph_F / 40);
	} catch (e) { }

	switch (pantaType) {
		case "W51":
			var pCro1 = pantaState * 15 + 14,
				pCro2 = pantaState * 35 + 24,
				pCro4 = pantaState * 36 + 24,
				pCro5 = pantaState * 38 + 28;
			break;
		case "Compatible":
			var pCro1 = pantaState * 14,
				pCro2 = pantaState * 24,
				pCro4 = pantaState * 24,
				pCro5 = pantaState * 28;
			break;
		default:
			var pCro1 = pantaState * 29,
				pCro2 = pantaState * 59,
				pCro4 = pantaState * 60,
				pCro5 = pantaState * 66;
			break;
	}

	pantabase.render(renderer);

	// ѫ D2
	GL11.glPushMatrix();
	renderer.rotate(-pCro1, 'X', 0.0, 3.0120, -5.6710);
	pantaD21.render(renderer);
	GL11.glPushMatrix();
	renderer.rotate(pCro4, 'X', 0.0, 3.6084, -6.7370);
	pantaD24.render(renderer);
	GL11.glPopMatrix();
	renderer.rotate(pCro2, 'X', 0.0, 3.7151, -6.8490);
	pantaD22.render(renderer);
	GL11.glPushMatrix();
	renderer.rotate(-pCro2 + pCro1, 'X', 0.0, 4.5750, -5.2950);
	pantaD23.render(renderer);
	GL11.glPopMatrix();
	renderer.rotate(-pCro5, 'X', 0.0, 3.5258, -6.9610);
	pantaD25.render(renderer);
	GL11.glPopMatrix();
}

function render(entity, pass, par3) {

	TCC = TrainControllerClientManager.getTCC(entity);
	doorM = 0.59;
	GL11.glPushMatrix();
	


	//if(entity != null){
	//	var doorL = renderer.sigmoid(entity.doorMoveR / 60) * 0.59;
	//	var doorR = renderer.sigmoid(entity.doorMoveL / 60) * 0.59;
	//}


	if (pass == 0) {
		main.render(renderer);
		render_panta(entity, 7.0, "W51");
		render_door(entity, doorM);
	}

	if (pass == 1) {
	}

	if (pass > 1) {
		main.render(renderer);
		render_panta(entity, 7.0, "W51");
		render_door(entity, doorM);
	}

	var varsion = MCVersionChecker();
	var st1 = 8;

	if (entity != null) { //                             
		if (varsion == "1.7.10" || varsion == "1.8.9" || varsion == "1.9.4") {
			st1 = entity.getTrainStateData(1) + 8;
		} else {
			st1 = entity.getVehicleState(TrainState.getStateType(1)) + 8;
		}

		dataMap = entity.getResourceState().getDataMap();
	}

	GL11.glPopMatrix();

	RenderInnerLCD(entity, dataMap);

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
