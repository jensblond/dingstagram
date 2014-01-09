/* dingstagram 0.8.2 - A simple jQuery Instagram plugin for developers
 *
 * GitHub: https://github.com/elfacht/dingstagram
 * Copyright (c) 2014 Martin Szymanski (http://www.elfacht.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://opensource.org/licenses/GPL-3.0) licenses.
 */
(function($) {

	'use strict';

	$.fn.dingstagram = function(options) {

		/* =Options
		------------------------------------------------------*/
		var settings = $.extend({
			userID: '',
			accessToken: '',
			baseClass: 'dingstagram', // default CSS class
			size: 'low', // low, standard, thumbnail
			items: 20, // max. items
			showAll: false, // show all images
			caption: true, // displays caption
			truncate: 0, // truncate captions
			targetBlank: false, // adds target="_blank" to links
			complete: {}
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
						var items = settings.items -1; // chosen amount of images

						switch (settings.showAll) {

							/* Show all images */
							case true:
								Instagram.outputAll(apiURL, 0);
								break;

							/* Show chosen amount of images */
							case false:

								/* Loop the data */
								$.each(data.data, function(i) {
									Instagram.template(data, i);
									return i < items; // limit the loop
								});

								settings.complete(); // custom complete callback
								break;
						}

						/* Add classes to the target */
						Instagram.addClasses();
					}
				});
			},

			/* =Output all items
			------------------------------------------------------*/
			outputAll: function(next_url, count) {
	    	$.ajax({
	        method: "GET",
	        url: next_url,
	        dataType: "jsonp",
	        jsonp: "callback",
	        jsonpCallback: "jsonpcallback",
	        cache: false,
	        success: function(data, status) {
            $.each(data.data, function(k,v){
              Instagram.template(data, k); // get the item template
            });

            /* If the next url is not null END && count < 1 (2 request) */
            if (data.pagination.next_url) {
              Instagram.outputAll(data.pagination.next_url, ++count); // continue the loop
            } else {
            	settings.complete(); // custom complete callback
            }
	        }
	      })
	    },

			/* =Create the items template
			------------------------------------------------------*/
			template: function(data, i) {
				var itemClass = settings.baseClass + '-item',
						linkClass = settings.baseClass + '-link',
						imgClass = settings.baseClass + '-img',
						captionClass = settings.baseClass + '-caption',
						figureClass = settings.baseClass + '-figure',
						itemURL = data.data[i].link,
						itemCaption = '',
						itemImg = '',
						caption = '';

				/* Avoid null on empty captions and set caption variable */
				if (data.data[i].caption !=null) {
					if(data.data[i].caption.text != null) {
						var itemCaption = data.data[i].caption.text;
					}
				} else {
					var itemCaption = '';
				}

				/* Define the image sizes */
				switch (settings.size) {
					case 'thumbnail':
						itemImg = data.data[i].images.thumbnail.url;
						break;
					case 'standard':
						itemImg = data.data[i].images.standard_resolution.url;
						break;
					case 'low':
						itemImg = data.data[i].images.low_resolution.url;
						break;
				}

				/* Truncate caption */
				if (settings.truncate > 0) {
					itemCaption = Instagram.truncate(itemCaption, settings.truncate);
				}

				/* Append figcaption if true */
				if (settings.caption === true) {
					caption = $(document.createElement('figcaption')).attr({'class': captionClass}).html(itemCaption)
				}

				/* Creates the HTML elements */
				var items =
						$(document.createElement('li')).attr({'class': itemClass}).append( // list item
							$(document.createElement('figure')).attr({'class': figureClass}).append( // figure container
								$(document.createElement('a')).attr({'href': itemURL, 'title': itemCaption, 'class': linkClass}).append( // link
									$(document.createElement('img')).attr({'src': itemImg, 'alt': itemCaption, 'class': imgClass}) // image
								)
							).append(caption)
						);

				/* Append the list to the target */
				target.append(items);

				/* Add target=_blank */
				if (settings.targetBlank === true) {
					$('.'+linkClass).attr('target', '_blank');
				}
			},

			/* =Add classes to target
			------------------------------------------------------*/
			addClasses: function() {
				target.addClass(settings.baseClass);
			},

			/* =Truncate the caption
			------------------------------------------------------*/
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