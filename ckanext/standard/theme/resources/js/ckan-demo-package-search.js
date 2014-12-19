"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []
      // Dataset search page steps
      if (this.options.controller == 'package') {
        steps = this.search_results_steps;
        this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
          window.location.href = '/dataset/cctv-cameras-in-birmingham-uk';
        });
      }
      this.intro.setOptions({
        steps: steps,
        showBullets: false,
        showStepNumbers: false,
        scrollToElement: false
      });
      // this.intro.onchange(this._onchange);
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
      // Add Continue Tour link for package search
      var continue_link = $('<li class="account-link"><a href="/dataset?q=CCTV&tour">Continue Tour</a></li>');
      continue_link.insertAfter(this.el.parent());
    },

    // Intro steps for the home page.
    search_results_steps: [
      {
        element: $('.filters')[0],
        intro: "<h3>Data Discovery</h3>CKAN organizes data by Organizations, Groups, Tags, Formats etc. to aid data discovery.",
        position: 'right'
      }
    ]
  };
});
