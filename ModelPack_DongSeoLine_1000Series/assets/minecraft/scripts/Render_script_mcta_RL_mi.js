var TCC = null;
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
var numinOnes = [];
var numinTens = [];
var numinHundreds = [];

//##### オブジェクト定義 ####################
function init(par1, par2)
{
	//車体
	body = renderer.registerParts(new Parts("Interior", "front", "in_car_equipment", "in_car_equipment_mx", "door"));
	body_not_light = renderer.registerParts(new Parts("exterior", "through_door", "hood", "lambord", "equipment", "cable", "cab", "skirt", "panta"));
	lightF = renderer.registerParts(new Parts("lightF"));
	lightB = renderer.registerParts(new Parts("lightB"));
	ExLF = renderer.registerParts(new Parts("ExLightF"));
	ExLB = renderer.registerParts(new Parts("ExLightB"));
	door_LF = renderer.registerParts(new Parts("doorFL"));
	door_RF = renderer.registerParts(new Parts("doorFR"));
	door_LB = renderer.registerParts(new Parts("doorBL"));
	door_RB = renderer.registerParts(new Parts("doorBR"));
	alpha = renderer.registerParts(new Parts("alpha"));
	door_LFa = renderer.registerParts(new Parts("doorFL1"));
	door_RFa = renderer.registerParts(new Parts("doorFR1"));
	door_LBa = renderer.registerParts(new Parts("doorBL1"));
	door_RBa = renderer.registerParts(new Parts("doorBR1"));

	lcd = renderer.registerParts(new Parts("lcd"));

	rightwiper = renderer.registerParts(new Parts("rightwiper"));
	leftwiper = renderer.registerParts(new Parts("leftwiper"));

	//속도계
	numinOnes = [
		renderer.registerParts(new Parts("0in1")),
		renderer.registerParts(new Parts("1in1")),
		renderer.registerParts(new Parts("2in1")),
		renderer.registerParts(new Parts("3in1")),
		renderer.registerParts(new Parts("4in1")),
		renderer.registerParts(new Parts("5in1")),
		renderer.registerParts(new Parts("6in1")),
		renderer.registerParts(new Parts("7in1")),
		renderer.registerParts(new Parts("8in1")),
		renderer.registerParts(new Parts("9in1"))
	];

	numinTens = [
		renderer.registerParts(new Parts("0in10")),
		renderer.registerParts(new Parts("1in10")),
		renderer.registerParts(new Parts("2in10")),
		renderer.registerParts(new Parts("3in10")),
		renderer.registerParts(new Parts("4in10")),
		renderer.registerParts(new Parts("5in10")),
		renderer.registerParts(new Parts("6in10")),
		renderer.registerParts(new Parts("7in10")),
		renderer.registerParts(new Parts("8in10")),
		renderer.registerParts(new Parts("9in10"))
	];

	numinHundreds = [
		renderer.registerParts(new Parts("0in100")),
		renderer.registerParts(new Parts("1in100")),
		renderer.registerParts(new Parts("2in100")),
		renderer.registerParts(new Parts("3in100")),
		renderer.registerParts(new Parts("4in100")),
		renderer.registerParts(new Parts("5in100")),
		renderer.registerParts(new Parts("6in100")),
		renderer.registerParts(new Parts("7in100")),
		renderer.registerParts(new Parts("8in100")),
		renderer.registerParts(new Parts("9in100"))
	];

	//パンタ
	pantabase = renderer.registerParts(new Parts("panta_AB1", "panta_AB2", "panta_A1", "panta_A2", "panta_B1", "panta_B2", "panta_C1", "panta_C2", "panta_D1", "panta_D2"));
	pantaA11 = renderer.registerParts(new Parts("panta_A1_1"));
	pantaA12 = renderer.registerParts(new Parts("panta_A1_2"));
	pantaA13 = renderer.registerParts(new Parts("panta_A1_3"));
	pantaA14 = renderer.registerParts(new Parts("panta_A1_4"));
	pantaA15 = renderer.registerParts(new Parts("panta_A1_5"));
	pantaA21 = renderer.registerParts(new Parts("panta_A2_1"));
	pantaA22 = renderer.registerParts(new Parts("panta_A2_2"));
	pantaA23 = renderer.registerParts(new Parts("panta_A2_3"));
	pantaA24 = renderer.registerParts(new Parts("panta_A2_4"));
	pantaA25 = renderer.registerParts(new Parts("panta_A2_5"));
	pantaB11 = renderer.registerParts(new Parts("panta_B1_1"));
	pantaB12 = renderer.registerParts(new Parts("panta_B1_2"));
	pantaB13 = renderer.registerParts(new Parts("panta_B1_3"));
	pantaB14 = renderer.registerParts(new Parts("panta_B1_4"));
	pantaB15 = renderer.registerParts(new Parts("panta_B1_5"));
	pantaB21 = renderer.registerParts(new Parts("panta_B2_1"));
	pantaB22 = renderer.registerParts(new Parts("panta_B2_2"));
	pantaB23 = renderer.registerParts(new Parts("panta_B2_3"));
	pantaB24 = renderer.registerParts(new Parts("panta_B2_4"));
	pantaB25 = renderer.registerParts(new Parts("panta_B2_5"));
	pantaC11 = renderer.registerParts(new Parts("panta_C1_1"));
	pantaC12 = renderer.registerParts(new Parts("panta_C1_2"));
	pantaC13 = renderer.registerParts(new Parts("panta_C1_3"));
	pantaC14 = renderer.registerParts(new Parts("panta_C1_4"));
	pantaC15 = renderer.registerParts(new Parts("panta_C1_5"));
	pantaC21 = renderer.registerParts(new Parts("panta_C2_1"));
	pantaC22 = renderer.registerParts(new Parts("panta_C2_2"));
	pantaC23 = renderer.registerParts(new Parts("panta_C2_3"));
	pantaC24 = renderer.registerParts(new Parts("panta_C2_4"));
	pantaC25 = renderer.registerParts(new Parts("panta_C2_5"));
	pantaD11 = renderer.registerParts(new Parts("panta_D1_1"));
	pantaD12 = renderer.registerParts(new Parts("panta_D1_2"));
	pantaD13 = renderer.registerParts(new Parts("panta_D1_3"));
	pantaD14 = renderer.registerParts(new Parts("panta_D1_4"));
	pantaD15 = renderer.registerParts(new Parts("panta_D1_5"));
	pantaD21 = renderer.registerParts(new Parts("panta_D2_1"));
	pantaD22 = renderer.registerParts(new Parts("panta_D2_2"));
	pantaD23 = renderer.registerParts(new Parts("panta_D2_3"));
	pantaD24 = renderer.registerParts(new Parts("panta_D2_4"));
	pantaD25 = renderer.registerParts(new Parts("panta_D2_5"));


	//마스콘들
	EB = renderer.registerParts(new Parts("mascon-8"));
	B7 = renderer.registerParts(new Parts("mascon-7"));
	B6 = renderer.registerParts(new Parts("mascon-6"));
	B5 = renderer.registerParts(new Parts("mascon-5"));
	B4 = renderer.registerParts(new Parts("mascon-4"));
	B3 = renderer.registerParts(new Parts("mascon-3"));
	B2 = renderer.registerParts(new Parts("mascon-2"));
	B1 = renderer.registerParts(new Parts("mascon-1"));
	N = renderer.registerParts(new Parts("mascon_nomal"));
	P1 = renderer.registerParts(new Parts("mascon+1"));
	P2 = renderer.registerParts(new Parts("mascon+2"));
	P3 = renderer.registerParts(new Parts("mascon+3"));
	P4 = renderer.registerParts(new Parts("mascon+4"));
	P5 = renderer.registerParts(new Parts("mascon+5"));

	//마스콘 조명들
	LEB = renderer.registerParts(new Parts("masconlight-8"));
	LB7 = renderer.registerParts(new Parts("masconlight-7"));
	LB6 = renderer.registerParts(new Parts("masconlight-6"));
	LB5 = renderer.registerParts(new Parts("masconlight-5"));
	LB4 = renderer.registerParts(new Parts("masconlight-4"));
	LB3 = renderer.registerParts(new Parts("masconlight-3"));
	LB2 = renderer.registerParts(new Parts("masconlight-2"));
	LB1 = renderer.registerParts(new Parts("masconlight-1"));
	LN = renderer.registerParts(new Parts("masconlight_nomal"));
	LP1 = renderer.registerParts(new Parts("masconlight+1"));
	LP2 = renderer.registerParts(new Parts("masconlight+2"));
	LP3 = renderer.registerParts(new Parts("masconlight+3"));
	LP4 = renderer.registerParts(new Parts("masconlight+4"));
	LP5 = renderer.registerParts(new Parts("masconlight+5"));


	//Kamikawa-ATS
	//パネル
	ATS_PANEL = renderer.registerParts(new Parts("ATS_PANEL")); //bodyに組み込んだほうがいいかも

	// 1段目
	K_ATS = renderer.registerParts(new Parts("K_ATS"));
	NO_ATS = renderer.registerParts(new Parts("NO_ATS"));

	// 2段目
	L0 = renderer.registerParts(new Parts("L0"));
	L5 = renderer.registerParts(new Parts("L5"));
	L10 = renderer.registerParts(new Parts("L10"));
	L15 = renderer.registerParts(new Parts("L15"));
	L20 = renderer.registerParts(new Parts("L20"));
	L25 = renderer.registerParts(new Parts("L25"));
	L30 = renderer.registerParts(new Parts("L30"));
	L35 = renderer.registerParts(new Parts("L35"));
	L40 = renderer.registerParts(new Parts("L40"));
	L45 = renderer.registerParts(new Parts("L45"));
	L50 = renderer.registerParts(new Parts("L50"));
	L55 = renderer.registerParts(new Parts("L55"));
	L60 = renderer.registerParts(new Parts("L60"));
	L65 = renderer.registerParts(new Parts("L65"));
	L70 = renderer.registerParts(new Parts("L70"));
	L75 = renderer.registerParts(new Parts("L75"));
	L80 = renderer.registerParts(new Parts("L80"));
	L85 = renderer.registerParts(new Parts("L85"));
	L90 = renderer.registerParts(new Parts("L90"));
	L95 = renderer.registerParts(new Parts("L95"));
	L100 = renderer.registerParts(new Parts("L100"));
	L105 = renderer.registerParts(new Parts("L105"));
	L110 = renderer.registerParts(new Parts("L110"));
	L115 = renderer.registerParts(new Parts("L115"));
	L120 = renderer.registerParts(new Parts("L120"));
	L125 = renderer.registerParts(new Parts("L125"));
	L130 = renderer.registerParts(new Parts("L130"));
	L135 = renderer.registerParts(new Parts("L135"));
	L140 = renderer.registerParts(new Parts("L140"));
	L145 = renderer.registerParts(new Parts("L145"));
	L150 = renderer.registerParts(new Parts("L150"));
	L155 = renderer.registerParts(new Parts("L155"));
	L160 = renderer.registerParts(new Parts("L160"));

	// 3段目
	ATS_PA = renderer.registerParts(new Parts("ATS_PA"));
	ATS_B = renderer.registerParts(new Parts("ATS_B"));

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

function renderPartRotate(part, angle, x, y, z, vecArray) {
	GL11.glPushMatrix();
	glPartRotate(angle, x, y, z, vecArray)
	part.render(renderer);
	GL11.glPopMatrix();
}

//##### render ####################
function render(entity, pass, par3)
{
	//数値設定
	var doorMove = 0.64, //ドア開閉距離(m)
		pantaDistance = 7.0, //パンタ中心の前後位置(m)
		pantaType = "Compatible"; //パンタ高(Normal:標準-格納 / W51:W51-格納 / Compatible:標準-W51)
		
	TCC = TrainControllerClientManager.getTCC(entity);

	GL11.glPushMatrix();

	ATS_PANEL.render(renderer);

	//通常描画
	if(pass == 0){
		body.render(renderer);
		body_not_light.render(renderer);
		render_door(entity, doorMove);
		render_light(entity);
		render_panta(entity, pantaDistance, pantaType);
	}
	
	//半透明描画
	if(pass == 1){
		alpha.render(renderer);
		render_door_a(entity, doorMove);
	}
	
	//発光部描画
	if(pass > 1){
		body.render(renderer);
		body_not_light.render(renderer);
		render_light(entity);
		render_door(entity, doorMove);
	}

	// if (pass >= 2) {
	// 	render_Monitor_1(entity);
	// }

	//마크 버전 뭐니
	var varsion = MCVersionChecker();
	var st1 = 8;

	if (entity != null) { //버전에 따라서 열차정보 도출방법 다름
		if (varsion == "1.7.10" || varsion == "1.8.9" || varsion == "1.9.4") {
			st1 = entity.getTrainStateData(1) + 8;
		} else {
			st1 = entity.getVehicleState(TrainState.getStateType(1)) + 8;
		}

		dataMap = entity.getResourceState().getDataMap();
	}

	//일단 마스콘 렌더
	RenderMascon(st1);

	RenderMasconLight(st1);
	render_Monitor_1(entity);
	RenderSpeedMeter(entity);
	GL11.glPopMatrix();

	RenderInnerLCD(entity, dataMap);
}

function RenderInnerLCD(entity, dataMap) {
	GLHelper.disableLighting();
	if (entity != null) {
		GL11.glPushMatrix();
		var selStationName = dataMap.getString("bitmapLCD_fileName");
		if (selStationName == "") selStationName = "black";
		var textureRoute = new ResourceLocation("minecraft", "textures/train/YHkit_b/lcd/" + selStationName + ".png");
		NGTUtilClient.bindTexture(textureRoute);
		lcd.render(renderer);
		GL11.glPopMatrix();
	}
	GLHelper.enableLighting();
}

//속도계 계산
function RenderSpeedMeter(entity) {

	var speed = (entity == null ? 0 : Math.abs(Math.ceil(entity.getSpeed() * 72)));

	if (speed < 0) {
		speed = speed * -1;
	}

	var onesDigit = speed % 10;
	var tensDigit = Math.floor((speed % 100) / 10);
	var hundredsDigit = Math.floor(speed / 100);

	numinOnes[onesDigit].render(renderer);
	numinTens[tensDigit].render(renderer);
	numinHundreds[hundredsDigit].render(renderer);
}

//Kamikawa-ATS
function render_Monitor_1(entity) {
	
	//var signal = (entity == null ? 0 : entity.getSignal());
	var speed = (entity == null ? 0 : Math.abs(Math.ceil(entity.getSpeed() * 72)));

	K_ATS.render(renderer);

	var signal;

	//속도제한 뭘까?
	if(TCC != null)
	{
		var ATCSpeed = TCC.getATCSpeed();
		if(ATCSpeed >=165) signal = 34;
		else if(ATCSpeed >= 160) signal = 33;
		else if(ATCSpeed >= 155) signal = 32;
		else if(ATCSpeed >= 150) signal = 31;
		else if(ATCSpeed >= 145) signal = 30;
		else if(ATCSpeed >= 140) signal = 29;
		else if(ATCSpeed >= 135) signal = 28;
		else if(ATCSpeed >= 130) signal = 27;
		else if(ATCSpeed >= 125) signal = 26;
		else if(ATCSpeed >= 120) signal = 25;
		else if(ATCSpeed >= 115) signal = 24;
		else if(ATCSpeed >= 110) signal = 23;
		else if(ATCSpeed >= 105) signal = 22;
		else if(ATCSpeed >= 100) signal = 21;
		else if(ATCSpeed >= 95) signal = 20;
		else if(ATCSpeed >= 90) signal = 19;
		else if(ATCSpeed >= 85) signal = 18;
		else if(ATCSpeed >= 80) signal = 17;
		else if(ATCSpeed >= 75) signal = 16;
		else if(ATCSpeed >= 70) signal = 15;
		else if(ATCSpeed >= 65) signal = 14;
		else if(ATCSpeed >= 60) signal = 13;
		else if(ATCSpeed >= 55) signal = 12;
		else if(ATCSpeed >= 50) signal = 11;
		else if(ATCSpeed >= 45) signal = 10;
		else if(ATCSpeed >= 40) signal = 9;
		else if(ATCSpeed >= 35) signal = 8;
		else if(ATCSpeed >= 30) signal = 7;
		else if(ATCSpeed >= 25) signal = 6;
		else if(ATCSpeed >= 20) signal = 5;
		else if(ATCSpeed >= 15) signal = 4;
		else if(ATCSpeed >= 10) signal = 3;
		else if(ATCSpeed >= 5) signal = 2;
		else if(ATCSpeed >= 0) signal = 1;
	}

	
	//계산된 속도제한 렌더링 분류
	switch (signal) {
		case 1: L0.render(renderer); break;
		case 2: L5.render(renderer); break;
		case 3: L10.render(renderer); break;
		case 4: L15.render(renderer); break;
		case 5: L20.render(renderer); break;
		case 6: L25.render(renderer); break;
		case 7: L30.render(renderer); break;
		case 8: L35.render(renderer); break;
		case 9: L40.render(renderer); break;
		case 10: L45.render(renderer); break;
		case 11: L50.render(renderer); break;
		case 12: L55.render(renderer); break;
		case 13: L60.render(renderer); break;
		case 14: L65.render(renderer); break;
		case 15: L70.render(renderer); break;
		case 16: L75.render(renderer); break;
		case 17: L80.render(renderer); break;
		case 18: L85.render(renderer); break;
		case 19: L90.render(renderer); break;
		case 20: L95.render(renderer); break;
		case 21: L100.render(renderer); break;
		case 22: L105.render(renderer); break;
		case 23: L110.render(renderer); break;
		case 24: L115.render(renderer); break;
		case 25: L120.render(renderer); break;
		case 26: L125.render(renderer); break;
		case 27: L130.render(renderer); break;
		case 28: L135.render(renderer); break;
		case 29: L140.render(renderer); break;
		case 30: L145.render(renderer); break;
		case 31: L150.render(renderer); break;
		case 32: L155.render(renderer); break;
		case 33: L160.render(renderer); break;
	}

	//속도제한 넘었을때 표출될꺼
	if ((signal == 1 && speed > 0) ||
		(signal == 2 && speed > 5) ||
		(signal == 3 && speed > 10) ||
		(signal == 4 && speed > 15) ||
		(signal == 5 && speed > 20) ||
		(signal == 6 && speed > 25) ||
		(signal == 7 && speed > 30) ||
		(signal == 8 && speed > 35) ||
		(signal == 9 && speed > 40) ||
		(signal == 10 && speed > 45) ||
		(signal == 11 && speed > 50) ||
		(signal == 12 && speed > 55) ||
		(signal == 13 && speed > 60) ||
		(signal == 14 && speed > 65) ||
		(signal == 15 && speed > 70) ||
		(signal == 16 && speed > 75) ||
		(signal == 17 && speed > 80) ||
		(signal == 18 && speed > 85) ||
		(signal == 19 && speed > 90) ||
		(signal == 20 && speed > 95) ||
		(signal == 21 && speed > 100) ||
		(signal == 22 && speed > 105) ||
		(signal == 23 && speed > 110) ||
		(signal == 24 && speed > 115) ||
		(signal == 25 && speed > 120) ||
		(signal == 26 && speed > 125) ||
		(signal == 27 && speed > 130) ||
		(signal == 28 && speed > 135) ||
		(signal == 29 && speed > 140) ||
		(signal == 30 && speed > 145) ||
		(signal == 31 && speed > 150) ||
		(signal == 32 && speed > 155) ||
		(signal == 33 && speed > 160)) {
		ATS_B.render(renderer);
	}
	if (signal == 34) ATS_PA.render(renderer);

}

function RenderMascon(state)
{
	switch(state)
	{
		case 0:
			EB.render(renderer);
			break;
		case 1:
			B7.render(renderer);
			break;
		case 2:
			B6.render(renderer);
			break;
		case 3:
			B5.render(renderer);
			break;
		case 4:
			B4.render(renderer);
			break;
		case 5:
			B3.render(renderer);
			break;
		case 6:
			B2.render(renderer);
			break;
		case 7:
			B1.render(renderer);
			break;
		case 8:
			N.render(renderer);
			break;
		case 9:
			P1.render(renderer);
			break;
		case 10:
			P2.render(renderer);
			break;
		case 11:
			P3.render(renderer);
			break;
		case 12:
			P4.render(renderer);
			break;
		default:
			P5.render(renderer);
			break;
	}
}

function RenderMasconLight(state)
{
	switch(state)
	{
		case 0:
			LEB.render(renderer);
			break;
		case 1:
			LB7.render(renderer);
			break;
		case 2:
			LB6.render(renderer);
			break;
		case 3:
			LB5.render(renderer);
			break;
		case 4:
			LB4.render(renderer);
			break;
		case 5:
			LB3.render(renderer);
			break;
		case 6:
			LB2.render(renderer);
			break;
		case 7:
			LB1.render(renderer);
			break;
		case 8:
			LN.render(renderer);
			break;
		case 9:
			LP1.render(renderer);
			break;
		case 10:
			LP2.render(renderer);
			break;
		case 11:
			LP3.render(renderer);
			break;
		case 12:
			LP4.render(renderer);
			break;
		default:
			LP5.render(renderer);
			break;
	}
}


//##### render_ライト ####################
function render_light(entity){
	
	var varsion = MCVersionChecker();
	var lightMove = 0;
	var ExState = 0;
	

	if(entity != null)
	{
		if(varsion == "1.7.10" || varsion == "1.8.9" || varsion == "1.9.4"){
			ExState = entity.getTrainStateData(11);
		}else{
			ExState = entity.getVehicleState(TrainState.getStateType(11));
		}
	}

	try{
		lightMove = (entity.seatRotation)/ 45;
	}catch(e){}
	

	 if(lightMove < 0){
 	   if(ExState >= 1){
	    GL11.glPushMatrix();
	     ExLF.render(renderer);
	    GL11.glPopMatrix();
	   }else{
	    GL11.glPushMatrix();
	     ExLB.render(renderer);
	    GL11.glPopMatrix();
  	   }
	 }else{
	  GL11.glPushMatrix();
	  ExLB.render(renderer);
	  GL11.glPopMatrix();
	 }

	 if(lightMove < 0){
	  GL11.glPushMatrix();
	  lightF.render(renderer);
	  GL11.glPopMatrix();
	 }else{
	  GL11.glPushMatrix();
	  lightB.render(renderer);
	  GL11.glPopMatrix();
	 }
}





//##### render_ドア ####################
function render_door(entity,doorMove){
	
	var doorMoveL = 0.0,
		doorMoveR = 0.0;
	
	try{
		doorMoveL = renderer.sigmoid(entity.doorMoveL / 60) * doorMove;
		doorMoveR = renderer.sigmoid(entity.doorMoveR / 60) * doorMove;
	}catch(e){}
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveL);
	door_LF.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveL);
	door_LB.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveR);
	door_RF.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveR);
	door_RB.render(renderer);
	GL11.glPopMatrix();
}

//##### render_半透ドア ####################
function render_door_a(entity,doorMove){
	
	var doorMoveL = 0.0,
		doorMoveR = 0.0;
	
	try{
		doorMoveL = renderer.sigmoid(entity.doorMoveL / 60) * doorMove;
		doorMoveR = renderer.sigmoid(entity.doorMoveR / 60) * doorMove;
	}catch(e){}
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveL);
	door_LFa.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveL);
	door_LBa.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveR);
	door_RFa.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveR);
	door_RBa.render(renderer);
	GL11.glPopMatrix();
}



//##### render_パンタ ####################
function render_panta(entity,pantaDistance,pantaType){
	
	var pantaState = 0.0,
		pDis = pantaDistance;
	
	try{
		pantaState = renderer.sigmoid(entity.pantograph_F / 40);
	}catch(e){}
	
	switch(pantaType){
		case "W51" :
			var pAro1 = pantaState * 18 + 15,
				pAro2 = pantaState * 37 + 26,
				pBro1 = pantaState * 15 + 12,
				pBro2 = pantaState * 39 + 27,
				pCro1 = pantaState * 15 + 14,
				pCro2 = pantaState * 35 + 24,
				pCro4 = pantaState * 36 + 24,
				pCro5 = pantaState * 38 + 28;
			break;
		case "Compatible" :
			var pAro1 = pantaState * 15,
				pAro2 = pantaState * 26,
				pBro1 = pantaState * 12,
				pBro2 = pantaState * 27,
				pCro1 = pantaState * 14,
				pCro2 = pantaState * 24,
				pCro4 = pantaState * 24,
				pCro5 = pantaState * 28;
			break;
		default :
			var pAro1 = pantaState * 33,
				pAro2 = pantaState * 63,
				pBro1 = pantaState * 27,
				pBro2 = pantaState * 66,
				pCro1 = pantaState * 29,
				pCro2 = pantaState * 59,
				pCro4 = pantaState * 60,
				pCro5 = pantaState * 66;
			break;
	}
	
	pantabase.render(renderer);
	
	//パンタA1
	GL11.glPushMatrix();
	renderer.rotate(pAro1, 'X', 0.0, 2.8784, pDis+0.5224);
	pantaA11.render(renderer);
		renderer.rotate(-pAro2, 'X', 0.0, 3.6729, pDis+1.5431);
		pantaA12.render(renderer);
			renderer.rotate(pAro2-pAro1, 'X', 0.0, 4.6101, pDis+0.0935);
			pantaA13.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(-pAro1, 'X', 0.0, 2.8784, pDis-0.5224);
	pantaA14.render(renderer);
		renderer.rotate(pAro2, 'X', 0.0, 3.6729, pDis-1.5431);
		pantaA15.render(renderer);
	GL11.glPopMatrix();
	
	//パンタA2
	GL11.glPushMatrix();
	renderer.rotate(pAro1, 'X', 0.0, 2.8784, -pDis+0.5224);
	pantaA21.render(renderer);
		renderer.rotate(-pAro2, 'X', 0.0, 3.6729, -pDis+1.5431);
		pantaA22.render(renderer);
			renderer.rotate(pAro2-pAro1, 'X', 0.0, 4.6101, -pDis+0.0935);
			pantaA23.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(-pAro1, 'X', 0.0, 2.8784, -pDis-0.5224);
	pantaA24.render(renderer);
		renderer.rotate(pAro2, 'X', 0.0, 3.6729, -pDis-1.5431);
		pantaA25.render(renderer);
	GL11.glPopMatrix();
	
	//パンタB1
	GL11.glPushMatrix();
	renderer.rotate(pBro1, 'X', 0.0, 2.8784, pDis-0.5224);
	pantaB11.render(renderer);
		renderer.rotate(-pBro2, 'X', 0.0, 3.8526, pDis+0.93);
		pantaB12.render(renderer);
			renderer.rotate(pBro2-pBro1, 'X', 0.0, 4.6227, pDis+0.0229);
			pantaB13.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(-pBro1, 'X', 0.0, 2.8784, pDis+0.5224);
	pantaB14.render(renderer);
		renderer.rotate(pBro2, 'X', 0.0, 3.8526, pDis-0.93);
		pantaB15.render(renderer);
	GL11.glPopMatrix();
	
	//パンタB2
	GL11.glPushMatrix();
	renderer.rotate(pBro1, 'X', 0.0, 2.8784, -pDis-0.5224);
	pantaB21.render(renderer);
		renderer.rotate(-pBro2, 'X', 0.0, 3.8526, -pDis+0.93);
		pantaB22.render(renderer);
			renderer.rotate(pBro2-pBro1, 'X', 0.0, 4.6227, -pDis+0.0229);
			pantaB23.render(renderer);
	GL11.glPopMatrix();
	GL11.glPushMatrix();
	renderer.rotate(-pBro1, 'X', 0.0, 2.8784, -pDis+0.5224);
	pantaB24.render(renderer);
		renderer.rotate(pBro2, 'X', 0.0, 3.8526, -pDis-0.93);
		pantaB25.render(renderer);
	GL11.glPopMatrix();
	
	//パンタC1
	GL11.glPushMatrix();
	renderer.rotate(pCro1, 'X', 0.0, 3.0118, pDis-0.314);
	pantaC11.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(-pCro4, 'X', 0.0, 3.6084, pDis+0.7523);
			pantaC14.render(renderer);
			GL11.glPopMatrix();
		renderer.rotate(-pCro2, 'X', 0.0, 3.7151, pDis+0.8641);
		pantaC12.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(pCro2-pCro1, 'X', 0.0, 4.5998, pDis-0.6186);
			pantaC13.render(renderer);
			GL11.glPopMatrix();
			renderer.rotate(pCro5, 'X', 0.0, 3.5258, pDis+0.9758);
			pantaC15.render(renderer);
	GL11.glPopMatrix();
	
	//パンタC2
	GL11.glPushMatrix();
	renderer.rotate(pCro1, 'X', 0.0, 3.0118, -pDis-0.314);
	pantaC21.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(-pCro4, 'X', 0.0, 3.6084, -pDis+0.7523);
			pantaC24.render(renderer);
			GL11.glPopMatrix();
		renderer.rotate(-pCro2, 'X', 0.0, 3.7151, -pDis+0.8641);
		pantaC22.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(pCro2-pCro1, 'X', 0.0, 4.5998, -pDis-0.6186);
			pantaC23.render(renderer);
			GL11.glPopMatrix();
			renderer.rotate(pCro5, 'X', 0.0, 3.5258, -pDis+0.9758);
			pantaC25.render(renderer);
	GL11.glPopMatrix();
	
	//パンタD1
	GL11.glPushMatrix();
	renderer.rotate(-pCro1, 'X', 0.0, 3.0118, pDis+0.3140);
	pantaD11.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(pCro4, 'X', 0.0, 3.6084, pDis-0.7523);
			pantaD14.render(renderer);
			GL11.glPopMatrix();
		renderer.rotate(pCro2, 'X', 0.0, 3.7151, pDis-0.8641);
		pantaD12.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(-pCro2+pCro1, 'X', 0.0, 4.5998, pDis+0.6186);
			pantaD13.render(renderer);
			GL11.glPopMatrix();
			renderer.rotate(-pCro5, 'X', 0.0, 3.5258, pDis-0.9758);
			pantaD15.render(renderer);
	GL11.glPopMatrix();
	
	//パンタD2
	GL11.glPushMatrix();
	renderer.rotate(-pCro1, 'X', 0.0, 3.0118, -pDis+0.314);
	pantaD21.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(pCro4, 'X', 0.0, 3.6084, -pDis-0.7523);
			pantaD24.render(renderer);
			GL11.glPopMatrix();
		renderer.rotate(pCro2, 'X', 0.0, 3.7151, -pDis-0.8641);
		pantaD22.render(renderer);
			GL11.glPushMatrix();
			renderer.rotate(-pCro2+pCro1, 'X', 0.0, 4.5998, -pDis+0.6186);
			pantaD23.render(renderer);
			GL11.glPopMatrix();
			renderer.rotate(-pCro5, 'X', 0.0, 3.5258, -pDis-0.9758);
			pantaD25.render(renderer);
	GL11.glPopMatrix();
}
