// ==UserScript==
// @id             alert-on-portal-selected
// @name           IITC plugin: alert-on-portal-selected
// @category       Debug
// @version        0.0.1.20220000
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/syakesaba/iitc-plugin-alert-helloworld/main/alert-on-portal-selected.js
// @downloadURL    https://raw.githubusercontent.com/syakesaba/iitc-plugin-alert-helloworld/main/alert-on-portal-selected.js
// @description    HelloWorld for you all select portals.
// @author         syakesaba
// @match          https://*.ingress.com/*
// @match          https://*.ingress.com/intel*
// @match          https://*.ingress.com/mission/*
// @include        https://*.ingress.com/*
// @include        https://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'release';
plugin_info.dateTimeVersion = '2022-10-22-180000';
plugin_info.pluginId = 'alert-on-portal-selected';
//END PLUGIN AUTHORS NOTE

// use own namespace for plugin
window.plugin.alertOnPortalSelected = function() {};

//--------------------------SCRIPT BEGIN

window.plugin.alertOnPortalSelected.run = function(event) {
    //Called everytime IntelMap is refreshed and if any portal selected
    //event.selectedPortalGuid
    //event.unselectedPortalGuid
    var portal = window.portals[event.selectedPortalGuid];
    if (portal && portal._map && portal.options.data.title) {
        var title = portal.options.data.title;
        window.alert("Hello " + title);
        console.log(portal);
    }
}

window.plugin.alertOnPortalSelected.main = function() {
    //https://github.com/IITC-CE/ingress-intel-total-conversion/blob/master/core/code/hooks.js
    window.addHook('portalSelected', window.plugin.alertOnPortalSelected.run);
}

var setup = function () {
  window.plugin.alertOnPortalSelected.main();
}

//---------------------------SCRIPT END

setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
