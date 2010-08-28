(function() {  
	jQuery.fn.jfeedmixer = function(config){
		var entries = new Array();
		jQuery.each(config.feeds, function(url)) {
			var feed = new google.feeds.Feed(url);
			feed.load(function(result)) {
				jQuery.each(feed.entries, function(i, entry)) {
					feed.entries[i].blogTitle = feed.title;
					feed.entries[i].blogUrl = feed.link;
				}
			}
		}
	}
})(jQuery);
