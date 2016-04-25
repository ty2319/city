(function($) {	
		var	w		= 0;
			h		= 0,
			wh		= 0,
			ssize	= 0,
			onoff	= -1;
	
		set = function() {	
			w = $(window).width();
			h = $(window).height();
			wh = (w*0.05) + 0.75;
			if (w < 940) {
				wh = 50.75
			}
			ssize = wh*0.7;
			$('#button li').width(w*0.05).height(w*0.05);
			$('section').width((wh * 4) - 1).height((wh * 4) - 1).css('bottom' , 	(w*0.05) + (h*0.05) + 5); 
			$('main div:not(.active)').width(ssize).height(ssize);
			$('#back div').addClass('inner');
		}
	
		start = function() {	
	
			for(var i = 0; i < 16 ; ++i) {
				//random opacity, top, left and angle
				var o	= 0.3,
				t		= Math.floor(Math.random()*196) + 5, // between 5 and 200
				l		= Math.floor(Math.random()*696) + 5, // between 5 and 700
				a		= Math.floor(Math.random()*101) - 50; // between -50 and 50
						
				$el		= $('<div>').css({
					opacity			: o,
					bottom			: t + 'px',
					right			: l + 'px',
					width			: ssize,
					height			: ssize
				});
					
				$el.appendTo('main');
			}
		},
		
		list = function() {
			$('#button li').click(function() {
				$('#button li').removeClass('on');
				$(this).addClass('on');
				var num = $('#button li').index(this);
				
				if (num != onoff) {
					$('section').fadeOut();
					$('#back').fadeOut('fast' , function() {
						$(this).children().css('background-image' , 'url(img/' + num + '.jpg)').removeClass('inner');
						$(this).fadeIn('fast' , function() {
							$(this).children().addClass('inner');
						});
					});
					
					if (onoff == -1) {
						$('main div').each(function(i) {
							var $el		= $(this),
							param		= {
								width	: wh,
								height	: wh,
								bottom	: (w*0.05) + (h*0.05) + 5 + (wh * Math.floor(i/4)),
								right	: (w * 0.05) + (wh * (i%4)),
								opacity	: 0.7
							};
									
							if (!$.browser.msie)
								param.rotate	= '0deg';
									
							$el.animate(param, 1000 , function() {
								$('section').eq(num).fadeIn('fast');
							}).addClass('active');
						});
					} else {
						$('section').eq(num).fadeIn('fast').addClass('active');
					}
					
					onoff = num;
				}
			});
		},
		
		batu = function() {
			$('.close').on('click' , function() {
				$('#button li').removeClass('on');
				$(this).parent().fadeOut('fast');
				$('#back').fadeOut('fast' , function() {
					$(this).children().removeClass('inner').css('background-image' , 'url(img/1.jpg)');
				}).fadeIn('fast' , function() {
					$(this).children().addClass('inner');
				});
				
				$('main div').each(function(i) {
					//random opacity, top, left and angle
					var o			= 0.1,
					t			= Math.floor(Math.random()*196) + 5, // between 5 and 200
					l			= Math.floor(Math.random()*696) + 5, // between 5 and 700
					a			= Math.floor(Math.random()*101) - 50; // between -50 and 50
					$el			= $(this),
					param		= {
						width	: ssize,
						height	: ssize,
						opacity	: o,
						bottom	: t + 'px',
						right	: l + 'px'
					};
							
					if (!$.browser.msie)
						param.rotate	= a + 'deg';
							
					$el.animate(param, 1000).removeClass('active');
				});
				
				onoff = -1;
			});
		},
		
		active = function() {	
			
			$('main div.active').each(function(i) {
				var b = (w*0.05) + (h*0.05) + 5 + (wh * Math.floor(i/4)),
				r = (w * 0.05) + (wh * (i%4));
				
				$(this).css({'width' : wh,'height': wh , 'bottom': b , 'right': r , 'opacity': 0.7});
			});
		}
		
	$(document).ready(function() {
		set();
		start();
		list();
		batu();
	});	
	
	$(window).resize(function() {
		set();
		active();
	});
	
})($);// JavaScript Document