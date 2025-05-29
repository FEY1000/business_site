$(document).ready(function() {
    // Toggle categories dropdown
    $(".toggle-category").click(function() {
        $("#category-options").slideToggle();
        
        // Toggle icon rotation
        const icon = $("#category-icon");
        if (icon.hasClass("fa-angle-down")) {
            icon.removeClass("fa-angle-down").addClass("fa-angle-up");
        } else {
            icon.removeClass("fa-angle-up").addClass("fa-angle-down");
        }
    });
    
    // Close dropdown when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.selest-catt, #category-options').length) {
            $("#category-options").slideUp();
            $("#category-icon").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
    });
});



