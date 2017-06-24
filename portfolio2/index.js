$(document).ready(function() {
    const artBtn = document.getElementById("artsy");
    const formalBtn = document.getElementById("formal");

    const emailBtn = document.getElementById("emailMe");
    const tweetBtn = document.getElementById("tweetMe");
    const gitBtn = document.getElementById("gitHubMe");

    const jsCat = document.getElementById("jsc");
    const htmlCat = document.getElementById("htmlc");
    const wpCat = document.getElementById("wpc");
    const apiCat = document.getElementById("apic");
    const respCat = document.getElementById("rdc");

    const msg = document.getElementById("msg1");
    const nextBtn = document.getElementById("arrow1");
    const lastBtn = document.getElementById("arrow2");

    ////Just kidding, I'm using jQuery.

    $(artBtn, formalBtn).hover(function() {
            $(msg).css({ "opacity": "0" });
        }, function() {
            $(msg).css({ "opacity": "1" });
        })
        .click(function() {
            $(artBtn, formalBtn)
                .delay(1000).animate({
                    opacity: 0
                }, 400, function() {
                    $(this).css({ "visibility": "visible" });
                });
            $("nav a").css({"opacity": "1"});
        });

    $(formalBtn).on("click", function() {
        $(msg).text("(Just the facts, please.)")
            .css({ "opacity": "1" });
        $("body").delay(1000).animate({
            scrollTop: $("#skills").offset().top - 100
        }, 500);
    });

    $(artBtn).on("click", function() {
        $(msg).text("(Sometimes I pretend I'm a designer, too.)")
            .css({ "opacity": "1" });
        $(this).html('<img id="bee" src="darkbee.gif">')
        		.css({ "opacity": "1", "z-level": "-1" });
        $("body").delay(1000).animate({
            scrollTop: $("#skills").offset().top - 100
        }, 500);
        //move bee down to skills section
        //land on down button
    });


    $(nextBtn).click(function() {
        $("body").delay(1000).animate({
            scrollTop: $("#projects").offset().top - 100
        }, 500);
    });

    $(lastBtn).click(function() {
        $("body").delay(1000).animate({
            scrollTop: $("#contact").offset().top - 100
        }, 500);
    });



    $(jsCat).hover(function() {
        $("#jsc, #coffee, #sushi, #due").toggleClass("orange");
    }, function() {
        $("#jsc, #coffee, #sushi, #due").toggleClass("orange");
    });

    $(wpCat).hover(function() {
        $("#wpc, #mbg").toggleClass("lavender");
    }, function() {
        $("#wpc, #mbg").toggleClass("lavender");
    });

    $(apiCat).hover(function() {
        $("#apic, #sushi, #wapp, #wiki").toggleClass("blue");
    }, function() {
        $("#apic, #sushi, #wapp, #wiki").toggleClass("blue");
    });

    $(htmlCat).hover(function() {
        $("#htmlc, #coffee, #wiki, #mbg").toggleClass("green");
    }, function() {
        $("#htmlc, #coffee, #wiki, #mbg").toggleClass("green");
    });

    $(respCat).hover(function() {
        $("#rdc, #coffee, #wiki, #mbg, #wapp").toggleClass("yellow");
    }, function() {
        $("#rdc, #coffee, #wiki, #mbg, #wapp").toggleClass("yellow");
    });

    $(".box").hover(function() {
        $(this).focus();
        $("img", this).css({ "height": "200px" });
        $("p", this).css({ "font-size": "1em", "opacity": "1" });
    }, function() {
        $("img", this).css({ "height": "0" });
        $("p", this).css({ "font-size": "0", "opacity": "0" });

    });

});
