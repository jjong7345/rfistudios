// JavaScript Document
var mouseX;
var mouseY;
var currState;
var navTimer;
var aboutView;
var workView;
var voiceView;
var contentContainerView;
var navView;
var workListView;
var model;
var controller;
var orientation;
var ori = "vertical";
var leftOrigin = 137;
var isContentClosed = true;
var portfolioVideos;
var posters;
var timeout;
var keepPlay;
var workBlockMarginLeft = 150;

$(document).ready(function() {	
	init();
});
function init() {
	$(window).resize(function() {
		//New height and width
		var winNewWidth = $(window).width();
		var winNewHeight = $(window).height();
		// compare the new height and width with old one
		//trace(winNewHeight+":"+winNewWidth);   
		
		updateWin(winNewHeight);
	});
	
	$(window).resize();
	
	portfolioVideos = [$("#v1"), $("#v2"), $("#v3"), $("#v4"), $("#v5"), $("#v6")];
	posters = [$("#p1"), $("#p2"), $("#p3"), $("#p4"), $("#p5"), $("#p6")];
	
	var myVideo = document.getElementById("myvideo");
	 myVideo.addEventListener('ended', loop, false);
	 
	 $('#mainCanv').mousedown(function(e){
		$("#clickForNav").hide(); 
		mouseX = e.pageX - this.offsetLeft;
		mouseY = e.pageY - this.offsetTop;
		//trace("X: " + mouseX + " Y: " + mouseY);
		$('#navWrapper').css({'top':(mouseY - 60)+"px",'left':(mouseX - 120)+"px"});
		$('#navWrapper').hide();
		$('#navWrapper').fadeIn();
		$(".normal").hide();
		$(".normal").delay(200).fadeIn(300);
		//$(".blur").hide();
		$(".blur").show();
		$(".blur").fadeOut(800);
		$(".nav").css({'margin-left':'140px'});
		$(".nav").animate({"margin-left": 120 + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
		$("#rfi").css({'margin-left':'-20px'});
		$("#rfi").animate({"margin-left": 0 + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
						  
		e.preventDefault();
		e.stopPropagation();	
		navFadeOut(2000);
	});
	
	$('#about').mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		controller.setCurrHandler("about");	
	});
	$('#work').mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		controller.setCurrHandler("work");		
	});
	$('#voice').mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();	
		controller.setCurrHandler("voice");	
	});
	
	//observer pattern
	Event.prototype = {
		attach : function (listener, func) {
			this._listeners.push(listener);
			this._func = func;
		},
		notify : function (args) {
			for (var i = 0; i < this._listeners.length; i++) {
				
				this._listeners[i][this._func](args);
			}
		}
	};
	
	model = new Model();
	controller = new Controller(model);
	contentContainerView = new ContentContainer(model, controller);
	model.onCurrChange.attach(contentContainerView, "update");
	aboutView = new About(model, controller);
	model.onCurrChange.attach(aboutView, "update");
	//workView = new Work(model, controller);
	//model.onCurrChange.attach(workView, "update");
	//model.onCurrWorkChange.attach(workView, "update");
	voiceView = new Voice(model, controller);
	model.onCurrChange.attach(voiceView, "update");
	navView = new Nav(model, controller);
	model.onCurrChange.attach(navView, "update");
	
	workListView = new WorkListView(model, controller);
	model.onCurrChange.attach(workListView, "update");
	model.onCurrWorkChange.attach(workListView, "update");
	
	$('#workSampleWrapper').css({'height':'0px'});
	
	$('#cover').mousedown(function(e){
		$(this).hide();
		$("#outerDiv").show();
		onBgPlay();
	});
	
	$("#closedown").mousedown(function(e) {
		e.preventDefault();
		e.stopPropagation();	
		downContentPanel();
	});
	
}
function hideWork() {
	$('#workSampleWrapper').animate({"height": "0px"}, { easing:"easeOutQuad", duration:600 });
	setTimeout(function() {stopAndHideVideo();}, 500);
	$("#controls").show();
}
function showWork() {
	$('#workSampleWrapper').animate({"height": "790px"}, { easing:"easeOutQuad", duration:600 });
	$("#controls").hide();
}

function navFadeOut(_time) {
	clearTimeout(navTimer);
	navTimer = setTimeout(function(){
				$('#navWrapper').fadeOut();
			}, _time);	
}
function updateWin(_winNewHeight) {
	if (_winNewHeight > 1000) {
		//portrait
		$("#myvideo").css({'left':'-360px', 'width':'2000px','height':'1125px'});
		
		//$("#controls").css({'top':'1025px'});
		if (isContentClosed) $("#contentWrapper").css({'top':'1105px'});
		else $("#contentWrapper").css({'top':'785px'});
		$("#clickArea").height(1125);
		$("#workSampleWrapper").css({'top':'200px'});
		//$(".dummyNavArea").css({'top':'300px'});
		$("#outerDiv").height(1105);
		trace($("#outerDiv").height());
		
		//$("#closedown").hide();
		ori = "vertical";
	}
	else if (_winNewHeight <= 1000) {
		//landscape
		//
		$("#myvideo").css({'left':'0px', 'width':'1280px','height':'960px'});
		//$("#controls").css({'top':'750px'});
		//if( ori == "vertical") $("#contentWrapper").css({'top':'530px'});
		if (isContentClosed) $("#contentWrapper").css({'top':'850px'});
		else $("#contentWrapper").css({'top':'530px'});
		
		$("#clickArea").height(850);
		$("#workSampleWrapper").css({'top':'65px'});
		$("#outerDiv").height(530+320);
		//$(".dummyNavArea").css({'top':'100px'});
		//$("#closedown").show();
		
		
		ori = "horizontal";
	}
	
	//$("#myvideo").css({'top':'30px', 'left':'0px', 'width':'1000px','height':'500px'});
	
}
function downContentPanel() {
	//hideWork();
	$("#about").removeClass("active");
	$("#work").removeClass("active");
	$("#voice").removeClass("active");
	isContentClosed = true;
	if( ori == "horizontal") $("#contentWrapper").animate({"top": "850px"}, { easing:"easeOutQuad", duration:300 });
	else if (ori == "vertical") $("#contentWrapper").animate({"top": "1105px"}, { easing:"easeOutQuad", duration:300 });
}
function upContentPanel() {
	isContentClosed = false;
	if( ori == "horizontal") $("#contentWrapper").animate({"top": "530px"}, { easing:"easeOutQuad", duration:300 });
	else if (ori == "vertical") $("#contentWrapper").animate({"top": "785px"}, { easing:"easeOutQuad", duration:300 });
}

function trace(_val) {
	try {
		console.log(_val);
	}
	catch(e){}
}
function loop()  {
	var myVideo = document.getElementById("myvideo");
	myVideo.play();
}

function onBgPlay() {
	//alert("fdgdfgdf");
	//document.getElementById('myvideo').Play();
//	document.myMovie.play()
	$('#myvideo').get(0).play();
	//var myVideo = document.getElementById("myvideo");
	//myVideo.play();
}
function onBgPause() {
	//alert("fdgdfgdf");
	//document.getElementById('myvideo').Play();
//	document.myMovie.play()
	$('#myvideo').get(0).pause()
}

function showAndPlayVideo(_val) {
	stopAndHideVideo();
	timeout = setTimeout(function() {
      // Do something after 1 seconds
		switch (_val) {
			case 0:
				populateVideo(0, "video/NAACP.mp4", "naacp", 570, 356, "images/portfolio_images/poster01_NAACP.jpg");
				break;
			case 1:
				populateVideo(1, "video/Matrix.mp4", "matrix", 486, 304, "images/portfolio_images/poster07_LOREAL_MATRIX.jpg");
				break;
			case 2:
				populateVideo(2, "video/READYgov.mp4", "ready", 585, 330, "images/portfolio_images/poster08_ReadyGov.jpg");
				break;
			case 3:
				populateVideo(3, "video/Throwback.mp4", "throwback", 569, 356, "images/portfolio_images/poster10_Mountain_Dew.jpg");
				break;
			case 4:
				populateVideo(4, "video/Smokeybear.mp4", "smokeybear", 569, 356, "images/portfolio_images/poster13_SMOKEYBEAR.jpg");
				break;
			case 5:
				populateVideo(5, "video/ESPNReturnMan.mp4", "ESPN", 633, 357, "images/portfolio_images/poster16_ESPN.jpg");
				portfolioVideos[5].find('.video_portfolio').css({visibility:"visible"});
				break;
		}
	}, 600);
	
	function populateVideo(_index, _videoPath, _videoDOMName, _videoWidth, _videoHeight, _posterPath) {
		
		(function() {
			var html = "";
			portfolioVideos[_index].find('.video_portfolio').css({visibility:"visible"});
			html += '<video class="video_portfolio" id="'+_videoDOMName+'" width="'+ _videoWidth +'" height="'+ _videoHeight +'" preload="none" poster="'+ _posterPath +'">';
			html += '<source type="video/mp4" />';
			html += '</video>';
			portfolioVideos[_index].html(html);
			
			var v = $("#" + _videoDOMName);
			v[0].src = _videoPath;
			v[0].load();
			portfolioVideos[_index].find('.video_portfolio').hide();
			v[0].oncanplaythrough = posters[_index].fadeIn();
			posters[_index].bind("mousedown", function(e) {
				
				portfolioVideos[_index].find('.video_portfolio').show();
				try {
					document.getElementById(_videoDOMName).currentTime = 0;
				} catch(e){};
				v[0].play();
				v[0].oncanplaythrough = posters[_index].fadeOut();//setTimeout(function(){ posters[_index].fadeOut();  }, 500);
				var myVideo = document.getElementById(_videoDOMName);
				myVideo.addEventListener('ended', function(){ posters[_index].fadeIn(); portfolioVideos[_index].find('.video_portfolio').fadeOut();  clearKeepPlaying(); }, false);
				
				keepPlaying(_videoDOMName);
				//keepPlay = setInterval("this.playVideoWhenBuffered()", 5000);
			});
			
			//v[0].oncanplay = v[0].play();
			//keepPlay = setInterval("this.playVideoWhenBuffered()", 5000);
		})();
	}
}

function keepPlaying(_name) {
	if (typeof user_agent != "undefined") {
		if (user_agent == "iPhone") {
			trace("this is iphone");
		}
	} else {
		var v = $("#" + _name);
		clearInterval(keepPlay);
		keepPlay = setInterval("this.playVideoWhenBuffered()", 5000);
		
		this.playVideoWhenBuffered = function() {
			v[0].play();
			trace(_name + " playing");	
		}
	}
}

function clearKeepPlaying() {
	if (typeof user_agent != "undefined") {
		if (user_agent == "iPhone") {
			trace("this is iphone");
		}
	}
	else {
		clearInterval(keepPlay);
		trace("clear keep playing");
	}
}

function stopAndHideVideo() {
	try {
		//$(".video_portfolio_container").find('.video_portfolio').css({visibility:"hidden"});
		//$(".video_portfolio_container").find('.video_portfolio')[0].pause();
		$(".poster").show();
		clearKeepPlaying();
		
		if ($("#naacp").length > 0) { trace("naacp exist");  $("#naacp")[0].pause(); try {document.getElementById("naacp").currentTime = 0;}catch(e){}};
		if ($("#matrix").length > 0) {  trace("matrix exist");  $("#matrix")[0].pause();  try {document.getElementById("matrix").currentTime = 0;}catch(e){} };
		if ($("#ready").length > 0) { trace("ready exist");   $("#ready")[0].pause();   try {document.getElementById("ready").currentTime = 0;}catch(e){}  };
		if ($("#throwback").length > 0) { trace("throwback exist"); $("#throwback")[0].pause();  try {document.getElementById("throwback").currentTime = 0;}catch(e){}  };
		if ($("#smokeybear").length > 0) { trace("smokeybear exist");  $("#smokeybear")[0].pause();  try { document.getElementById("smokeybear").currentTime = 0;}catch(e){}  };
		if ($("#ESPN").length > 0) { trace("ESPN exist"); $("#ESPN")[0].pause();try { document.getElementById("ESPN").currentTime = 0;}catch(e){}};
		
		/*$(".video_portfolio_container").find('.video_portfolio')[0].src = "";
		$(".video_portfolio_container").find('.video_portfolio')[0].load();
		$(".video_portfolio_container").find('.video_portfolio').remove();
		var html = "";
		$(".video_portfolio_container").html(html);*/
		//$(".poster").hide();
	}catch(e){}
	trace("stopAndHideVideo");
}


//CLASS
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function WorkListView(_model, _controller) {
	var _this = this;
	this.instance = $('#list2');
	this.model = _model;
	this.controller = _controller;
	var currTemp;
	var gap = 1005 + workBlockMarginLeft;
	this.blocks = [];
	
	$(".workSampleBlock").each(function() {
		_this.blocks.push($(this));
	});
	this.bts = [];
	$(".dotButton").each(function() {
		_this.bts.push($(this));
	});
				
	this.workPanelImagesURL = [];
	$(".work-image").each(function() {
		_this.workPanelImagesURL.push($(this).attr("image-link"));
	});
							
	this.workPanelImages = [];
	
	$(".work-image").each(function() {
		_this.workPanelImages.push($(this));
	});
	
	//to prevent nav appearing on panel click			   
	$(".imageStrip1").mousedown(function(e) {
		//e.preventDefault();
		e.stopPropagation();
	});
	
	$("#workSampleWrapper").mousedown(function(e) {
		mouseX = e.pageX - this.offsetLeft;
		mouseY = e.pageY - this.offsetTop;
		//alert(this.offsetLeft);
		//trace("X: " + mouseX + " Y: " + mouseY);
		$('#navWrapper').css({'top':(mouseY - 60 + this.offsetTop)+"px",'left':(mouseX - 120 + this.offsetLeft)+"px"});
		$('#navWrapper').hide();
		$('#navWrapper').fadeIn();
		//$(".normal").hide();
		//$(".normal").delay(200).fadeIn(300);
		$(".blur").hide();
		//$(".blur").show();
		//$(".blur").fadeOut(800);
		//$(".nav").css({'margin-left':'140px'});
		//$(".nav").animate({"margin-left": 120 + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
		//$("#rfi").css({'margin-left':'-20px'});
		//$("#rfi").animate({"margin-left": 0 + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
						  
		//e.preventDefault();
		//e.stopPropagation();	
		navFadeOut(1500);
	});
	
	var xpos = 0;
	for (var i=0; i<this.blocks.length; i++) {
		//trace(i);
		//this.blocks[i].css({"left":xpos+"px"});
		//xpos += 665;
		//if (i != model.getCurrWork()) this.blocks[i].fadeOut(600);
		//else this.blocks[i].fadeIn(600);
	}
	for (var i=0; i<this.bts.length; i++) {
		this.bts[i].bind("mousedown", {index:i}, function(e) {
			e.stopPropagation();
			_this.controller.setCurrWorkHandler(e.data.index);
			
		});
	}
	
	this.update = function(_e) {
		switch (_e) {
			case "onCurrWorkChanged":
				showWork();
				
				//trace("current work display:"+model.getCurrWork());
				
				/*if (currTemp < model.getCurrWork())
				{
					_this.instance.animate({"left": -(gap) + 278 + "px"}, { queue:false, easing:"easeOutQuad", duration:600, complete:function(){ _this.instance.css({'left':'278px'}); } });
					
				}
				else if (currTemp > model.getCurrWork())
				{
					_this.instance.css({'left':-(gap) + 278 + "px"});
					_this.instance.animate({"left": "278px"}, { queue:false, easing:"easeOutQuad", duration:600 });
					
				}*/
				
				//_this.instance.animate({"left": -(gap)*(model.getCurrWork()) +  "px"}, { queue:false, easing:"easeOutQuad", duration:600 });
				 _this.instance.css({
					 left: -(gap)*(model.getCurrWork()) + leftOrigin + 'px',
					 '-webkit-transition-property': 'left',
					 '-webkit-transition-duration': '0.3s',
					 '-webkit-transition-timing-function':'cubic-bezier(0,0,0.4,1)',
					 '-moz-transition-property': 'left',
					 '-moz-transition-duration': '0.3s',
					 '-moz-transition-timing-function':'cubic-bezier(0,0,0.4,1)'
		
				 });
				 for (var i=0; i<_this.bts.length; i++) {
					//trace(model.getCurrWork());
					if (model.getCurrWork() != i) _this.bts[i].removeClass("workActive");
					else _this.bts[i].addClass("workActive");
				}				
				
				for (var i=0; i<this.blocks.length; i++) {
					if (i != model.getCurrWork()) {
						//this._fadeOut(this.blocks[i]);
						//this.blocks.find(".loading").hide();
						//this.blocks.find(".imageStrip1").show();
						//this.blocks[i].find(".imageStrip1").css({'opacity':'.2'});
						_this.blocks[i].find(".imageStrip1").animate({"opacity":".5"}, { queue:false, duration:500 });
					}
					else {
						//_this.blocks[_this.model.getCurrWork()].find(".loading").hide();
						//_this.blocks[_this.model.getCurrWork()].find(".imageStrip1").show();
						//this._fadeIn(this.blocks[i]);
						//_this.blocks[_this.model.getCurrWork()].find(".imageStrip1").css({'opacity':'1'});
						_this.blocks[_this.model.getCurrWork()].find(".imageStrip1").animate({"opacity":"1"}, { queue:false, duration:500 });
					}
				}
				currTemp = model.getCurrWork();
				
				if (model.getCurrWork() <= 0) {
					$("#leftArrow").hide();
					$("#rightArrow").show();
				}
				else if (model.getCurrWork() == (_this.blocks.length - 1)) { 
					$("#rightArrow").hide(); 
					$("#leftArrow").show();
				}
				else {
					$("#leftArrow").show(); 
					$("#rightArrow").show();
				}
				clearKeepPlaying();
				setTimeout(function() {stopAndHideVideo();}, 500);
				
				if (_this.workPanelImages[model.getCurrWork()].attr('src') == undefined) {
					_this.workPanelImages[model.getCurrWork()].attr({'src':_this.workPanelImagesURL[model.getCurrWork()]}).load();
					switch (model.getCurrWork()) {
						case 0:
							trace("NAACP video visible");
							showAndPlayVideo(0);
							break;
						case 6:
							trace("MATRIX video visible");
							showAndPlayVideo(1);
							break;
						case 7:
							trace("Ready video visible");
							showAndPlayVideo(2);
							break;
						case 9:
							trace("Throwback video visible");
							showAndPlayVideo(3);
							break;
						case 12:
							trace("SmokeyBear video visible");
							showAndPlayVideo(4);
							break;
						case 15:
							trace("ESPN video visible");
							showAndPlayVideo(5);
							break;
					}
					break;				
				}
				
				
				
		}
	}
	this._fadeIn = function(_mc) {
		//_mc.fadeIn(600);
		_mc.animate({"opacity": "1"}, { queue:false, duration:600 });
	}
	this._fadeOut = function(_mc) {
		//_mc.fadeOut(600);
		_mc.animate({"opacity": "0"}, { queue:false, duration:600 });
	}
	$(".workSampleBlock").mousedown(function(e){
		//e.preventDefault();
		//e.stopPropagation();
		//$('#navWrapper').fadeOut();
	});
	
	/*$('.dummyNavArea').mousedown(function(e){
		//$("#clickForNav").hide(); 
		mouseX = e.pageX - this.offsetLeft;
		mouseY = e.pageY - this.offsetTop;
		//alert(this.offsetLeft);
		//trace("X: " + mouseX + " Y: " + mouseY);
		$('#navWrapper').css({'top':(mouseY - 60 + this.offsetTop)+"px",'left':(mouseX - 120 + this.offsetLeft)+"px"});
		$('#navWrapper').hide();
		$('#navWrapper').fadeIn();
		$(".normal").hide();
		$(".normal").delay(200).fadeIn(300);
		$(".blur").show();
		$(".blur").fadeOut(800);
		$(".nav").css({'margin-left':'140px'});
		$(".nav").animate({"margin-left": 120 + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
		$("#rfi").css({'margin-left':'-20px'});
		$("#rfi").animate({"margin-left": 0 + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
						  
		e.preventDefault();
		e.stopPropagation();	
		navFadeOut(2000);
	});*/
	$("#close").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		hideWork();
		setTimeout("onBgPlay()", 1000);
		$("#work").removeClass("active");
		//if (_this.model.getCurrWork() > 0 ) _this.controller.setCurrWorkHandler(_this.model.getCurrWork() - 1);
	});
	
	$("#leftArrow").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if (_this.model.getCurrWork() > 0 ) _this.controller.setCurrWorkHandler(_this.model.getCurrWork() - 1);
	});
	$("#rightArrow").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
		if (_this.model.getCurrWork() < (_this.blocks.length - 1)) _this.controller.setCurrWorkHandler(_this.model.getCurrWork() + 1);
	});
	
	this.w1 = new DetailWorkPanel(this.blocks[0]);
	this.w2 = new DetailWorkPanel(this.blocks[1]);
	this.w3 = new DetailWorkPanel(this.blocks[2]);
	this.w4 = new DetailWorkPanel(this.blocks[3]);
	this.w5 = new DetailWorkPanel(this.blocks[4]);
	this.w6 = new DetailWorkPanel(this.blocks[5]);
	this.w7 = new DetailWorkPanel(this.blocks[6]);
	this.w8 = new DetailWorkPanel(this.blocks[7]);
	this.w9 = new DetailWorkPanel(this.blocks[8]);
	this.w10 = new DetailWorkPanel(this.blocks[9]);
	this.w11 = new DetailWorkPanel(this.blocks[10]);
	this.w12 = new DetailWorkPanel(this.blocks[11]);
	this.w13 = new DetailWorkPanel(this.blocks[12]);
	this.w14 = new DetailWorkPanel(this.blocks[13]);
	this.w15 = new DetailWorkPanel(this.blocks[14]);
	this.w16 = new DetailWorkPanel(this.blocks[15]);
	this.w17 = new DetailWorkPanel(this.blocks[16]);
	this.w18 = new DetailWorkPanel(this.blocks[17]);
	this.w19 = new DetailWorkPanel(this.blocks[18]);
	this.w20 = new DetailWorkPanel(this.blocks[19]);
	
	this.touchslider = new Touchslider(this.instance, this.model, this.controller);
	//$("#practiceFlashWrapper").css({'width': 840*touchslider.numPanel + 'px'});
	this.touchslider.init(_this);
	
}

/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/


function DetailWorkPanel(_mc) {
	this.curr = 0;
	this.bts = [];
	this.images = [];
	var THIS = this;
	this.instance = _mc;
	this.strip = _mc.find(".imageStrip1").find("li");
	
	this.strip.each(function(index) {
		THIS.images.push(_mc.find(".imageStrip1").find("li:nth-child("+(index+1)+")"));
		_mc.find(".paging").append("<li></li>");
		THIS.bts.push(_mc.find(".paging li:nth-child("+(index+1)+")"));
	});
	for (var i=0; i<this.bts.length; i++) {
		this.bts[i].bind("mousedown", {index:i}, function(e){
			//alert(e.data.index);
			e.preventDefault();
			e.stopPropagation();
			THIS.curr = e.data.index;
			THIS.updatePanel();
		});
	}
	//this.instance.find(".imageStrip1").css({'width':this.bts.length*640 +'px'});
	this.instance.find(".paging").css({'width':this.bts.length*46 +'px'});
	this.instance.find(".visit").mousedown(function(e){
		e.preventDefault();
		e.stopPropagation();
	});
	this.updatePanel = function() {
		//alert(this.curr);
		//_mc.find(".imageStrip1").animate({"left": -(640*this.curr) + "px"}, { queue:false, easing:"easeOutQuad", duration:300 });
		/*_mc.find(".imageStrip1").css({
             left: -(640*this.curr) + 'px',
             '-webkit-transition-property': 'left',
             '-webkit-transition-duration': '0.3s',
			 '-webkit-transition-timing-function':'cubic-bezier(0,0,0.25,1)',
			 '-moz-transition-property': 'left',
			 '-moz-transition-duration': '0.3s',
			 '-moz-transition-timing-function':'cubic-bezier(0,0,0.25,1)'

        });*/
		
		for (var i=0; i<this.images.length; i++) {
			if (i == this.curr) {
				this.images[i].fadeIn();
			}
			else {
				this.images[i].fadeOut();
			}
		}
		
		for (var i=0; i<this.bts.length; i++) {
			if (THIS.curr != i) this.bts[i].removeClass("workActive");
			else this.bts[i].addClass("workActive");
		}
	}
	this.updatePanel();
	
	//this.touchslider = new Touchslider(_mc.find(".imageStrip1"));
	//$("#practiceFlashWrapper").css({'width': 840*touchslider.numPanel + 'px'});
	//this.touchslider.init(THIS);
}

/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function Nav(_model, _controller) {
	var _this = this;
	this.instance = $('#navWrapper');
	this.model = _model;
	this.controller = _controller;
	this.update = function(_e) {
		switch (_e) {
			case "onCurrChanged":
				hideWork();
				switch(model.getCurr()) {
					case "about":
						navFadeOut(1500);
						$("#about").addClass("active");
						$("#work").removeClass("active");
						$("#voice").removeClass("active");
					 	break;
					case "work":
						navFadeOut(500);
						this.controller.setCurrWorkHandler(0);
						showWork();
						downContentPanel();
						$("#about").removeClass("active");
						$("#work").addClass("active");
						$("#voice").removeClass("active");
					 	break;
					case "voice":
						navFadeOut(1500);
						$("#about").removeClass("active");
						$("#work").removeClass("active");
						$("#voice").addClass("active");
						 break;
				}
				break;
		}
	}
}
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function ContentContainer(_model, _controller) {
	var _this = this;
	this.instance = $("#contentContainer");
	this.model = _model;
	this.controller = _controller;
	var xPos;
	this.update = function(_e) {
		switch (_e) {
			case "onCurrChanged":
				switch(model.getCurr()) {
					case "about":
						xPos = 0;
						upContentPanel();
					 	break;
					case "work":
						xPos = -1280;
						onBgPause();
					 	break;
					case "voice":
						xPos = -2560;
						upContentPanel();
						 break;
				}
				_this.instance.animate({"left": xPos + "px"}, { queue:false, easing:"easeOutQuad", duration:600 });
				break;
		}
	}
}
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function About(_model, _controller) {
	var _this = this;
	this.instance = $("#aboutContent");
	this.model = _model;
	this.controller = _controller;
	this.update = function(_e) {
		switch (_e) {
			case "onCurrChanged":
				switch(model.getCurr()) {
					case "about":
					 	break;
					case "work":
						break;
					case "voice":
						break;
				}
				break;
		}
	}
}
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function Work(_model, _controller) {
	/*var _this = this;
	this.instance = $("#workContent");
	this.model = _model;
	this.controller = _controller;
	this.blocks = [$("#list1 li:nth-child(1) .workBlock"), 
				   $("#list1 li:nth-child(2) .workBlock"),
				   $("#list1 li:nth-child(3) .workBlock"),
				   $("#list1 li:nth-child(4) .workBlock"),
				   $("#list1 li:nth-child(5) .workBlock"),
				   $("#list1 li:nth-child(6) .workBlock"),
				   $("#list1 li:nth-child(7) .workBlock"),
				   $("#list1 li:nth-child(8) .workBlock"),
				   $("#list1 li:nth-child(9) .workBlock"),
				   $("#list1 li:nth-child(10) .workBlock"),
				   $("#list1 li:nth-child(11) .workBlock"),
				   $("#list1 li:nth-child(12) .workBlock")];
	this.bgImages = ["pepsico.png",
					"dew.png",
					"loreal.png",
					"rwt.png",
					"parc.png",
					"jj.png",
					"asia.png",
					"liz.png",
					"ieee.png",
					"kellogg.png",
					"cotton.png",
					"marine.png"];
	for (var i=0; i<this.blocks.length; i++) {
		this.blocks[i].css({'background-image':'url(images/works/'+this.bgImages[i]+')','background-repeat':'no-repeat'});
		this.blocks[i].bind("click", {index:i}, function(e) {
			var index = e.data.index;
			controller.setCurrWorkHandler(index);
			
		});
	}
	this.update = function(_e) {
		switch (_e) {
			case "onCurrChanged":
				switch(model.getCurr()) {
					case "about":
						$(".workBlock").removeClass("logoIntroStart");
					 	break;
					case "work":
						var index=0;
						var timer = setInterval(function() {
							//trace(_this.blocks.length);
							
							if (index < (_this.blocks.length/2)) {
								_this.blocks[index].addClass("logoIntroStart");
								_this.blocks[index+6].addClass("logoIntroStart");
								index++;
							}
							else {
								clearInterval(timer);
							}
						}, 100);
												
						break;
					case "voice":
						$(".workBlock").removeClass("logoIntroStart");
						break;
				}
				break;
			case "onCurrWorkChanged":
				//trace("current work:"+model.getCurrWork());
				for (var i=0; i<this.blocks.length; i++) {
					if (i != model.getCurrWork()) {
						this.blocks[i].removeClass('workActive');
					}
					else {
						this.blocks[i].addClass('workActive');
					}
				}
				break;
		}
	}*/
}
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function Voice(_model, _controller) {
	var _this = this;
	this.instance = $("#voiceContent");
	this.model = _model;
	this.controller = _controller;
	this.update = function(_e) {
		switch (_e) {
			case "onCurrChanged":
				switch(model.getCurr()) {
					case "about":
					 	break;
					case "work":
						break;
					case "voice":
						break;
				}
				break;
		}
	}
}
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
function Model() {
	this.onCurrChange = new Event(this);
	this.onCurrWorkChange = new Event(this);
	var curr;
	var currWork;
	this.setCurr = function(_val) {
		curr = _val;
		this.onCurrChange.notify("onCurrChanged");
	}
	this.getCurr = function() {
		return curr;
	}
	this.setCurrWork = function(_val) {
		currWork = _val;
		this.onCurrWorkChange.notify("onCurrWorkChanged");
	}
	this.getCurrWork = function() {
		return currWork;
	}
}

function Controller(_model) {
	var model = _model;
	this.setCurrHandler = function(_val) {
		model.setCurr(_val);
	}
	this.setCurrWorkHandler = function(_val) {
		model.setCurrWork(_val);
	}
}
//Event is a simple class for implementing the Observer pattern:
function Event(sender) {
	this._sender = sender;
    this._listeners = [];
}
/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
//************ thouch screen devices ********************//



//

/************************************************************************************************************************************/
/************************************************************************************************************************************/
/************************************************************************************************************************************/
//************ thouch screen devices ********************//
/**
 * This function just binds the touch functions for the grid.
 * It is very important to stop the default, stop the
 * propagation, and return false.  If we don't then the touch
 * events might cause the regular browser behavior for touches
 * and the screen will start sliding around.
 */
function Touchslider(_id/*object*/, _model, _controller) {
	var THIS = this;
	this.model = _model;
	this.controller = _controller;
	this.panels = [];
	_id.find(".sampleList").each(function(e) {
		THIS.panels.push($(this));
	});
	
	//this.currPanel = 0;
	
	this.output = function(/*string*/ msg) {
        if (console) {
            console.info(msg);
        }
    }
	/* Set number of panels(sections) to scroll */
	this.numPanel = this.panels.length;
	this.init = function(_base/*parent object*/) {
		THIS.base = _base;
		 /*
		   Many of the mobile browsers resize the screen and therefore
		   don't give accurate information about the size of the window.
		   We need to save this information so we can use it later when
		   we're sliding the grid.
		 */
		THIS.width = 1005*THIS.numPanel + leftOrigin;
		///touchslider.colWidth = cellWidth + padding;
		
		try {
			document.createEvent('TouchEvent');
			/*
			   Now that we've finished the layout we'll make our panel respond
			   to all of the touch events.
			 */
			THIS.makeTouchable(_id);
		} catch (e) {
			/*
			 * Then we aren't on a device that supports touch
			 */
			/*jQuery(this).css({
				'height': '385px',
				'overflow': 'auto'
			});*/
		}
	}
	
	this.makeTouchable = function(/*object*/ gridid) {
        gridid.each(function() {
            this.ontouchstart = function(e) {
				//touchslider.output("touch start");
                THIS.touchStart($(this), e);
                //e.preventDefault();
                //e.stopPropagation();
                return true;
            };
            
            this.ontouchend = function(e) {
				//touchslider.output("touch end");
                e.preventDefault();
                e.stopPropagation();
                
                if (THIS.sliding) {
                    THIS.sliding = false;
                    THIS.touchEnd($(this), e);
                    return false;
                } else {
                    /*
                       We never slid so we can just return true
                       and perform the default touch end
                     */
                    return true;
                }
            };
            
            this.ontouchmove = function(e) {
				//touchslider.output("touch move");
                THIS.touchMove($(this), e);
                //e.preventDefault();
                //e.stopPropagation();
                //return false;
            };
        });
    }
	 /**
	 * A little helper to parse off the 'px' at the end of the left
	 * CSS attribute and parse it as a number.
	 */
    this.getLeft = function(/*JQuery*/ elem) {
		//return parseInt(elem.css('left').substring(0, elem.css('left').length - 2), 10);
         return parseInt(elem.css('left'));
    }
	/**
     * When the touch starts we add our sliding class a record a few
     * variables about where the touch started.  We also record the
     * start time so we can do momentum.
     */
    this.touchStart = function(/*JQuery*/ elem, /*event*/ e) {
		trace("touch start");
		touchTrigger = true;
         elem.css({
             '-webkit-transition-duration': '0'
         });
         
		 
         THIS.startX = e.targetTouches[0].clientX;
		 THIS.startY = e.targetTouches[0].clientY;
         THIS.startLeft = THIS.getLeft(elem);
         THIS.touchStartTime = new Date().getTime();
		 
		 
		 //$(".arrow").hide();
		 //$(".dummyNavArea").hide();
		 
		 
		 //touchslider.output("startX:" + touchslider.startX);
		 //touchslider.output(touchslider.startLeft);
         
    }
	 /**
     * When the touch ends we need to adjust the grid for momentum
     * and to snap to the grid.  We also need to make sure they
     * didn't drag farther than the end of the list in either
     * direction.
     */
    this.touchEnd = function(/*JQuery*/ elem, /*event*/ e) {
		 //trace(THIS.getLeft(elem) +":"+elem.parent().width() +":"+ THIS.width);
         if (THIS.getLeft(elem) > leftOrigin) {
             /*
              * This means they dragged to the right past the first item
              */
             THIS.doSlide(elem, leftOrigin, '0.2s');
             
             elem.parent().removeClass('sliding');
             THIS.startX = null;
			 THIS.startY = null;
			 //touchslider.output("left llimit");
         } else if ((Math.abs(THIS.getLeft(elem)) + (elem.parent().width() + workBlockMarginLeft)) > (THIS.width + (workBlockMarginLeft*(workListView.blocks.length)))) {
             /*
              * This means they dragged to the left past the last item
              */
             THIS.doSlide(elem, '-' + ((THIS.width + (workBlockMarginLeft*(workListView.blocks.length - 1))) - (elem.parent().width() + 10)), '0.2s');
             
             elem.parent().removeClass('sliding');
             THIS.startX = null;
			 THIS.startY = null;
			 
			  //touchslider.output("right limit");
         } else {
             /*
                This means they were just dragging within the bounds of the grid
                and we just need to handle the momentum and snap to the grid.
              */
             //touchslider.slideMomentum(elem, e);
			 THIS.slidePanel(elem, e);
         }
		 
		  //$(".arrow").show();
		 //$(".dummyNavArea").show();
    }
	/**
	 *if the user drag a certain number of pixels from the startX,
	 *slide the panel to the next or previous snap position depending on 
	 *the direction of the user drag
	 */
	 this.slidePanel = function(/*jQuery*/ elem, /*event*/ e) {
		 var slideTriggerIndex = 50;
		 
		 if (Math.abs(THIS.startX - THIS.endX) > slideTriggerIndex) {
			 if (THIS.slidingLeft) {
				 
				 var index = this.model.getCurrWork() + 1;
				 this.controller.setCurrWorkHandler(index);
			
				 //THIS.base.curr++;
			 }
			 else {
				 var index = this.model.getCurrWork() - 1;
				 this.controller.setCurrWorkHandler(index);
			
				 //THIS.base.curr--;
			 }
			 //alert(touchslider.panels[touchslider.currPanel]);
			 //touchslider.doSlide(elem, '-' + (elem.parent().width() * touchslider.currPanel), '0.2s'); 
			// controller.clickHandler(section+"/"+THIS.panels[THIS.currPanel]);
			//THIS.doSlide(elem, '-' + (640 * THIS.currPanel), '0.3s'); 
			
			 /*updating code here*/ 
			 //THIS.base.curr = THIS.currPanel;
			 THIS.base.update();
			 /*for (var i=0; i<THIS.base.bts.length; i++)
			 {
				if (THIS.base.curr != i) THIS.base.bts[i].removeClass("workActive");
				else THIS.base.bts[i].addClass("workActive");
			 }*/
		 }
		 else {
			  var index = this.model.getCurrWork();
			  this.controller.setCurrWorkHandler(index);
			  THIS.base.update();
			 //alert(touchslider.panels[touchslider.currPanel]);
			 //THIS.doSlide(elem, '-' + ((1005 * this.model.getCurrWork()) - leftOrigin), '0.3s');
			 //controller.clickHandler("practice/" + touchslider.panels[touchslider.currPanel]);
		 }
	 }
	
	this.doSlide = function(/*jQuery*/ elem, /*int*/ x, /*string*/ duration) {
         elem.css({
             left: x + 'px',
             '-webkit-transition-property': 'left',
             '-webkit-transition-duration': duration,
			 '-webkit-transition-timing-function':'cubic-bezier(0,0,0.25,1)',
			 '-moz-transition-property': 'left',
			 '-moz-transition-duration': duration,
			 '-moz-transition-timing-function':'cubic-bezier(0,0,0.25,1)'

         });
    }
	/**
     * While they are actively dragging we just need to adjust the
     * position of the grid using the place they started and the
     * amount they've moved.
     */
    this.touchMove = function(/*JQuery*/ elem, /*event*/ e) {
		
         if (!THIS.sliding) {
             elem.parent().addClass('sliding');
         }
         
         THIS.sliding = true;
         
         if (THIS.startX > e.targetTouches[0].clientX) {
             /*
              * Sliding to the left
              */
             elem.css('left', '-' + (THIS.startX - e.targetTouches[0].clientX - THIS.startLeft) + 'px');
             THIS.slidingLeft = true;
         } else {
             /*
              * Sliding to the right
              */
             var left = (e.targetTouches[0].clientX - THIS.startX + THIS.startLeft);
             elem.css('left', left + 'px');
             THIS.slidingLeft = false;
         }
		 
		 var absDistX = Math.abs(e.targetTouches[0].clientX - THIS.startX);
		 var absDistY= Math.abs(e.targetTouches[0].clientY - THIS.startY);
		 if (absDistX > absDistY) {
		  	e.preventDefault();
          	e.stopPropagation();
			
		 }
		 
		 
		 
         THIS.endX = e.targetTouches[0].clientX;
    }
	this.update = function() {
		//touchslider.output(subSection);
		try {
			if (subSection != 'undefined') {
				THIS.currPanel = THIS.panels.indexOf(subSection);
			}
			else {
				THIS.currPanel = 0;
			}
		}
		catch(e){}
	}
}

