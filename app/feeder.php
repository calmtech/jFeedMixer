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
$data = file_get_contents($url);
$data = str_replace('content:encoded', 'content', $data);
$data = str_replace('dc:creator', 'author', $data);
$feed = simplexml_load_string($data, 'SimpleXMLElement', LIBXML_NOCDATA);
$feed = json_decode(json_encode($feed));
if(is_array($feed->channel->item)) {
  foreach($feed->channel->item as $i => $item)
  {
    $feed->channel->item[$i]->description = strip_tags($item->description);
    $feed->channel->item[$i]->content = strip_tags($item->content);
  }
}
else {
  $feed->channel->item->description = strip_tags($feed->channel->item->description);
  $feed->channel->item->content = strip_tags($feed->channel->item->content);
}
echo json_encode($feed);
?>
