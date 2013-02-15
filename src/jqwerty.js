(function () { // Anonymous function to encapsulate, and avoid global scope pollution

  // Test if object is an array even if it is a NodeList ('not an array' type returned by querySelectorAll)
  function isArrayLike(obj) {
    var NodeListType = typeof NodeList !== "undefined" ? NodeList : Array;
    return  obj !== null && (obj instanceof Array || obj instanceof NodeListType);
  }

  // Toggle between two css classes
  function toggle2(element, className1, className2) {
    if (isArrayLike(element)) {
      for (var i = 0; i < element.length; i++) {
        arguments.callee(element[i], className1, className2);
      }
    } else {
      var classList = element.classList;
      (classList.toggle(className1) + classList.toggle(className2)) % 2 || classList.toggle(className1);
    }
  }

  // console.log fallback to alert
  if (typeof console === 'undefined'){
    console = {
      log: function(msg){
        alert(msg);
      }
    }
  }

  // Add toggle2 to Element prototype
  Element.prototype.toggle2 = function (className1, className2) {
    toggle2(this, className1, className2);
  };
  // If available, add toggle2 to NodeList prototype
  if (typeof NodeList !== 'undefined') {
    NodeList.prototype.toggle2 = Element.prototype.toggle2;
  }

  // List of functions to call when window is loaded
  var onDocumentLoadFunctions = [];

  // global variable referring the main polymorphic function of jQwerty
  $ = function (o) {
    switch (typeof o) {
      case 'function': // If o is a function then add to the list of functions to call when window is loaded
        onDocumentLoadFunctions.push(o);
        break;
      case 'string': // If o is a string then apply a selector
        var result = document.querySelectorAll(o);
        return result.length === 1 ? result[0] : result;
      default:
        throw new Error("don't know what to do with : " + o);
    }
  }

  // When window is loaded call all the registered functions
  window.onload = function () {
    for (var i = 0; i < onDocumentLoadFunctions.length; i++) {
      onDocumentLoadFunctions[i]();
    }
  }

})(); // Execute anonymous function