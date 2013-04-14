/************************************************************
Failsafe function-container
*************************************************************/
;(function($, window, document, undefined) {

  /************************************************************
  Strict Mode
  @see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more
  *************************************************************/
  'use strict';

  /************************************************************
  @description create, read, erase -Cookies
  @see http://www.quirksmode.org/js/cookies.html
  *************************************************************/
  var Cookie = {
    createCookie: function(name,value,days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
      }
      document.cookie = name+"="+value+expires+"; path=/";
    },
    readCookie: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    },
    eraseCookie: function(name) {
      this.createCookie(name,'',-1);
    }
  };

  /************************************************************
  @description 
    data-website-type="" 
    data-breakpoint="" 
    data-msg="" 
  *************************************************************/
  var SwitchToMobile = {
    cacheElements: function() {
      this.$switch_link = $('.switch-link');
    },
    init: function() {
      // cache Elements
      this.cacheElements();

      // setup Defaults
      this.breakpoint     = this.$switch_link.data('breakpoint');
      this.msg            = this.$switch_link.data('msg');
      this.url            = this.$switch_link.attr('href');
      this.viewportWidth  = $(window).width();
      this.website_type   = this.$switch_link.data('website-type');
      this.GET            = this.getGET();

      // set choice (user changes from mobile to desktop)
      if (this.GET.mf_mobile_switch) {
        this.setChoice(this.GET.mf_mobile_switch);
      }

      // get last remembered status
      this.getChoice();

      // bind Events
      this.bindEvents();

      // check for website type
      this.checkWebsiteType();

    },
    bindEvents: function() {
      this.$switch_link.on('click', function(event) {
        event.preventDefault();

        var web_type;
        if (SwitchToMobile.website_type === 'desktop') {
          web_type = 'mobile';
        } else {
          web_type = 'desktop';
        }

        // todo: save current sites choice
        SwitchToMobile.setChoice(web_type);

        // go to mobile website
        window.location = SwitchToMobile.url + '?mf_mobile_switch=' + web_type;
      });
    },
    getGET: function() {
      if(window.location.search) {
        // http://stackoverflow.com/questions/439463/how-to-get-get-and-post-variables-with-jquery
        var qs = document.location.search.split("+").join(" "),
            params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
          params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
      } else {
        return false;
      }
    },
    getChoice: function() {
      var lastchoice = Cookie.readCookie('mf_mobile-switch');

      if(lastchoice) {
        this.choice = lastchoice;
      } else {
        this.choice = undefined;
      }
    },
    setChoice: function(web_type) {
      Cookie.createCookie('mf_mobile-switch', web_type, 999);
    },
    checkWebsiteType: function() {

      if((this.viewportWidth <= this.breakpoint) && (this.choice === undefined) && (this.website_type !== 'mobile')) {

        var choice = confirm(this.msg);

        if(choice) {
          this.setChoice('mobile');
          window.location = this.url;
        } else {
          this.setChoice('desktop');
        }

      } else if ((this.choice === 'mobile') && (this.website_type === 'desktop')) {
          window.location = this.url;
      }
    }
  };

  SwitchToMobile.init();

})(jQuery, window, document);