/**
 * Planter's Home - Product Filter JavaScript
 * Created for Business: Planter's Home
 * Author: Web Developer
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Product filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter products
                filterProducts(filterValue);
            });
        });
        
        // Check if URL has a hash for specific category
        if (window.location.hash) {
            const categoryHash = window.location.hash.substring(1);
            
            // Find the corresponding filter button
            const categoryButton = document.querySelector(`.filter-btn[data-filter="${categoryHash}"]`);
            
            // If filter button exists, trigger click event
            if (categoryButton) {
                categoryButton.click();
                
                // Scroll to the products section
                setTimeout(() => {
                    const productsSection = document.querySelector('.products');
                    if (productsSection) {
                        window.scrollTo({
                            top: productsSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        }
        
        /**
         * Filter products based on category
         * @param {string} category - Category to filter by
         */
        function filterProducts(category) {
            productCards.forEach(card => {
                if (category === 'all') {
                    // Show all products
                    card.style.display = 'block';
                    
                    // Animate products coming into view
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Check if card has the selected category
                    if (card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        
                        // Animate products coming into view
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        // Hide cards that don't match the category
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // Match the transition duration in CSS
                    }
                }
            });
        }
        
        // Initialize product animations
        productCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
    
    // Product Detail View Simulation
    const viewDetailButtons = document.querySelectorAll('.product-card .btn-small');
    
    if (viewDetailButtons.length > 0) {
        viewDetailButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product info
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productImage = productCard.querySelector('img').src;
                
                // Show alert for demo purposes
                // In a real implementation, this would navigate to a product detail page
                alert(`Product: ${productName}\nPrice: ${productPrice}\n\nIn a complete implementation, this would take you to a detailed product page.`);
            });
        });
    }
    
    // Handle URL hash change to support direct category links
    window.addEventListener('hashchange', function() {
        if (window.location.hash) {
            const categoryHash = window.location.hash.substring(1);
            const categoryButton = document.querySelector(`.filter-btn[data-filter="${categoryHash}"]`);
            
            if (categoryButton) {
                categoryButton.click();
            }
        }
    });
});
