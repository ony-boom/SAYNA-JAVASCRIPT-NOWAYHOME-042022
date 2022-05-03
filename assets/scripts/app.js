const parallaxImage1 = document.getElementById("parallax-image-1");
const parallaxImage2 = document.getElementById("parallax-image-2");
const becomeASpiderManSection = document.getElementById("spiderman");
const topHeader = document.getElementById("header-top");

function isInView(distances) {
	return distances <= window.innerHeight;
}

window.addEventListener("scroll", (event) => {
	const imagesTopDistances = becomeASpiderManSection.getBoundingClientRect().top;
	const headerTopDistances = topHeader.getBoundingClientRect().top;
	
	if (isInView(imagesTopDistances) && !parallaxImage1.classList.contains("opacity-0")) {
		parallaxImage1.classList.add("opacity-0");
		parallaxImage2.classList.remove("opacity-0");
	} else if (imagesTopDistances > window.innerHeight) {
		parallaxImage1.classList.remove("opacity-0");
		parallaxImage2.classList.add("opacity-0");
	}
	
	if (headerTopDistances < -300) {
		topHeader.classList.remove("opacity-0");
	} else {
		parallaxImage1.classList.add("opacity-0");
	}
});