"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []
      // Dataset search page steps
      if (this.options.controller == 'package') {
        steps = this.search_results_steps;
        this.intro.setOption('doneLabel', 'Search').oncomplete(function() {
          window.location.href = '/dataset?q=salary';
        });
      }
      this.intro.setOptions({
        steps: steps,
        showBullets: false,
        showStepNumbers: false,
      });
      this.intro.onchange(this._onchange);
      this._initDemo(steps);
    },

    _onchange: function(targetElement) {
      // If we're on the search step, pre-fill the input
      if ($(targetElement).hasClass('search-input')) {
        $(targetElement).find('input.search').val('salary');
      };
    },

    _initDemo: function(steps) {
      // If the query string is set to start the tour... start it.
      if (RegExp('tour', 'gi').test(window.location.search)) {
        this.intro.start();
      }
      // Add Continue Tour link for package search
      var continue_link = $('<li class="account-link"><a href="/dataset?tour">Continue Tour</a></li>');
      continue_link.insertAfter(this.el.parent());
    },

    // Intro steps for the home page.
    search_results_steps: [
      {
        element: $('.filters')[0],
        intro: "<h3>Data Discovery</h3>CKAN organizes data by Organizations, Groups, Tags, Formats etc. to aid data discovery.",
        position: 'right'
      },
      {
        element: $('.filters')[0],
        intro: "<h3>Data Discovery</h3>CKAN’s faceted search categories make it easy to discover data.",
        position: 'right'
      },
      {
        element: $('.filters .module')[3],
        intro: "<h3>Data Discovery</h3>It is also helpful if you are looking for data in a particular format.",
        position: 'right'
      },
      {
        element: $('.search-input')[0],
        intro: "<h3>Search</h3>Search is one of CKAN’s strongest capabilities and it’s easy to find what you need.<br /><br />For example, let’s search for “salary” datasets."
      }
    ]
  };
});
