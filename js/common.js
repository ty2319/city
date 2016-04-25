(function($) {

	//ie css
	ie = function() {
		var ua = navigator.userAgent;
		var isIE = ua.match(/msie/i),
		isIE6 = ua.match(/msie [6.]/i),
		isIE7 = ua.match(/msie [7.]/i),
		isIE8 = ua.match(/msie [8.]/i),
		isIE9 = ua.match(/msie [9.]/i),
		isIE10 = ua.match(/msie [10.]/i),
		isIE11 = ua.match(/msie [11.]/i);
		if (isIE) {
		$("html").addClass('ie');
			if (isIE6) {
				$("html").addClass('ie6');
			} else if (isIE7) {
				$("html").addClass('ie7');
			} else if (isIE8) {
				$("html").addClass('ie8');
			} else if (isIE9) {
				$("html").addClass('ie9');
			} else if (isIE10) {
				$("html").addClass('ie10');
			} else if (isIE11) {
				$("html").addClass('ie11');
			}
		}
		
		$('#topnavi li a,footer li a,#issues a').prepend('≫ ');
		$('#side li a').append(' ●');
		$('.box dt').not('#issues dt').append('：');
		$('.dot dd').prepend('・');
		$('#global dt,aside dt,article h5').prepend('―　').append('　―');
	},
	
	section = function() {
		$('header#title').append('<p id="scroll">scroll</p><span class="fa fa-angle-down fa-3x"></span>');
		
        $('section .quarter:nth-child(8n),section .quarter:nth-child(8n-2),section .quarter:nth-child(8n-3),section .quarter:nth-child(8n-5)').not('table').addClass('back_gray');
		
        $('section .quarter:nth-child(8n+1),section .quarter:nth-child(8n-1),section .quarter:nth-child(8n-4),section .quarter:nth-child(8n-6)').not('table').addClass('back_white');
		
		$('article').children('section:not(.half,.one_third,.quarter,#index section),div:not(#index section div)').addClass('contents');
		
		$('.contents:odd').css('background-color','#e9f2ff');
		$('.contents:even').css('background-color','#FFFFFF');
		
		$('.contents').each(function() {
			var A = Math.floor(6*Math.random());
            $(this).addClass('bg'+A);
        });
	},
	
	font = function() {
		var w = $(window).width();
		var x = 1330;
		var minx = 940;
			if (w >= x) {
				$('article').not($('#minimal').parent('article')).css({'font-size':'120%','line-height':'170%'});
			} else if (w < x) {				
				$('article').css({'font-size':'100%','line-height':'150%'});
			}
		
		$('.contents').each(function() {
            $('.half:odd' , this).css('border-left-width' , $(window).width() * 0.001);
        });
	},
	
	//top button
	goTop = function() {
		
		var flag = false;
		var pagetop = $('#pagetop');
		
		$(window).scroll(function () {
			
			if ($(this).scrollTop() > 300) {
				if (flag == false) {
					flag = true;
					pagetop.stop().animate({
						'bottom': '50px'
					}, 200);
				}
			} else {
				if (flag) {
					flag = false;
					pagetop.stop().animate({
						'bottom': '-50px'
					}, 200);
				}
			}			
		});
		
		pagetop.click(function () {
			$('body, html').animate({ scrollTop: 0}, 500);
			return false;
		});
	},
	
	nav = function() {
		
		path = location.pathname
		if(path.match("index")){
			$('nav#global a').eq(0).addClass('active');
	　　}
		if(path.match("tournament")){
			$('nav#global a').eq(1).addClass('active');
	　　}
		if(path.match("results")){
			$('nav#global a').eq(2).addClass('active');
	　　}
		if(path.match("gallery")){
			$('nav#global a').eq(3).addClass('active');
	　　}
		if(path.match("aid")){
			$('nav#global a').eq(4).addClass('active');
	　　}
		if(path.match("access")){
			$('nav#global a').eq(5).addClass('active');
	　　}
		if(path.match("hero")){
			$('nav#global a').eq(6).addClass('active');
	　　}
		if(path.match("mascot")){
			$('nav#global a').eq(7).addClass('active');
	　　}
		if(path.match("history")){
			$('nav#global a').eq(8).addClass('active');
	　　}
		if(path.match("past")){
			$('nav#global a').eq(9).addClass('active');
	　　}

		$('#global h3').hover(function() {
			$('#global dl').slideDown('fast');
			$(this).hide();
			$('aside').hide();
			$('body').append('<div id="modal"></div>');
		});
	
		$('aside h3').hover(function() {
			$('aside dl').slideDown('fast');
			$(this).hide();
			$('#global').hide();
			$('body').append('<div id="modal"></div>');
		});
	
		$('#global dl').hover(function() {
			$(this).show();
		}, function() {
			$('div#modal').remove();
			$(this).slideUp('fast');
			$('#global h3').show();
			$('aside').show();
		});
	
		$('aside dl').hover(function() {
			$(this).show();
		}, function() {
			$('div#modal').remove();
			$(this).slideUp('fast');
			$('aside h3').show();
			$('#global').show();
		});
		
		$('#global dt:eq(1)').css({'margin-top':'-9.21em'/*'-6.4em'*/,'margin-left':'20em'});
		$('#global dd:gt(5)').css('margin-left','25em');
	},
	
	//title
	title = function() {
		
		$('header#title').height($(window).height() - $('header#top').height());
		$('header#title h3').css('padding-top', $(window).height()/2.1)
		$('header#title #scroll').css({'padding-top' :  $('header#title').height()/3.5 , 'cursor' : 'pointer'});
		$('header#title #scroll').click(function() {
			$("html, body").stop().animate({scrollTop: $(window).height()}, 500, "linear");
		});
		
		var A = 
		Math.floor(11*Math.random());
		$('article header#title').addClass('bg'+A);

	},
	
	// SmoothScroll
	smoothScroll = function() {
		
		$('article #side li a[href^=#]').click(function(){
			var speed = 500;
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			var body = 'body';
			$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
		});
		
		var set = 1;//ウインドウ上部からどれぐらいの位置で変化させるか
		var boxTop = new Array;
		var current = -1;
		var startPosition = 0;
		var x = 0;
		
		$(document).mousemove(function(e) {
			x = e.pageX;
		});
		
		$(document).mousedown(function(f) {
			x = f.pageX;
		});
	
		//各要素の位置
		$(window).on("load resize", function(){
			$('article > section,article > div').each(function(i) {
				boxTop[i] = $(this).offset().top;
			});
		});
		//最初の要素にclass="on"をつける
		changeBox(0);
		//スクロールした時の処理
		$(window).scroll(function(){
			
			var scrollPosition = $(window).scrollTop();			
				
			for (var i = boxTop.length - 1 ; i >= 0; i--) {
				if (scrollPosition > boxTop[i] - set) {
					$('#pan').slideDown('slow');
					$('#side').fadeIn('slow');
					changeBox(i);
					break;
				} else if (scrollPosition < boxTop[0] - set) {
					$('#pan').slideUp('slow');
					$('#side').fadeOut('slow');
					
					if (x <= $(window).width()) {
						if (startPosition < scrollPosition && scrollPosition < 200) {
							$("html, body").stop().animate({scrollTop: $(window).height()}, 500, "linear");
						}
						
						if (startPosition > scrollPosition && scrollPosition < boxTop[0] - 1) {
							$("html, body").stop().animate({scrollTop: 0}, 100, "linear");
						}
					}
				}
			};
			startPosition = scrollPosition;
		});
		
		//ナビの処理
		function changeBox(secNum) {
			if (secNum != current) {
				
				current = secNum;
				secNum2 = secNum + 1;//HTML順序用
				$('article #side li').removeClass('on');
				$('article #side li:nth-child(' + secNum2 +')').addClass('on');
	
				/* 位置によって個別に処理をしたい場合　
				if (current == 0) {
					// 現在地がsection1の場合の処理
				} else if (current == 1) {
					// 現在地がsection2の場合の処理
				} else if (current == 2) {
					// 現在地がsection3の場合の処理
				}*/
			}
		};
	},
	
	//sidemenu
	side = function() {
		$('#side').hover(function() {
			$('body').append('<div id="modal"></div>');
			$('span',this).fadeIn('slow');
			$('a',this).css('cursor','pointer');
		},function() {
			$('div#modal').remove();
			$('span',this).fadeOut('slow');
		});
	}
	
	$(document).ready(function() {
		ie();
		section();
		font();
		goTop();
		nav();
		title();
		smoothScroll();
		side();
	});	
	
	$(window).resize(function() {
		title();
		font();
	});
	
})($);

// JavaScript Document