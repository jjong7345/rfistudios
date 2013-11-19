
<!DOCTYPE HTML>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=1280" />
<!--<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=9" />-->
<!--<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">-->
<title>RFI-STUDIOS</title>
<link rel="stylesheet" type="text/css" href="css/style.css?<?php echo date('l jS \of F Y h:i:s A'); ?>"/>
<?php if(strstr($_SERVER['HTTP_USER_AGENT'],"iPhone")) {
	echo "<script>var user_agent = 'iPhone'</script>";
}?>
<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="js/main.js?<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
</head>
<body>
	<div id="cover"><img src="images/enter.png" /></div>
	<div id="outerDiv">
    	<div style="position:absolute; top:0px; transform: scale(1.5,1.5);
            -ms-transform: scale(1.5,1.5); /* IE 9 */
            -webkit-transform: scale(1.5,1.5); /* Safari and Chrome */
            -o-transform: scale(1.5,1.5); /* Opera */
            -moz-transform: scale(1.5,1.5); /* Firefox */"><img src="images/Screen.jpg"/></div>
    	
    	<?php
			if(strstr($_SERVER['HTTP_USER_AGENT'],"iPad")) {
				echo "<div id='videoContainer'>
							<video id='myvideo' width='2000' height='1125' >
							  <source src='video/RFIreel_render2012_1024x768_3.mp4' type='video/mp4' />
							</video>
					 </div>";
			}
			else if(strstr($_SERVER['HTTP_USER_AGENT'],"iPhone")) {
				echo "<div id='videoContainer'>
							<video id='myvideo' width='2000' height='1125'>
							</video>
					 </div>
					 <script>$('#myvideo').hide();</script>";
			}
			else {
				echo "<div id='videoContainer'>
							<video id='myvideo' width='2000' height='1125'>
							  <source src='video/RFIreel_render2012_1024x768_3.mp4' type='video/mp4' />
							</video>
					 </div>";
			}
		?>
        <div id="contentWrapper">
        	<div id="closedown"></div>
        	<div id="contentContainer">
                <div class="content" id="aboutContent">
                	<div class="logo1"><img src="images/logo1.png"/></div>
                    <div id="desc1">
                    	<p>RFI Studios is an award-winning, full-service digital communications agency headquartered in New York City. We offer clients a unique competitive advantage – an independent, acclaimed and strategic digital shop that leverages the power of a storied global PR institution. Start to finish we create and enhance your company's digital presence, from your .com to your social platforms, your mobile programs to your digital video and emerging technologies strategy.</p>
                    </div>
                    <div id="contact">
                    	<p><font size="+2">contact</font></p>
                        <br/>
                        <p style="font-weight:normal">If you are interested in working with RFI Studios, please contact us. We would love to hear from you.</p><br/>
                        <p style="font-weight:normal">Scott Schneider
							<br/>Chief Digital Officer
							<br/>212 593 6463
                            <br/><a href="mailto:schneiders@ruderfinn.com">schneiders@ruderfinn.com</a>
							<br/>
							240 E 59th St. New York, NY 10022</p>
                    </div>
                </div>
                <div class="content" id="workContent"></div>
                <div class="content" id="voiceContent">
                	<div class="logo1"><img src="images/logo1.png"/></div>
                    <div id="desc2">
                    	<p><font color="#999999" size="+3">The Second Floor</font></p>
                        <p><font color="#999999">Looking out for the overlooked, the underrated, and the downright cool</font></p>
                    </div>
                    <div id="desc3">
                        <p><font size="+1">Happy Action Theater, or 'Augmented Reality Playground'</font></p>
                        <p>by Dave Cannon | 07-02-2012</p><br/>
                        <p>Double Fine Happy Action Theater says points are overrated. Better yet, it says goals are unnecessary. Stand in front of the camera and go nuts. You can't advance, you won't level up, and you certainly won't be earning any badges. What gives?<br/><br/>
Happy Action Theater (HAT) is my favorite kind of media: not quite classifiable. Available for download ... <a href="http://intra.rfistudios.com/blog/" target="_blank"><font color="#CC0000">more</font></a></p>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div id="mainCanv">
        	<div id="clickForNav"><img src="images/clickToNav.png"/></div>
        	<div id="clickArea"></div>
        	<div id="navWrapper">
            	<div id='rfi'>
            		<img class="normal" src="images/RFI_s1.png"/>
                	<img class="blur" src="images/RFI_s1_blur.png"/>
                </div>
                <div class="nav" id="about">
                	<img class="normal" src="images/about_s1.png"/>
                    <img class="blur" src="images/about_s1_blur.png"/>
                </div>
                <div class="nav" id="work">
                	<img class="normal" src="images/work_s1.png"/>
                    <img class="blur" src="images/work_s1_blur.png"/>
                </div>
                <div class="nav" id="voice">
                	<img class="normal" src="images/voice_s1.png"/>
                    <img class="blur" src="images/voice_s1_blur.png"/>
                </div>
            </div>
        </div>
        <div id="workSampleWrapper">
            <ul id="list2">
                <li class="sampleList">
                	<div class="workSampleBlock first">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work01_NAACP.jpg" alt="naacp" /></li>
                            <div class='video_portfolio_container' id = 'v1' style="width:567px; height:355px; left:232px; top:91px">
                                <!--<div id='videoContainer'>
                                        <video id='naacp' width='570' height='356' poster='images/portfolio_images/poster01_NAACP.jpg'>
                                          <source src='video/NAACP.mp4' type='video/mp4' />
                                        </video>
                                </div>-->
                            </div>
                            <div class="poster" id="p1" style="position:absolute; width:567px; height:355px; left:232px; top:91px; background:url(images/portfolio_images/poster01_NAACP.jpg);"><img class="playButton" src="images/button.png" style="margin-left:253px; margin-top:142px"/></div>
                            <div class="visitsite"><a href="http://www.naacphistory.org/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                	</div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work02_Asia_Society.jpg" alt="asiasociety" /></li>
                            <div class="visitsite"><a href="http://asiasociety.org/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work03_Pepsico.jpg" alt="pepsico" /></li>
                            <div class="visitsite"><a href="https://www.facebook.com/dreammachine" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work04_HARVARD.jpg" alt="harvard" /></li>
                            <div class="visitsite"><a href="http://belfercenter.ksg.harvard.edu/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work05_JOHNSON.jpg" alt="pepsico1" /></li>
                        </ul>
                    </div>
                </li>
                 <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work06_PARC.jpg" alt="pepsico1" /></li>
                            <div class="visitsite"><a href="http://www.parc.com/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work07_LOREAL_MATRIX.jpg" alt="pepsico1" /></li>
                            <div class='video_portfolio_container' id = 'v2' style="width:486px; height:304px; left:253px; top:80px">
                            	<!--<video class="video_portfolio" id="matrix" width="486" height="304" controls="controls" preload="none">
                                	<source src="video/Matrix.mp4"  type="video/mp4" />
                                </video>-->
                            </div>
                            <div class="poster" id="p2" style="position:absolute; width:486px; height:304px; left:253px; top:80px; background:url(images/portfolio_images/poster07_LOREAL_MATRIX.jpg);"><img class="playButton" src="images/button.png" style="margin-left:213px; margin-top:122px"/></div>
                            <img class="front" src="images/portfolio_images/front07_LOREAL_MATRIX.png" style="position:absolute; left:631px; top:323px;" />
                            <div class="visitsite"><a href="http://www.mymatrixfamily.com/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work08_ReadyGov.jpg" alt="pepsico1" /></li>
                            <div class='video_portfolio_container' id = 'v3' style="width:585px; height:330px; left:213px; top:80px"></div>
                            <div class="poster" id="p3" style="position:absolute; width:585px; height:330px; left:213px; top:80px; background:url(images/portfolio_images/poster08_ReadyGov.jpg);"><img class="playButton" src="images/button.png" style="margin-left:252px; margin-top:140px"/></div>
                            <img class="front" src="images/portfolio_images/front08_ReadyGov.png" style="position:absolute; left:107px; top:363px;" />
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work09_COUNCIL.jpg" alt="pepsico1" /></li>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work10_Mountain_Dew.jpg" alt="pepsico1" /></li>
                            <div class='video_portfolio_container' id = 'v4' style="width:569px; height:356px; left:221px; top:88px"></div>
                            <div class="poster" id="p4" style="position:absolute; width:569px; height:356px; left:221px; top:88px; background:url(images/portfolio_images/poster10_Mountain_Dew.jpg);"><img class="playButton" src="images/button.png" style="margin-left:254px; margin-top:148px"/></div>
                            <img class="front" src="images/portfolio_images/front10_Mountain_Dew.png" style="position:absolute; left:737px; top:194px;" />
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work11_KEEBLER.jpg" alt="pepsico1" /></li>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work12_LoveIsRespect.jpg" alt="pepsico1" /></li>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"   image-link="images/portfolio_images/work13_SMOKEYBEAR.jpg" alt="pepsico1" /></li>
                             <div class='video_portfolio_container' id = 'v5' style="width:569px; height:356px; left:218px; top:89px"></div>
                            <div class="poster" id="p5" style="position:absolute; width:569px; height:356px; left:218px; top:89px; background:url(images/portfolio_images/poster13_SMOKEYBEAR.jpg);"><img class="playButton" src="images/button.png" style="margin-left:254px; margin-top:148px"/></div>
                            <img class="front" src="images/portfolio_images/front13_SMOKEYBEAR.png" style="position:absolute; left:696px; top:198px;" />
                            <div class="visitsite"><a href="http://www.smokeybear.com/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work14_READ_WRITE_THINK.jpg" alt="pepsico1" /></li>
                            <div class="visitsite"><a href="http://www.readwritethink.org/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work15_NOVARTIS.jpg" alt="pepsico1" /></li>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work16_ESPN.jpg" alt="pepsico1" /></li>
                             <div class='video_portfolio_container' id = 'v6' style="width:633px; height:357px; left:187px; top:72px"></div>
                            <div class="poster" id="p6" style="position:absolute; width:633px; height:357px; left:187px; top:72px; background:url(images/portfolio_images/poster16_ESPN.jpg);"><img class="playButton" src="images/button.png" style="margin-left:287px; margin-top:148px"/></div>
                            <img class="front" src="images/portfolio_images/front16_ESPN.png" style="position:absolute; left:777px; top:151px;" />
                            <div class="visitsite"><a href="http://www.youtube.com/watch?v=7na7_Y0yXTo" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work17_CitiMusic.jpg" alt="pepsico1" /></li>
                            <div class="visitsite"><a href="http://www.youtube.com/watch?v=MXwZJ-LVx7I" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image" image-link="images/portfolio_images/work18_AVON.jpg" alt="pepsico1" /></li>
                            <div class="visitsite"><a href="http://apps.facebook.com/avonshineattract/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"  image-link="images/portfolio_images/work19_WARNER_BROTHERS.jpg" alt="pepsico1" /></li>
                        </ul>
                    </div>
                </li>
                <li class="sampleList">
                	<div class="workSampleBlock">
                    	<ul class="imageStrip1">
                        	<li><img class="work-image"   image-link="images/portfolio_images/work20_MJFF.jpg" alt="pepsico1" /></li>
                            <div class="visitsite"><a href="https://www.michaeljfox.org/" target="_blank"><p style="color:#666">visit the site</p></a></div>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul id="dotButtons">
            	<li class="dotButton workActive first"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
                <li class="dotButton"></li>
            </ul>
            <div class="clear"></div>
            <div id="leftArrow" class="arrow"></div>
            <div id="rightArrow" class="arrow"></div>
            <div id="close" style="position:absolute; top:0px; left:1105px;"><img src="images/close.png" /></div>
            <!--<div id="leftInvNavArea" class="dummyNavArea"></div>
        	<div id="rightInvNavArea" class="dummyNavArea"></div>-->
        </div>
        <?php
			if(strstr($_SERVER['HTTP_USER_AGENT'],"iPad")) {
			echo "<div id='controls'>
        			<a id= 'play' onClick='onBgPlay()'><div style='position:absolute; width:60px; height:70px; background:url(images/play.png)'></div></a>
        			<a onClick='onBgPause()'><div style='position:absolute; width:70px; height:60px; background:url(images/pause.png); left:60px'></div></a>
        		</div>";
			}
			
		?>
        <div id="social">
        	<a href="https://www.facebook.com/RFIStudios" target="_blank"><img src="images/FB-icon.png" /></a>
            <a href="http://twitter.com/#!/rfistudios" target="_blank"><img src="images/Twitter-icon.png" /></a>
            <div class="clear"></div>
        </div>
    </div>
</body>
</html>
