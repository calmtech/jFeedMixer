google.load("feeds", "1");
function initialize() {
  var feedurl = "http://www.dining-tsubaki.jp/news/feed/"; //rssフィードのurlを指定。wordpressの場合はurl/feed/で取得できる。
  var feed = new google.feeds.Feed(feedurl);
  feed.setNumEntries(4); //フィードの表示数
  feed.load(dispfeed);

  function dispfeed(result){
    if (!result.error){
      var container = document.getElementById("feed");
      var htmlstr = "";

      htmlstr += "<ul>";
      for (var i = 0; i < result.feed.entries.length; i++) { //ループ処理
        var entry = result.feed.entries[i];
	  for (var j = 0; j < entry.categories.length; j++) {
          var categorie = entry.categories[j];
      }
		var eimg = ""; //画像取得（初期値設定）
		var imgCheck = entry.content.match(/(src="http:){1}[\S_-]+((\.png)|(\.jpg)|(\.JPG))/); //該当する拡張子のデータを画像として取得している
		if(imgCheck){
				 eimg += '<img ' + imgCheck[0] + '" width="183" >'; //eimgにはimgタグを挿入するように設定、大きさは100ピクセル

      }

		htmlstr += '<li>'
		var strdate = createDateString(entry.publishedDate);
        htmlstr += '<div class="img-eye">'+ eimg + '</div>';
        htmlstr += '<p class="blog-date">' + strdate + '</p>';
        htmlstr += '<h3 class="entry-title"><a href="' + entry.link + '">' + entry.title.substr(0,16) + '</a></h3>';
        htmlstr += '<p class="blog-naiyo">' + entry.contentSnippet.substring(0,28) + '...</p>';
        htmlstr += '<p class="p-more"><a href="' + entry.link + '">... 続きを見る</a></h3>';
		htmlstr += '</li>'
      }
      htmlstr += "</ul>";

       container.innerHTML = htmlstr;

    }else{
       alert(result.error.code + ":" + result.error.message);
    }
  }
}

function createDateString(publishedDate){
  var pdate = new Date(publishedDate);

  var pday = pdate.getDate();
  var pmonth = pdate.getMonth() + 1;
  var pyear = pdate.getFullYear();
  var phour = pdate.getHours();
  var pminute = pdate.getMinutes();
  var psecond = pdate.getSeconds();
  var strdate = pyear + "." + pmonth + "." + pday ;

  return strdate;
}
google.setOnLoadCallback(initialize);
