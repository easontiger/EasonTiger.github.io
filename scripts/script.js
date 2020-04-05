class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

function dist(a,b){
    return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function toNeat(a,b){
	if((a.x-b.x)*(a.y-b.y)>0)return new Point(a.x+b.y-a.y,b.y);
	return new Point(a.x+a.y-b.y,b.y);
}



var shape="0",fill=true,reflect="1",neat=false,filename="a",pen="0",rotate=1,side=3;
const can=document.getElementById("canvas").getContext("2d");
can.fillStyle="#000";
can.strokeStyle="#000";
var width=1500,height=1000;

class Circle{
    constructor(o,r){
        this.o=o;
        this.r=r;
    }
    draw(){
        can.beginPath();
        can.arc(this.o.x,this.o.y,this.r,0,2*Math.PI);
		if(fill)can.fill();
		can.stroke();
	}
}

class Rect{
    constructor(a,b){
        this.a=a;
        this.b=b;
    }
    draw(){
		if(fill)can.fillRect(Math.min(this.a.x,this.b.x),Math.min(this.a.y,this.b.y),Math.abs(this.a.x-this.b.x),Math.abs(this.a.y-this.b.y));
		else{
			can.moveTo(this.a.x,this.a.y);
			can.lineTo(this.a.x,this.b.y);
			can.lineTo(this.b.x,this.b.y);
			can.lineTo(this.b.x,this.a.y);
			can.closePath();
			can.stroke();
		}
	}
}

class RT{
    constructor(a,b){
        this.a=a;
        this.b=b;
	}
	draw(){
		can.beginPath();
		can.moveTo(this.a.x,this.a.y);
		can.lineTo(this.a.x,this.b.y);
		can.lineTo(this.b.x,this.b.y);
		can.closePath();
		can.stroke();
		if(fill)can.fill();
	}
}

class Diamond{
	constructor(a,b){
		this.a=a;
		this.b=b;
	}
	draw(){
		can.beginPath();
		var x=(this.a.x+this.b.x)/2,y=(this.a.y+this.b.y)/2;
		can.moveTo(x,this.a.y);
		can.lineTo(this.b.x,y);
		can.lineTo(x,this.b.y);
		can.lineTo(this.a.x,y);
		can.closePath();
		can.stroke();
		if(fill)can.fill();
	}
}

class polygon{
	constructor(s,t){
		this.s=s;
		this.t=t;
	}
	draw(){
		can.beginPath();
		can.moveTo(this.s.x,this.s.y);
		for(var i=0;i<360;i+=360/side){
			can.lineTo(spin(this.s,i,this.t).x,spin(this.s,i,this.t).y);
		}
		can.stroke();
		if(fill)can.fill();
	}
}

$("#color").change(function(){
	can.fillStyle=$("#color").val();
	can.strokeStyle=$("#color").val();
});

var start;

document.getElementById("canvas").onmousedown=function(e){
	start=new Point(e.pageX,e.pageY);
};

function re(x,y,k,b){
	return new Point((x+2*k*(y-b)-x*k*k)/(k*k+1),((2*k*x+y*k*k+2*b-y)/(k*k+1)));
}

function r(p,k,b){
	return new Point((p.x+2*k*(p.y-b)-p.x*k*k)/(k*k+1),((2*k*p.x+p.y*k*k+2*b-p.y)/(k*k+1)));
}

document.getElementById("canvas").onmouseup=function(e){
    if(start==null||pen=="0"){
		start=null;
		return;
	}
	var sx=start.x,sy=start.y,ex=e.pageX,ey=e.pageY;
	switch(reflect){
		case "4pv":
			process(new Point(width-sx,height-sy),new Point(width-ex,height-ey));
			process(new Point(sx,height-sy),new Point(ex,height-ey));
		case "2v":
			process(new Point(width-sx,sy),new Point(width-ex,ey));
			process(start,new Point(ex,ey));
			break;
		case "2p":
			process(new Point(sx,height-sy),new Point(ex,height-ey));
		case "1":
			process(start,new Point(ex,ey));
			break;
		case "2x":
			var k=height/width;
			process(start,new Point(ex,ey));
			process(r(start,1,0),re(ex,ey,1,0));
			break;
		case "2y":
			process(start,new Point(ex,ey));
			process(re(sx,sy,-1,height),re(ex,ey,-1,height));
			break;
		case "4xy":
			process(start,new Point(ex,ey));
			process(r(start,1,0),re(ex,ey,1,0));
			process(re(sx,sy,-1,height),re(ex,ey,-1,height));
			process(r(r(start,-1,height),1,0),r(r(new Point(ex,ey),-1,height),1,0));
	}
	start=null;
};

document.getElementById("canvas").onmousemove=function(e){
	if(start==null||pen!="0")return;
	var sx=start.x,sy=start.y,ex=e.pageX,ey=e.pageY;
	switch(reflect){
		case "4pv":
			process(new Point(width-sx,height-sy),new Point(width-ex,height-ey));
			process(new Point(sx,height-sy),new Point(ex,height-ey));
		case "2v":
			process(new Point(width-sx,sy),new Point(width-ex,ey));
			process(start,new Point(ex,ey));
			break;
		case "2p":
			process(new Point(sx,height-sy),new Point(ex,height-ey));
		case "1":
			process(start,new Point(ex,ey));
			break;
		case "2x":
			process(start,new Point(ex,ey));
			process(r(start,1,0),re(ex,ey,1,0));
			break;
		case "2y":
			process(start,new Point(ex,ey));
			process(re(sx,sy,-1,height),re(ex,ey,-1,height));
			break;
		case "4xy":
			process(start,new Point(ex,ey));
			process(r(start,1,0),re(ex,ey,1,0));
			process(re(sx,sy,-1,height),re(ex,ey,-1,height));
			process(r(r(start,-1,height),1,0),r(r(new Point(ex,ey),-1,height),1,0));
	}
	start=new Point(e.pageX,e.pageY);
}


document.getElementById("canvas").onmouseleave=function(){
	start=null;
}

function spin(p,a,o){
	var ox=o.x,oy=o.y,px=p.x,py=p.y;
	a*=2*Math.PI/360;
	return new Point((px-ox)*Math.cos(a)-(py-oy)*Math.sin(a)+ox,(px-ox)*Math.sin(a)+(py-oy)*Math.cos(a)+oy);
}

var o=new Point(width/2,height/2);

function process(start,end){
	for(var i=0;i<360;i+=360/rotate){
		pro(spin(start,i,o),spin(end,i,o));
	}
}

function pro(start,end){
	var s;
	if(pen=="1")switch(shape){
		case "0":
			s=new Circle(start,dist(start,end));
			s.draw();
			break;
		case "1":
			if(neat)end=toNeat(start,end);
			s=new Rect(start,end);
			s.draw();
			break;
		case "2":
			if(neat)end=toNeat(start,end);
			s=new RT(start,end);
			s.draw();
			break;
		case "3":
			if(neat)end=toNeat(start,end);
			s=new Diamond(start,end);
			s.draw();
			break;
		case "4":
			s=new polygon(start,end);
			s.draw();
			break;
	}
	else if(pen=="2"||pen=="0"){
		can.beginPath();
		can.moveTo(start.x,start.y);
		can.lineTo(end.x,end.y);
		can.stroke();
	}
}

$("#clear").html("<b>clear</b>");
$("#down").html("<b>download<b>");

$("#clear").click(function(){
	fs=can.fillStyle;
    document.getElementById("canvas").getContext("2d").fillStyle="#fff";
	document.getElementById("canvas").getContext("2d").fillRect(0,0,width,height);
	can.fillStyle=fs;
});

$("#shape").change(function(){
	shape=$("#shape").val();
	if(shape!="4"){
		$("#side").hide();
	}else{
		$("#side").show();
	}
});

$("#fill").change(function(){
	fill=($("#fill").val()=="0");
});

$("#reflect").change(function(){
	reflect=$("#reflect").val();
});

$("#rotate").change(function(){
	var ro=$("#rotate").val();
	var num=/^[0-9]+$/;
	if(num.test(ro)&&ro>=1){
		rotate=ro;
	}else{
		$("#warning").html("<font color=\"#e00\"><b>Invalid input for rotate number!</b></font>");
		$("#rotate").val(rotate);
	}
});

$("#border").change(function(){
	var width=$("#border").val();
	var num=/^[0-9]+$/;
	if(num.test(width)&&width>=1){
		can.lineWidth=width;
	}else{
		$("#warning").html("<font color=\"#e00\"><b>Invalid input for line width!</b></font>");
		$("#border").val(can.lineWidth.toString());
	}
});

document.onkeydown=function(e){
	e=e.keyCode;
	if(e==16){
		neat=true;
	}
}

document.onkeyup=function(e){
	e=e.keyCode;
	if(e==16){
		neat=false;
	}
}

function contains(name,str){
	var pat=new RegExp(str);
	return pat.test(name);
}

var valid_name=true;

function check_name(mes,str,name){
	if(contains(name,str)){
		mes+=str[str.length-1]+" ";
		valid_name=false;
	}
	return mes;
}

$("#filename").change(function(){
	valid_name=true;
	var mes="File name cannot contain:";
	var name=$("#filename").val();
	var Invalid=["\\\\","/",":","\\*","\\?","\"","<",">","\\|"];
	for(i in Invalid){
		mes=check_name(mes,Invalid[i],name);
	}
	if(valid_name)filename=$("#filename").val();
	else{
		$("#warning").html("<font color=\"#e00\"><b>"+mes+"</b></font>");
		$("#filename").val(filename);
	}
});

$("#down").click(function(){
	var A=document.createElement("a");
	A.download=filename;
	A.href=canvas.toDataURL("image/png");
	var co=can.fillStyle;
	document.body.appendChild(A);
	A.click();
	A.remove();
	can.fillStyle=can.strokeStyle=co;
});

$("#pen").change(function(){
	pen=$("#pen").val();
	if(pen!="1"){
		$("#s").hide();
	}else{
		$("#s").show();
	}
});

$("#s").hide();
$("#side").hide();

height=document.documentElement.clientHeight;
width=height;
document.getElementById("canvas").height=height;
document.getElementById("canvas").width=width;

window.onresize=function(){
	height=document.documentElement.clientHeight;
	width=height;
	document.getElementById("canvas").height=height;
	document.getElementById("canvas").width=width;
};

$("#sides").change(function(){
	var s=parseInt($("#sides").val());
	var num=/^[0-9]+$/;
	if(num.test(s)&&s>=3){
		side=s;
	}else{
		$("#warning").html("<font color=\"#e00\"><b>Invalid input for line width!</b></font>");
		$("#sides").val(side);
	}
});