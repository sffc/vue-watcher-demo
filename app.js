"use strict";

// Vue is included in index.html

// Shim for Vue.get() if it is not installed
if (!Vue.get) {
	console.error("Using polyfill for Vue.get()");
	Vue.get = function(obj, key, defaultValue) {
		if (!obj.hasOwnProperty(key)) {
			Vue.set(obj, key, defaultValue);
		}
		return obj[key];
	};
}

const ALL_FILE_NAMES = ["img_600x600_1x8bit_T01L01_GRAY_almonds.png", "img_600x600_1x8bit_T01L01_GRAY_apples.png", "img_600x600_1x8bit_T01L01_GRAY_baloons.png", "img_600x600_1x8bit_T01L01_GRAY_bananas.png", "img_600x600_1x8bit_T01L01_GRAY_billiard_balls_a.png", "img_600x600_1x8bit_T01L01_GRAY_billiard_balls_b.png", "img_600x600_1x8bit_T01L01_GRAY_building.png", "img_600x600_1x8bit_T01L01_GRAY_cards_a.png", "img_600x600_1x8bit_T01L01_GRAY_cards_b.png", "img_600x600_1x8bit_T01L01_GRAY_carrots.png", "img_600x600_1x8bit_T01L01_GRAY_chairs.png", "img_600x600_1x8bit_T01L01_GRAY_clips.png", "img_600x600_1x8bit_T01L01_GRAY_coins.png", "img_600x600_1x8bit_T01L01_GRAY_cushions.png", "img_600x600_1x8bit_T01L01_GRAY_ducks.png", "img_600x600_1x8bit_T01L01_GRAY_fence.png", "img_600x600_1x8bit_T01L01_GRAY_flowers.png", "img_600x600_1x8bit_T01L01_GRAY_garden_table.png", "img_600x600_1x8bit_T01L01_GRAY_guitar_bridge.png", "img_600x600_1x8bit_T01L01_GRAY_guitar_fret.png", "img_600x600_1x8bit_T01L01_GRAY_guitar_head.png", "img_600x600_1x8bit_T01L01_GRAY_keyboard_a.png", "img_600x600_1x8bit_T01L01_GRAY_keyboard_b.png", "img_600x600_1x8bit_T01L01_GRAY_lion.png", "img_600x600_1x8bit_T01L01_GRAY_multimeter.png", "img_600x600_1x8bit_T01L01_GRAY_pencils_a.png", "img_600x600_1x8bit_T01L01_GRAY_pencils_b.png", "img_600x600_1x8bit_T01L01_GRAY_pillar.png", "img_600x600_1x8bit_T01L01_GRAY_plastic.png", "img_600x600_1x8bit_T01L01_GRAY_roof.png", "img_600x600_1x8bit_T01L01_GRAY_scarf.png", "img_600x600_1x8bit_T01L01_GRAY_screws.png", "img_600x600_1x8bit_T01L01_GRAY_snails.png", "img_600x600_1x8bit_T01L01_GRAY_socks.png", "img_600x600_1x8bit_T01L01_GRAY_sweets.png", "img_600x600_1x8bit_T01L01_GRAY_tomatoes_a.png", "img_600x600_1x8bit_T01L01_GRAY_tomatoes_b.png", "img_600x600_1x8bit_T01L01_GRAY_tools_a.png", "img_600x600_1x8bit_T01L01_GRAY_tools_b.png", "img_600x600_1x8bit_T01L01_GRAY_wood_game.png"];

const vm = new Vue({
	el: "#app",
	data: {
		inputs: {},
		outputs: {},
		loadNext: 0,
	},
	methods: {
		loadAnother: function() {
			let idx = this.loadNext;
			let name = ALL_FILE_NAMES[idx];
			console.log("loading image:", idx);
			var img = new Image();
			img.src = "images/" + name;
			img.addEventListener("load", () => {
				console.log("image loaded")
				Vue.set(this.inputs, name, img);
			});
			for (let j=0; j<=idx; j++) {
				createNewImagePair(ALL_FILE_NAMES[j], name);
			}
			this.loadNext++;
		}
	}
});

function createNewImagePair(name0, name1) {
	vm.$watch(() => {
		console.log("watcher starting:", new Date().getTime(), name0, name1);
		let img0 = Vue.get(vm.inputs, name0, null);
		let img1 = Vue.get(vm.inputs, name1, null);
		if (img0 == null || img1 == null) {
			console.log("watcher quitting");
			return;
		}

		// Combine the two images side-by-side
		let canv = document.getElementById("canv")
		let context = canv.getContext("2d");
		context.drawImage(img0, 0, 0, 300, 400);
		context.drawImage(img1, 300, 0, 300, 400);
		let result = canv.toDataURL(0, 0, 600, 400);
		// let result = "data:image/png;base64," + btoa(imageData);

		console.log("watcher ending:", new Date().getTime(), name0, name1);
		return result;
	}, (newValue, oldValue) => {
		Vue.set(vm.outputs, name0+"/"+name1, newValue);
	}, { immediate: true });
}
