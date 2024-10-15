function getUserProfile(e) {
    e.preventDefault(); // Prevent default form submission
  
    // Get username from the input field
    const username = document.getElementById("username").value.trim(); // Trim leading/trailing whitespace
  
    // Check if username is empty
    if (!username) {
      console.error("Please enter a username.");
      return; // Exit the function if no username
    }
  
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Success
          const user = JSON.parse(xhr.responseText);
          displayUserProfile(user); // Call a separate function to handle displaying user profile
        } else if (xhr.status === 404) {
          // User not found
          console.error("User not found.");
          // Optionally display an error message to the user
        } else {
          // Other errors
          console.error("Error fetching user profile:", xhr.statusText);
          // Optionally display a generic error message to the user
        }
      }
    };
  
    // Open the request with the username
    xhr.open("GET", `https://api.github.com/users/${username}`, true);
  
    // Send the request
    xhr.send();
  }
  
  function displayUserProfile(user) {
    const profileContainer = document.getElementById("personProfile"); // Assuming an element with this ID exists
    profileContainer.innerHTML = `
            
              <div class="container git-container mt-5 py-5">
                <div class="row">
                  <div class="col-md-3 justify-content-center text-center">
                    <img src="${user.avatar_url}" alt="${
      user.login
    }'s avatar" class="img-fluid"/>
                                                <h6 class="panel-title mt-4 text-white mb-3">${
                                                  user.login
                                                }</h6>
                                                                  
  
  
                  </div>
                  <div class="col-md-8 mx-3">
                    <span class="label text-white ">Public Repos: ${
                      user.public_repos
                    }</span>
                    <span class="label span mx-3">Public Gists: ${
                      user.public_gists
                    }</span>
                    <br/><br/>
                    <ul class="text-white">
                      <li class="">Website: ${user.blog || "N/A"} </li>
                      <li class="mx-3">Email: ${user.email || "N/A"} </li> 
                      </ul>                   
                  </div>
                  
                </div>
                                    <a href="${
                                      user.html_url
                                    }" class="btn github-link" target="_blank">Visit Github</a> 
  
              </div>
          `;
  }
  
  document
    .getElementById("userForm")
    .addEventListener("submit", getUserProfile, false);