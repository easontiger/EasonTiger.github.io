document.getElementById("canvas").onmousedown=function(e){
	start=new Point(e.pageX,e.pageY);
};

document.getElementById("canvas").ontouchmove=function(e){
	if(start==null||pen!="0")return;
	var sx=start.x,sy=start.y,ex=e.touches[0].pageX,ey=e.touches[0].pageY;
	can.beginPath();
	switch(reflect){
		case "4":
			can.moveTo(width-sx,height-sy);
			can.lineTo(width-ex,height-ey);
			can.moveTo(sx,height-sy);
			can.lineTo(ex,height-ey);
		case "2v":
			can.moveTo(width-sx,sy);
			can.lineTo(width-ex,ey);
			can.moveTo(sx,sy);
			can.lineTo(ex,ey);
			break;
		case "2p":
			can.moveTo(sx,height-sy);
			can.lineTo(ex,height-ey);
		case "1":
			can.moveTo(sx,sy);
			can.lineTo(ex,ey);
	}
	can.stroke();
	start=new Point(e.pageX,e.pageY);
}

document.getElementById("canvas").ontouchend=function(e){
    if(start==null||pen!="1"){
		start=null;
		return;
	}
	var end=new Point(e.changedTouches[0].pageX,e.changedTouches[0].pageY);
	var list_start=reflect_p(start),list_end=reflect_p(end);
	for(i in list_end){
		process(list_start[i],list_end[i]);
	}
	start=null;
};