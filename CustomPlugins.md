# OppyDev Plugin Creation

OppyDev allows you to create and share your own plugins that make use of OppyAgent, the AI agent that powers OppyDev. Use this documentation and the documentation in ActionDefinitionGuide.md to learn how to make your own plugins. Be careful when using plugins from a 3rd party. Plugins are sandboxed but you should still only run plugins from trusted sources.

To start, create an oppydev folder in your project if you don't already have one, then create a plugins folder inside the oppydev folder. You can create a new plugin by creating a .js file or a new folder inside the `oppydev/plugins` folder. If you want to get started quickly I recommend downloading the contents of the https://github.com/OppyDevAI/OppyDev repository into the oppydev folder for your project. You can setup a new oppydev folder with plugins by running the following CLI command in your project folder to download and extract the OppyDev plugins repo.
```sh
wget https://github.com/OppyDevAI/OppyDev/archive/refs/heads/main.zip -O OppyDev-main.zip && unzip OppyDev-main.zip && mv OppyDev-main oppydev && rm OppyDev-main.zip
```
After running the command, you will have a directory named `oppydev` containing the OppyDev project files. This will give you access to all the documentation and some example plugins. Add the documentation as references and then prompt OppyDev to have him create a new plugin for you. All the example plugins in the repository are open source, you are welcome to use them or modify them to fit your needs. For simple plugins a single file should be enough. If you want to create a very complicated plugin you can use a folder which allows you to split your plugin up into different files. Plugin files in the same folder will share a global context which allows them to share data on the `global` variable.

## Getting Started with a Simple Plugin

To get started with defining a simple plugin, follow these steps:

1. **Create a New Plugin File**:
   
   Inside the `oppydev/plugins` folder, create a new JavaScript file, e.g., `MyFirstPlugin.js`.

2. **Define Basic Actions**:

   Actions are the fundamental units of functionality in OppyDev. Here is an example of a simple action definition:
   ```javascript
   actions['my first action:'] = {
     type: 'my first action:', // This is the command that will be used in the prompt box to trigger your action
     name: 'Running My First Action', // This is the text that will be displayed to the user when your action is triggered
     actionID: 'my_first_action', // This is a unique id without spaces or reserved characters that identifies your action
     loader: true,
     workspace: {
       prep: (res, action) => {
         res.oppyResponse = 'Preparing to execute My First Action.';
       },
       read: (res, action) => {
         res.oppyResponse = 'My First Action has been executed.';
       },
       done: (res, action) => {
         res.oppyResponse = 'My First Action is complete.';
       }
     }
   };
   ```
   All actions must be defined on the global actions object. This already exists, it does not need to be created by your plugin. The actions type and key in the global actions object must be the same and should always end with a ':'.

3. **Define Basic Tasks**:
   
   Tasks are groups of actions that can be executed in sequence. Here is an example of a simple task definition:
   ```javascript
   tasks['my first task:'] = {
     type: 'my first task:', // This is the command that will be used in the prompt box to trigger your task
     name: 'Running My First Task', // This is the text that will be displayed to the user when your task is triggered
     sayComplete: true,
     planList: [{type: 'my first action:']
   };
   ```
   All tasks must be defined on the global tasks object. This already exists, it does not need to be created by your plugin. The tasks type and key in the global tasks object must be the same and should always end with a ':'.

Once that is complete use the shortcut ctrl-shift-r to do a soft reload of the app. Your plugin will be initialized when the app loads, you will need to do this every time you make an update to the plugin. You can now run your task and action using OppyDev's prompt box. Enter `my first action:` to run your action. Enter `my first task:` to run your task.

## Debugging Plugins

When debugging a plugin you will be able to output data using the various oppy output strings on the `res` object sent in to your plugins lifecycle functions. You can also use the res object with oppy output strings to send output to the UI during the plugin initialization process. See an example below.
``` javascript
res.oppyResponse = 'Initializing Introduction to Plugin Actions Loaded';
```

You can also use `console.log()` to output strings and objects to the OppyDev logs display. Most things that work in the typical JS console log will display as expected in OppyDev's internal logs when using `console.log()`. If you want to get the most out of OppyDev's log console check out the "Log Fields" section of the OppyDev Usage Guide to learn how you can use JSON formatted logs.
``` javascript
console.log('Initializing Introduction to Plugin Actions Loaded');
```

## Example Plugins

There are several examples you can use as a starting point for your own plugins in the OppyDev plugins repository. Check out the `IntroductionToPluginActions.js` file to see an example plugin that demonstrates how to create a new plugin and how to use the different plugin properties and lifecycle functions.