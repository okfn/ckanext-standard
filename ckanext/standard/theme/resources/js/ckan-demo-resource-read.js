"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      this.intro = introJs();
      this.continue_url = '';
      var steps = []

      if (this.options.controller == 'package') {
        // resource read page
        if (this.options.resource == 'Organogram') {
          this.continue_url = "?tour";
          steps = this.organogram_steps;
          this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
            window.location.href = "/dataset/gold-prices/resource/b9aae52b-b082-4159-b46f-7bb9c158d013?tour";
          });
        } else if ($.trim(this.options.resource) == 'CSV' && this.options.package == 'gold-prices') {
          this.continue_url = "?tour";
          steps = this.gold_steps;
          this.intro.setOption('doneLabel', 'Next Page').oncomplete(function() {
            window.location.href = "/dataset/earthquake-info/resource/6960cbf6-770f-40b0-9eec-31d4dfc27f08?tour";
          });
        } else if ($.trim(this.options.resource) == 'Earthquake' && this.options.package == 'earthquake-info') {
          this.continue_url = "?tour";
          steps = this.quake_steps;
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
      if (this.continue_url != '') {
        var continue_link = $('<li class="account-link"><a href="' + this.continue_url + '">Continue Tour</a></li>');
        continue_link.insertAfter(this.el.parent());
      }
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
    ],
    gold_steps: [
      {
        element: $('.resource-view')[0],
        intro: "<h3>Previews &amp; visualization</h3>CKAN has automatically produced a graph for the gold price data.",
        position: 'top'
      },
      {
        intro: "<h3>Previews &amp; visualization</h3>CKAN also previews geospatial data and will automatically provide a visualization on a map.<br><br>Let’s view earthquake data."
      }
    ],
    quake_steps: [
      {
        element: $('.resource-view')[0],
        intro:"<h3>Previews &amp; visualization</h3>CKAN is now previewing the location data for earthquakes on a world map. You may access more data by clicking on the pins.",
        position: 'top'
      },
      {
        intro: "<h3>See what you can do with Data</h3>This now completes our data explorer tour, please feel free to explore the site for yourself!"
      }
    ]
  };
});
