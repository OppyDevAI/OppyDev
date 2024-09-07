console.log('Word of the Day Loaded');

const actionCall = async (returnObj, action, modelRes) => {
  console.log('Word of the Day Action Run: ' + action.name);
  console.log('plugin returnObj: ', returnObj);
  // returnObj.data.pickWord = 'Hello';
  returnObj.oppyResponse = modelRes.content;

  // returnObj.oppyResponse = 'Picking Word aftermodel did run';
  // returnObj.oppyError = 'Picking Word aftermodel did error';
  // returnObj.systemResponse = 'Picking Word aftermodel did system';
  // Make a GET request to a URL
  // await fetch('https://api.weather.gov')
  // .then(response => {
  //   console.log('https://api.weather.gov');
  //   console.log(response);
  //   if (response.status < 400) {
  //     return response.json();
  //   } else {
  //     console.error('Error ' + response.status + ': ' + response.statusText + response.error);
  //     throw new Error(response.statusText + response.error)
  //   }
  // })
  // .then(results => {
  //   // console.debug('Word of the day: ', responseJson);
  //   returnObj.data.pickword = {results};
  // })
  // .catch(error => {
  //   console.error(error);
  // });
};

const currentDate = new Date();

const PickWord = actions['pick word:'] = {
  type: 'pick word:',
  name: 'Picking Word',
  actionID: 'pick_word',
  loader:false,
  autonomy:'auto',
  streamer: 'plugin',
  workspace: {
    prep: (returnObj, action) => { // This is called before the action starts
      console.log('Word of the Day (Prep) Run');
      returnObj.data.pickWord = 'prep did run';
      console.log(action);
      // returnObj.oppyResponse = 'Picking Word Prep did run';
      // returnObj.oppyError = 'Picking Word Prep did error';
      // returnObj.systemResponse = 'Picking Word Prep did system';
    },
    skip: (returnObj, action) => { // This is called if the action is skipped
      console.log('Word of the Day (Skip) Run');
      console.log(action);
    },
    submit: (returnObj, action) => { // This is called when the action is executed
      console.log('Word of the Day (Submit) Run');
      console.log(action);
      // returnObj.oppyResponse = 'Picking Word Submit did run';
      // returnObj.oppyError = 'Picking Word Submit did error';
      // returnObj.systemResponse = 'Picking Word Submit did system';
    },
    read: (returnObj, action) => { // This is called when the action is executed
      console.log('Word of the Day (Read) Run');
      console.log(action);
      // returnObj.oppyResponse = 'Picking Word Read did run';
      // returnObj.oppyError = 'Picking Word Read did error';
      // returnObj.systemResponse = 'Picking Word Read did system';
    },
    done: (returnObj, action) => { // This is called when the action is executed
      console.log('Word of the Day (Done) Run');
      console.log(action);
      // returnObj.oppyResponse = 'Picking Word Done did run';
      // returnObj.oppyError = 'Picking Word Done did error';
      // returnObj.systemResponse = 'Picking Word Done did system';
    }
  },
  agent: {
    call: undefined, // This is used if you want to run your own agent action function. It will be ignored on plugins. If a model has a call function and a model parameter the call function will be called first then the call to pinky will be made with the model param and then aftermodel will be run.
    // Action functions go here
    aftermodel: actionCall // If a the action has a model parameter this will be called after the model call returns with the models repsonse. modelRepsonse should be run even if a model parameter isn't defined for the sake of consistency so that it is easy to resuse action definitions. aftermodel won't run for streamed responses.
  },
  model: {
    llm: undefined, // This can be set to any valid LLM used by OppyDev, it defaults to GPT-4
    temperature: 1, // Will use default if not defined
    description: `This action responds with a random historical event that happened on this day. It then picks a word that captures the spirit of the event.`,
    prompts: {
      systemPrompt: `Todays date is ${currentDate.toString()}. Tell me about a random historical event that happened on this day in a couple of senetences. Then pick a word that captures the spirit of the event and tell me what word you've chosen and why.`,
    },
    assets: {
      reference_files: true
    },
    includeChatHistory: true,
    usePersonality: true
  }
}

const DefineWord = actions['define word:'] = {
  type: 'define word:',
  name: 'Defining Word',
  actionID: 'define_word',
  loader:false,
  // autonomy:'auto',
  // streamer: 'plugin',
  workspace: {
    prep: (returnObj, action) => { // This is called when the action is executed
      console.log('Define Word (Prep) Run');
      console.log(action);
      // returnObj.oppyResponse = 'Define Word Prep did run';
      // returnObj.oppyError = 'Define Word Prep did error';
      // returnObj.systemResponse = 'Define Word Prep did system';
    },
    submit: (returnObj, action) => { // This is called when the action is executed
      console.log('Define Word (Submit) Run');
      console.log(action);
      // returnObj.oppyResponse = 'Define Word Submit did run';
      // returnObj.oppyError = 'Define Word Submit did error';
      // returnObj.systemResponse = 'Define Word Submit did system';
    },
    skip: (returnObj, action) => { // This is called if the action is skipped
      console.log('Define Word (Skip) Run');
      console.log(action);
      // returnObj.oppyResponse = 'Define Word Skip did run';
      // returnObj.oppyError = 'Define Word Skip did error';
      // returnObj.systemResponse = 'Define Word Skip did system';
    }
  },
  agent: {
    // Action functions go here
    aftermodel: actionCall
  },
  model: {
    // Model parameters go here
    description: `This action will define the word of the day.`,
    prompts: {
      systemPrompt: `Define the chosen word from your previous response and then use it in an example sentence. Make the sentence extremely funny and entertaining.`,
    },
    assets: {
      reference_files: true
    },
    includeChatHistory: true,
    usePersonality: true
  }
}

tasks['word of the day:'] = {
  type: 'word of the day:',
  name: 'Selecting Word of the Day',
  // sayComplete: true,
  planList: [ PickWord, DefineWord ]
}