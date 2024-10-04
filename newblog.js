// Validation function
function validateForm() {
    // Get the form elements
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var content = document.getElementById("content").value;
    var category = document.getElementById("category").value;
    var image = document.getElementById("image").value;
    var coverImage = document.getElementById("cover-image").value;
  
    // Check that required fields are filled out
    if (title == "" || description == "" || content == "" || category == "" || image == "" || coverImage == "") {
      alert("Please fill out all required fields.");
      return false;
    }
    // Validate email field, if present
  var email = document.getElementById("email");
  if (email) {
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailRegex.test(email.value)) {
      alert("Please enter a valid email address.");
      return false;
    }
  }

    // All fields are valid, submit the form
    return true;
    // Success message
    alert("Thank you for submitting your blog post!");

    // Reset form after submission
    document.getElementById("blogForm").reset();
 
    // Prevent form submission
    return false;
    
}

// Share buttons function
function shareButtons() {
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    document.getElementById("facebook").href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
    document.getElementById("twitter").href = "https://twitter.com/intent/tweet?text=" + title + "&url=" + url;
    document.getElementById("linkedin").href = "https://www.linkedin.com/shareArticle?url=" + url + "&title=" + title;
}

// Save draft function
const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", saveDraft);
function saveDraft() {
    var title = document.forms["blogForm"]["title"].value;
    var description = document.forms["blogForm"]["description"].value;
    var content = document.forms["blogForm"]["content"].value;

    // Check if local storage is supported by the browser
    if (typeof(Storage) !== "undefined") {
        // Save the draft data to local storage
        localStorage.setItem("blogTitle", title);
        localStorage.setItem("blogDescription", description);
        localStorage.setItem("blogContent", content);
        localStorage.setItem("blogCategory", document.forms["blogForm"]["category"].value);
        alert("Blog post draft saved successfully.");
    } else {
        alert("Sorry, your browser does not support local storage.");
    }
}

// Load draft function
function loadDraft() {
    // Check if local storage is supported by the browser
    if (typeof(Storage) !== "undefined") {
        // Load the draft data from local storage and set the form fields
        document.forms["blogForm"]["title"].value = localStorage.getItem("blogTitle");
        document.forms["blogForm"]["description"].value = localStorage.getItem("blogDescription");
        document.forms["blogForm"]["content"].value = localStorage.getItem("blogContent");
        document.forms["blogForm"]["category"].value = localStorage.getItem("blogCategory");
    } else {
        alert("Sorry, your browser does not support local storage.");
    }
}

// Autosave function
function autoSave() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var content = document.getElementById("content").value;

    // Save data to localStorage
    localStorage.setItem("blogTitle", title);
    localStorage.setItem("blogDescription", description);
    localStorage.setItem("blogContent", content);

    // Show autosave message
    var autosaveMessage = document.getElementById("autosave-message");
    autosaveMessage.style.display = "block";
    setTimeout(function() {
        autosaveMessage.style.display = "none";
    }, 5000);
}

// Load autosaved data on page load
window.onload = function() {
    var title = localStorage.getItem("blogTitle");
    var description = localStorage.getItem("blogDescription");
    var content = localStorage.getItem("blogContent");

    if (title && description && content) {
        document.getElementById("title").value = title;
        document.getElementById("description").value = description;
        document.getElementById("content").value = content;
    }
};

// Initialize rich text editor
ClassicEditor.create( document.querySelector( '#content' ) )
.then( editor => {
    console.log( editor );
} )
.catch( error => {
    console.error( error );
} );

// Add event listener to submit button
var submitBtn = document.querySelector('input[type="submit"]');
submitBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    var form = document.forms['blogForm'];
    var formData = new FormData(form);
    // Use Fetch API to submit form data to server-side script
    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        console.log(data);
        alert('Blog post submitted successfully');
        form.reset(); // Reset form fields
    })
    .catch(function(error) {
        console.error(error);
        alert('An error occurred while submitting your blog post');
    });
});

// After the form is successfully submitted, show the success message
document.getElementById("success-message").style.display = "block";
