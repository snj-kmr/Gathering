(function($){setTimeout(function(){"use strict";$(window).load(function(){$('#loader-container').fadeOut(1000);});var jq=$.noConflict();$(function(){$("#accordion").accordion();});function scrollNav(){$('a[href*="#"]:not([href="#"]):not([data-toggle="tab"])').click(function(){$('html, body').animate({scrollTop:$($.attr(this,'href')).offset().top-60},1000);return false;});}
scrollNav();$('[data-toggle="tooltip"]').tooltip()
if($("#openMenu").length){var openMenu=document.getElementById('openMenu'),closeMenu=document.getElementById('closeMenu'),body=document.body;openMenu.onclick=function(){$('.menu-container-top').addClass('menu-container-open');$("body").css('overflow','hidden');};closeMenu.onclick=function(){$('.menu-container-top').removeClass('menu-container-open');$("body").css('overflow','scroll');};}
if($(".one-page-menu").length){$('.menu-item-links a').on("click",function(){$('.menu-container-top').removeClass('menu-container-open');$('.menu-item-links li').removeClass('selected');$(this).parent().addClass('selected');$("body").css('overflow','scroll');})}
if($(".one-page-menu-2").length){$('.navbar-header #openMenuMobile').on("click",function(){if($(".in").length){$('#menuLinks').css('display','none');}
else{$('#menuLinks').css('display','block');}})
$('#menuLinks a').on("click",function(){$('#menuLinks').css('display','none');$('#menuLinks').removeClass('in');})}
if($(".collection-carousel").length){$('.collection-carousel').owlCarousel({items:1,loop:true,animateOut:'fadeOut',autoplay:true,autoplayHoverPause:true,autoplaySpeed:1000,});}
if($(".carousel-fade").length){$('.carousel-fade').owlCarousel({items:1,loop:true,autoplay:true,animateOut:'fadeOut',autoplayHoverPause:true,});}
if($(".testi-carousel").length){$('.testi-carousel').owlCarousel({items:1,margin:10,loop:true,navigation:true,autoplay:true,autoplayHoverPause:true,autoplaySpeed:1000,dotsSpeed:1000,});}
if($("#lightSlider").length){$("#lightSlider").lightSlider({gallery:true,item:1,loop:true,thumbItem:5,thumbMargin:10,slideMargin:0,onSliderLoad:function(el){el.lightGallery({selector:'#lightSlider .lslide'});}});}
if($("#lightSlider2").length){$("#lightSlider2").lightSlider({item:3,slideMove:1,speed:600,slideMargin:20,auto:true,loop:true,pauseOnHover:true,responsive:[{breakpoint:800,settings:{item:3,slideMove:1,slideMargin:6,}},{breakpoint:480,settings:{item:2,slideMove:1}}],onSliderLoad:function(el){el.lightGallery({selector:'#lightSlider2 .lslide'});}});}
if($(".parallax").length){$.stellar({horizontalScrolling:false,verticalOffset:50});}
if($(".grid-layout").length){var $container=$('.grid-layout').imagesLoaded(function(){var isotope=function(){$container.isotope({resizable:false,itemSelector:'.entry'});};isotope();});$('.grid-filter a').on("click",function(){var selector=$(this).attr('data-filter');$container.isotope({filter:selector,animationOptions:{duration:750,easing:'linear',queue:false},transitionDuration:'0.8s',hiddenStyle:{opacity:0},visibleStyle:{opacity:1}});$('.project-counter').counterUp({delay:10,time:1000});return false;});var $optionSets=$('.grid-filter'),$optionLinks=$optionSets.find('a');$optionLinks.on("click",function(){var $this=$(this);if($this.hasClass('selected')){return false;}
var $optionSet=$this.parents('.grid-filter');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');});$('.grid-filter-2 a').on("click",function(){var selector=$(this).attr('data-filter');$container.isotope({filter:selector,animationOptions:{duration:750,easing:'linear',queue:false},transitionDuration:'0.8s',hiddenStyle:{opacity:0},visibleStyle:{opacity:1}});return false;});var $optionSets=$('.grid-filter-2'),$optionLinks=$optionSets.find('a');$optionLinks.on("click",function(){var $this=$(this);if($this.hasClass('selected')){return false;}
var $optionSet=$this.parents('.grid-filter-2');$optionSet.find('.selected').removeClass('selected');$this.addClass('selected');});}
if($(".counter").length){$('.counter').counterUp({delay:10,time:1000});}
$('#tabbed-info a').click(function(e){e.preventDefault()
$(this).tab('show')})
$('#tabbed-info-2 a').click(function(e){e.preventDefault()
$(this).tab('show')})
$(document).on('click',".show-popup",function(){$(".social-share-popup").addClass("open");})
$(document).on('click',".close-popup",function(){$(".social-share-popup").removeClass("open");})
var n=$(".menu");[].slice.call(n).forEach(function(menu){var menuItems=menu.querySelectorAll('.menu__link'),setCurrent=function(ev){ev.preventDefault();var item=ev.target.parentNode;if(classie.has(item,'menu__item--current')){return false;}
classie.remove(menu.querySelector('.menu__item--current'),'menu__item--current');classie.add(item,'menu__item--current');};[].slice.call(menuItems).forEach(function(el){el.addEventListener('mouseover',setCurrent);});});[].slice.call(document.querySelectorAll('.link-copy')).forEach(function(link){link.setAttribute('data-clipboard-text',location.protocol+'//'+location.host+location.pathname+'#'+link.parentNode.id);new Clipboard(link);link.addEventListener('click',function(){classie.add(link,'link-copy--animate');setTimeout(function(){classie.remove(link,'link-copy--animate');},300);});});$('#close-map-btn').hide('slow');$('#enlarge-map-btn').show('slow');$(document).on('click',"#enlarge-map-btn",function(){$(".map-container").addClass("enlarge-map");$('#close-map-btn').show();$('#enlarge-map-btn').hide();return false;});$(document).on('click',"#close-map-btn",function(){$(".map-container").removeClass("enlarge-map");$('#close-map-btn').hide();$('#enlarge-map-btn').show();return false;});if($("#openSearch").length){var openSearch=document.getElementById('openSearch'),closeSearch=document.getElementById('closeSearch'),searchContainer=document.getElementById('search-container')
body=document.body;openSearch.onclick=function(){classie.toggle(this,'active');classie.toggle(searchContainer,'open');};closeSearch.onclick=function(){$('.search-overlay').removeClass('open');};}
function DropDown(el){this.formDropdown=el;this.placeholder=this.formDropdown.children('span');this.opts=this.formDropdown.find('ul.dropdown > li');this.val='';this.index=-1;this.initEvents();}
DropDown.prototype={initEvents:function(){var obj=this;obj.formDropdown.on('click',function(event){$(this).toggleClass('active');return false;});obj.opts.on('click',function(){var opt=$(this);obj.val=opt.text();obj.index=opt.index();obj.placeholder.text('Service: '+obj.val);});},getValue:function(){return this.val;},getIndex:function(){return this.index;}}
$(function(){var formDropdown=new DropDown($('#formDropdown'));$(document).click(function(){$('.wrapper-dropdown-1').removeClass('active');});});if($("#contact").length){$('#contact').validate({errorElement:"em",rules:{name:{required:true},email:{required:true,email:true},message:{required:true},},messages:{name:{required:""},email:{required:""},message:{required:""}},submitHandler:function(form){$(form).ajaxSubmit({type:"POST",data:$(form).serialize(),url:"include/process.php",success:function(){$('#success').fadeIn('slow',function(){setTimeout("$('#success').fadeOut('slow');",1000);$('#contact :input').val('');})},error:function(){$('#contact').fadeTo("slow",0.15,function(){$('#error').fadeIn();});}});}});}
if($("#map").length){google.maps.event.addDomListener(window,'load',init);}
var map_alt;function init(){var mapOptions={center:new google.maps.LatLng(46.311604,-79.448484),zoom:15,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.DEFAULT,},disableDoubleClickZoom:true,mapTypeControl:true,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,},scaleControl:true,scrollwheel:false,panControl:true,streetViewControl:true,draggable:true,overviewMapControl:true,overviewMapControlOptions:{opened:false},mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}],}
var mapElement=document.getElementById('map');var map=new google.maps.Map(mapElement,mapOptions);var locations=[['North Bay','theNEXT First Launch','1 (705) 491 5656','email@thenext.com','undefined',46.311604,-79.448484,'https://mapbuildr.com/assets/img/markers/solid-pin-black.png']];var description,telephone,email,web,markericon,marker,link;for(var i=0;i<locations.length;i++){if(locations[i][1]=='undefined'){description='';}else{description=locations[i][1];}
if(locations[i][2]=='undefined'){telephone='';}else{telephone=locations[i][2];}
if(locations[i][3]=='undefined'){email='';}else{email=locations[i][3];}
if(locations[i][4]=='undefined'){web='';}else{web=locations[i][4];}
if(locations[i][7]=='undefined'){markericon='';}else{markericon=locations[i][7];}
marker=new google.maps.Marker({icon:markericon,position:new google.maps.LatLng(locations[i][5],locations[i][6]),map:map,title:locations[i][0],desc:description,tel:telephone,email:email,web:web});if(web.substring(0,7)!="http://"){link="http://"+web;}else{link=web;}
bindInfoWindow(marker,map,locations[i][0],description,telephone,email,web,link);}
function bindInfoWindow(marker,map,title,desc,telephone,email,web,link){var infoWindowVisible=(function(){var currentlyVisible=false;return function(visible){if(visible!==undefined){currentlyVisible=visible;}
return currentlyVisible;};}());var iw=new google.maps.InfoWindow();google.maps.event.addListener(marker,'click',function(){if(infoWindowVisible()){iw.close();infoWindowVisible(false);}else{var html="<div style='color:#000;background-color:#fff;padding:5px;width:220px;border-radius: 0'><h5 class='box-h4' style='font-size: 18px'>"+title+"</h5><p>"+desc+"</p><p>"+telephone+"</p><a class='color-text' href='mailto:"+email+"' >"+email+"</a><a class='color-text' href='"+link+"'' >"+web+"</a></div>";iw=new google.maps.InfoWindow({content:html});iw.open(map,marker);infoWindowVisible(true);}});google.maps.event.addListener(iw,'closeclick',function(){infoWindowVisible(false);});}}
if($("#lightSlider3").length){$("#lightSlider3").lightSlider({item:4,slideMove:1,speed:1000,slideMargin:20,loop:true,pauseOnHover:true,responsive:[{breakpoint:800,settings:{item:3,slideMove:1,slideMargin:6,}},{breakpoint:480,settings:{item:2,slideMove:1}}],onSliderLoad:function(el){el.lightGallery({selector:'#lightSlider3 .lslide'});}});}
if($("#lightSlider4").length){$("#lightSlider4").lightSlider({item:3,slideMove:1,speed:1000,slideMargin:20,loop:true,pauseOnHover:true,responsive:[{breakpoint:800,settings:{item:2,slideMove:1,slideMargin:6,}},{breakpoint:480,settings:{item:1,slideMove:1}}],onSliderLoad:function(el){el.lightGallery({selector:'#lightSlider4 .lslide'});}});}},2000)})(jQuery);