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
	

	exceptions={"delete" : 1 ,"space" : 1 , "semicolon" : 1, "backslash" : 1, "quote" : 1 , "comma" : 1, "period" :1 ,"question": 1,"leftshift" : 1, "rightshift" : 1 , "return" :1};
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
    		//.attr( 'filter', 'url(#dropshadow)' )
    		.classed('active',true);

    	
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
    	


	    key.on('mouseout',function(d){
	    	d3.select(this)
	    		//.attr('fill-opacity','0.8').attr("border",0).style("stroke", 'black').style("stroke-width", 0)
	    		.attr( 'filter', 'none' );
	    });
	    
	    //key.on('touchstart',function(d){
	    if (isMobile.iOS()){
	    key.on('touchstart',function(d){
	   	
	    		ws.send(d.key.toLowerCase());
				//d3.select(this)
	    		//.attr('fill-opacity','0.8').attr("border",0).style("stroke", 'black').style("stroke-width", 0)
	    		//.attr('transform','translate(2,3)');
	    		//.attr( 'filter', 'url(#dropshadow2)' );
	    	if (d.key=='Delete'){
	    		var formFieldValue = document.getElementById('echoField').value;
      			document.getElementById('echoField').value = formFieldValue.substring(0, formFieldValue.length - 1); 
      			var pattern = document.getElementById('echoField').value.toLowerCase();
	        	
	        	pattern= (""+pattern).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
	        	if (pattern !== "") {
	            	
	            	//kb.hideAndShow(search(pattern));
	            	//kb.redraw(filter_coords(all_coords,search(pattern)));
        			kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(all_letters))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),1));
		        	}

	    	}
	    	else if(d.key=='Space'){
	    		document.getElementById('echoField').value = document.getElementById('echoField').value + " ";

        		//kb.displayAll();
        		var pattern = document.getElementById('echoField').value.toLowerCase();
        		var text=(""+pattern).replace(/[\s-]+$/,'').split(/[\s-]/);
        		// text=text[text.length-1];
        		// var o_t,s_t1, s_t2,max_index;
        		// [o_t, s_t1, s_t2,max_index]=forward_prop_step_np(parseInt(word_to_index[text]), math.zeros(128,1), math.zeros(128,1));
        		// console.log(max_index);
        		if(predictOn){
	        		var predicted= predict(text);
	        		if (predicted!='UNKNOWN_TOKEN'){
	        			document.getElementById('Predict').value=predicted;
	        		}
        		}
        		//console.log(all_letters);
        		kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(all_letters))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),1));
        		
	    	}
	    	else if(d.key=='LeftShift' || d.key=="RightShift"){
	    		console.log('Here');
	    		capsOn=!capsOn;
	    		kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(all_letters))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),1));

	    	}
	    	else{
	    		document.getElementById('echoField').value = document.getElementById('echoField').value + showKey(d.key);	
	    		var pattern = document.getElementById('echoField').value.toLowerCase();
	        	
	        	pattern= (""+pattern).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
	        	if (pattern !== "") {
	            	
	            	//kb.hideAndShow(search(pattern));
	            	//kb.redraw(filter_coords(all_coords,search(pattern)));
	            	kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(search(pattern)))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),0));
		        	}

	    	}

	    	
	    });
	   }
	   else{
	   key.on('mousedown',function(d){
	   		//console.log(d.key);
	   			ws.send(d.key.toLowerCase());
				//d3.select(this)
	    		//.attr('fill-opacity','0.8').attr("border",0).style("stroke", 'black').style("stroke-width", 0)
	    		//.attr('transform','translate(2,3)');
	    		//.attr( 'filter', 'url(#dropshadow2)' );
	    	if (d.key=='Delete'){
	    		var formFieldValue = document.getElementById('echoField').value;
      			document.getElementById('echoField').value = formFieldValue.substring(0, formFieldValue.length - 1); 
      			var pattern = document.getElementById('echoField').value.toLowerCase();
	        	
	        	pattern= (""+pattern).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
	        	if (pattern !== "") {
	            	
	            	//kb.hideAndShow(search(pattern));
	            	//kb.redraw(filter_coords(all_coords,search(pattern)));
        			kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(all_letters))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),1));
		        	}

	    	}
	    	else if(d.key=='Space'){
	    		document.getElementById('echoField').value = document.getElementById('echoField').value + " ";

        		//kb.displayAll();
        		var pattern = document.getElementById('echoField').value.toLowerCase();
        		var text=(""+pattern).replace(/[\s-]+$/,'').split(/[\s-]/);
        		// text=text[text.length-1];
        		// var o_t,s_t1, s_t2,max_index;
        		// [o_t, s_t1, s_t2,max_index]=forward_prop_step_np(parseInt(word_to_index[text]), math.zeros(128,1), math.zeros(128,1));
        		// console.log(max_index);
        		if(predictOn){
	        		var predicted= predict(text);
	        		if (predicted!='UNKNOWN_TOKEN'){
	        			document.getElementById('Predict').value=predicted;
	        		}
        		}
        		//console.log(all_letters);
        		kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(all_letters))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),1));
        		
	    	}
	    	else if(d.key=='LeftShift' || d.key=="RightShift"){
	    		console.log('Here');
	    		capsOn=!capsOn;
	    		kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(all_letters))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),1));

	    	}
	    	else{
	    		document.getElementById('echoField').value = document.getElementById('echoField').value + showKey(d.key);	
	    		var pattern = document.getElementById('echoField').value.toLowerCase();
	        	
	        	pattern= (""+pattern).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
	        	if (pattern !== "") {
	            	
	            	//kb.hideAndShow(search(pattern));
	            	//kb.redraw(filter_coords(all_coords,search(pattern)));
	            	kb.redraw(filter_coords((JSON.parse(JSON.stringify(all_coords))),(JSON.parse(JSON.stringify(search(pattern)))),(JSON.parse(JSON.stringify(coordsMap))),(JSON.parse(JSON.stringify(neighborMap))),0));
		        	}

	    	}
	    	//document.getElementById('echoField').blur();
	    	
	    });

	   }
	    // key.on('mouseup',function(d){
	    // 	d3.select(this)
	    // 		.attr('transform','translate(0,0)')
	    // 		.attr( 'filter', 'none' );
	    // 	//document.getElementById('echoField').focus();	
	    // });


		var search=function(pattern) {

	    	var i, len, k=0;
	    	var len = word_list.length;
	    	var possible_letters={};
		    for (i = 0; i < len; i++) {
		        
		        var n = pattern.length;
		        var text = word_list[i];
		   
		        if (text.toLowerCase().indexOf(pattern.toLowerCase()) === 0) {
		            if(pattern.length!=text.length)
		            {
		            	var nextChar=text.charAt(pattern.length);
		            	if (!(nextChar in possible_letters)){
		            		possible_letters[nextChar.toLowerCase()]=1;
		            	}
		            	else{
		            		possible_letters[nextChar.toLowerCase()]=possible_letters[nextChar]+1;
		            	}
		            }
		        }

		    }
		    return possible_letters;
   
		}

		var showKey =function(key){

		switch (key)
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


				case 'LeftBracket' : return '{';
				break;

				case 'RightBracket' : return '}';
				break;

				case 'BackSlash' : return '\\';
				break;


				case 'Semicolon' : return ';';
				break;

				case 'Quote' : return '\'';
				break;

				case 'Return' : return '\n';
				break;

				case 'Comma' : return ',';
				break;

				case 'Period' : return '.';
				break;

				case 'Question' : return '?';
				break;

				default:
				if (!capsOn){
					return key.toLowerCase();
				}
				else{
					return key;
				}
				
			}
		

	}

		var filter_coords=function(coords,possible_letters,coordsMap,neighborMap,flag)
		{
			var filtered_coords=[];

			

			if (flag){
				filtered_coords=coords;
				return filtered_coords;
			}

			else{

			for (var i=0;i<coords.length;i++)
			{

				if (coords[i]["key"].toLowerCase() in possible_letters || coords[i]["key"].toLowerCase() in exceptions)
				{	
					
					filtered_coords.push(coords[i]);
					
				}
			}

			}
			//console.log(coords);
			//console.log(coordsMap);
			
			
			for (var i=0;i<filtered_coords.length;i++)
			{
				if (!(filtered_coords[i]["key"].toLowerCase() in exceptions)){
				
						var currentKey=filtered_coords[i]["key"];
						
						if (currentKey in neighborMap){
						
							var left_neighbor=neighborMap[currentKey][0];
							var right_neighbor=neighborMap[currentKey][1];
							var up_neighbor=neighborMap[currentKey][2];
							var down_neighbor=neighborMap[currentKey][3];

				
						if (!(left_neighbor=='None'))
						{
						if (!(left_neighbor.toLowerCase() in possible_letters)){
								var left_neighbor_neighbour=neighborMap[left_neighbor][0];
								filtered_coords[i]['xMin']=coordsMap[left_neighbor]['xMin'];
								//filtered_coords[i]['xMax']=coordsMap[currentKey]['xMax'];
								filtered_coords[i]['x']=.5*(coordsMap[left_neighbor]['xMin']+filtered_coords[i]['xMax']);
								filtered_coords[i]['w']=filtered_coords[i]['w']+coordsMap[left_neighbor]['w'];
								neighborMap[currentKey][0]=left_neighbor_neighbour;
								if (!(left_neighbor_neighbour=='None')){
									neighborMap[left_neighbor_neighbour][1]=currentKey;
								}
								
								
								
						}
					}

						if (!(right_neighbor=='None'))
						{

						if (!(right_neighbor.toLowerCase() in possible_letters)) {
								
								var right_neighbor_neighbour=neighborMap[right_neighbor][1];
								

								//filtered_coords[i]['xMin']=coordsMap[currentKey]['xMin'];
								filtered_coords[i]['xMax']=coordsMap[right_neighbor]['xMax'];
								filtered_coords[i]['x']=.5*(coordsMap[right_neighbor]['xMax']+filtered_coords[i]['xMin']);
								filtered_coords[i]['w']=filtered_coords[i]['w']+coordsMap[right_neighbor]['w'];
								neighborMap[currentKey][1]=right_neighbor_neighbour;
								if (!(right_neighbor_neighbour=="None")){
									neighborMap[right_neighbor_neighbour][0]=currentKey;
								}
							

						}
					}

						

						else if ((left_neighbor.toLowerCase() in possible_letters) && (right_neighbor.toLowerCase() in possible_letters)){
					
							filtered_coords[i]['xMin']=coordsMap[currentKey]['xMin'];
							filtered_coords[i]['xMax']=coordsMap[currentKey]['xMax'];
							filtered_coords[i]['x']=.5*(coordsMap[currentKey]['xMin']+coordsMap[currentKey]['xMax']);
							filtered_coords[i]['w']=coordsMap[currentKey]['w'];

						}	

						


					}
				
			}
			

		}

		

		for (var i=0;i<filtered_coords.length;i++)
			{
				if (!(filtered_coords[i]["key"].toLowerCase() in exceptions)){
						var currentKey=filtered_coords[i]["key"];
						//console.log(currentKey);
						if (currentKey in neighborMap){
						//if (currentKey == 'R'){
							var left_neighbor=neighborMap[currentKey][0];
							var right_neighbor=neighborMap[currentKey][1];
							var up_neighbor=neighborMap[currentKey][2];
							var down_neighbor=neighborMap[currentKey][3];
							
					

						if (!(down_neighbor=='None') && !(neighborMap[down_neighbor][1]=="None"))
						{
						var left_corner_neighbor=neighborMap[down_neighbor][0];
						var right_corner_neighbor=neighborMap[down_neighbor][1];
						
						if ((!(down_neighbor.toLowerCase() in possible_letters)) && (!(left_corner_neighbor.toLowerCase() in possible_letters)) && (!(right_corner_neighbor.toLowerCase() in possible_letters))){
								filtered_coords[i]['yMin']=coordsMap[down_neighbor]['yMin'];
								//filtered_coords[i]['xMax']=coordsMap[currentKey]['xMax'];
								filtered_coords[i]['y']=.5*(coordsMap[down_neighbor]['yMin']+filtered_coords[i]['yMax']);
								filtered_coords[i]['h']=filtered_coords[i]['h']+coordsMap[down_neighbor]['h'];
								//possible_letters[down_neighbor.toLowerCase()]=1;

								
						}
						}

						// if (!(up_neighbor.toLowerCase() in possible_letters)){
									
						// 		//var right_neighbor_neighbour=neighborMap[right_neighbor][1];
								

						// 		//filtered_coords[i]['xMin']=coordsMap[currentKey]['xMin'];
						// 		filtered_coords[i]['yMax']=coordsMap[up_neighbor]['yMax'];
						// 		filtered_coords[i]['y']=.5*(coordsMap[up_neighbor]['yMax']+filtered_coords[i]['yMin']);
						// 		filtered_coords[i]['h']=filtered_coords[i]['h']+coordsMap[up_neighbor]['h'];
						// 		possible_letters[up_neighbor.toLowerCase()]=1;
							

						// }

						

						else if ((down_neighbor.toLowerCase() in possible_letters) && (up_neighbor.toLowerCase() in possible_letters)){
					
							filtered_coords[i]['yMin']=coordsMap[currentKey]['yMin'];
							filtered_coords[i]['yMax']=coordsMap[currentKey]['yMax'];
							filtered_coords[i]['y']=.5*(coordsMap[currentKey]['yMin']+coordsMap[currentKey]['yMax']);
							filtered_coords[i]['h']=coordsMap[currentKey]['h'];

						}	

						


					}
				

			}

		}


	



			return filtered_coords;

		}


	    return kb;	
	}

	kb.hideAndShow = function(possible_letters){

				var keys=props.div.select('svg').selectAll('.key');
				
				keys.classed('active', function(d,i){ 
					if (!(d.key=='Space' || d.key=='Delete'))
					{
						if (!(d.key.toLowerCase() in possible_letters)){
							d3.select(this).attr('display','none');
							
						}
						else{
							d3.select(this).attr('display','all');
						}
					}
				});
				
	}
	kb.redraw = function(coords){

				d3.selectAll('#keyboards .kb-div').remove();
				var kbLarge = new Keyboard()
				.id(100).divId('All_Users')
				.scale(4)('#keyboards',coords); 
				
	}

	kb.displayAll = function(){

				var keys=props.div.select('svg').selectAll('.key');
				keys.attr('display','all');
				
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