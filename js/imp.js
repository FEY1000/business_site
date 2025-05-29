$(document).ready(function() {
  $("#angle-up").click(function() {
      $(".open-menu").fadeOut(300);
      $("menu").fadeIn(300);
  });
  
  $("#angle-up").click(function () {
    $(".open-menu").fadeOut("slow");
  });
  
  $("#angle-up").click(function () {
    $(".menu").fadeIn("slow");
  });
  
  $("#angle-up").click(function () {
    $(".open-menu").fadeOut("slow");
  });
  
  $("#angle-down").click(function() {
      $("menu").fadeOut(300);
      $(".open-menu").fadeIn(200);
  });

  $(".store-owner").click(function() {
    localStorage.setItem("isSeller", true);
    window.location.href = '../html/sign-up imp.html'
  });

  $(".picc").click(function () {
    $(".hold-users-option").css({                       
      display: "inherit",
    });
    $(".hold-users-option").fadeIn("slow");
  });

  $(" ").click(function () {
    $(" ").fadeOut("slow");
  });

  function showToast(message) {
    const toast = $("#toast");
    toast.text(message);
    toast.addClass("show");
    setTimeout(function() {
      toast.removeClass("show");
    }, 3000);
  }

  // Handle signup form submission
  $("#signup-form").submit(function(event) {
    event.preventDefault();
    const firstName = $("#first-name").val();
    const surname = $("#surname").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirm-password").val();
    const agreeTerms = $("#agree-terms").is(":checked");
    const isSeller = localStorage.getItem("isSeller") === "false";

    if (firstName.length < 5) {
      showToast("First name must be at least 5 characters long!");
      return;
    }

    if (surname.length < 5) {
      showToast("Surname must be at least 5 characters long!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Please enter a valid email address!");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!passwordPattern.test(password)) {
      showToast("Password must be 8-15 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character [@$!%*?&].");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match!");
      return;
    }

    if (!agreeTerms) {
      showToast("You must agree to the terms and conditions!");
      return;
    }

    const signupData = {
      firstName,
      surname,
      email,
      password,
      confirmPassword,
      isSeller,
      isAdmin: false
    };

    $.ajax({
      url: "http://localhost:8787/api/auth/signup",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(signupData),
      success: function(response) {
        showToast(response.message);
        // setTimeout(() => {
        //   window.location.href = "sign-up imp.html";
        // }, 20000); // 20 seconds delay
      },
      error: function(xhr) {
        if (xhr.status === 400) {
          showToast("User already exists or passwords do not match.");
        } else {
          showToast("Error during signup or session creation.");
        }
      }
    });
  });

  // Handle login form submission
  $("#loginForm").submit(function(event) {
    event.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    const isSeller = localStorage.getItem("isSeller") === "true";

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Please enter a valid email address!");
      return;
    }

    // Validate password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-z])(?=.*\d)(?=.*[@$!%*?&][A-Za-z\d@$!%*?&]+$)/;
    if (!password || password.length < 8 || password.length > 15 || !passwordPattern.test(password)) {
      showToast("Password must be 8-15 characters and include lowercase, uppercase, number, and special character!");
      return;
    }

    const loginData = {
      email,
      password,
      isSeller
    };

    $.ajax({
      url: "http://localhost:8787/api/auth/login",
      type: "POST",
      contentType: "application/json",
      xhrFields: {
            withCredentials: true
      },
      data: JSON.stringify(loginData),
      success: function(response) {
        showToast("Login successful!");
        setTimeout(() => {
          if (isSeller) {
            window.location.href = "seller's-page-home.html";
          } else {
            window.location.href = "buyer-page-home.html";
          }
        }, 5000);
      },
      error: function(xhr) {
        if (xhr.status === 401) {
          showToast("Invalid email or password!");
        } else {
          showToast("Error during login. Please try again.");
        }
      }
    });
  });

  // Handle Google OAuth login
  $(".sign-google button").click(function(event) {
    event.preventDefault();
    const isSeller = localStorage.getItem("isSeller") === "false";

    $.ajax({
      url: `http://localhost:8787/api/auth/login/google?isSeller=${isSeller}`,
      type: "GET",
      success: function(response) {
        window.location.href = response.redirect_url;
      },
      error: function(xhr) {
        showToast("Error initiating Google OAuth login.");
      }
    });
  });
  
  // Smooth scroll for navigation
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.hash);
    $('html, body').animate({
        scrollTop: target.offset().top - 80
    }, 500);
});

// Lazy load images
$(function() {
    $('img').attr('loading', 'lazy');
});




$("#scrollContainer").css({
    "overflow-x": "auto",
    "overflow-y": "hidden",
    "white-space": "nowrap",
    "scrollbar-width": "none",          // Firefox
    "-ms-overflow-style": "none"        // Internet Explorer/Edge
  });
  
  // Hide webkit scrollbar (Chrome, Safari, newer versions of Opera)
  $("#scrollContainer::-webkit-scrollbar").css({
    "display": "none"
  });    
});