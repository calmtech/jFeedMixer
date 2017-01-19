/**
 * jFeexMixer - jQuery plugin to embed the multifeed in your website via Google Feed API.
 * @requires jQuery v1.x and v1.4 above
 *
 * http://www.calmtech.net/jfeedmixer
 *
 * Copyright (c) 2010 Masaya Kogawa (CalmTech)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.1
 */
(function($) {
	$.extend({
		jFeedMixer: new function() {
			this.defaults = {
				feeds: new Array(),
				countPerFeed: 5,
				countLimit: 10,
				feedFormat: '<li><a href="%link">%title(%date)【%blogTitle】[%category]</a></li>',
				beforeFeeds: '<ul>',
				afterFeeds: '</ul>',
				dateFormat: 'yyyy.mm.dd',
				categorySeparator: ', ',
				nocache: false,
				pathToFeeder: '/app',
				titleLength: 20,
				contentLength: 80
			};
		}
	});

	$.fn.jFeedMixer = function(options) {
		var target = this;
		var config = {};
		var entries = [];
		var loaded = 0;
		var container = null;

		function feedFormat(format, entry) {
			format = format.replace('%link', entry.link);
			format = format.replace('%title', entry.title.substr(0, config.titleLength));
			format = format.replace('%content', entry.content.substr(0, config.contentLength));
			format = format.replace('%date', dateFormat(new Date(entry.pubDate)));
			format = format.replace('%blogTitle', entry.blogTitle);
			format = format.replace('%blogURL', entry.blogURL);
			format = format.replace('%category', categoryFormat(entry.category));

			return format;
		}

		function dateFormat(date) {
			var format = config.dateFormat;

			format = format.replace('yyyy', date.getFullYear());

			var mm = date.getMonth() + 1;
			if(mm < 10) mm = "0" + mm;
			format = format.replace('mm', mm);

			var n = date.getMonth() + 1;
			format = format.replace('n', n);

			var dd = date.getDate();
			if(dd < 10) dd = "0" + dd;
			format = format.replace('dd', dd);

			var j = date.getDate();
			format = format.replace('j', j);

			var H = date.getHours();
			if(H < 10) H = "0" + H;
			format = format.replace('H', H);

			var i = date.getMinutes();
			if(i < 10) i = "0" + i;
			format = format.replace('i', i);

			var s = date.getSeconds();
			if(s < 10) s = "0" + s;
			format = format.replace('s', s);

			return format;
		}

		function categoryFormat(categories) {
			if(Array.isArray(categories)) {
				return categories.join(config.categorySeparator);
			}
			else {
				return categories;
			}
		}

		function compare(a, b) {
			return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
		}

		function afterLoad() {
			$(target).empty();
			entries.sort(compare);
			var limit = config.countLimit <= entries.length ? config.countLimit : entries.length;
			for(var j = 0; j < limit; j++) {
				console.log(j);
				container.append(feedFormat(config.feedFormat, entries[j]));
			}
			container.appendTo(target);
		}

		return this.each(function(){
			config = $.extend({}, $.jFeedMixer.defaults, options);
			container = $(config.beforeFeeds + config.afterFeeds);

			if(config.feedFormat.search(/.jfm.html$/) >= 0) {
				$.ajax({
					type: 'GET',
					url: config.feedFormat,
					success: function(data, dataType) {
						config.feedFormat = data;
					}
				});
			}

			$.each(config.feeds, function(i, url) {
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: config.pathToFeeder + '/feeder.php?url=' + url,
					success: function(json) {
						var feed = json.channel;
						if(Array.isArray(feed.item)) {
							$.each(feed.item, function(i, entry) {
								if(i >= config.countPerFeed) {
									return;
								}
								entry.blogTitle = feed.title;
								entry.blogURL = feed.link;
								if(feed.image) {
									entry.imgSrc = feed.image.url;
									entry.imgTitle = feed.image.title;
									entry.imgLink = feed.image.link;
								}
								entries.push(entry);
							});
						}
						else {
							var entry = feed.item;
							entry.blogTitle = feed.item.title;
							entry.blogURL = feed.item.link;
							if(feed.image) {
								entry.imgSrc = feed.image.url;
								entry.imgTitle = feed.image.title;
								entry.imgLink = feed.image.link;
							}
							entries.push(entry);
						}
						loaded++;
						if(config.feeds.length == loaded) {
							afterLoad();
						}
					}
				});
			});
		});
	};
})(jQuery);
