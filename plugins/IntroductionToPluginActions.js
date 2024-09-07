
// res.oppyResponse = 'Initializing Introduction to Plugin Actions Loaded';

const currentDate = new Date();

const IntroAction = actions['intro action:'] = { // "intro action:" will be the command you type in the OppyDev UI to trigger the action
  type: 'intro action:',
  name: 'Introducing Plugin Actions', // This will be description of the action you see in the menus
  actionID: 'intro_action', // This is a unique actions ID
  loader:false, // This tells the system if it should show the loading animation or not while waiting for this action
  // autonomy:'auto', // This determines if the action run automatically or wait for user approval
  streamer: 'plugin', // This tells the system that the action's reponse will be returned as a stream
  init: () => {
    // res.oppyResponse = 'initializing intro action:';
    console.log('initializing intro action:');
  },

  // Workspace lifecycle function are defined here. These are the functions that will run in the UI as the user steps through each action
  workspace: {
    // This lifecycle function is called before the action starts
    prep: (res, action) => {
      res.oppyResponse = '<Lifecycle prep function response> Are you ready for an introduction to using custom actions with OppyDev?'
      // Regular log exmaple
      console.log('intro action prep run', {hello: 'hello'}, 'testing testing...');
      // OppyDev log format
      console.log({msg: 'intro action prep run', obj: {hello: 'hello'}});
    },
    // This lifecycle function is called if the action is skipped (it will not run if the action is approved)
    skip: (res, action) => {
      res.oppyResponse = `<Lifecycle skip function response> Oh... I guess we'll skip this one`
    },
    // This lifecycle function is called when after the action is submitted (it will not run if the action is skipped)
    submit: (res, action) => {
      res.oppyResponse = `<Lifecycle submit function response> Thanks for submitting your actions. You can use this space here to message the user about what is coming next and run any code you might need to prepare for the response from the AI.`
    },

    /** The agent's aftermodel function will be run here, in between submit and read.   **/
    /** It is part of the agent rather than the UI and can be defined in the agent object. **/

    // This is called when the action is executed (it will not run if the action is skipped or if the response is a streamed response)
    read: (res, action) => {
      res.oppyResponse = `<Lifecycle read function response> The response has come back from the AI now. You can use this function to provide additional updates to the UI or make an API call to save or retreive some info.`
    },
    // This is called when the action is complete
    done: (res, action) => {
      res.oppyResponse = `<Lifecycle done function response> This is the last action the runs before the action is complete. Use this to make any final adjustments and clean up anything you don't want to keep.`
      res.systemResponse = JSON.stringify(res, null, 2); // This will output to full res function if you need to see it for debugging purposes
      console.log(res);
    }
  },
  agent: {
    // This is used if you want to run your own agent action function. It only works when running the agent directly, it will be ignored on plugins. If a model has a call function and a model parameter the call function will be called first then the call to OppyDev's servers will be made with the model object.
    call: undefined, 
    // aftermodel won't run since this response is going to be streamed back to the UI
    // aftermodel: (res, action, modelRes) => {}
  },
  model: {
    llm: undefined, // This can be set to any valid LLM used by OppyDev, it defaults to GPT-4
    temperature: 1, // This defines how creative the responses are 1 is the most creative, 0 is the least
    // description is used to describe to the system the purpose of this action
    description: `This is an example action that illstrates how user's can create their own plugin actions`,
    // These are where you define the prompts for your request to the AI
    prompts: {
      // This is where define the system prompt for your action
      systemPrompt: `You are a helpful assistant introducing the user to OppyDev plugin actions. Say hi.`,
    },
    // assets is where you define all the assets you want the LLM to see when responding to your prompts
    // examples include reference files, notes, web content, etc
    assets: {
      reference_files: true
    },
    includeChatHistory: true, // This tells the system if you want the LLM to see the chat history when responding to your prompts
    usePersonality: true // This tells the LLM if it should use the user selected personality when generating responses.
  }
}

const IntroFunctionCallAction = actions['intro func action:'] = { // "intro action:" will be the command you type in the OppyDev UI to trigger the action
  type: 'intro func action:',
  name: 'Introducing Plugin Function Call Actions', // This will be description of the action you see in the menus
  actionID: 'intro_func_action', // This is a unique actions ID
  loader:true, // You should set loader true for this one since it will take some time to respond
  // autonomy:'auto', // This determines if the action run automatically or wait for user approval

  // Workspace lifecycle function are defined here. These are the functions that will run in the UI as the user steps through each action
  workspace: {
    // This lifecycle function is called before the action starts
    prep: (res, action) => {
      // res.oppyResponse = '<Lifecycle prep function response> Are you ready for an introduction to using custom function call actions with OppyDev?'
      console.log('IntroFunctionCallAction')
      if (!res.taskList) {
        // If there is no task list this action was triggered manually, so we should add the input to the chatHistory
        res.chatHistory.push({role: "user", content: res.input});
      }
    },
    // This lifecycle function is called if the action is skipped (it will not run if the action is approved)
    skip: (res, action) => {
      // res.oppyResponse = `<Lifecycle skip function response> Oh... I guess we'll skip this one`
    },
    // This lifecycle function is called when after the action is submitted (it will not run if the action is skipped)
    submit: (res, action) => {
      // res.oppyResponse = `<Lifecycle submit function response> Thanks for submitting your actions. You can use this space here to message the user about what is coming next and run any code you might need to prepare for the response from the AI.`
    },

    /** The agent's aftermodel function will be run here, in between submit and read.   **/
    /** It is part of the agent rather than the UI and can be defined in the agent object. **/

    // This is called when the action is executed (it will not run if the action is skipped or if the response is a streamed response)
    read: (res, action) => {
      // res.oppyResponse = `<Lifecycle read function response> The response has come back from the AI now. You can use this function to provide additional updates to the UI or make an API call to save or retreive some info.`
    },
    // This is called when the action is complete
    done: (res, action) => {
      // res.oppyResponse = `<Lifecycle done function response> This is the last action the runs before the action is complete. Use this to make any final adjustments and clean up anything you don't want to keep.`
      // res.systemResponse = JSON.stringify(res, null, 2); // This will output to full res function if you need to see it for debugging purposes
    }
  },
  agent: {
    // This is used if you want to run your own agent action function. It only works when running the agent directly, it will be ignored on plugins. If a model has a call function and a model parameter the call function will be called first then the call to OppyDev's servers will be made with the model object.
    call: undefined, 
    // If a the action has a model parameter the aftermodel function will be called after the model call 
    // returns with the models repsonse. (aftermodel won't run for streamed responses)
    // The modelRepsonse function will run even if a model parameter isn't defined for consistency so it is easy to resuse action definitions. 
    aftermodel: (res, action, modelRes) => {
      res.oppyResponse = modelRes.content;
      // modelRes will contain the response you get back from the AI. It can be the results of a function call or just some content.
      // Use this function to pass the part you need back into res to be used down the line or just generate some output
      res.systemResponse = JSON.stringify(modelRes, null, 2);

      res.oppyResponse = 'Okay, words associated with ' + res.input + ' are:\n\n';
      for (const word of modelRes.associated_words) {
        res.oppyResponse += word + ', ';
      }
      res.oppyResponse += 'and that is everything I can think of right now.';

      // Save the data to the shared data store so that it is easily accessible and can persist across different tasks
      if (!res.data.intro_action) res.data.intro_action = {associated_words: modelRes.associated_words};
      res.data.intro_action.keep = true // stop the data from being cleaned up when the task ends
      res.data.intro_action.response = modelRes.content;
      // Save the data so that it is associated with this action. This is useful if you want follow up action to react to the results from this action.
      action.response = modelRes.content;
    }
  },
  model: {
    llm: undefined, // This can be set to any valid LLM used by OppyDev, it defaults to GPT-4
    temperature: 1, // This defines how creative the responses are 1 is the most creative, 0 is the least
    // description is used to describe to the system the purpose of this action
    description: `This is an example action that illustrates how user's can create their own plugin actions`,
    // These are where you define the prompts for your request to the AI
    prompts: {
      // This is where define the system prompt for your action
      systemPrompt: `You are a helpful assistant introducing the user to OppyDev plugin actions. Use the word provided by the user and respond with a list of words you associate with that word.`,
    },
    function_description: `The function uses the word suggested by the user and responds with a list of words associated with that word.`,
    function_call_props: {
      associated_words: {
        type: 'array',
        description: 'A list of words associated with the word given by the user',
        items: {
          type: 'string',
          description: `A word associated with the word give by the user`
        }
      }
    },
    required: ['associated_words'],
    // assets is where you define all the assets you want the LLM to see when responding to your prompts
    // examples include reference files, notes, web content, etc
    assets: {},
    includeChatHistory: true, // This tells the system if you want the LLM to see the chat history when responding to your prompts
    usePersonality: true // This tells the LLM if it should use the user selected personality when generating responses.
  }
}

tasks['intro task:'] = {
  type: 'double intro:',
  name: 'Running the intro action twice',
  sayComplete: true, // This tells the system to output that the task is complete once it's finished
  // This is a list of the action that will run in the task. The will run in order.
  // In this case since we only have 1 task I will run it twice as an example.
  planList: [ IntroAction, {type: 'intro func action:', input:'Coding'} ]
}