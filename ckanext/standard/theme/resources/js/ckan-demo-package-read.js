"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []

      if (this.options.controller == 'package') {
        // organogram dataset page
        if (this.options.package == 'organogram') {
          this.continue_url = "/dataset/organogram?tour";
          steps = this.organogram_steps;
          this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
            window.location.href = $('.resource-list .resource-item a')[0].href;
          });
        } //else {
        //   steps = this.search_page_steps;
        //   this.intro.setOption('doneLabel', 'Search').oncomplete(function() {
        //     window.location.href = '/dataset?q=salary&tour';
        //   });
        // }
      }
      this.intro.setOptions({
        steps: steps,
        showBullets: false,
        showStepNumbers: false,
      });
      this._initDemo(steps);
    },

    _initDemo: function(steps) {
      // If the query string is set to start the tour... start it.
      if (RegExp('tour', 'gi').test(window.location.search)) {
        this.intro.start();
      }
      // Add Continue Tour link for package search
      var continue_link = $('<li class="account-link"><a href="' + this.continue_url + '">Continue Tour</a></li>');
      continue_link.insertAfter(this.el.parent());
    },

    // Intro steps for the home page.
    organogram_steps: [
      {
        element: $('.module .additional-info')[0],
        intro: "<h3>Dataset Information</h3>Here you’re presented with basic information about the dataset.",
        position: 'top'
      },
      {
        element: $('.resource-list .resource-item')[0],
        intro: "<h3>Dataset Information</h3>Now we’ll look at the resource for this dataset."
      }
    ]
  };
});
