/**
 *
 * HTML5 Audio player with playlist
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */
jQuery(document).ready(function() {

    // inner variables
    var song;
    var tracker = $('.tracker');
    var volume = $('.volume');
	
	function GetURLParameter(sParam)
	{
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) 
		{
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) 
			{
				return sParameterName[1];
			}
		}
	}

    function initAudio(elem) {
        var url = elem.attr('audiourl');
        var title = elem.text();
        var cover = elem.attr('cover');
        var artist = elem.attr('artist');
		var url_detail = elem.attr('url_img');
		var newWindow = null;
		
		
		
		//alert(hideTitle);	
		
		
		$('.player .title').text(title);
		
        $('.player .artist').text(artist);
        $('.player .cover').css('background-image','url(data/' + cover+')');
		
		
		$('.player .cover').attr('url_detail' , '');
		$('.player .cover').attr('url_detail' , url_detail);
		
		$('.player .cover').click( function(xx) {
						  
						//var img =  $(this).css('background-image') ;
						var img =  $(this).attr('url_detail') ;							
							
						//img = img.replace( '.png', '_big.png');
						//img = img.replace( 'url(', '');
						//img = img.replace( ')', '');
						//img = img.replace( ')', '');
						//img = img.replace( /["']/g, '');
							
							
						var guid = jQuery.guid++;
							
						//alert(img);							
						if ( img != '')
							if (!!!newWindow)
								newWindow = window.open(img,'name','scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=-1000,top=-1000',true);
							else
							{
								/*
								if (newWindow.closed == true)
									newWindow = window.open(img,'name','scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=-1000,top=-1000',true);
								else
								{
									newWindow.focus();
									newWindow.location = img;
								}
								*/
								if (newWindow.closed == false)
									newWindow.close();
								
								newWindow = window.open(img,'name','scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=-1000,top=-1000',true);
							}
						  
						  
						});

        song = new Audio('data/' + url);

        // timeupdate event listener
        song.addEventListener('timeupdate',function (){
            var curtime = parseInt(song.currentTime, 10);
            tracker.slider('value', curtime);
        });

        $('.playlist li').removeClass('active');
        elem.addClass('active');
    }
	/*
    function playAudio() {
        song.play();

        tracker.slider("option", "max", song.duration);

        $('.play').addClass('hidden');
        $('.pause').addClass('visible');
		
		
    }
	*/
	function playAudio() {
	  song.addEventListener('ended', function () {
		var next = $('.playlist li.active').next();
		if (next.length == 0) {
		  next = $('.playlist li:first-child');
		}
		initAudio(next);

		song.addEventListener('loadedmetadata', function () {
		  playAudio();
		});
	  }, false);

	  tracker.slider("option", "max", song.duration);
	  song.play();
	  $('.play').addClass('hidden');
	  $('.pause').addClass('visible');
	}
	
	
    function stopAudio() {
        song.pause();

        $('.play').removeClass('hidden');
        $('.pause').removeClass('visible');
    }
	
	
	

    // play click
    $('.play').click(function (e) {
        e.preventDefault();

        playAudio();
    });

    // pause click
    $('.pause').click(function (e) {
        e.preventDefault();

        stopAudio();
    });

    // forward click
    $('.fwd').click(function (e) {
        e.preventDefault();

        stopAudio();

        var next = $('.playlist li.active').next();
        if (next.length == 0) {
            next = $('.playlist li:first-child');
        }
        initAudio(next);				
		song.addEventListener('loadedmetadata', function() {playAudio(); });
		//playAudio();
    });

    // rewind click
    $('.rew').click(function (e) {
        e.preventDefault();

        stopAudio();

        var prev = $('.playlist li.active').prev();
        if (prev.length == 0) {
            prev = $('.playlist li:last-child');
        }
        initAudio(prev);
		song.addEventListener('loadedmetadata', function() {playAudio(); });
		//playAudio();
    });

    // show playlist
    $('.pl').click(function (e) {
        e.preventDefault();

        $('.playlist').fadeIn(300);
    });

    // playlist elements - click
    $('.playlist li').click(function () {
        stopAudio();
        initAudio($(this));
		song.addEventListener('loadedmetadata', function() {playAudio(); });
    });

    
	// inizializza i titoli della playlist se vanno nascosti
	var next = $('.playlist li:first-child');
	var hideTitle = GetURLParameter('hideTitle');	
	var i;
	
	i = 0;
	
	if (hideTitle == 'YES')
	
	while (next.length != 0) 
	{
		  
		i=i+1;
		next[0].textContent = i;
		next = next.next();
	}
	
	
	// initialization - first element in playlist
    initAudio($('.playlist li:first-child'));

    // set volume
    song.volume = 0.8;

    // initialize the volume slider
    volume.slider({
        range: 'min',
        min: 1,
        max: 100,
        value: 80,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.volume = ui.value / 100;
        },
        stop: function(event,ui) {},
    });

    // empty tracker slider
    tracker.slider({
        range: 'min',
        min: 0, max: 10,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.currentTime = ui.value;
        },
        stop: function(event,ui) {}
    });
	
	
	//playAudio();
	
});
