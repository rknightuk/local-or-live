function save_options() {
	chrome.storage.sync.set({
		local_sites: document.getElementById('local_sites').value,
		live_sites: document.getElementById('live_sites').value,
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
		live_sites: ''
	}, function(items) {
		document.getElementById('local_sites').value = items.local_sites;
		document.getElementById('live_sites').value = items.live_sites;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);