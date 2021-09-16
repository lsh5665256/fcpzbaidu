function rem(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth*40/320+"px";
}
rem()
window.addEventListener("resize",rem,false);