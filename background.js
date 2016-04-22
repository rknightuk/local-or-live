chrome.storage.sync.get({
	local_sites: [],
	live_sites: [],
	local_colour: '#26A65B',
	live_colour: '#EC644B'
}, function(items) {
	var local = items.local_sites.split("\n");
	var live = items.live_sites.split("\n");
	var origin = window.location.origin;
	var hostname = window.location.hostname;

	if (local.indexOf(origin) != -1 || local.indexOf(hostname) != -1) {
		addBanner(items.local_colour);
	}

	if (live.indexOf(origin) != -1 || live.indexOf(hostname) != -1) {
		addBanner(items.live_colour);
	}

	function addBanner(colour) {
		var bar = document.createElement("div");
		bar.id = "local-or-live-warning-bar";
		bar.style.zIndex = '99999';
		bar.style.height = 5 + "px";
		bar.style.position = 'fixed';
		bar.style.top = '0';
		bar.style.left = '0';
		bar.style.right = '0';
		bar.style.background = colour;
		document.body.appendChild(bar);
	}
});