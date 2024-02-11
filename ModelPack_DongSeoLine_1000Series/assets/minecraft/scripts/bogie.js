var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.ngtlib.renderer);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.util);



function init(par1, par2) {
	base = renderer.registerParts(new Parts("WDT61"));
	wheelP = renderer.registerParts(new Parts("wheelPlus"));
	wheelM = renderer.registerParts(new Parts("wheelMinus"));
}

function render(entity, pass, par3) {
	var angle = 0.0;
	if (entity != null) {
		angle = renderer.getWheelRotationR(entity);
	}

	GL11.glPushMatrix();
	base.render(renderer);
	GL11.glPopMatrix();
	renderWheel(angle);
}

function renderWheel(angle) {
	GL11.glPushMatrix();
	renderer.rotate(angle, 'X', 0.0, -0.5270, 1.05);
	wheelP.render(renderer);
	GL11.glPopMatrix();

	GL11.glPushMatrix();
	renderer.rotate(angle, 'X', 0.0, -0.5270, -1.05);
	wheelM.render(renderer);
	GL11.glPopMatrix();
}