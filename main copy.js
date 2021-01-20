var word_list=[];
var word_to_index={};
var index_to_word=[];
np=numpy;
var capsOn=false;
d3.csv("/data/words.csv", function(data) {
		data.forEach(function(d) {
	word_list.push(d["word"]);
		});
});
d3.csv("/data/word_to_index.csv", function(data) {
		word_to_index=data[0];
});
Papa.parse("data/index_to_word.csv", {download:true,complete: function(data)
	{
		index_to_word=data['data'][0];
	}});
var E;
var V;
var b;
var c;
var W0;
var W1;
var W2;
var W3;
var W4;
var W5;
var U0;
var U1;
var U2;
var U3;
var U4;
var U5;
var flag1=0;
var flag2=0;
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


Papa.parse("data/E.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		E=data['data'].slice(0,l);
		E=math.matrix(E);
		//console.log(E.shape);
		
		flag1=1;
	}});
Papa.parse("data/c.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		c=data['data'].slice(0,l);
		//c=numpy.array(c);
		c=math.matrix(c);
		flag2=1;
	}});
Papa.parse("data/V.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		V=data['data'].slice(0,l);
		V=math.matrix(V);
	}});
Papa.parse("data/b.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		b=data['data'].slice(0,l);
		b=math.matrix(b);
		b=math.transpose(b);
	}});

Papa.parse("data/W0.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		W0=data['data'].slice(0,l);
		W0=math.matrix(W0);
	}});
Papa.parse("data/W1.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		W1=data['data'].slice(0,l);
		W1=math.matrix(W1);
	}});
Papa.parse("data/W2.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		W2=data['data'].slice(0,l);
		W2=math.matrix(W2);
	}});
Papa.parse("data/W3.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		W3=data['data'].slice(0,l);
		W3=math.matrix(W3);
	}});
Papa.parse("data/W4.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		W4=data['data'].slice(0,l);
		W4=math.matrix(W4);
	}});
Papa.parse("data/W5.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		W5=data['data'].slice(0,l);
		W5=math.matrix(W5);
	}});
Papa.parse("./data/U0.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		U0=data['data'].slice(0,l);
		U0=math.matrix(U0);
		
	}});
Papa.parse("data/U1.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		U1=data['data'].slice(0,l);
		U1=math.matrix(U1);
	}});
Papa.parse("data/U2.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		U2=data['data'].slice(0,l);
		U2=math.matrix(U2);
	}});
Papa.parse("data/U3.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		U3=data['data'].slice(0,l);
		U3=math.matrix(U3);
	}});
Papa.parse("data/U4.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		U4=data['data'].slice(0,l);
		U4=math.matrix(U4);
	}});
Papa.parse("data/U5.csv", {download:true, dynamicTyping: true,complete: function(data)
	{
		// executed after all files are complete
		var l=data['data'].length-1
		U5=data['data'].slice(0,l);
		U5=math.matrix(U5);
	}});

var all_coords=[];
var neighborMap={};
var coordsMap={};
var all_letters={};
(function(){

	"use strict";

	// event listeners: make this global so it's accessible by the heatmap and bars classes
	  var dispatch = d3.dispatch("changeDisplayed");
	  var dispatchKB= d3.dispatch("changeKB");
      var dispatchDynamicKB= d3.dispatch("changeDynamicKB");
 
    var kbCoords = [];
    var dataArr = []
    var charts = [];
    var Folderheaders=['A','B'];
    //chars in the kb data array
    var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','`','!','@','#','$','%','^','&','*','(',')','~','=','+','[',']','{','}','\\','|',';',':','','"',',','.','/','<','>','?',' '];
    var symbols = {
					"`":"~",
					'!':"1", 
					"@":"2",
					"#":"3",
					"$":"4",
					"%":"5",
					"^":"6",
					"&":"7",
					"*":"8",
					"(":"9",
					")":"0",
					"+":"=",
					"{":"[",
					"}":"]",					
					"|":"\\",
					":":";",
					"'":"\"",
					"<":",",
					">":".",
					"/":"?"
				};
    
    var headers=['A','B'];
    var rateElems = [];

    var quickLoad = true;
    var kbLarge;


    headers.forEach(function(d){
    	if(d.indexOf('Rate') > -1 ) rateElems.push(d);
    })


	var input = document.getElementById("echoField");
	// var awesomplete = new Awesomplete(input, {
	// 	//list: ["Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails"],
	// 	list: word_list,
	// 	filter: Awesomplete.FILTER_STARTSWITH
	// });
   
    d3.csv('data/XY.csv',function(csv){
    	csv.forEach(function(d){ d.X = +d.X; d.Y = +d.Y; })
    	kbCoords = d3.nest()
    		.key(function(d){ return d.Key; })
    		.entries(csv);
    	//Top Left, Lower Left, Lower Right, Top Right
    	kbCoords.forEach(function(d){
    		var values = d.values;
    		window.mydata = d.key;
    		d.xMax = d3.max(values, xKB),
    		d.xMin = d3.min(values, xKB),
    		d.yMax = d3.max(values, yKB),
    		d.yMin = d3.min(values, yKB),
    		d.w = d.xMax - d.xMin,
    		d.h = d.yMax - d.yMin;
    		d.x = .5*(d.xMax+d.xMin);
    		d.y = .5*(d.yMax + d.yMin);

    	});
    	//var keys = _.map(kbCoords,function(d){ return d.key; }); 
    	all_coords=kbCoords;
    	var offset=0;
    	for (var count=15;count<27;count++){
			var neighborArray=[];
			
			neighborArray.push(kbCoords[count-1]['key']);
			neighborArray.push(kbCoords[count+1]['key']);
			neighborArray.push(kbCoords[count-14]['key']);
			neighborArray.push(kbCoords[count+14]['key']);
			neighborMap[kbCoords[count]['key']]=neighborArray;
			all_letters[kbCoords[count]['key'].toLowerCase()]=1;
		}
		for (var count=29;count<40;count++){
			var neighborArray=[];
			neighborArray.push(kbCoords[count-1]['key']);
			neighborArray.push(kbCoords[count+1]['key']);
			neighborArray.push(kbCoords[count-14]['key']);
			neighborArray.push(kbCoords[count+13]['key']);
			neighborMap[kbCoords[count]['key']]=neighborArray;
			all_letters[kbCoords[count]['key'].toLowerCase()]=1;
		}
		for (var count=42;count<51;count++){
			var neighborArray=[];
			neighborArray.push(kbCoords[count-1]['key']);
			neighborArray.push(kbCoords[count+1]['key']);
			neighborArray.push(kbCoords[count-13]['key']);
			//neighborArray.push(kbCoords[count+13]['key']);
			neighborArray.push('None');
			neighborMap[kbCoords[count]['key']]=neighborArray;
			all_letters[kbCoords[count]['key'].toLowerCase()]=1;
		}
		// neighborMap['V'][3]='Space';
		// neighborMap['B'][3]='Space';
		// neighborMap['N'][3]='Space';
		// neighborMap['M'][3]='Space';

		neighborMap['Tab']=['A','A','A','A'];
		neighborMap['Tab'][0]='None';
		neighborMap['Tab'][1]='Q';
		neighborMap['Tab'][2]='Tilde';
		neighborMap['Tab'][3]='CapsLock';
		
		neighborMap['CapsLock']=['A','A','A','A'];
		neighborMap['CapsLock'][0]='None';
		neighborMap['CapsLock'][1]='A';
		neighborMap['CapsLock'][2]='Tab';
		neighborMap['CapsLock'][3]='LeftShift';

		neighborMap['LeftShift']=['A','A','A','A'];
		neighborMap['LeftShift'][0]='None';
		neighborMap['LeftShift'][1]='Z';
		neighborMap['LeftShift'][2]='CapsLock';
		neighborMap['LeftShift'][3]='Fn';


		//console.log(neighborMap);
		// var dict={};
		// for (var count=15;count<25;count++){
		// 	var neighborArray=[];
			
		// 	dict[kbCoords[count-1]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count+1]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count-14]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count+14]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	neighborMap[kbCoords[count]['key']]=neighborArray;
		// 	all_letters[kbCoords[count]['key'].toLowerCase()]=1;
		// }
		// for (var count=29;count<38;count++){
		// 	var neighborArray=[];
		// 	dict[kbCoords[count-1]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count+1]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count-14]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count+13]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	neighborMap[kbCoords[count]['key']]=neighborArray;
		// 	all_letters[kbCoords[count]['key'].toLowerCase()]=1;
		// }
		// for (var count=42;count<49;count++){
		// 	var neighborArray=[];
		// 	dict[kbCoords[count-1]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count+1]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count-13]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	dict[kbCoords[count+13]['key']]=1;
		// 	neighborArray.push(dict);
		// 	dict={};
		// 	neighborMap[kbCoords[count]['key']]=neighborArray;
		// 	all_letters[kbCoords[count]['key'].toLowerCase()]=1;
		// }
		// neighborMap['V'][3]='Space';
		// neighborMap['B'][3]='Space';
		// neighborMap['N'][3]='Space';
		// neighborMap['M'][3]='Space';

		for (var count=0;count<kbCoords.length;count++){
			var parameterMap={};

			parameterMap['x']=kbCoords[count]['x'];
			parameterMap['y']=kbCoords[count]['y'];
			parameterMap['xMax']=kbCoords[count]['xMax'];
			parameterMap['xMin']=kbCoords[count]['xMin'];
			parameterMap['yMax']=kbCoords[count]['yMax'];
			parameterMap['yMin']=kbCoords[count]['yMin'];
			parameterMap['w']=kbCoords[count]['w'];
			parameterMap['h']=kbCoords[count]['h'];
			coordsMap[kbCoords[count]['key']]=parameterMap;
			if (!(kbCoords[count]['key'].toLowerCase() in all_letters)){
				all_letters[kbCoords[count]['key']]=1;
			}

		}


    	plotFs.drawLegend();
    	plotFs.drawOpacityLegend();

		initDisplayWhatButtons('#navbar-show-what-links .chart-dropdown',rateElems);
		initDisplayFolderButtons('#navbar-show-folder-links .chart-dropdown');
		changeDisplayed(null,0,{label:rateElems[1],id:1})
		

		if(quickLoad) quickLoadData();

		setTimeout(function(){
			console.log("Ready!")

		}, 10000);
		
		
   
    });

	function ShowFolderFileList(){ 
		var FolderPath="/images/";
		var fso, f, fc, s, temp; 
		fso = new ActiveXObject("Scripting.FileSystemObject"); 
		f = fso.GetFolder(FolderPath); 
		fc = new Enumerator(f.files); 
		s = "";
		temp = "";
		for (; !fc.atEnd(); fc.moveNext()) { 
				temp = fc.item();
				s = temp.name;
				alert(s);
				document.getElementById('filelist').options[document.getElementById('filelist').options.length] = new Option (s, s);
				}; 
	}

    function initPlots(){
		
		d3.selectAll('#keyboards .kb-div').remove();


		charts = []; //reinitialize the charts
		var kbs = [];

		
		// large summary keyboard 
		kbLarge = new Keyboard()
			.id(100).divId('All_Users')
			//.title('All Users',formatSubtitle(totalChars))
			.scale(4)('#keyboards',kbCoords); 


		$('*').tooltip({
    		'trigger':'hover'
	        ,'container': 'body'
	        ,'placement': 'top'
	        ,'white-space': 'nowrap'
	        ,'html':'true'
	    });

    }
    function formatTitle(params){
    	return params.user+': '+params.config +', <span class=light>'+params.passage+'</span>';
    }
     
	//--------------------------------------------------------------------------
  	// Dispatch functions ------------------------------------------------------
  	//--------------------------------------------------------------------------
  	// Change what metric is displayed
  	dispatch.on('changeDisplayed.button',function(e,elem,d){ 
  		changeDisplayed(e,elem,d)
  	});

  	dispatchKB.on('changeKB.button',function(e,elem,d){
  		changeKB(e,elem,d)
  	});



  	function changeDisplayed(e,elem,d){
  		if(!d) return;
  		 
  		 
  		if(kbLarge){
  			
  			kbLarge.update(d.label.toLowerCase());

  		}
  		

  	}
  	function changeKB(e,elem,d){
  		if(!d) return;
  		if(kbLarge){
  			
  			kbLarge.pathUpdate(d.label);

  		}

  	}
  	function getDisplayWhatText(){
  		var elem = d3.select('#navbar-show-what-links a.active')[0];
  		if(elem[0]) return elem[0].innerText;
  		else return null;
  	}
  	//--------------------------------------------------------------------------
  	// Button initialization 
  	//--------------------------------------------------------------------------
	function initDisplayWhatButtons(elemId,headers){
		var headers=['A','B'];
	    var listElements = [];
	    headers.forEach(function(d,i){
	    	listElements.push({ id:i, label:d });
	    });
	    var b = initDropdown(elemId,'X',listElements);
	    b.on('click',function(d){ dispatch.changeDisplayed(d3.event,this,d); });
    }

    function initDisplayFolderButtons(elemId){
		var headers=Folderheaders;
	    var listElements = [];
	    headers.forEach(function(d,i){
	    	listElements.push({ id:i, label:d });
	    });
	    var b = initDropdown(elemId,'Y',listElements);
	    b.on('click',function(d){ dispatchKB.changeKB(d3.event,this,d); });
    }

    //--------------------------------------------------------------------------
  	// General Dropdown buttons
  	function initDropdown(btnGrpId,label,listElements){
		var btnGroup = d3.select(btnGrpId)
	    var btnLabel = btnGroup.select('a') 
	    				.html(label +' <b class="caret"></b>')

	    var btnList = btnGroup.append('ul').attr('class','dropdown-menu')
	    					.attr('id',label)
	       					.selectAll('li')
					    	.data(listElements)
					    	.enter().append('li');
	 
	    var btnElems = btnList 
				    	.append('a').attr('href','#')
				    	.html(function(d){ return d.label; });
	    return btnElems;
	}
	function initUserRadioButtons(btnId,users){
		var userRadios = d3.select(btnId).append('div')
			.attr('class','btn-groups')
			.attr('data-toggle','buttons')
			.selectAll('.btn').data(users)
			.enter().append('button')
			.attr('class','btn')
			.classed('btn-primary',true)
			.classed('btn-xs',true)
			.attr('id',function(d,i){ return 'user-radio-'+i; })
			.html(String)	 
	}
	function initMultiselectDropdown(btnGrpId,label,listElements){         
        var data = [];
        listElements.forEach(function(d){ data.push({label:d+'_key',value:d+'_value'}); })
        var multiselect = d3.select(btnGrpId)
          	.attr('class','btn-group')

        multiselect.append('select')
            .attr('class','multiselect')
            .attr('multiple','multiple')
            .selectAll('option').data(listElements)
            .enter().append('option')
            .html(String);

        $('.multiselect').multiselect({
            buttonText: buttenTextFunc,
            onChange: function(element, checked) {
                // updateSubmitButton();
                console.log(element,checked)
            },
            nonSelectedText: label,
            enableCaseInsensitiveFiltering: true,
            height:600,
            buttonClass: 'btn btn-default',
            numberDisplayed: 3,
            includeSelectAllOption: true
        });
        //-----------------------------------------------------------------
        function buttenTextFunc(options, select) { 
            var caret = ' <span class="caret"></span>';
            if (options.length == 0) {
                return this.nonSelectedText + caret; 
            }
            else {
                var selected = label+': ';
                if (options.length > this.numberDisplayed) {
                    return selected + options.length + ' ' + this.nSelectedText + caret;
                }
                else{ 
                    var labels = [];
                    options.each(function() {
                        var label = $(this).attr('label') || $(this).html();
                        labels.push(label);
                    });
                    return selected += labels.join(', ')+ caret;
                }
            }
        }
    }
    function updateConfigLegend(){
    	d3.select('#legend-config').selectAll('span').remove();
    	d3.select('#legend-config').selectAll('span').data(configs)
    		.enter().append('span')
    		.attr('class',function(d,i){ return 'config-'+i; })
    		.classed('legend',true)
    		.html(String)
    }
	function highlightActive(elemId,d){
		var active = d3.select(elemId + ' .dropdown-menu').selectAll('a')
          .classed('active',function(p,j){ return p.label === d.label; });
 	}
  	// File upload button  ---------------------
    $('#upload_btn').on('click',function(event){
    	$(this).addClass('disabled');
    	 
    	event.preventDefault();
    	var files = event.currentTarget.form[0].files;
    	alert("File");
    	if(!files.length){
    		alert("Please select at least 1 file before submitting.");
    		return;
    	}

	});

  	//--------------------------------------------------------------------------
  	//--------------------------------------------------------------------------
  	function isNumeric(obj){
        return !isNaN( parseFloat(obj) ) && isFinite( obj );
    }
    function xKB(d){ return d.X }
    function yKB(d){ return d.Y;}
     
    function passage(d){ return d.params.passage; }
    function config(d){ return d.params.config; }
    //--------------------------------------------------------------------------
    // Data uploading / processing 
	function quickLoadData(){

		initPlots();
    }
    var configs = [];
	var passages = [];
	//--------------------------------------------------------------------------

  	//--------------------------------------------------------------------------
	// -------------------------------------------------
	// General Helper Functions 
	// -------------------------------------------------
	var fs = function(){
		var fs = {};
		// create a constant array of length 'num'
		fs.fill = function fill(val,num){
			var arr = []; 
			for(var i=0; i<num; i++) arr.push(val);
			return arr;
		}
		// get all unique elements in the input data array
		fs.getUnique = function getUnique(data,fn){
			if(!fn) return null;
			return  _.map(d3.nest().key(fn).entries(data),function(d){ return d.key; });
			// Alternatively, try this, although it doesn't seem to work for dates
			// return _.uniq( _.sortBy( _.map(data,fn) ) ,true )
		}
		fs.setIds = function setIds(data){
			data.forEach(function(d,i){ d.id = i; });
			return data;
		}
		
		// Sums up arrays a and b and returns the new array, c
    	fs.sum = function sum(a,b){
    		if(a.length!=b.length) return;
    		if(a instanceof Array){
    			var c = [];
	    		for(var i=0, n = a.length; i<n; i++) c.push(a[i] + b[i]);
	    	}
	    	// object
	    	else{
	    		var c = {};
	    		for(var key in a) c[key] = a[key] + b[key];
	    	}
    		return c;
    	}
    	// Normalize the input array/object by the total
    	fs.normalize = function normalize(a,total){
    		var c;
    		if(a instanceof Array){
    			c = [];
    			for(var i=0, n = arr.length; i<n; i++) c.push( a[i] / total );
	    	}
	    	else{
	    		c = {};
	    		for(var key in a) c[key] = a[key] / total;
	    	}
	    	return c;
    	}


		fs.findKBKeyId = function findKBKeyId(kbCoords, keyName){
			for(var i=0, n = kbCoords.length; i<n; i++){
				var d = kbCoords[i];
				if(d.key.toLowerCase() == keyName) return i;
			}
			return -1;
		}
		fs.getName = function getName(d){ return d.name; }
		
		// -------------------------------------------------
		// sorting functions
		// -------------------------------------------------
		fs.sortByNumGood = function sortByNumGood(data){ return fs.sortByValue(data,0); }
		fs.sortByNumBad = function sortByNumBad(data){ return fs.sortByValue(data,1); }
		fs.sortByTotal = function sortByTotal(data){ return fs.sortByValue(data,2); }
		fs.sortByValue = function sortByValue(data,valueId){
			return _.sortBy(data,function(d){ return d.value[valueId];}).reverse();
		}

		fs.sortByName = function sortByName(data){ 
			return _.sortBy(data,fs.getName);
		}

		 
		// Specific to the nested data -----------------
		fs.sortNestedData = function sortNestedData(data,dateId,sortId){
			if(sortId<3) return sortNestedDataByValue(data,dateId,sortId);
			else if(sortId==3) return sortNestedDataByName(data,dateId,sortId);
			else return data;
		}
		function sortNestedDataByValue(data,dateId,valueId){
			data.sort(function(a,b){
				return d3.descending(a.values[dateId].value[valueId],
									 b.values[dateId].value[valueId]);
			})
			return data;
		}

		function sortNestedDataByName(data,dateId,valueId){
			data.sort(function(a,b){
				return d3.ascending(a.name,b.name);
			})
			return data;
		}
		// -------------------------------------------------
		// filter functions
		// -------------------------------------------------
		fs.filter = function(data,key,val){
			return _.filter(data,keys)
		}

		return fs;
	}();

	// -------------------------------------------------
	// Where abandoned functions go to die
	// -------------------------------------------------
	
}());
var FileSelection = function(){
	var fs = {};
	fs.readFiles = function readFiles(files,callback){
		if (!files){
			alert("No files selected"); return;
		} 
		var n = files.length;
		for (var i = 0, f; f = files[i]; i++) {
			// Check that the file is either a plain text or a csv
			if (f.type=='text/csv') {   //f.type == 'text/plain' ||  
			  	//Wrap it in a closure 
			  	(function(file,i) {
				    var reader = new FileReader();
				    // reader.readAsDataURL(f); // For images:
				    reader.readAsText(file); // For text:

				    reader.onload = function(event) {
				        //console.log("File = ",file,file.name);
				        //console.log("Data = ",event.target.result);
				        if(callback){
				        	callback( {"file":file, "data":event.target.result}, n );  
				        } 
				    };
				    reader.onerror = function(event) {
				        alert("File could not be read! Code " + event.target.error.code+". Check your input file.");
				    };
				    
				})(f,i);
			} 
			else {
			  alert(files[i].name+' has to be a .csv file. Try giving it another go.');
			}
		}
		// $('#upload_form').remove();
		return fs;
	}

	return fs;
}();
//--------------------------------------------------
// Plot Helper Functions 
//--------------------------------------------------
var plotFs = function(){
	var fs = {};
	fs.initSvg = function initSvg(elemId){
		var elem = d3.select(elemId);
		return elem.append('svg');
	}
	fs.getWidth = function getWidth(elemId){
		var elem = d3.select(elemId);
		return elem[0][0] ? elem[0][0].getBoundingClientRect().width : 0;
	} 
	// For sizing the svg element -- needed when we resize the window
	fs.sizeSvg = function sizeSvg(elem,geom){
		if(!elem) return;
		return d3.select(elem)
				.select('svg')
				.attr('width',geom.w)
				.attr('height',geom.h)
	}
	fs.drawLegend = function drawLegend(){
			
		var arr = d3.range(0.5,2.2,0.5);
		
		var legendDiv = d3.select('#legend-svg'),
		 	 
		 	svg = legendDiv.append('svg')
 					.attr({'width':235,'height':20 })
 					.append('g')
 					.attr('transform','translate(2,10)')


 			svg.append('text').text('Scale:').attr('y',5)

		 	var circles = svg.selectAll('.circles').data(arr)
							.enter().append('g')
							.attr('class','circles')
							.attr('transform',function(d,i){ return 'translate('+ ((5*Math.sqrt(d) + 35) *i + 45)+',0)'; })
				circles.append('circle')
					    .attr('r',function(d){ return Math.sqrt(d) * 5 })
					   
			circles.append('text')
					.attr('x',function(d){ return 5*Math.sqrt(d) + 2; })
					.attr('y',5)
					.text(function(d){ return d.toFixed(1)})
							// .html(function(d,i){ return '&nbsp;&nbsp;'+(i== 0 ? ' < 4 ' : ' ≥ ' + d) +'&nbsp;&nbsp;'; });
		return fs;					  
	};

	fs.drawOpacityLegend = function drawOpacityLegend(){
			
		var arr = [  
					{key:'≤2%',value:0.2},
					{key:'4%',value:0.4},
					{key:'6%',value:0.6},
					{key:'8%',value:0.8},
					{key:'10%+',value:1}
					];

		var legendDiv = d3.select('#opacity-legend-svg'),
		 	 
		 	svg = legendDiv.append('svg')
 					.attr({'width':245,'height':20 })
 					.append('g')
 					.attr('transform','translate(2, 0)')
	 	var rects = svg.selectAll('.key').data(arr)
							.enter().append('g')
							.attr('class','key')
							.attr('transform',function(d,i){ return 'translate('+ (50 *i)+',0)'; })
				rects.append('rect')
					    .attr('width',40).attr('height',20).attr('rx',2).attr('ry',2)
					    .style('fill-opacity',function(d){ return d.value; })
					   
			rects.append('text')
					.attr('x',20)
					.attr('y',14)
					.attr('text-anchor','middle')
					.text(function(d){ return d.key})
							// .html(function(d,i){ return '&nbsp;&nbsp;'+(i== 0 ? ' < 4 ' : ' ≥ ' + d) +'&nbsp;&nbsp;'; });
		return fs;					  
	};
	fs.updateLabel = function updateLabel (elemId,label){
		var elem = d3.select(elemId); 
		if(elem[0][0] && label) elem.html(label);
		return fs;
	}
	return fs;
}();
//--------------------------------------------------
// color scaling
//--------------------------------------------------
var color = function(){
	var c = {};
	var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
	var log2 = Math.log(2);
	c.scaleByValue = function(d,i){ return c.scale(d.value[i]); }
	 
	c.scale = function(value){ //powers of 2 with anything below 16 = ignorable
		var idx = getIdx(value);
		return colors[idx];
	}
	function getIdx(value){
		if(value<4) return 0;
		return Math.max(1,Math.min(9, Math.floor( Math.log(value)/log2)-2) );
	}

	return c;
}();
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//predict

function forward_prop_step_np(x_t, s_t1_prev, s_t2_prev){

            

            var x_e=math.subset(E,math.index(math.range(0,128),x_t));
            z_t1 = math.add(math.multiply(U0,x_e),math.multiply(W0,s_t1_prev));
            z_t1 = math.add(z_t1,math.subset(b,math.index(math.range(0,128),0)));
            z_t1=  math.dotDivide(math.ones(math.size(z_t1)),math.add(math.exp(math.unaryMinus(z_t1)),1));
            //console.log(z_t1);
            
            r_t1= math.add(math.multiply(U1,x_e),math.multiply(W1,s_t1_prev));
            r_t1= math.add(r_t1,math.subset(b,math.index(math.range(0,128),1)));
            r_t1=  math.dotDivide(math.ones(math.size(r_t1)),math.add(math.exp(math.unaryMinus(r_t1)),1));
            //console.log(r_t1);

            c_t1=math.add(math.multiply(U2,x_e),math.multiply(W2,math.dotMultiply(s_t1_prev,r_t1)));
            c_t1= math.add(c_t1,math.subset(b,math.index(math.range(0,128),2)));
            c_t1=math.tanh(c_t1);
            //console.log(c_t1);

            s_t1=math.add(math.dotMultiply(math.subtract(math.ones(math.size(z_t1)),z_t1),c_t1),math.dotMultiply(z_t1,s_t1_prev));
            //console.log(s_t1);
            
            
            z_t2 = math.add(math.multiply(U3,s_t1),math.multiply(W3,s_t2_prev));
            z_t2 = math.add(z_t2,math.subset(b,math.index(math.range(0,128),3)));
            z_t2=  math.dotDivide(math.ones(math.size(z_t2)),math.add(math.exp(math.unaryMinus(z_t2)),1));
            //console.log(z_t2);
            r_t2= math.add(math.multiply(U4,s_t1),math.multiply(W4,s_t2_prev));
            r_t2= math.add(r_t2,math.subset(b,math.index(math.range(0,128),4)));
            r_t2=  math.dotDivide(math.ones(math.size(r_t2)),math.add(math.exp(math.unaryMinus(r_t2)),1));

            //console.log(r_t2);
            c_t2=math.add(math.multiply(U5,s_t1),math.multiply(W5,math.dotMultiply(s_t2_prev,r_t2)));
            c_t2= math.add(c_t2,math.subset(b,math.index(math.range(0,128),5)));
            c_t2=math.tanh(c_t2);
            //console.log(c_t2);
            s_t2=math.add(math.dotMultiply(math.subtract(math.ones(math.size(z_t2)),z_t2),c_t2),math.dotMultiply(z_t2,s_t2_prev));
            //console.log(s_t2);
            o_t = math.add(math.multiply(V,s_t2),c);

            sum=math.sum(math.exp(o_t));
            o_t=math.divide(math.exp(o_t),sum);
            //console.log(o_t);
            var max=0;
            var max_index;
            o_t.forEach(function (value, index, matrix) {
            	if (value>max){
            		max=value;
            		max_index=index;
            	}
  				
			});
			//console.log(max_index);
            return [o_t, s_t1, s_t2,max_index[0]];
}

function predict(text){
	var T=text.length;
	var s_t1=math.zeros(128,1);
	var s_t2=math.zeros(128,1);
	var o_t,s_t1, s_t2,max_index;
	if (T>5){
		T=5;
	}
	
	var text2=text.slice(text.length-T,text.length);
	
	for (var t=0;t<T;t++){
		if (text2[t] in word_to_index){
			var x_t=parseInt(word_to_index[text2[t]]);
			[o_t, s_t1, s_t2,max_index]=forward_prop_step_np(x_t, s_t1, s_t2);
		}
	}
	return index_to_word[max_index];
}

function accept(){

	document.getElementById('echoField').value=document.getElementById('echoField').value+document.getElementById('Predict').value;
}


