function startMove(obj,json,fn){
	clearInterval( obj.timer );
	
	var iSpeed = 0  ;
	obj.timer = setInterval( function(){
		var tStop=true;
		for(var attr in json){
			var iCur=0;
			//1.找到当前值
			if( attr != 'opacity'){
				iCur = parseInt(getstyle(obj,attr)) ;
			}else{
				iCur =   Math.round(  parseFloat(getstyle(obj,attr) ) * 100 );
			} 
			//2.计算速度
			iSpeed = (　json[attr] - iCur ) / 8 ;
			iSpeed = iSpeed > 0 ?Math.ceil( iSpeed ):Math.floor( iSpeed );
			//3.判断停止
			if( 　json[attr]!= iCur　){//只要有一个属性没有达到目标，就给tStop赋值false，直到所有属性都达到目标
				tStop=false;
			}
			
			if( attr == 'opacity' ){
					obj.style[attr] = ( iCur + iSpeed )/100 ;
					obj.style.filter = 'alpha(opacity = ' + ( iCur + iSpeed ) +')';	
			}else{	
				obj.style[attr] = iCur + iSpeed + 'px';
				//console.log(obj.offsetTop);
				//console.log(obj);
			}
			
		}

		if(tStop){
			clearInterval( obj.timer );
			if(fn){
				fn();
			}
		}
	
	},30)
}


function getstyle(obj,attr){
	return obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	
}
