<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data
    $category = $_POST['category'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $content = $_POST['content'];
    
    // Validate form data
    if (empty($category) || empty($title) || empty($description) || empty($content)) {
        echo "Error: All fields are required.";
        exit();
    }
    
    // Process form data (e.g. save to database, send email, etc.)
    
    // Redirect to thank you page
    header("Location: thankyou.html");
    exit();
}
?>
