var Cookie = (function() {

  var expireDate = " expires=Sun, 1 Jan 2050 00:00:00 UTC;";

  var obj = {
      includedActors: [],
      includedYears: [],
      includedGenders: [],
      excludedActors: [],
      excludedYears: [],
      excludedGenders: [],
    };
  
  var create = function() {
    var cookieData;
    for(var i = 0; i < Object.keys(obj).length; i++) {
      cookieData = Object.keys(obj)[i] + "=" + obj[Object.keys(obj)[i]].join(",") + ";"
      document.cookie = cookieData + expireDate;
    }
  }

  var changeCookie = function(obj) {
    var mergedObj = {
      includedGenders: unique((obj.includedGenders || []).concat(getCookieObject().includedGenders)).splice(0, 4),
      excludedGenders: unique((obj.excludedGenders || []).concat(getCookieObject().excludedGenders)).splice(0, 4)
    }

    var cookieData;
    for(var i = 0; i < Object.keys(mergedObj).length; i++) {
      cookieData = Object.keys(mergedObj)[i] + "=" + mergedObj[Object.keys(mergedObj)[i]].join(",") + ";"
      document.cookie = cookieData + expireDate;
    }
  }

  var getCookie = function() {
    return document.cookie || ""
  }

  var getCookieObject = function() {
    var cookie = getCookie();
    var obj = {};

    if (cookie) {
      var keyValueList = cookie.split(" ");

      for (var i = 0; i < keyValueList.length; i++) {
        var elem = keyValueList[i];

        var key = elem.split("=")[0];
        var value = elem.split("=")[1];
        
        if (value === ";") {
          value = [];
        } else if(value) {
          value = value.replace(";", "").split(',');
        }
        
        obj[key] = value;
      }
    }
    return obj;
  }

  return {
    create: create,
    changeCookie: changeCookie,
    getCookieObject: getCookieObject
  }
})()