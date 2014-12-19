"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      this.continue_url = '';
      var steps = []

      if (this.options.controller == 'package') {
        // Dataset search with a query (search conducted)
        if (this.options.query == 'salary') {
          this.continue_url = "/dataset?tour";
          steps = this.search_results_steps;
          this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
            window.location.href = $('.dataset-list .dataset-item .dataset-heading a')[2].href + '?tour';
          });
        // Dataset search page with an empty query (no search)
        } else {
          this.continue_url = "/dataset?tour";
          steps = this.search_page_steps;
          this.intro.setOption('doneLabel', 'Search').oncomplete(function() {
            window.location.href = '/dataset?q=salary&tour';
          });
        }
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
      if (this.continue_link != '') {
        var continue_link = $('<li class="account-link"><a href="' + this.continue_url + '">Continue Tour</a></li>');
        continue_link.insertAfter(this.el.parent());
      }
    },

    // Intro steps for the home page.
    search_page_steps: [
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
        intro: "<h3>Search</h3>Search is one of CKAN’s strongest features, making it easy to find what you need.<br /><br />Let’s search for “salary” datasets."
      }
    ],
    search_results_steps: [
      {
        element: $('.search-form h2')[0],
        intro: "<h3>Search</h3>Our search has returned 5 datasets."
      },
      {
        element: $('.dataset-list .dataset-item')[2],
        intro: "<h3>Search</h3>Let’s take a closer look at the organogram dataset.",
        position: 'top'
      }
    ]
  };
});
