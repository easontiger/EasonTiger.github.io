class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        return "("+this.x.toString()+","+this.y.toString()+")";
    }
}

function dist(a,b){
    return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function toNeat(a,b){
	if((a.x-b.x)*(a.y-b.y)>0)return new Point(a.x+b.y-a.y,b.y);
	return new Point(a.x+a.y-b.y,b.y);
}



var shape="0",fill=true,reflect="1",neat=false,filename="a",pen="0";
const can=document.getElementById("canvas").getContext("2d");
can.fillStyle="#000";
can.strokeStyle="#000";
const width=1500,height=1000;

function reflect_p(p){
	var list=[];
	switch(reflect){
		case "4":
			list.push(new Point(width-p.x,height-p.y),new Point(p.x,height-p.y));
		case "2":
			list.push(new Point(width-p.x,p.y));
		case "1":
			list.push(p);
	}
	return list;
}

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

$("#color").change(function(){
	can.fillStyle=$("#color").val();
	can.strokeStyle=$("#color").val();
});

var start;

document.getElementById("canvas").onmousedown=function(e){
	start=new Point(e.pageX,e.pageY);
};

document.getElementById("canvas").onmouseup=function(e){
    if(start==null||pen!="1"){
		start=null;
		return;
	}
	var end=new Point(e.pageX,e.pageY);
	var list_start=reflect_p(start),list_end=reflect_p(end);
	for(i in list_end){
		process(list_start[i],list_end[i]);
	}
	start=null;
};

document.getElementById("canvas").onmousemove=function(e){
	if(start==null||pen!="0")return;
	var sx=start.x,sy=start.y,ex=e.pageX,ey=e.pageY;
	can.beginPath();
	switch(reflect){
		case "4":
			can.moveTo(width-sx,height-sy);
			can.lineTo(width-ex,height-ey);
			can.moveTo(sx,height-sy);
			can.lineTo(ex,height-ey);
		case "2":
			can.moveTo(width-sx,sy);
			can.lineTo(width-ex,ey);
		case "1":
			can.moveTo(sx,sy);
			can.lineTo(ex,ey);
	}
	can.stroke();
	start=new Point(e.pageX,e.pageY);
}

function process(start,end){
	var s;
	switch(shape){
		case "0":
			s=new Circle(start,dist(start,end));
			break;
		case "1":
			if(neat)end=toNeat(start,end);
			s=new Rect(start,end);
			break;
		case "2":
			if(neat)end=toNeat(start,end);
			s=new RT(start,end);
			break;
		case "3":
			if(neat)end=toNeat(start,end);
			s=new Diamond(start,end);
			break;
	}
	s.draw();
}

$("#clear").html("<b>clear</b>");
$("#down").html("<b>download<b>");

$("#clear").click(function(){
    document.getElementById("canvas").getContext("2d").fillStyle="#fff";
    document.getElementById("canvas").getContext("2d").fillRect(0,0,width,height);
});

$("#shape").change(function(){
    shape=$("#shape").val();
});

$("#fill").change(function(){
	fill=($("#fill").val()=="0");
});

$("#reflect").change(function(){
	reflect=$("#reflect").val();
});

$("#border").change(function(){
	var width=$("#border").val();
	var num=/^[0-9]+$/;
	if(num.test(width)){
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
	document.body.appendChild(A);
	A.click();
	A.remove();
});

$("#pen").change(function(){
	pen=$("#pen").val();
	if(pen=="0"){
		$("#s").hide();
	}else{
		$("#s").show();
	}
});

$("#s").hide();