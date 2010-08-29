(function() { 
	jQuery.extend({
		jFeedMixer: new function() {
			this.defaults = {
				feeds: new Array(),
				count: 10,
				templates: '<li><a href="%link%">%title%(%date%)</a></li>'
			};
			
			this.construct = function(settings) {
				target = this;
				return this.each(function(elm){
					var config = jQuery.extend({}, jQuery.jFeedMixer.defaults, settings);
					var entries = new Array();
					jQuery.each(config.feeds, function(i, url) {
						new google.feeds.Feed(url).load(function(result) {
							var feed = result.feed;
//							console.log(feed);
							jQuery.each(feed.entries, function(i, entry) {
//								console.log(entry);
								feed.entries[i].blogTitle = feed.title;
								feed.entries[i].blogUrl = feed.link;
								entries.push(entry);
								target.append(entry.title);
							});
						});
					});
				});
			}
		}
	});
	jQuery.fn.extend({
		jFeedMixer: jQuery.jFeedMixer.construct
	});
//	
//	
//	
//	jQuery.fn.jfeedmixer = function(config){
//		var entries = new Array();
//		jQuery.each(config.feeds, function(i, url) {
//			new google.feeds.Feed(url).load(function(result) {
//				var feed = result.feed;
//				console.log(feed);
//				jQuery.each(feed.entries, function(i, entry) {
//					console.log(entry);
//					feed.entries[i].blogTitle = feed.title;
//					feed.entries[i].blogUrl = feed.link;
//					entries.push(entry);
//				});
//			});
//		});
//		
//		return this.each(function(){
//			if(entries.length > 0) {
//				jQuery.each(entries, function(i, entry) {
//					jQuery(this).append(entry.content);
//				});
//			}
//		});
//	}
})(jQuery);
