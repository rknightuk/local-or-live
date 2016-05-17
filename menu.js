/* global chrome */

function Menu(localLinkSelector, liveLinkSelector, removeLinkSelector) {

    this.localLinkSelector = localLinkSelector;
    this.liveLinkSelector = liveLinkSelector;
    this.removeLinkSelector = removeLinkSelector;

    this.observeMenu();
}

Menu.prototype.observeMenu = function () {
    var self = this;

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tab = tabs[0];

        var url = document.createElement('a');
        url.href = tab.url;

        self.addOnClickObserver(self.localLinkSelector, self.addLocalSite.bind(self), url.hostname);
        self.addOnClickObserver(self.liveLinkSelector, self.addLiveSite.bind(self), url.hostname);
        self.addOnClickObserver(self.removeLinkSelector, self.removeSite.bind(self), url.hostname);
    });
};

Menu.prototype.addOnClickObserver = function (selector, callback, args) {
    var self = this;

    var links = document.querySelectorAll(selector);
    [].forEach.call(links, function (el) {
        el.addEventListener('click', function (event) {
            event.preventDefault();

            callback(args);
        });
    }, false);
};

Menu.prototype.addLocalSite = function (hostname) {
    var self = this;

    chrome.storage.sync.get({
        local_sites: [],
        live_sites: []
    }, function (items) {
        var live = items.live_sites.split("\n");
        var local = items.local_sites.split("\n");

        if (local.indexOf(hostname) === -1) {
            local.push(hostname);
            self.setLocalSites(local);
        }

        live = live.filter(function (site) {
            return site != hostname;
        });
        self.setLiveSites(live);
    });
};

Menu.prototype.addLiveSite = function (hostname) {
    var self = this;

    chrome.storage.sync.get({
        local_sites: [],
        live_sites: []
    }, function (items) {
        var live = items.live_sites.split("\n");
        var local = items.local_sites.split("\n");

        if (live.indexOf(hostname) === -1) {
            live.push(hostname);
            self.setLiveSites(live);
        }

        local = local.filter(function (site) {
            return site != hostname;
        });
        self.setLocalSites(local);
    });
};

Menu.prototype.removeSite = function (hostname) {
    var self = this;

    chrome.storage.sync.get({
        live_sites: [],
        local_sites: []
    }, function (items) {
        var live = items.live_sites.split("\n");
        var local = items.local_sites.split("\n");

        live = live.filter(function (site) {
            return site != hostname;
        });
        self.setLiveSites(live);

        local = local.filter(function (site) {
            return site != hostname;
        });
        self.setLocalSites(local);
    });
};

Menu.prototype.setLocalSites = function (sites) {
    var self = this;

    chrome.storage.sync.set({
        local_sites: sites.join('\n')
    }, function () {
        self.sendSitesUpdatedMessage();
    });
};

Menu.prototype.setLiveSites = function (sites) {
    var self = this;

    chrome.storage.sync.set({
        live_sites: sites.join('\n')
    }, function () {
        self.sendSitesUpdatedMessage();
    });
};

Menu.prototype.sendSitesUpdatedMessage = function (sites) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {event: ["sites:updated"]}, function (response) {
        });
    });
};
