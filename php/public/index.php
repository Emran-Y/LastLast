<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if(isset($_GET['keyword'])) {
    $keyword = $_GET['keyword'];
    
    // Fetch data from the API
    $url = "https://jsonplaceholder.typicode.com/comments?postId=3";
    $response = file_get_contents($url);

    if ($response !== false) {
        // Check if the response is not false (i.e., request successful)
        
        $comments = json_decode($response, true);

        if ($comments !== null) {
            // Check if decoding the JSON was successful
            
            // Filter comments by keyword
            $filteredComments = array_filter($comments, function ($comment) use ($keyword) {
                return stripos($comment['name'], $keyword) !== false;
            });

            // Return filtered results
            echo json_encode(array_values($filteredComments));
        } else {
            // JSON decoding failed
            echo json_encode(array('error' => 'Failed to decode JSON response'));
        }
    } else {
        // Request to API failed
        echo json_encode(array('error' => 'Failed to fetch data from the API'));
    }
}
