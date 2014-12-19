"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []
      // Index page steps
      if (this.options.controller == 'home') {
        steps = this.home_steps;
        this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
          window.location.href = '/dataset?tour';
        });
      }
      this.intro.setOptions({
        steps: steps,
        showBullets: false,
        showStepNumbers: false
      });
      this.intro.onchange(this._onchange);
      this._initDemo(steps);
    },

    _onchange: function(targetElement) {
      // If we're on the search step, pre-fill the input
      if (targetElement.id == 'index_search') {
        $(targetElement).find('input#field-sitewide-search').val('CCTV');
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
        intro: "<h3>Welcome to the Tour</h3>This demonstration will guide you through CKAN’s powerful features and show you how to get the most out of data.",
        position: 'right'
      },
      {
        element: $('.box-list .data a')[0],
        intro: "<h3>Dataset Discovery</h3>Let's start by browsing the CKAN data hub and discovering some datasets."
      }
    ]
  };
});
