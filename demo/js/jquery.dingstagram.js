/* dingstagram – v0.8
 * https://github.com/elfacht/dingstagram
 * @author Martin Szymanski / www.elfacht.com
 * @version 0.8
 */
(function($) {

	'use strict';

	$.fn.dingstagram = function(options) {

		/* =Options
		------------------------------------------------------*/
		var settings = $.extend({
			userID: '',
			accessToken: '',
			size: 'low', // low, standard, thumbnail
			items: 20, // max. items
			caption: true, // displays caption
			truncate: 0, // truncate captions
			blank: false // adds target="_blank" to links
		}, options);

		var apiURL = 'https://api.instagram.com/v1/users/'+settings.userID+'/media/recent/?access_token='+settings.accessToken,
				target = this;

		/* =Functions
		------------------------------------------------------*/
		var Instagram = {

			/* =Output items
			------------------------------------------------------*/
			outputItems: function() {
				$.ajax({
	        method: "GET",
	        dataType: "jsonp",
	        jsonp: "callback",
	        jsonpCallback: "jsonpcallback",
	        cache: false,
	        url: apiURL,
	        success: function(data, status) {
	        	var items = settings.items -1;

						// loop the data
			      $.each(data.data, function(i) {
			        if (i > items) return false;
			        Instagram.template(data, i);
			      });

			      // add classes to the target
			      Instagram.addClasses();
	        }
	    	});
	    },

	    /* =Create the items template
	    ------------------------------------------------------*/
	    template: function(data, i) {
	    	var itemClass = 'dingstagram-item',
	    			linkClass = 'dingstagram-link',
	    			imgClass = 'dingstagram-img',
	    			captionClass = 'dingstagram-caption',
	    			figureClass = 'dingstagram-figure',
	    			itemURL = data.data[i].link,
	    			itemCaption = data.data[i].caption.text,
	    			itemImg = '',
	    			caption = '';

	    	// define the image sizes
	    	if (settings.size === 'thumbnail') {
	    		itemImg = data.data[i].images.thumbnail.url;
	    	} else if (settings.size === 'standard') {
	    		itemImg = data.data[i].images.standard_resolution.url;
	    	} else if (settings.size === 'low') {
	    		itemImg = data.data[i].images.low_resolution.url;
	    	}

	    	// truncate caption
	    	if (settings.truncate > 0) {
	    		itemCaption = Instagram.truncate(itemCaption, settings.truncate);
	    	}

	    	// append figcaption if true
	    	if (settings.caption === true) {
	    		caption = $(document.createElement('figcaption')).attr({'class': captionClass}).html(itemCaption)
	    	}

	    	// creates the HTML elements
	    	var items =
	    			$(document.createElement('li')).attr({'class': itemClass}).append( // list item
		    			$(document.createElement('figure')).attr({'class': figureClass}).append( // figure container
		    				$(document.createElement('a')).attr({'href': itemURL, 'title': itemCaption, 'class': linkClass}).append( // link
		    					$(document.createElement('img')).attr({'src': itemImg, 'alt': itemCaption, 'class': imgClass}) // image
		    				)
		    			).append(caption)
	    			);

	    	// append the list to the target
	    	target.append(items);

	    	// add target=_blank
	    	if (settings.blank === true) {
	    		$('.'+linkClass).attr('target', '_blank');
	    	}
	    },

	    /* =Add classes to target
	    ------------------------------------------------------*/
	    addClasses: function() {
	    	target.addClass('dingstagram');
	    },

	    truncate: function(content, value) {
	    	var content = $.trim(content).substring(0, value).split(' ').slice(0, -1).join(' ') + '...';
	    	return content;
	    }

		}

		/* =Init it
		------------------------------------------------------*/
		return this.each(function() {
			Instagram.outputItems();
		});

	}

}(jQuery));