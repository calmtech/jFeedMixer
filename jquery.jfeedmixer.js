/**
 * jFeexMixer - jQuery plugin to embed the multifeed in your website via Google Feed API.
 * @requires jQuery v1.4.2 or above
 *
 * http://www.calmtech.net/jFeedMixer
 *
 * Copyright (c) 2010 Masaya Kogawa (CalmTech)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 * Note: Requires jquery 1.4.2 or above
 */
(function($) { 
	$.extend({
		jFeedMixer: new function() {
			this.defaults = {
				feeds: new Array(),
				countPerFeed: 5,
				feedFormat: '<a href="%link">%title(%date)[%blogTitle]</a>',
				dateFormat: 'yyyy.mm.dd',
			};
		}
	});
	
	$.fn.jFeedMixer = function(options) {
		var target = this;
		var config = {};
		var entries = [];
		var loaded = 0;
		
		function feedFormat(format, entry) {
			format = format.replace('%link', entry.link);
			format = format.replace('%title', entry.title);
			format = format.replace('%date', dateFormat(config.dateFormat, new Date(entry.publishedDate)));
			format = format.replace('%blogTitle', entry.blogTitle);
			format = format.replace('%blogURL', entry.blogURL);
			
			return format;
		}
		
		function dateFormat(format, date) {
			format = format.replace('yyyy', date.getFullYear());
			
			mm = date.getMonth() + 1;
			if(mm < 10) mm = "0" + mm;
			format = format.replace('mm', mm);
			
			dd = date.getDate();
			if(dd < 10) dd = "0" + dd;
			format = format.replace('dd', dd);
			
			H = date.getHours();
			if(H < 10) H = "0" + H;
			format = format.replace('H', H);
			
			i = date.getMinutes();
			if(i < 10) i = "0" + i;
			format = format.replace('i', i);
			
			s = date.getSeconds();
			if(s < 10) s = "0" + s;
			format = format.replace('s', s);
			
			return format;
		}
		
		function compare(a, b) {
			return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
		}
		
		function afterLoad() {
			if(config.feeds.length == loaded) {
				$.each(entries.sort(compare), function(i, entry) {
					target.append('<li>' + feedFormat(config.feedFormat, entry) + '</li>');
				});
			}
		}
		
		return this.each(function(){
			config = $.extend({}, $.jFeedMixer.defaults, options);
			target.append('<ul></ul>');
			target = target.children('ul');
			$.each(config.feeds, function(i, url) {
				var gfeed = new google.feeds.Feed(url);
				gfeed.setNumEntries(config.countPerFeed);
				gfeed.load(function(result) {
					if(!result.error) {
						var feed = result.feed;
						$.each(feed.entries, function(i, entry) {
							entry.blogTitle = feed.title;
							entry.blogURL = feed.link;
							entries.push(entry);
						});
						loaded++;
						afterLoad();
					}
				});
			});
		});
	}

})(jQuery);
