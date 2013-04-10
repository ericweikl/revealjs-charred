/**
 * Implements the "Charred Trail" pattern for fragments, see the book
 * "Presentation Patterns" by Neal Ford, Matthew McCullough, and Nate Schutta
 * (http://presentationpatterns.com/).
 *
 * See README.md for more information.
 *
 * Contains significant copy&paste from reveal.js, since there is no way find
 * relationships between fragments :-(
 *
 * MIT Licensed
 * See LICENSE for more information.
 */
(function () {
  var HORIZONTAL_SLIDES_SELECTOR = '.reveal .slides>section',
      VERTICAL_SLIDES_SELECTOR = '.reveal .slides>section.present>section';

  function sortFragments(fragments) {
    var a = Array.prototype.slice.call(fragments);

    a.forEach(function(el, idx) {
      if (!el.hasAttribute('data-fragment-index')) {
        el.setAttribute('data-fragment-index', idx);
      }
    });
    a.sort(function(l, r) {
      return l.getAttribute('data-fragment-index') - r.getAttribute('data-fragment-index');
    });
    return a;
  }

  function getPreviousFragment(qualifier) {
    var selector = VERTICAL_SLIDES_SELECTOR;
    if (document.querySelector(HORIZONTAL_SLIDES_SELECTOR + '.present')) {
      selector = HORIZONTAL_SLIDES_SELECTOR;
    }
    var fragments = sortFragments(document.querySelectorAll(selector + '.present .fragment' + qualifier));
    if (fragments.length) {
      return fragments[fragments.length - 1];
    }
  }

  Reveal.addEventListener('fragmentshown', function(event) {
    var previous = getPreviousFragment('.focus');
    if (previous) {
      previous.classList.remove('focus');
    }
    event.fragment.classList.add('focus');
  });

  Reveal.addEventListener('fragmenthidden', function(event) {
    var previous = getPreviousFragment('.visible:not(.focus)');
    if (previous) {
      previous.classList.add('focus');
    }
    event.fragment.classList.remove('focus');
  });
}());

