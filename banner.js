/* global chrome */

function Banner(bannerId) {

    this.bannerId = bannerId;

    this.update();
    this.listen();
}

Banner.prototype.add = function (colour) {
    var bar = document.createElement("div");
    bar.id = this.bannerId;
    bar.style.zIndex = '99999';
    bar.style.height = 5 + "px";
    bar.style.position = 'fixed';
    bar.style.top = '0';
    bar.style.left = '0';
    bar.style.right = '0';
    bar.style.background = colour;
    document.body.appendChild(bar);
};

Banner.prototype.remove = function () {
    var bar = document.getElementById(this.bannerId);
    if (bar) {
        bar.parentNode.removeChild(bar);
    }
};

Banner.prototype.update = function () {
    var self = this;

    self.remove();

    chrome.storage.sync.get({
        local_sites: [],
        live_sites: [],
        local_colour: '#26A65B',
        live_colour: '#EC644B'
    }, function (items) {
        var origin = window.location.origin;
        var hostname = window.location.hostname;

        if (items.local_sites !== null) {
            var local = items.local_sites.split("\n");
            if (local.indexOf(origin) != -1 || local.indexOf(hostname) != -1) {
                self.add(items.local_colour);
            }
        }

        if (items.live_sites !== null) {
            var live = items.live_sites.split("\n");

            if (live.indexOf(origin) != -1 || live.indexOf(hostname) != -1) {
                self.add(items.live_colour);
            }
        }
    });
};

Banner.prototype.listen = function () {
    var self = this;
    chrome.runtime.onMessage.addListener(function (request) {
        if (request.event == "sites:updated") {
            self.update();
        }
    });
};

new Banner('local-or-live-warning-bar');
