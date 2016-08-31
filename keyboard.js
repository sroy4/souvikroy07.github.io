var Keyboard = function(){
	var keyCodes = {
	  3 : "break",
	  8 : "Delete",
	  9 : "Tab",
	  12 : 'clear',
	  13 : "Return",
	  16 : "LeftShift",
	  17 : "Control",
	  18 : "alt",
	  19 : "pause/break",
	  20 : "CapsLock",
	  27 : "escape",
	  32 : "Space",
	  33 : "page up",
	  34 : "page down",
	  35 : "end",
	  36 : "home ",
	  37 : "left arrow ",
	  38 : "up arrow ",
	  39 : "right arrow",
	  40 : "down arrow ",
	  41 : "select",
	  42 : "print",
	  43 : "execute",
	  44 : "Print Screen",
	  45 : "insert ",
	  46 : "delete",
	  48 : "Num0",
	  49 : "Num1",
	  50 : "Num2",
	  51 : "Num3",
	  52 : "Num4",
	  53 : "Num5",
	  54 : "Num6",
	  55 : "Num7",
	  56 : "Num8",
	  57 : "Num9",
	  59 : "semicolon (firefox), equals",
	  60 : "<",
	  61 : "equals (firefox)",
	  63 : "ß",
	  65 : "A",
	  66 : "B",
	  67 : "C",
	  68 : "D",
	  69 : "E",
	  70 : "F",
	  71 : "G",
	  72 : "H",
	  73 : "I",
	  74 : "J",
	  75 : "K",
	  76 : "L",
	  77 : "M",
	  78 : "N",
	  79 : "O",
	  80 : "P",
	  81 : "Q",
	  82 : "R",
	  83 : "S",
	  84 : "T",
	  85 : "U",
	  86 : "V",
	  87 : "W",
	  88 : "X",
	  89 : "Y",
	  90 : "Z",
	  91 : "LeftCommand",
	  92 : "right window key ",
	  93 : "RightCommand",
	  96 : "numpad 0 ",
	  97 : "numpad 1 ",
	  98 : "numpad 2 ",
	  99 : "numpad 3 ",
	  100 : "numpad 4 ",
	  101 : "numpad 5 ",
	  102 : "numpad 6 ",
	  103 : "numpad 7 ",
	  104 : "numpad 8 ",
	  105 : "numpad 9 ",
	  106 : "multiply ",
	  107 : "add",
	  108 : "numpad period (firefox)",
	  109 : "subtract ",
	  110 : "decimal point",
	  111 : "divide ",
	  112 : "f1 ",
	  113 : "f2 ",
	  114 : "f3 ",
	  115 : "f4 ",
	  116 : "f5 ",
	  117 : "f6 ",
	  118 : "f7 ",
	  119 : "f8 ",
	  120 : "f9 ",
	  121 : "f10",
	  122 : "f11",
	  123 : "f12",
	  124 : "f13",
	  125 : "f14",
	  126 : "f15",
	  127 : "f16",
	  128 : "f17",
	  129 : "f18",
	  130 : "f19",
	  144 : "num lock ",
	  145 : "scroll lock",
	  163 : "#",
	  173 : "minus (firefox), mute/unmute",
	  174 : "decrease volume level",
	  175 : "increase volume level",
	  176 : "next",
	  177 : "previous",
	  178 : "stop",
	  179 : "play/pause",
	  181 : "mute/unmute (firefox)",
	  182 : "decrease volume level (firefox)",
	  183 : "increase volume level (firefox)",
	  186 : "Semicolon",
	  187 : "equal sign ",
	  188 : "Comma",
	  189 : "dash ",
	  190 : "Period",
	  191 : "Question",
	  192 : "Tilde",
	  194 : "numpad period (chrome)",
	  219 : "LeftBracket",
	  220 : "BackSlash",
	  221 : "RightBracket",
	  222 : "Quote",
	  224 : "left or right ⌘ key (firefox)",
	  225 : "altgr",
	  226 : "< /git >",
	  230 : "GNOME Compose Key",
	  255 : "toggle touchpad"
	};
	"use strict";
	
	var state="down";
	var props = {
		kbHeight:100
		,kbWidth:280
		,scale:1 //how small/large relative to the data file
		,divId:'keyboard-div'
	};

	function kb(elemId,coords){
		props.elemId = elemId +' .kb-div';
		props.coords = coords;
		var div = d3.select(elemId)
				.append('div').attr('class','kb-div')
				.attr('id',props.divId);

		props.div = div;
		if(props.title){
		 	var title = '<h5>'+props.title + '</h5> <small class=light>'+props.subtitle+'</small>';
			
			div.append('div').html(title).attr('class','title')
		 	div.attr('data-user',props.title);
		 }
		 

		var svg = div.append('svg')
				.attr({
					'width':props.kbWidth*props.scale+5,
					'height':props.kbHeight*props.scale+5
				})
	    	    .append('g')

	    // the keys	   
    	var key = svg.append('g')
    		.selectAll('.key')
    		.data(coords)
    		.enter().append('g')
    		.attr('class','key')
    		;

    	// Create filters for drop shadow effect	
		var defs = svg.append( 'defs' );

		// append filter element
		var filter1 = defs.append( 'filter' )
		                 .attr( 'id', 'dropshadow' )

		var filter2 = defs.append( 'filter' )
		                 .attr( 'id', 'dropshadow2' )  

		// append gaussian blur to filter
		filter1.append( 'feGaussianBlur' )
		      .attr( 'in', 'SourceAlpha' )
		      .attr( 'stdDeviation', 3 ) //parameter - blur
		      .attr( 'result', 'blur' );

		filter2.append( 'feGaussianBlur' )
		      .attr( 'in', 'SourceAlpha' )
		      .attr( 'stdDeviation', 3 ) //parameter - blur
		      .attr( 'result', 'blur' );      

		// append offset filter to result of gaussion blur filter
		filter1.append( 'feOffset' )
		      .attr( 'in', 'blur' )
		      .attr( 'dx', 2 ) //parameter - x-offset
		      .attr( 'dy', 3 ) //parameter - y-offset
		      .attr( 'result', 'offsetBlur' );

		filter2.append( 'feOffset' )
		      .attr( 'in', 'blur' )
		      .attr( 'dx', -2 ) //parameter - x-offset
		      .attr( 'dy', -3 ) //parameter - y-offset
		      .attr( 'result', 'offsetBlur' );      

		// merge result with original image
		var feMerge = filter1.append( 'feMerge' );
		var feMerge2 = filter2.append( 'feMerge' );

		// first layer result of blur and offset
		feMerge.append( 'feMergeNode' )
		       .attr( 'in", "offsetBlur' )
		feMerge2.append( 'feMergeNode' )
		       .attr( 'in", "offsetBlur' )       

		// original image on top
		feMerge.append( 'feMergeNode' )
		       .attr( 'in', 'SourceGraphic' );	
		feMerge2.append( 'feMergeNode' )
		       .attr( 'in', 'SourceGraphic' );	       

    	var r = props.scale > 1 ? 6 : 2;

    	key.append('rect')
    		.attr('rx',r).attr('ry',r)
    		.attr('width',wKey)
    		.attr('height',hKey)
    		.attr('x',xKey)
    		.attr('y',yKey)
    		.attr('fill','#FFAC7C')
    		.attr('fill-opacity','1')
    		.attr( 'filter', 'url(#dropshadow)' );
    	
    	key.append('text')
    		.text(mouseoverKeyText)
    		//.attr('rx',r).attr('ry',r)
    		//.attr('width',wText)
    		//.attr('height',hText)
    		.attr('x',xText)
    		.attr('y',yText)
    		.attr('text-anchor','middle')
    		.attr('alignment-baseline','central')
    		.attr('fill', 'black');
    	




    	console.log(key);
		// foreignObject
		// .attr("src", imagePath) 

    	key.on('mouseover',function(d){
    		
	    	d3.select(this)
	    		.attr('data-original-title',mouseoverKeyText)
	    		.attr('filter','none');
	    		//.attr('fill-opacity','1')//.attr("border",1).style("stroke", 'black').style("stroke-width", 1)
	    		//.attr( 'filter', 'url(#dropshadow)' )
	    		//.transition()
     			//.duration(100);
	    });

	    key.on('mouseout',function(d){
	    	d3.select(this)
	    		//.attr('fill-opacity','0.8').attr("border",0).style("stroke", 'black').style("stroke-width", 0)
	    		.attr( 'filter', 'none' );
	    });
	    
	    key.on('mousedown',function(d){

			d3.select(this)
	    		//.attr('fill-opacity','0.8').attr("border",0).style("stroke", 'black').style("stroke-width", 0)
	    		.attr('transform','translate(2,3)');
	    		//.attr( 'filter', 'url(#dropshadow2)' );
	    	if (d.key=='Delete'){
	    		var formFieldValue = document.getElementById('echoField').value;
      			document.getElementById('echoField').value = formFieldValue.substring(0, formFieldValue.length - 1); 
	    	}
	    	else {
	    		document.getElementById('echoField').value = document.getElementById('echoField').value + d.key.toLowerCase();	
	    	}

	    	//document.getElementById('largeImg').src = path + d.key + state + "F.png";
	    	//document.getElementById('largeImgPanel').style.display = 'block';
	    	//document.getElementById('audiotag1').src = path + d.key + state + ".mp3";
	    	//document.getElementById('audiotag1').play();
	    	
	    });

	    key.on('mouseup',function(d){
	    	d3.select(this)
	    		.attr('transform','translate(0,0)')
	    		.attr( 'filter', 'none' );
	    });

	    window.addEventListener("keydown", function (event) {
  			if (event.defaultPrevented) {
   				 return; // Should do nothing if the key event was already consumed.
			}
			//alert(keyCodes[event.keyCode]);

			// document.getElementById('largeImg').src = path + keyCodes[event.keyCode] + state + "F.png";
	  //   	document.getElementById('largeImgPanel').style.display = 'block';
	  //   	document.getElementById('audiotag1').src = path + keyCodes[event.keyCode] + state + ".mp3";
	  //   	document.getElementById('audiotag1').play();
			// Consume the event for suppressing "double action".
			event.preventDefault();
		}, true);

	    return kb;	
	}

	kb.crossOutKeys = function(presentedKeys){
		if(props.elemId){
			props.presentedKeys = presentedKeys;
			var n = presentedKeys.length;
			var keys = props.div.select('svg').selectAll('.key');
			keys.classed('not-present', function(d,i){ 
					var k = presentedKeys[d.key];
					return k ==undefined || k == 0;
				});
			keys.style('fill-opacity',function(d){ return Math.max(0.2,presentedKeys[d.key] * 10 ); });
		}
		else console.warning("You need to initialize the kb FIRST before crossing out the keys");
		return kb;
	}
	kb.update = function(CurrentState){
		//alert(CurrentState);
		
		if (state!=CurrentState){
			state=CurrentState;
			//return;

			if(props.elemId){
				// update which image to show here, depending on if up or down
				var div = props.div;
				div.select('svg').attr({
						'width':props.kbWidth*props.scale+5,
						'height':props.kbHeight*props.scale+5
					});
				var keys = div.selectAll('.key')
				//.selectAll('rect')
				.append('image')
				.attr("preserveAspectRatio","none")
				.attr('width',wKey)
	    		.attr('height',hKey)
	    		.attr('x',xKey)
	    		.attr('y',yKey)
	    		//.attr("xlink:href",imagePath)
	    		//.attr("overflow","scroll")
	    		
	    		
			}
		}
		return kb;
	}

	kb.pathUpdate = function(CurrentFolder){
		//alert(CurrentState);
		var CurrentPath="/"+CurrentFolder+"TimePlots"+"/";
		if (path!=CurrentPath){
			path=CurrentPath;
			//return;
			document.getElementById("KBName").innerHTML = CurrentFolder;
			if(props.elemId){
				// update which image to show here, depending on if up or down
				var div = props.div;
				div.select('svg').attr({
						'width':props.kbWidth*props.scale+5,
						'height':props.kbHeight*props.scale+5
					});
				var keys = div.selectAll('.key')
				//.selectAll('rect')
				.append('image')
				.attr("preserveAspectRatio","none")
				.attr('width',wKey)
	    		.attr('height',hKey)
	    		.attr('x',xKey)
	    		.attr('y',yKey)
	    		//.attr("xlink:href",imagePath)
	    		//.attr("overflow","scroll")
	    		
	    		
			}
		}
		return kb;
	}



	kb.title = function(title,subtitle) {
		if(!arguments.length) return props.title;
		props.title = title;
		props.subtitle = subtitle || ''
		return kb;
	}

	kb.divId = function(_){
		if(!arguments.length) return props.divId;
		props.divId = _;
		return kb;
	}
	kb.id = function(_) {
		if(!arguments.length) return props.id;
		props.id = _;
		return kb;
	}
	kb.coords = function(_) {
		if(!arguments.length) return props.coords;
		props.coords = _;
		return kb;
	}
	kb.scale = function(_) {
		if(!arguments.length) return props.scale;
		props.scale = _;
		if(props.elemId){
			kb.update();
		}
		return kb;
	}

	//--------------------------------------------------------------------------
  	//--------------------------------------------------------------------------
  	//--------------------------------------------------------------------------
  	function printObject(o) {
  		var out = '';
  		for (var p in o) {
   			 out += p + ': ' + o[p] + '\n';
  			}
  		alert(out);
	}
  	function wKey(d){
  	
  		return d.w * props.scale; 
  	}
  	function hKey(d){return d.h * props.scale; }
  	function xKey(d){ return d.xMin * props.scale; }
  	function yKey(d){
  		return (100-d.yMax) * props.scale; 
  	}
  	function xText(d){ 

  		//console.log((d.xMin+(d.w/2)));
  		return (d.xMin+(d.w/2))* props.scale; 
  	}
  	function yText(d){

  		return ((100-d.yMax) +(d.h/2))*props.scale; 
  	}
  	function wText(d){
  	
  		return d.w * props.scale*0.3; 
  	}
  	function hText(d){return d.h * props.scale * 0.3; }

  	function imagePath(d){
  		//var state="up";
  		var A=path + d.key + state + "F_icon.png";

  		if (d.key=='Space'){
  			var A=path + d.key + state + "F.png";
  			//alert(A);
  		}
  		return A;		
  	}

  	function playAudio(d){
  		var A=path + d.key + state + ".wav";
  		var audio = new Audio(A);
  		alert(A);
		audio.play();

  	}
	
	function mouseoverKeyText(d){
		switch (d.key)
			{

				case 'Tilde': return '~';
				break;

				case 'Num1' : return '1';
				break;

				case 'Num2' : return '2';
				break;

				case 'Num3' : return '3';
				break;

				case 'Num4' : return '4';
				break;

				case 'Num5' : return '5';
				break;

				case 'Num6' : return '6';
				break;

				case 'Num7' : return '7';
				break;

				case 'Num8' : return '8';
				break;

				case 'Num9' : return '9';
				break;

				case 'Num0' : return '0';
				break;

				case 'Minus' : return '-';
				break;

				case 'Equal' : return '=';
				break;

				case 'Delete' : return 'delete';
				break;

				case 'Tab' : return 'tab';
				break;

				case 'LeftBracket' : return '{';
				break;

				case 'RightBracket' : return '}';
				break;

				case 'BackSlash' : return '\\';
				break;

				case 'CapsLock' : return 'caps lock';
				break;

				case 'Semicolon' : return ';';
				break;

				case 'Quote' : return '"';
				break;

				case 'Return' : return 'return';
				break;

				case 'LeftShift' : return 'shift';
				break;

				case 'RightShift' : return 'shift';
				break;

				case 'Comma' : return ',';
				break;

				case 'Period' : return '.';
				break;

				case 'Question' : return '?';
				break;

				case 'Fn' : return 'fn';
				break;

				case 'Control' : return 'control';
				break;

				case 'LeftOption' : return 'option';
				break;

				case 'LeftCommand' : return 'command';
				break;


				case 'Space' : return '';
				break;

				case 'RightCommand' : return 'command';
				break;

				case 'RightOption' : return 'option';
				break;

				default:
				return d.key
			}
		
	}

	function showLargeImagePanel() {
                document.getElementById('largeImgPanel').style.display = 'block';
    }
	return kb;

}