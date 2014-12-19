"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      var steps = []

      if (this.options.controller == 'package') {
        // resource read page
        if (this.options.resource == 'Organogram') {
          this.continue_url = "?tour";
          steps = this.organogram_steps;
          this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
            window.location.href = $('.resource-list .resource-item a')[0].href;
          });
        }
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
      // Add Continue Tour link for resource
      var continue_link = $('<li class="account-link"><a href="' + this.continue_url + '">Continue Tour</a></li>');
      continue_link.insertAfter(this.el.parent());
    },

    // Intro steps for the resource read page.
    organogram_steps: [
      {
        element: $('.module .module-content table')[0],
        intro: "<h3>Dataset Information</h3>CKAN also supports rich meta data about the resource.",
        position: 'top'
      },
      {
        element: $('.actions .btn-primary')[0],
        intro: "<h3>Dataset Information</h3>You may also download/access the resource by selecting the <em>Go to resource</em> button.",
        position: 'left'
      },
      {
        intro: "<h3>Previews &amp; Visualization</h3>CKAN also supports automatic previews or visualization of datasets.<br><br>Let’s look at a preview for gold prices, as an example."
      }
    ]
  };
});
