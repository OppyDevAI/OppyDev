console.log('Generate Dialog Plugin Loaded');

const SetupJoke = actions['setup joke:'] = {
  // Action Properties
  type: 'setup joke:',
  actionID: 'setup_joke',
  streamer: 'plugin',
  autonomy:'auto',
  loader:false,

  model: {
    description: `This action writes the setup for a joke about a priest, a lawyer and a drunk`,
    prompts: {
      systemPrompt: `Write the setup for a joke about a priest, a lawyer and a drunk.`
    },
    assets: {},
    includeChatHistory: true
  }
}

const ReplyAsPriest = actions['reply priest:'] = {
  // Action Properties
  type: 'reply priest:',
  actionID: 'reply_priest',
  streamer: 'plugin',
  autonomy:'auto',
  loader:false,

  model: {
    description: `Adds a line of dialog for the priest`,
    prompts: {
      systemPrompt: `You are an accomplished comedy writer. Add a line of dialog for the priest written in the third person.`
    },
    assets: {},
    includeChatHistory: true
  }
}

const ReplyAsLawyer = actions['reply lawyer:'] = {
  // Action Properties
  type: 'reply lawyer:',
  actionID: 'reply_lawyer',
  streamer: 'plugin',
  autonomy:'auto',
  loader:false,

  model: {
    description: `Adds a line of dialog for the lawyer`,
    prompts: {
      systemPrompt: `You are an accomplished comedy writer. Add a line of dialog for the lawyer written in the third person.`
    },
    assets: {},
    includeChatHistory: true
  }
}

const ReplyAsDrunk = actions['reply drunk:'] = {
  // Action Properties
  type: 'reply drunk:',
  actionID: 'reply_drunk',
  streamer: 'plugin',
  autonomy:'auto',
  loader:false,

  model: {
    description: `Adds a line of dialog for the drunk`,
    prompts: {
      systemPrompt: `You are an accomplished comedy writer. Add a line of dialog for the drunk written in the third person.`
    },
    assets: {},
    includeChatHistory: true
  }
}

const FinishJoke = actions['finish joke:'] = {
  // Action Properties
  type: 'finish joke:',
  actionID: 'finish_joke',
  streamer: 'plugin',
  autonomy:'auto',
  loader:false,

  model: {
    description: `This is action indicates that the joke is finished`,
    prompts: {
      systemPrompt: `Respond to the joke by lauphing, you can throw in a funny comment as well if you think of something.`
    },
    assets: {},
    includeChatHistory: true
  }
}

const PickNextLine = actions['pick next line:'] = {
  // Action Properties
  type: 'pick next line:',
  name: 'Thinking',
  actionID: 'pick_next_line',
  autonomy:'auto',
  loader:true,
  agent: {
    aftermodel: (res, action, modelRes) => {
      // res.systemResponse = JSON.stringify(modelRes, null, 2);
      addNewAction(res.taskList, res.taskNum + 1, {type: modelRes.action});
      if (modelRes.action !== 'finish joke:') {
        addNewAction(res.taskList, res.taskNum + 2, {type: 'pick next line:'});
      }
    }
  },
  model: {
    choices: {
      'reply priest:': ReplyAsPriest,
      'reply lawyer:': ReplyAsLawyer,
      'reply drunk:': ReplyAsDrunk,
      'finish joke:': FinishJoke
    },
    prompts: {
      systemPrompt: `You are a helpful assistant that helps write dialog for jokes. Pick which action to do next based on the dialog so far. Keep adding to the dialog until you reach a really good punch line. Once you reach a really good punch line respond with the joke finished action.`,
    },
    assets: {},
    includeChatHistory: true,
    usePersonality: true
  }
}

tasks['tell joke:'] = {
  type: 'tell joke:',
  name: 'Thinking of Joke',
  sayComplete: true,
  planList: [ SetupJoke, PickNextLine ]
}