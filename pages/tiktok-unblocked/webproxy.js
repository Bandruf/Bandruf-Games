/**
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2017 Erik Koopmans
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Callback that receives the proxy response.
 *
 * @callback proxyCallback
 * @param {string} response The response from the proxied resource.
 * @param {Object} info The full response object (including headers, etc).
 */

/**
 * Proxy GET and POST requests through YQL (Yahoo! Query Language).
 *
 * @param {string} url The URL to contact via YQL.
 * @param {proxyCallback} callback The callback function that will receive the
 *    response.
 * @param {Object=} opt An object of optional settings: 'method', 'query',
 *    'data', and 'header'.
 */
 var webproxy = (function() {

    /* ---------- SETTINGS ---------- */
  
    /*** CHANGE THIS URL IF YOU WISH TO HOST THE XML FILE YOURSELF. ***/
    var odtUrl = 'https://raw.githubusercontent.com/Bandruf/webproxyxml/main/webproxy.xml';
  
    // Establish settings.
    var scheme = (document.location.protocol === 'https:' ? 'https:' : 'http:');
    var yqlUrl = scheme + '//query.yahooapis.com/v1/public/yql';
    var headerDelim = String.fromCharCode(0);
  
    /* ---------- MAIN FUNCTION ---------- */
  
    var webproxy = function(url, callback, opts) {
      // Handle default arguments.
      if (!url)       { throw "Webproxy requires a target URL." }
      if (!callback)  { callback = function() {}; }
      if (!opts)      { opts = {}; }
  
      // Handle different opts.header formats (convert all to array).
      switch (objType(opts.header)) {
        case 'undefined':
          break;
        case 'string':
          // Format: 'h1name: h1val'.
          opts.header = [opts.header];
          break;
        case 'array':
          // Format:  ['h1name: h1val', ...] or [['h1name', 'h1val'], ...].
          for (var i=0; i<opts.header.length; i++) {
            if (!isStr(opts.header[i]))
              opts.header[i] = opts.header[i].join(': ');
          }
          break;
        case 'object':
          // Format:  {h1name: 'h1val', ...}.
          opts.header = Object.keys(opts.header).map(function(key) {
            return key + ': ' + opts.header[key];
          });
          break;
        default:
          throw 'Unknown header format.';
      }
  
      // Handle different opts.data formats.
      if (opts.data) {
        // Convert anything non-string into a JSON string and set the header.
        if (!isStr(opts.data)) {
          opts.data = JSON.stringify(opts.data);
          var header = 'Content-Type: application/json';
        } else {
          var header = 'Content-Type: application/x-www-form-urlencoded';
        }
  
        // URL-encode the data; it will be decoded inside of htmlproxy.xml.
        opts.data = encodeURIComponent(opts.data);
  
        // Attach the header (as the first item, so it can be overridden).
        opts.header = opts.header ? [header].concat(opts.header) : [header];
      }
  
      // Combine the header field into a single string, if it exists.
      if (opts.header)  opts.header = opts.header.join(headerDelim);
  
      // Construct the YQL statement.
      var statement = 'use "' + odtUrl + '" as htmlproxy; '
      statement += 'select * from htmlproxy where url="' + url + '"';
      for (var key in opts) {
        statement += ' and ' + key + '="' + opts[key] + '"';
      }
  
      // Create a wrapper function that will return the parsed data to the callback.
      var wrapCallback = function(data) {
        // Results are always the first child of data.query.results (name is inconsistent).
        for (var key in data.query.results) {
          var info = data.query.results[key];
          return callback(info.response, info);
        }
      }
  
      // Issue the YQL request.
      return getJSON(yqlUrl, {q: statement, format: 'json'}, wrapCallback);
    }
  
    /* ---------- UTILS ---------- */
  
    // Determine whether an object is a string.
    var isStr = function(obj) {
      return (typeof obj === 'string' || obj instanceof String);
    }
  
    // Determine the type of a variable/object.
    var objType = function(obj) {
      if (typeof obj === 'undefined')                             return 'undefined';
      else if (typeof obj === 'string' || obj instanceof String)  return 'string';
      else if (typeof obj === 'number' || obj instanceof Number)  return 'number';
      else if (!!obj && obj.constructor === Array)                return 'array';
      else if (obj && obj.nodeType === 1)                         return 'element';
      else if (typeof obj === 'object')                           return 'object';
      else                                                        return 'unknown';
    };
  
    // Helper getJSON function, if jQuery isn't available.
    var getJSON = typeof $ !== 'undefined' ? $.getJSON : function(url, data, success) {
      // Create a simple clone of jQuery $.param.
      var param = function(obj) {
        return Object.keys(obj).map(function(key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
      }
  
      // Attach data as a query string.
      if (data)  url += '?' + param(data);
  
      // Initiate the request.
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
  
      // Handle the loaded request.
      req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
          req.responseJSON = JSON.parse(req.responseText);
          success(req.responseJSON);
        }
      }
  
      // Send the request.
      req.send();
      return req;
    }
  
  
    // Expose the webproxy function.
    return webproxy;
  }());

  
  webproxy("https://www.tiktok.com/foryou?lang=en")