function scrollEventhandler(){

	var y = window.pageYOffset;
	var h = window.innerHeight;

	if(y>0.6*h){

		var opc = (window.pageYOffset-window.innerHeight*0.75)/100;

		if(opc>1.0){
			opc = 1;
		}
		globalValues.navbarContainer.style.opacity = opc;
	}
	else{
		globalValues.navbarContainer.style.opacity = 0.0;
	}
}

function resizeEventhalndler(){

	var w = window.innerWidth;
	var h = window.innerHeight;



}
