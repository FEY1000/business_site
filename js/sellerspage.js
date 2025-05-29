$(document).ready(function (){
    $.ajax({
        url: 'http://localhost:8787/api/products',
        method: 'GET',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            if (data && data.length > 0) {
                data.forEach(function(product) {
                    $('.fourth').append(`
                        <div class="new-items">
                            <img style="object-fit: cover;" src="${product.image}">
                            <div class="product-name">${product.name}</div>
                            <p class="pro-des">${product.description}</p>
                            <div class="pricee">N${product.price}</div>
                            <div class="buyy">Buy</div>
                        </div>
                    `);
                });
            } else {
                $('.fourth').html(`
                    <div style="text-align: center; padding: 20px;">
                        <p>No products found</p>
                        <a href="upload-product.html" style="color: blue; text-decoration: underline;">Click here to upload products</a>
                    </div>
                `);
            }
        },
        error: function(xhr) {
            if (xhr.status === 403) {
                window.location.href = "login-page-imp.html" 
                return 
            }
            if(xhr.status === 400) {
               $('.fourth').html(`
                <div style="text-align: center; padding: 20px;">
                    <p>Unable to load products</p>
                    <a href="upload-product.html" style="color: blue; text-decoration: underline;">Click here to upload products</a>
                </div>
            `);  
            }
            
        }
    });
});