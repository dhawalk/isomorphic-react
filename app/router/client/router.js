var page = require('page');
var xhr = require('xhr');
var react = require('react');
var EventEmitter = require('events').EventEmitter;
var centralEmitter = require('central-event');

var CommonStore = require('../../components/common/store/common-store.js');

(function () {

    var router = {
        stores: {},
        pages: {},
        eventEmitter: new EventEmitter(),
        addScript: function (src, callback) {
            var s = document.createElement('script');
            s.setAttribute('src', src);
            s.onload = callback;
            document.body.appendChild(s);
        },

        routeHandler: function (ctx, next) {
            this.currentPage = ctx.path.split('/')[1];

            // If path name does not exist, get the JS file containing the page objects
            if (!this.pages[this.currentPage]) {
                var that = this;
                var scriptUrl = window.location.origin + '/js/' + this.currentPage + '.js';

                this.addScript(scriptUrl, function () {
                    // Require the object file and the object's store file
                    that.pages[that.currentPage] = require( '' + that.currentPage + '-init');
                    that.stores[that.currentPage] = require( '' + that.currentPage + '-store').client;
                    
                    // Init the store
                    that.stores[that.currentPage].init(that.eventEmitter);

                    // Update the page
                    that.updatePage();

                });
            }
            else {
                // If the path object already exist, just update the page.
                this.updatePage();
            }
        },

        registerListener: function () {
            // Remove all listeners
            this.eventEmitter.removeAllListeners('update');
            var that = this;
            // Attach a new listener
            this.eventEmitter.on('update', function (res) {
                that.updateView();
            });
        },

        updateStores: function () {
            // Refresh the store data. If data is passed the store sets itself with that data.
            // If no data is passed, API calls are made by store
            centralEmitter.removeAllListeners('clicked');
            CommonStore.attachHandler();
            this.stores[this.currentPage].attachHandler();
            this.stores[this.currentPage].refreshData(window.__data__);
            delete window.__data__;
        },

        updatePage: function () {
            this.registerListener();
            this.updateStores();
            this.updateView();
        },

        updateView: function () {
            var currentStore = this.stores[this.currentPage];
            var currentPageObj = this.pages[this.currentPage];
            currentPageObj.run(currentStore);
        }
    }

    page('/user', function (ctx, next) { router.routeHandler(ctx, next) });
    page('/settings', function (ctx, next) { router.routeHandler(ctx, next) });

    CommonStore.init(window.__c_data__, router.eventEmitter);

})();
page.start();

window.page = page;