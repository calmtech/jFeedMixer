<?php
/**
* Simple script to get and convert RSS Feed.
*
* @copyright  Copyright (c) 2010 Masaya Kogawa (CalmTech)
* @license    MIT License
* @version    1.0
*/

date_default_timezone_set('Asia/Tokyo');
$url = $_GET['url'];
$data = file_get_contents(rawurldecode($url));
$data = str_replace('content:encoded', 'content', $data);
$data = str_replace('dc:creator', 'author', $data);
$data = str_replace('dc:date', 'pubDate', $data);
$feed = simplexml_load_string($data, 'SimpleXMLElement', LIBXML_NOCDATA);
$feed = json_decode(json_encode($feed));
echo json_encode($feed);
?>
