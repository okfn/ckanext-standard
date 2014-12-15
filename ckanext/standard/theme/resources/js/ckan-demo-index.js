"use strict";

ckan.module('demo_tour', function($, _) {
  return {
    initialize: function() {
      var steps = []
      if (this.options.controller == 'home') {
        steps = this.home_steps;
      }
      this.intro = introJs();
      this.intro.setOptions({
        steps: steps
      });

      this._initDemo(steps);
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
        intro: "Welcome to the Tour!"
      },
      {
        element: $('.site-search .search-input')[0],
        intro: "Type a thing and do a search!"
      }
    ]
  };
});
