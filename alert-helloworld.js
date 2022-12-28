// ==UserScript==
// @id             alert-helloworld
// @name           IITC plugin: alert-HelloWorld
// @category       Debug
// @version        0.0.1.20220000
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @updateURL      https://raw.githubusercontent.com/syakesaba/iitc-plugin-alert-helloworld/main/alert-helloworld.js
// @downloadURL    https://raw.githubusercontent.com/syakesaba/iitc-plugin-alert-helloworld/main/alert-helloworld.js
// @description    HelloWorld for you all.
// @author         syakesaba
// @match          https://*.ingress.com/intel*
// @match          https://*.ingress.com/mission/*
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
plugin_info.pluginId = 'alert-helloworld';
//END PLUGIN AUTHORS NOTE

// use own namespace for plugin
window.plugin.alertHelloWorld = function() {};

//--------------------------SCRIPT BEGIN

window.plugin.alertHelloWorld.main = function() {
    window.alert("Hello World!");
}

var setup = function () {
  window.plugin.alertHelloWorld.main();
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
