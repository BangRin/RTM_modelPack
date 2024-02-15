/*
	RTM HOLIC PACK 
	(C) kodeholic@gmail.com 2017. All rights reserved.
*/
//@hi03_s

/*
	DongSeo ScreenDoor by LunchBug (BangRin)
	(C) leeg0520@naver.com.com 2024. All rights reserved.
*/

var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.jp.ngt.rtm.entity.train);
importPackage(Packages.net.minecraft.util);
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.rtm.entity.train.parts);

function init(par1, par2) {

    if (renderer.getModelName().indexOf("_N") != -1) {
        direction = "none";
        body = renderer.registerParts(new Parts("bodyN"));
        return;
    } else {
        body = renderer.registerParts(new Parts("bodyC"));
    }

    if (renderer.getModelName().indexOf("_L") != -1) {
        direction = "left";
        obj1 = renderer.registerParts(new Parts("bodyL1", "bodyR2"));
        doorB1 = renderer.registerParts(new Parts("doorL"));
        return;
    } else if (renderer.getModelName().indexOf("_R") != -1) {
        direction = "right";
        obj2 = renderer.registerParts(new Parts("bodyR1", "bodyL2"));
        doorF1 = renderer.registerParts(new Parts("doorR"));
        return;
    } 

    //doorF1 = renderer.registerParts(new Parts('dr1'));
    //doorB1 = renderer.registerParts(new Parts('dl1'));

    doorMoveID = 0;
    prevTickID = 1;
}

doorMoveData = {};
prevTickData = {};

function render(entity, pass, par3) {
    if (entity === null) {
        GL11.glPushMatrix();

        if (direction == "left")
            GL11.glTranslatef(-0.125, 0.0, 0.0);
        else if (direction == "right")
            GL11.glTranslatef(0.125, 0.0, 0.0);

        body.render(renderer);

        if (direction == "left") {
            doorB1.render(renderer);
            obj1.render(renderer);
        }
        else if (direction == "right") {
            doorF1.render(renderer);
            obj2.render(renderer);
        }

        GL11.glPopMatrix();
        return;
    }

    //※ドアはX軸方向に動くので調整すること
    //設定
    var doorMoveDistance = 1.125; //初期値
    var doorMoveDistanceA = 1.0; //ドアの長さ(m)
    var doorMoveTime = 3.0; //開閉するまでの時間
    var moveFlip = false; //左右反転する ※設定不要

    //直接検知
    var yaw = renderer.getYaw(entity);
    var flag = moveFlip ? -1 : 1;
    var offset = VecHelper.rotateAroundY(0, 0, 0, yaw);
    var pos = getPosTileEntity(entity);
    var entityId = pos.join(":");
    var doorMovement = doorMoveDistance / (doorMoveTime * 20);
    var doorMove = doorMoveData[entityId];
    if (doorMoveData[entityId] === undefined) doorMove = 0;
    var shouldUpdate = updateTick(entity, pass);
    var searchAABB = AxisAlignedBB.func_72330_a(
        pos[0] - 1.5 + offset[0],
        pos[1] - 1,
        pos[2] - 1.5 + offset[2],
        pos[0] + 1.5 + offset[0],
        pos[1] + 1,
        pos[2] + 1.5 + offset[2]
    );
    var world = entity.func_145831_w();
    var entityList1 = world.func_72872_a(EntityTrainBase.class, searchAABB); //List型
    var entityList2 = world.func_72872_a(EntityBogie.class, searchAABB); //List型
    var entityList3 = world.func_72872_a(EntityFloor.class, searchAABB); //List型
    var target = null;
    if (entityList1.size() > 0) target = entityList1.get(0);
    if (entityList2.size() > 0) target = entityList2.get(0).getTrain();
    if (entityList1.size() === 0 &&
        entityList2.size() === 0 &&
        entityList3.size() > 0) {
        target = entityList3.get(0).getVehicle();
    }
    var doorState = 0;
    if (target !== null) {
        doorState = target.getTrainStateData(4);
    }
    if (shouldUpdate) {
        if (doorState > 0) {
            if (doorMove < doorMoveDistance) doorMove += doorMovement;
        } else {
            if (doorMove > 0) doorMove -= doorMovement;
        }
    }
    doorMoveData[entityId] = doorMove;

    GL11.glPushMatrix();

    if (direction == "left") {
        GL11.glTranslatef(-0.125, 0.0, 0.0);
        obj1.render(renderer);
    }
    else if (direction == "right") {
        GL11.glTranslatef(0.125, 0.0, 0.0);
        obj2.render(renderer);
    }

    body.render(renderer);

    GL11.glPopMatrix();
    
    var doorRender = function (part, Minus, MoveDis) {
        GL11.glPushMatrix();
        GL11.glTranslatef(doorMove * Minus * MoveDis, 0, 0);

        if (direction == "left")
            GL11.glTranslatef(-0.125, 0.0, 0.0);
        else if (direction == "right")
            GL11.glTranslatef(0.125, 0.0, 0.0);

        part.render(renderer);
        GL11.glPopMatrix();
    }

    if (direction == "left")
        doorRender(doorB1, flag, doorMoveDistanceA);
    else if (direction == "right")
        doorRender(doorF1, -flag, doorMoveDistanceA);
}

//検知の表示 バールを持つと描画
if (NGTUtilClient.getMinecraft().field_71071_by) {
    var stack = NGTUtilClient.getMinecraft().field_71439_g.field_71071_by.func_70448_g();
    if (stack !== null) {
        if (stack.func_77973_b() === RTMItem.crowbar) {
            spawnParticle(world, "reddust", pos[0] - 1.5 + offset[0], pos[1], pos[2] - 1.5 + offset[2], 0, 0, 0);
            spawnParticle(world, "reddust", pos[0] - 1.5 + offset[0], pos[1], pos[2] + 1.5 + offset[2], 0, 0, 0);
            spawnParticle(world, "reddust", pos[0] + 1.5 + offset[0], pos[1], pos[2] + 1.5 + offset[2], 0, 0, 0);
            spawnParticle(world, "reddust", pos[0] + 1.5 + offset[0], pos[1], pos[2] - 1.5 + offset[2], 0, 0, 0);
        }
    }
}

function updateTick(entity, pass) {
    var pos = getPosTileEntity(entity);
    var matId = renderer.currentMatId;
    var entityId = pos.join(":");
    var tick = renderer.getTick(entity);
    var prevTick = prevTickData[entityId];
    prevTickData[entityId] = tick;
    return prevTick !== tick && pass === 0 && matId === 0;
}

//MCVersionCheckerが必要
function getPosTileEntity(tileEntity) {
    var version = MCVersionChecker();
    var value = [];
    if (version === "1.7.10") {
        value = [tileEntity.field_145851_c + 0.5,
        tileEntity.field_145848_d,
        tileEntity.field_145849_e + 0.5];
    } else {
        var pos = tileEntity.func_174877_v();
        value = [pos.func_177958_n() + 0.5,
        pos.func_177956_o(),
        pos.func_177952_p() + 0.5];
    }
    return value;
}


//importPackage(Packages.jp.ngt.rtm);
function MCVersionChecker() {
    var varsion = RTMCore.VERSION;
    if (varsion.indexOf("1.7.10") >= 0) return "1.7.10";
    else if (varsion.indexOf("2.0") >= 0) return "1.8.9";
    else if (varsion.indexOf("2.1") >= 0) return "1.9.4";
    else if (varsion.indexOf("2.2") >= 0) return "1.10.2";
    else if (varsion.indexOf("2.4") >= 0) return "1.12.2";
    else return "unknown";
}

function spawnParticle(world, name, x, y, z, vx, vy, vz) {
    var ver = MCVersionChecker();
    if (ver === "1.7.10") {
        world.func_72869_a(name, x, y, z, vx, vy, vz);
    } else if (ver === "1.8.9") {
        world.func_175688_a(EnumParticleTypes.WATER_SPLASH, x, y, z, vx, vy, vz, []);
    } else {
        world.func_175688_a(EnumParticleTypes.func_186831_a(name), x, y, z, vx, vy, vz, []);
    }
}