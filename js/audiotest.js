// hi
// have fun reading my terrible terrible programming !! 
// i dont use javascript very often

// i think the last time i did anything seriously with javascript was 4 years ago

let cur_song = new Audio();

playSound("audio/vistalogon.mp3", 40);

// plays the audio of the given file-path
function playSound(path="", volume=100) {
	// if not string input, stop function early and return error
	if (typeof path !== 'string') {
		console.error(`${path} is a ${typeof path}, not a string`);
		return;
	}
	console.log(`playing sound "${path}" at ${volume}% volume`);
	// construct sound with data
	var sound = new Audio();
	sound.src = path;
	sound.volume = (volume/100);
	// set event to play when fully loaded
	sound.onloadeddata = sound.play(); 
}

// plays the audio of the given file-path with song specific function
// uses pre-defined variable for audio, so it can be messed with outside of this function
function playSong(path="", loop=false, volume=100) {
	// if not string input, stop function early and return error
	if (typeof path !== 'string') {
		console.error(`${path} is a ${typeof path}, not a string`);
		return;
	}
	console.log(`playing song "${path}" at ${volume}% volume`);
	// populate cur_song with new data
	cur_song.src = path;
	cur_song.loop = loop;
	cur_song.volume = (volume/100);
	cur_song.load();
	// set event to play when fully loaded
	cur_song.onloadeddata = cur_song.play(); 
}