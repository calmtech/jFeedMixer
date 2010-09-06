jFeedMixer 利用ガイド

jFeedMixerは複数のRSSフィードを統合し、時系列に並べ替えたものを
ウェブサイト上に埋め込んで表示することができる、jQueryプラグインです。

[バージョン]
0.2.0

[動作環境]
jQuery 1.4.2 で動作確認を行っています。
Google AJAX Feed API を利用するので、AJAX APIキーの
取得が前提となります。
対応するフィード形式はGoogle AJAX Feed API に準拠します。

[導入方法]
任意のHTMLファイルに以下の記述を追加してください。

<html>
<head>
...
<script type="text/javascript" src="http://www.google.com/jsapi?key=your_api_key"></script>
<script type="text/javascript">
  google.load("feeds", "1");
  google.load("jquery", "1.4.2");
</script>
<script type="text/javascript" src="path/to/jquery.jfeedmixer.js"></script>
<script type="text/javascript">
$(function() {
	$('#feeds').jFeedMixer({
		feeds: [
		        'http://www.foo.com/feed/',
		        'http://bar.net/atom.xml'
		],
		countPerFeed: 5,
		countLimit: 10,
		feedFormat: 'http://your.site.com/feed.jfm.html',
		beforeFeeds: '<dl>',
		afterFeeds: '</dl>',
		dateFormat: 'yyyy-mm-dd',
		categorySeparator: ' | '
	});
});
</script>
</head>
<body>
<div id="feeds">
</div>
</body>
</html>
[表示結果]
jFeexMixerによる表示結果は、上記サンプルの場合、以下のようになります。
<div id="feeds">
<dl>
<dt>
	<a href="http://link.to.feed">ここにタイトルが表示されます</a>
	<span class="author"><a href="http://link.to.blog">ブログ名</a></span>
</dt>
<dd>
	<span class="published">2010.08.30</span>
	<span class="categories">カテゴリ1 | カテゴリ2</span>
</dd>
...
</dl>
</div>

[表示オプション]
オプションで以下を指定できます。

feeds: ['feed URL', '...'] 必須
複数のフィードURLを指定できます。RSS、Atomなどが表示されるURLを指定してください。

countPerFeed: 数値 オプション(デフォルト: 5)
1フィードURLあたり取得するフィード数です。例えば、「5」と指定して、feedsに2つのURLを
指定した場合は10件のフィードが表示されることになります。

countLimit: 数値 オプション(デフォルト: 10)
表示フィードの最大件数を指定します。countPerFeedと併用でき、feedsに2つのURLを指定し、
countPerFeedを10と指定した場合、全体の件数は20件ですが、このオプションを指定すると、
上位10件が表示されます。

feedFormat: 'http://your.site.com/js/feed.jfm.html' オプション
デフォルト: 
<a href="%link">%title【%blogTitle】(%date)[%category]</a>

フィード表示のフォーマットを指定できます。「.jfm.html」を含むファイル名を指定した場合、
ファイル中で指定したテンプレートを利用して結果を出力します。
サンプルファイルのテンプレートは以下のようになっています。
各パラメータは以下のとおりです。

<dt>
	<a href="%link">%title</a>
	<span class="author"><a href="%blogURL">%blogTitle</a></span>
</dt>
<dd>
	<span class="published">%date</span>
	<span class="categories">%category</span>
</dd>

使用可能なパラメータは以下のとおりです。
%link: フィードへのリンク(URL)
%title: フィードのタイトル
%date: フィードの投稿日
%blogTitle: フィードを管理するブログのタイトル
%blogURL: フィードを管理するブログのURL
%category: フィードのカテゴリ

beforeFeeds: '<dl>' オプション(デフォルト: <ul>)
feedFormatオプションで指定した出力結果全体の「前」に付加される文字列を指定できます。

afterFeeds: '</dl>' オプション(デフォルト: </ul>)
feedFormatオプションで指定した出力結果全体の「後」に付加される文字列を指定できます。

dateFormat: 'yyyy.mm.dd' オプション
フィードの投稿日を表示する際のフォーマットを指定できます。
yyyy: 西暦
mm: 月(1桁の場合はゼロパディング)
dd: 日(1桁の場合はゼロパディング)
H: 時
i: 分
s: 秒

categorySeparator: ' | ' オプション(デフォルト: ', ')
カテゴリ表示の区切り文字を指定します。

--
jFeedMixerはGPL、MITライセンスのもと作成されています。
http://www.calmtech.net
info@calmtech.net

[リリースノート]
2010.08.30 jFeedMixerを公開
2010.08.31 カテゴリ表示、表示の最大件数オプションを追加
2010.09.07 テンプレート指定、前後に任意テキスト表示のオプションを追加