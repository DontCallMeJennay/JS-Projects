$( document ).ready(function(){
	const artsyB = document.getElementById("artsy");
	const formalB = document.getElementById("formal");

	const emailB = document.getElementById("emailMe");
	const tweetB = document.getElementById("tweetMe");
	const gitHubB = document.getElementById("gitHubMe");

	const jsC = document.getElementById("jsc");
	const htmlC = document.getElementById("htmlc");
	const wpC = document.getElementById("wpc");
	const apiC = document.getElementById("apic");
	const rdC = document.getElementById("rdc");

////Just kidding, I'm using jQuery.

	$("#artsy, #formal").hover(function(){
		$("#msg1").css({"opacity": "0"});
	}, function(){
		$("#msg1").css({"opacity": "1"});
	})
		.click(function(){
			$("#artsy, #formal")
			.css({"opacity": "0", "visibility": "hidden"})
			.delay(2000).animate({opacity: 1
		}, 400, function() {
			$(this).css({"visibility": "visible"});
		});
		});

	$("#formal").on("click", function(){
		$("#msg1").text("(Just the facts, please.)")
		.css({"opacity": "1"});
		$("body").delay(1200).animate({
        	scrollTop: $("#skills").offset().top -100
   		}, 1000);
	});

	$("#artsy").on("click", function(){
		$("#msg1").text("(Sometimes I pretend I'm a designer.)")
		.css({"opacity": "1"});
		$("body").delay(3000).animate({
        	scrollTop: $("#skills").offset().top -100
   		}, 1000);
   		//move bee down to skills section
   		//land on down button
	});

	$("#nextBtn").click(function(){
		$("body").delay(1000).animate({
			scrollTop: $("#projects").offset().top -175
		}, 1000);
	});

	$("#jsc").hover(function(){
		$("#jsc, #coffee, #sushi, #due").toggleClass("orange");
	}, function(){
		$("#jsc, #coffee, #sushi, #due").toggleClass("orange");
	});

	$("#wpc").hover(function(){
		$("#wpc, #mbg").toggleClass("lavender");
	}, function(){
		$("#wpc, #mbg").toggleClass("lavender");
	});

	$("#apic").hover(function(){
		$("#apic, #sushi, #wapp, #wiki").toggleClass("blue");
	}, function(){
		$("#apic, #sushi, #wapp, #wiki").toggleClass("blue");
	});

	$("#htmlc").hover(function(){
		$("#htmlc, #coffee, #wiki, #mbg").toggleClass("green");
	}, function(){
		$("#htmlc, #coffee, #wiki, #mbg").toggleClass("green");
	});

	$("#rdc").hover(function(){
		$("#rdc, #coffee, #wiki, #mbg, #wapp").toggleClass("yellow");
	}, function(){
		$("#rdc, #coffee, #wiki, #mbg, #wapp").toggleClass("yellow");
	});

	$(".box").hover(function(){
		$(this).focus();
		$("img",this).css({"height": "200px"});
		$("p",this).css({"font-size": "1em", "opacity": "1"});
	}, function(){
		$("img",this).css({"height": "0"});
		$("p",this).css({"font-size": "0", "opacity": "0"});

	});

});