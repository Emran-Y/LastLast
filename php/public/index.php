<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if(isset($_GET['keyword'])) {
    $keyword = $_GET['keyword'];
    
    // Fetch data from the API
    $url = "https://jsonplaceholder.typicode.com/comments?postId=3";
    $response = file_get_contents($url);
    $comments = json_decode($response, true);

    // Filter comments by keyword
    $filteredComments = array_filter($comments, function ($comment) use ($keyword) {
        return stripos($comment['name'], $keyword) !== false;
    });

    // Return filtered results
    echo json_encode(array_values($filteredComments));
}
