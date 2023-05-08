document.addEventListener("DOMContentLoaded", function () {
	document.querySelector(".slideshow-container");
	const slideshowImages = Array.from(document.querySelectorAll(".slideshow-image"));
	const slideshowCaption = document.querySelector(".slideshow-caption");
	let currentImageIndex = 0;
	let slideshowInterval;
	const intervalDuration = 3000;
	
	function showImage(index) {
		slideshowImages.forEach((image, i) => {
			image.style.opacity = i === index ? "1" : "0";
		});
		
		slideshowCaption.textContent = slideshowImages[index].getAttribute("alt");
	}
	
	function showNextImage() {
		currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
		showImage(currentImageIndex);
	}
	
	function showPreviousImage() {
		currentImageIndex = (currentImageIndex - 1 + slideshowImages.length) % slideshowImages.length;
		showImage(currentImageIndex);
	}
	
	function startSlideshow() {
		slideshowInterval = setInterval(showNextImage, intervalDuration);
	}
	
	function stopSlideshow() {
		clearInterval(slideshowInterval);
	}
	
	document.querySelector(".slideshow-controls .next").addEventListener("click", function () {
		stopSlideshow();
		showNextImage();
		startSlideshow();
	});
	
	document.querySelector(".slideshow-controls .prev").addEventListener("click", function () {
		stopSlideshow();
		showPreviousImage();
		startSlideshow();
	});
	
	showImage(currentImageIndex);
	startSlideshow();
});