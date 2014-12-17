"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []
      // Index page steps
      if (this.options.controller == 'package') {
        steps = this.search_results_steps;
        this.intro.setOption('doneLabel', 'Next page').oncomplete(function() {
          window.location.href = '/dataset/gold-prices';
        });
        this.intro.setOption('showStepNumbers', false);
        this.intro.setOption('showBullets', false);
      }
      this.intro.setOptions({
        steps: steps
      });
      // this.intro.onchange(this._onchange);
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
      // Intercept click for Continue Tour link
      // $(this.el).click($.proxy(function(ev) {
      //   ev.preventDefault();
      //   this.intro.start();
      // }, this));
    },

    // Intro steps for the home page.
    search_results_steps: [
      {
        element: $('li.dataset-item a')[0],
        intro: "Let's checkout Gold Prices!"
      }
    ]
  };
});
