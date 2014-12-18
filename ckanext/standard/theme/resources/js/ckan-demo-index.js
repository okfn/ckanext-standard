"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []
      // Index page steps
      if (this.options.controller == 'home') {
        steps = this.home_steps;
        this.intro.setOption('doneLabel', 'Search').oncomplete(function() {
          window.location.href = '/dataset?q=Gold+Prices&tour';
        });
        this.intro.setOption('showStepNumbers', false);
      }
      this.intro.setOptions({
        steps: steps
      });
      this.intro.onchange(this._onchange);
      this._initDemo(steps);
    },

    _onchange: function(targetElement) {
      // If we're on the search step, pre-fill the input
      if (targetElement.id == 'index_search') {
        $(targetElement).find('input#field-sitewide-search').val('Gold Prices');
      };
    },

    _initDemo: function(steps) {
      // If the query string is set to start the tour... start it.
      if (RegExp('tour', 'gi').test(window.location.search)) {
        this.intro.start();
      }
      // Intercept click for Start Tour link
      $(this.el).click($.proxy(function(ev) {
        ev.preventDefault();
        this.intro.start();
      }, this));
    },

    // Intro steps for the home page.
    home_steps: [
      {
        intro: "<h3>Welcome to the Tour</h3>This demonstration will guide you through CKAN’s powerful features and show you how to get the most out of data."
      },
      {
        element: $('.site-search .search-input')[0],
        intro: "Type a thing and do a search!"
      }
    ]
  };
});
