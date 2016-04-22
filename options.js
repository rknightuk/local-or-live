function save_options() {
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

function restore_options() {
	chrome.storage.sync.get({
		local_sites: '',
		live_sites: '',
		local_colour: '#26A65B',
		live_colour: '#EC644B'
	}, function(items) {
		document.getElementById('local_sites').value = items.local_sites;
		document.getElementById('live_sites').value = items.live_sites;
		document.getElementById('local_colour').value = items.local_colour;
		document.getElementById('live_colour').value = items.live_colour;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
