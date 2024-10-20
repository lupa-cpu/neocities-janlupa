document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.querySelector(".sandwich");
    const images = ["img/csammy.gif",
    "img/wrap.gif",
    "img/chickenegg.gif",
    				"img/souvlaki.gif",
    				"img/dude.gif",
    				"img/sammy.gif"]; // Links to the images
    let currentImageIndex = 0;

    imageContainer.addEventListener("mouseenter", function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        imageContainer.src = images[currentImageIndex];
    });
});
