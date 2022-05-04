const jsmediatags = window.jsmediatags;
const audioEl = document.getElementById("audio");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");
const coverEl = document.getElementById("cover");
const playBtn = document.getElementById("play");
const progress = document.querySelector("progress");
const isFavoriteBtn = document.getElementById("is-favorite");

let currentState = "play";
let timer;
let percent = 0;
let isFavorite = false;

function setIsFavorite() {
	isFavorite = !isFavorite;
	outputIsFavorite();
}

function outputIsFavorite() {
	if (isFavorite) {
		isFavoriteBtn.querySelector("i").classList.replace("bi-heart", "bi-heart-fill");
	} else {
		isFavoriteBtn.querySelector("i").classList.replace("bi-heart-fill", "bi-heart");
	}
}

function player(action) {
	switch (action) {
		case "play":
			audioEl.play();
			playBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
			break;
		
		case "pause":
			audioEl.pause();
			playBtn.querySelector("i").classList.replace("fa-pause", "fa-play");
			break;
	}
}

function switchState(current) {
	if (current === "play") {
		currentState = "pause"
	} else {
		currentState = "play";
	}
}

jsmediatags.read(audioEl.src, {
	onSuccess: function (tag) {
		const tags = tag.tags;
		const coverData = tags.picture.data;
		const format = tags.picture.format;
		let base64String = "";
		
		for (const stringData of coverData) {
			base64String += String.fromCharCode(stringData);
		}
		
		// output
		coverEl.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
		titleEl.textContent = tags.title;
		artistEl.textContent = tags.artist;
	}
});

const advance = function (duration, element) {
	progress.max = duration;
	progress.value = ++percent;
	startTimer(duration, element);
}
const startTimer = function (duration, element) {
	if (percent < duration) {
		timer = setTimeout(function () {
			advance(duration, element)
		}, 1000);
	} else {
		element.currentTime = 0;
		percent = element.currentTime;
		progress.value = percent;
		switchState(currentState);
		player(currentState);
	}
}

playBtn.addEventListener("click", () => {
	player(currentState);
	switchState(currentState);
});

audioEl.addEventListener("playing", function (_event) {
	const duration = _event.target.duration;
	advance(duration, audioEl);
});

audioEl.addEventListener("pause", function (_event) {
	clearTimeout(timer);
});

isFavoriteBtn.addEventListener("click", setIsFavorite);
