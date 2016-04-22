var localDefault = '#26A65B',
	liveDefault = '#EC644B';

function saveOptions() {
	chrome.storage.sync.set({
		local_sites: document.getElementById('local_sites').value,
		live_sites: document.getElementById('live_sites').value,
		local_colour: document.getElementById('local_colour').value,
		live_colour: document.getElementById('live_colour').value
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 1500);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		local_sites: '',
		live_sites: '',
		local_colour: localDefault,
		live_colour: liveDefault
	}, function(items) {
		document.getElementById('local_sites').value = items.local_sites;
		document.getElementById('live_sites').value = items.live_sites;
		document.getElementById('local_colour').value = items.local_colour;
		document.getElementById('live_colour').value = items.live_colour;
	});
}

function resetLocal() { document.getElementById('local_colour').value = localDefault; }
function resetLive() { document.getElementById('live_colour').value = liveDefault; }

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset_local').addEventListener('click', resetLocal);
document.getElementById('reset_live').addEventListener('click', resetLive);