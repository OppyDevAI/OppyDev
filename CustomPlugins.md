# OppyDev Plugin Creation #

OppyDev allows you to create your own plugins that make use of OppyAgent, the AI agent that powers OppyDev. Use this documentation and the documentation in ActionDefinitionGuide.md to learn how to make your own plugins. Be careful when using plugins from a 3rd party. Plugins are sandboxed but you should still only run plugins from trusted sources.

To start, create an oppydev folder in your project if you don't already have one, then create a plugins folder inside the oppydev folder. You can create a new plugin by creating a .js file or a new folder inside the oppydev/plugins folder. For simple plugins a single file should be enough. If you want to create a very complicated plugin you can use a folder which allows you to split your plugin up into different files. Plugin files in the same folder will share a global context which allows them to share data on the `global` variable.

When debugging a plugin you will be able to output data using the various oppy output strings on the `res` object sent in to your plugins lifecycle functions. You can also use the res object with oppy output strings to send output to the UI during the plugin initialization process. See an example below.
``` javascript
res.oppyResponse = 'Initializing Introduction to Plugin Actions Loaded';
```

You can also use console.log to output strings and objects to the OppyDev logs display.
``` javascript
console.log('Initializing Introduction to Plugin Actions Loaded');
```

There are several examples you can use as a starting point for your own plugins in the OppyDev plugins repository. Check out the `IntroductionToPluginActions.js` file to see an example plugin that demonstrates how to create a new plugin and how to use the different plugin properties and lifecycle functions.