# Action Definition Guide

This guide is designed to help developers understand how to define and structure actions for the OppyDev AI agent. Actions are the fundamental units of functionality that allow users to interact with the system and trigger specific behaviors or responses from the AI. By defining actions, developers can extend the capabilities of the AI agent and create custom workflows tailored to specific use cases. Custom plugins can be used to build powerful and flexible new features that enhance the user experience within the OppyDev environment.

OppyDev come with many pre-existing actions built in which can be used when creating your own plugins. Documentation for existing actions can be found [here](https://github.com/OppyDevAI/OppyDev/blob/main/OppyDevActions.md).

Warning: If using 3rd party plugins be sure to check they are from a trusted source. Plugins are sandboxed but you should still check the code and exercise caution when executing code from an unknown source.

## Action Structure

An action object is a structured representation of a task that can be performed by the AI agent. Here are the key components of an action object:

- `type`: A unique string that identifies the action. This is what users will type or select to trigger the action.
- `name`: A human-readable description of the action. This is displayed in the UI to describe the action to the user.
- `actionID`: A unique identifier for the action, used internally to reference the action.
- `input`: You can set the input that will be used for an action using the input property. Input typically comes from the user, when it is set on an action directly it will be treated as though it was user input. It will be used in place of the original input and added to the chat history.
- `loader`: A boolean indicating whether to show a loading animation while the action is being processed. You may want to use this if your action is making an API call or a function call. If it is not, or if the API is very quick or the reponse will be streamed then leave the loader off.
- `autonomy`: A string value set to 'auto' will run the action automatically. If you want the user to approve the action before it executes remove this parameter or set it to undefined. When autonomy is not set the user will be presented with three buttons. The first will approve and continue the action, the second will skip this specific action and the third, skip all, will end the whole task. The buttons will only show when the action is executed as part of a task, they will not be shown when triggering an action manually by entering its type into the prompt box. 
- `streamer`: Setting this parameter tells the system that the action's response from the LLM will be streamed back to the UI. Normal usage of this parameter for plugins should set the value to 'plugin'.
- `init`: A function that is triggered after all the files in the plugin have been initialized.
- `workspace`: An object containing lifecycle functions that define the action's behavior at various stages of execution within the UI.
- `agent`: An object that can contain custom functions to be executed by the agent, such as `call` and `aftermodel`.

## Defining Workspace Lifecycle Functions

Workspace lifecycle functions are hooks that allow developers to control what happens before, during, and after an action is executed. Use this functions to call third party APIs, prepare the data for use by the AI and give feedback to the user. The following functions can be defined:

- `prep`: Called before the action starts. It can be used to prepare the environment or inform the user about what to expect.
- `skip`: Called if the action is skipped. It allows developers to handle cases where the action is not executed.
- `submit`: Called after the action is submitted. This is where developers can perform tasks such as retrieving data needed for that action or setting up the next steps. This function will not run if the action is skipped.
- `read`: Called when the action is executed and a response has been received. Developers can use this function to process the response and update the UI accordingly. This function will not run if the action is skipped.
- `done`: Called when the action is complete. This is the final hook for cleanup and finalizing the action.

### Lifecycle function parameters

A typical lifecycle function will be defined with the `res` and `action` arguments
``` javascript
read: (res, action) => {
  res.oppyResponse = `The response has come back from the AI now. You can use this function to provide additional updates to the UI or make an API call to save or retreive some info.`
}
```

#### res parameters
- `res.chatHistory`: An array of previous interactions in the current session, useful for context. If a user provides input when triggering a new task that input will be added to the chat history. The chat history has a maximum size of 14 items, then it starts deleting older entries.
- `res.data`: An object that can be used as a data store and modified throughout the task's lifecycle. This stores the project search results, the project folder tree, the prompt switches, token records and other shared data sources saved by other actions.
- `res.infModel`: The inference model used for generating responses, this is used when responding to questions or generating code.
- `res.input (read only)`: The user's original input.
- `res.model`: The specific language model used by the agent to respond to function calls and choose between different actions
- `res.oppyResponse`: A string that will be used as the main content of the response generated by Oppy.
- `res.oppyError`: Any error message generated during the processing of the action. This will be output into the UI in red.
- `res.systemResponse`: Additional system-generated information to be displayed to the user. This will display in the UI in expandable message blocks.
- `res.referenceFiles`: An array of file paths that reference the user project files being accessed by the task.
- `res.taskList`: An array of actions that make up the currently running task. 
- `res.taskNum`: The current action number, useful for tracking the order of actions within a plan.

#### action parameters
The action object represents the action that is currently running. Action parameters contain the generic parameters mentioned above that exist for every action, i.e. type, name, actionID, loader, etc. Additional parameter can be added that are unique to that action. These are often used so that actions can build on each other by referencing data that was generated and stored in previous actions.

## Working with Agent Functions

The agent handles running the actions and making calls to the AI. The `agent` object within an action definition can be used to define the `call` and `aftermodel` functions. None of the agent functionality will run if the action is skipped. It can include the following functions:

- `call`: This function is used if you want to run your own agent action function. It only works when running the agent directly, it will be ignored on OppyDev plugins. If a model has a call function and a model parameter the call function will be called first then the call to OppyDev's servers will be made with the model object.
- `aftermodel`: The function that is called with the response from the AI (modelRes) which is derived from the model object defined below. It allows developers to process the model's output and generate the action's results. Here's an example of how the `aftermodel` function can be used within an action definition:
``` javascript
aftermodel: (res, action, modelRes) => {
  res.oppyResponse = `Here are the results of your query: ${modelRes.content}` 
  // modelRes will contain the response you get back from the AI. It can be the results of a function call or just some content.
  // Use this function to pass the part you need back into res to be used down the line or just generate some output
  res.systemResponse = JSON.stringify(modelRes, null, 2);
  // You can also use console.log to log to the OppyDev log display
  console.log(modelRes)
  // Save the data to the shared data store so that it is easily accessible and can persist across different tasks
  res.data.intro_action.keep = true // stop the data from being cleaned up when the task ends
  res.data.intro_action.data = modelRes.function_call_response; // function_call_response will be named based on the object defined in model.function_call_props
  // Save the data so that it is associated with this action. This is useful if you want follow up action to react to the results from this action.
  action.data = modelRes.function_call_response;
}
```

### modelRes Object structure

- `modelRes.content`: A string of content returned from the LLM
- `modelRes[function_call_response]`: function_call_response will be named based on the root object name given to the object defined in `function_call_props` of the model configuration documented below.

## Model Configuration

The `model` object within an action definition specifies how the AI model should be configured and how it should process the action's prompts. The following properties can be set:

- `llm`: Specifies the language model to be used. If undefined, it defaults to GPT-4.
- `temperature`: Controls the creativity of the responses. A value of 1 is the most creative, while 0 is the least.
- `description`: Describes the purpose of the action to the system. This is used when the AI is asked which action it wants to perform next.
- `prompts`: Contains the prompts that will be sent to the AI model. This includes the `systemPrompt`, which is the main instruction for the AI.
  - `systemPrompt`: The system prompt used to instruct the AI on how to respond to the user's input. For actions that use `choices` you should leave this blank and it will generate a default that includes the action descriptions for each action.
  - `instructions`: If includeChatHistory is false instructions will be used instead of the chat history.
- `function_description`: This is a description and of function and should also include an explanation of when it should be called.
- `function_call_props`: This is a JSON Schema that will define the structured JSON response you are expecting to recieve from the model. See examples [here](https://github.com/OppyDevAI/OppyDev/tree/main/plugins).
- `required`: This is an array of strings that lists which properties in the function_call_props are required. Properties not listed here will be considered optional by the model.
- `assets`: Defines additional resources that the AI model should consider when generating a response, such as reference files or notes.
  - `web_search`: A boolean indicating whether the AI should include web search results in the reference material sent to the AI.
  - `notes`: A boolean indicating whether the AI should include notes taken by the take notes action in the reference material sent to the AI.
  - `folder_state`: A boolean indicating whether the AI should include the user's folder structure in the reference material sent to the AI.
  - `reference_files`: A boolean indicating whether the AI should include any files referenced in the reference material sent to the AI.
  - `update_file`: A boolean indicating whether the AI should include the currently selected update file in the reference material sent to the AI.
  - `custom`: A custom string which will be included in the reference material sent to the AI.
- `includeChatHistory`: Indicates whether the AI model should consider previous interactions when generating its response. If this is false it won't include any of the previous chat history and set the user's input to equal what is set on `model.instructions` plus `res.input`.
- `usePersonality`: Tells the AI model to adapt its responses according to the user-selected personality.

These properties are used for action which choose between other actions.

- `choices`: An array of actions for the AI to choose from
- `explanation`: Used when choosing between actions. This will prompt the AI to explain its reasoning for picking from a choice of different actions. Default: "A short concise explanation of which action will be selected and why."

#### Example function_call_props
``` javascript
search_results: {
  type: 'array',
  description: 'A list of search results that are most relavent to answering the user\'s query.',
  items: {
    type: 'integer',
    description: `The number of the search result that should be used to answer the user's query`
  }
}
```

# Task Definition Guide

A task is a group of actions defined in a task object. Tasks can also contain other tasks. When running a task you can add additional actions into the task so that decisions can be made in real time in order to achieve your end goal. Tasks can be looped and you can also set a task forward or backwards to a specific step by using the taskNum variable.

### Task Properties
- `type`: A unique string that identifies the task. This is what users will type or select to trigger the task.
- `name`: A human-readable description of the task. This is displayed in the UI to describe the task to the user.
- `sayComplete`: A boolean that tells the system to output "task complete" once it's finished
- `planList`: An array which contains the list of actions the task will run

### Task Definition Examples

This is a simple example of a plugin's task definition
``` javascript
// This example is from IntrductionToPluginActions.js from the OppyPlugins repo
tasks['intro task:'] = {
  type: 'intro task:',
  name: 'Running the intro task',
  sayComplete: true, // This tells the system to output "task complete" once it's finished
  // This is a list of the action that will run in the task. They will run in order.
  // You're planList can reference you action definitions directly as shown here or they can use their type
  planList: [ IntroAction, IntroFunctionCallAction ]
}

// Here is an example of the same task being defined using the action's type strings
tasks['intro task:'] = {
  type: 'intro task:',
  name: 'Running the intro task',
  sayComplete: true,
  // This is a list of the action that will run in the task. They will run in order.
  planList: [ {type: 'intro action:'}, {type: 'intro func action:'} ]
}
```

By using the action's type strings you can reference other actions outside of your own plugin. Here is an example based on the ask search plugin that uses's action built into the OppyDev agent. You can also overwrite the default action properties here by defining them in the action object as seen on the search action below.
``` javascript
tasks['ask search:'] = {
  type: 'ask search:',
  name: 'Ask Search',
  functionCallName: 'update_codebase',
  sayComplete: true,
  planList: [
    {type: 'search:', name: 'Searching', functionCallName: 'search', autonomy:'auto', loader:true},
    PickResults,
    {type: 'scrape:'},
    {type: 'take notes:', streamer:'plugin'},
    CompleteResearch
  ]
}
```

If your task makes use of the chat history be sure to monitor it when creating very dyanimc tasks, particularly when setting taskNum to a previously run action. You will get much better results if your chat history makes sense in the context of action that you are running. It can often be beneficial to have your chat history mirror the steps you are taking through the task to give the AI context on what has been happening.

When you manually trigger a task you can add input after a task type, e.g. "ask search: what is object oriented programming?". This will automatically add "what is object oriented programming?" to the chat history so that the task's actions can make use of it.

# Helper Functions and More

## Helper Functions
These helper functions are accessible within the plugin environment. They can be very useful for debugging and creating dynamic tasks that react to the user input and AI function calls.

`addNewAction(taskList, index, newTask)` Inserts a new task into the task list at the specified index. It performs a deep copy of the new task to ensure that no functions or non-serializable objects are included.
``` javascript
// Make the next action a take notes action and stream the response back to the UI
addNewAction(taskList, (res.taskNum + 1), {type: 'take notes:', streamer:'plugin'});
```

`getLastAction(currentTask, planList, type, howFar=5)` Retrieves the last action of a specified type from the plan list, looking backward from the current task up to a maximum of 'howFar' actions. If no type is specified, it returns the last action regardless of its type.
``` javascript
// Get the last scrape action going backwards through the last three actions
const lastScrapeAction = getLastAction(returnObj.taskNum, returnObj.taskList, 'scrape:', 3);
```

`getNextAction(currentTask, planList, type, howFar=5)` Retrieves the next action of a specified type from the plan list, looking forward from the current task up to a maximum of 'howFar' actions. If no type is specified, it returns the next action regardless of its type.


## Helpful Tips When Building Plugins

**Debugging** - You can use console.log() to write logs to the OppyDev log display when working with plugins. The most recent log will appear in the bottom left of the OppyDev UI. Click on it to expand the logs window and see output from using console.log() in a plugin.

Use the `res.systemResponse` parameter and `JSON.stringify(your_object, null, 2)` to output information to an expandable debug window during the task flow to help track the changes in the data and figure out why your code may not be responsing as expected. Any errors that occur when running your plugin will be output into the UI as an Oppy Error.

**Manually Triggering Actions** - You can manually trigger an action by entering the action type into the prompt box, e.g. "ask oppy: Hi, how are you?". Include any input you have for the action after the action type as shown in the example. The input will automatically be set to the input parameter on the response object so it can be accessed easily. Input added this way won't automatically be added to the chat history since many individual actions don't make sense to run in the context of a conversation. You can always add the input yourself in this case using the lifecycle functions. Running actions manually can be a useful tool when you want to quicky skip to a specific action and it can also be useful when testing complex tasks made up of several individual actions.

## Advanced Usage

Components are sandboxed from each other to enhance security. If you want to create a sophisticated plugin made of multiple files, tasks and action you can do so by including them all in the same folder. When included in the same folder they will share a global object that they can use to share state.