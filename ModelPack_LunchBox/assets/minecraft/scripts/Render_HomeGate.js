var renderClass = 'jp.ngt.rtm.render.MachinePartsRenderer';
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.jp.ngt.rtm.entity.train);
importPackage(Packages.net.minecraft.util); //1.7.10-AxisAlignedBB
importPackage(Packages.net.minecraft.util.math); //1.12.2-AxisAlignedBB
importPackage(Packages.jp.ngt.ngtlib.util);
importPackage(Packages.jp.ngt.ngtlib.io);
importPackage(Packages.jp.ngt.rtm.entity.train.parts);

//元スクリプト作成者:@hi03_s様
//スクリプト改変者:@Saqliva

function init(par1, par2) {
    //通常パーツ
    body = renderer.registerParts(new Parts('body'));
    doorF1 = renderer.registerParts(new Parts('dr1'));
    doorF2 = renderer.registerParts(new Parts('dr2'));
    doorF3 = renderer.registerParts(new Parts('dr3'));
    doorB1 = renderer.registerParts(new Parts('dl1'));
    doorB2 = renderer.registerParts(new Parts('dl2'));
    doorB3 = renderer.registerParts(new Parts('dl3'));
    //半透明パーツ
	body_a = renderer.registerParts(new Parts('body_a'));
	doorF1_a = renderer.registerParts(new Parts('dr1_a'));
	doorF2_a = renderer.registerParts(new Parts('dr2_a'));
	doorF3_a = renderer.registerParts(new Parts('dr3_a'));
	doorB1_a = renderer.registerParts(new Parts('dl1_a'));
	doorB2_a = renderer.registerParts(new Parts('dl2_a'));
	doorB3_a = renderer.registerParts(new Parts('dl3_a'));

    doorMoveID = 0;
    prevTickID = 1;

}

doorMoveData = {};
prevTickData = {};

function render(entity, pass, par3) {
    if (entity === null) {
        GL11.glPushMatrix();
        body.render(renderer);
        doorF1.render(renderer);
        doorF2.render(renderer);
        doorF3.render(renderer);
        doorB1.render(renderer);
        doorB2.render(renderer);
        doorB3.render(renderer);
        GL11.glPopMatrix();
        return;
    }

    //※ドアはX軸方向に動くので調整すること
    //設定
    var doorMoveDistance = 1.0; //初期値
    var doorMoveDistanceA = 1.2; //ドアの長さ(m)
    var doorMoveDistanceB = 2.0; //ドアの長さ(m)
    var doorMoveDistanceC = 1.2; //ドアの長さ(m)
    var doorMoveTime = 3.0; //開閉するまでの時間
    var moveFlip = false; //左右反転する ※設定不要

    //直接検知
    var yaw = renderer.getYaw(entity);
    var flag = moveFlip ? -1 : 1;
    var vector = new Vec3(0, 0, 0).rotateAroundY(yaw);
    var offset = [vector.getX(), vector.getY(), vector.getZ()];
    var pos = getPosTileEntity(entity);
    var entityId = pos.join(":");
    var doorMovement = doorMoveDistance / (doorMoveTime * 20);
    var doorMove = doorMoveData[entityId];

    if (doorMoveData[entityId] === undefined) doorMove = 0;
    if (doorMove < 0) doorMove = 0;
    if (doorMove > 1) doorMove = 1;
    var shouldUpdate = updateTick(entity, pass);
    if (RTMCore.VERSION.indexOf("1.7.10") >= 0) {
        var searchAABB = AxisAlignedBB.func_72330_a(
            pos[0] - 3.0 + offset[0],
            pos[1] - 3,
            pos[2] - 3.0 + offset[2],
            pos[0] + 3.0 + offset[0],
            pos[1] + 1,
            pos[2] + 3.0 + offset[2]
        );
    } else {
        var searchAABB = new AxisAlignedBB(
            pos[0] - 3.0 + offset[0],
            pos[1] - 3,
            pos[2] - 3.0 + offset[2],
            pos[0] + 3.0 + offset[0],
            pos[1] + 1,
            pos[2] + 3.0 + offset[2]
        );
    }

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

    //描画処理
    if (pass === 0) {
        GL11.glPushMatrix();
        body.render(renderer);
        GL11.glPopMatrix();
    }
    if (pass === 1) {
        GL11.glPushMatrix();
        body.render(renderer);
        GL11.glPopMatrix();
    }
    var doorRender = function (part, part_a, Minus, MoveDis) {
        if (pass === 0) {
            GL11.glPushMatrix();
            GL11.glTranslatef(doorMove * Minus * MoveDis, 0, 0);
            part.render(renderer);
            GL11.glPopMatrix();
        }
        if (pass === 1) {
            GL11.glPushMatrix();
            GL11.glTranslatef(doorMove * Minus * MoveDis, 0, 0);
            part_a.render(renderer);
            GL11.glPopMatrix();
        }
    }
    doorRender(doorF1, doorF1_a, flag, doorMoveDistanceA);
    doorRender(doorF2, doorF2_a, flag, doorMoveDistanceB);
    doorRender(doorF3, doorF3_a, flag, doorMoveDistanceC);
    doorRender(doorB1, doorB1_a, -flag, doorMoveDistanceA);
    doorRender(doorB2, doorB2_a, -flag, doorMoveDistanceB);
    doorRender(doorB3, doorB3_a, -flag, doorMoveDistanceC);
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