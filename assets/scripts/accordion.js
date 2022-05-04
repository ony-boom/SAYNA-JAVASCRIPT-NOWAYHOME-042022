const spidermansImages = document.querySelectorAll(".image-accordion");

for (let i = 0; i < spidermansImages.length; i++) {
	spidermansImages[i].addEventListener("mouseover", function() {
		this.classList.add("active");
		const panel = this.nextElementSibling;
		panel.style.display = "block";
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
	
	spidermansImages[i].addEventListener("mouseleave", function() {
		this.classList.remove("active");
		const panel = this.nextElementSibling;
		setTimeout(() => {
			panel.style.display = "none";
		}, 150);
		
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}