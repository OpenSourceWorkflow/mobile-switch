mf_mobileSwitch [beta]
======================

This script lets user know that you have a mobile website. It asks them if they would like to go to it and if so it remembers this choice. 

User can switch between mobile and desktop Website.

Usage
-----
Include this link on your desktop website:

```html
<a 
  href="mobile.html" 
  class="switch-link" 
  data-website-type="desktop" 
  data-breakpoint="800" 
  data-msg="Zur mobile Website wechseln?" 
  >go to mobile website</a>
```

Include this link on your mobile website:

```html
<a 
  href="desktop.html" 
  class="switch-link" 
  data-website-type="mobile" 
  data-breakpoint="800" 
  data-msg="Zur mobile Website wechseln?" 
  >go to desktop website</a>
```

Then include the script and let it do the trick for you.

attributes
----------
* *href*: link to your desktop/mobile version of the current page
* *class*: required for events and identification
* *data-website-type*: lets the script know what the website's current type is
* *data-breakpoint*: the script will ask users to go to the mobile website if their browsers width is below this breakpoint
* *data-msg*: The message you would like to use when the script asks users to go to the mobile website

How does it work?
----------------

The script looks for the window.width. If this is below the breakpoint it will ask the user to go to the mobile website. 

The users choice will be stored in a cookie. When the user clicks on one of the links this choice will be updated via GET parameter.

That's it.

Known issues
------------

* this approach may require the mobile user to load the desktop DOM and jQuery before switching to mobile website. It all depends on where the script is loaded. Possible Workaround could be to put this script in the <head>

Roadmap
-------

* I still need to do some testing on different domains
* might add a simple www. to m. switch if the href is identical
* clean up code
