# dingstagram – A simple jQuery Instagram plugin for developers
GitHub: [https://github.com/elfacht/dingstagram](https://github.com/elfacht/dingstagram)

Website: [www.elfacht.com](http://www.elfacht.com)

Twitter: [@elfacht](https://twitter.com/elfacht)


### About
dingstagram is a tiny jQuery plugin to display Instagram feeds. It's for developers who prefer to have full control over the CSS. You can use the CSS/SCSS example or create your own based on a few defined classes.

### Usage

#### HTML

Define the element where the feed should be appear. The feed items are `<li>` elements, so you should use a ordered/unordered list:

	<ul id="instagram"></ul>

#### jQuery

Call the plugin with the user ID and the access token of your App:

	$(function() {
		$('#instagram').dingstagram({
			userID: '123456789', // Instagram user ID
			accessToken: '123456789.9876c5432.93549cfab40a478eb40363f6c68719a2' // Application access token
		});
	});

To register an application and get the credentials you need to do three things:

+ [Register an application](http://instagram.com/developer/)
+ [Get the user ID](http://jelled.com/instagram/lookup-user-id)
+ [Get the access token](http://jelled.com/instagram/access-token)

##### Options

| Option       | Description 
| -------------|-------------
| **baseClass** | *string* – Use our own CSS class. It will replace the `dingstagram-`from all class outputs (default: dingstagram)
| **size**     | *string* - Use `low`, `standard`or `thumbnail` for image size |
| **items**    | *int* - Default and limit is 20 due the API limit of instagram (working on pagination). |
| **caption**  | *boolean* - Displays the caption text (default: true) |
| **truncate** | *int* - Truncates the caption to the value you set (default: 0) |
| **blank**    | *boolean* - Adds a target="_blank" to the links (default: false) |

Example with defaults: 
 
	$('#instagram').dingstagram({
		userID: '25025320', // demo with the @instagram account
		accessToken: '538504697.570e13a.d39b590cd958491497d722ae2f7d3501', // please don't use this one
		baseClass: 'dingstagram',
		size: 'low',
		items: 20,
		caption: true,
		truncate: 0,
		blank: false
	});
	
#### CSS

The plugin uses following CSS classes you can use and style:

	.dingstagram {} // added to the list container
	.dingstagram-item {} // list item
	.dingstagram-figure {} // figure container
	.dingstagram-caption {} // image caption (if enabled)
	.dingstagram-link {} // the link, obviously
	.dingstagram-image {} // the image itself
	
For example the HTML output:

	<ul id="instagram" class="dingstagram">
		<li class="dingstagram-item">
			<figure class="dingstagram-figure">
				<a href="http://instagram.com/p/1234" title="the image caption" class="dingstagram-link">
					<img src="[image src]" alt="the image caption" class="dingstagram-img" />
				</a>
				<figcaption class="dingstagram-figcaption">
					the image caption
				</figcaption>
			</figure>
		</li>
	</ul>
	
**Feel free to use the sample CSS or SCSS (Sass) files and modify them!**

### License

Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) 
and [GPL 3.0](http://opensource.org/licenses/GPL-3.0) licenses.

### Changelog

0.8.1 – added **baseClass** option; minor fixes

0.8 – initial release