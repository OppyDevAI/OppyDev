console.log('Revise Plugin Loaded');
// ask: Write a sentence that ends with a number that is also the number of words in the sentence
// ask: I can't count, can you help me out by telling me how many words are in the sentence I'm typing right now
// ask: What is 34.53278954 + 1.8494324 / 98 // (0.0188717591836735) 34.55166129918367

const Reply = actions['reply:'] = {
  type: 'reply:',
  name: 'Replying',
  actionID: 'reply',
  streamer: 'plugin',
  autonomy:'auto',
  loader:false,
  workspace: {
    prep: (res, action) => {
      if (!res.taskList) {// If there is no task list this action was triggered manually, so we should add the input to the chatHistory
        res.chatHistory.push({role: "user", content: res.input});
      }
    }
  },
  model: {
    description: `Answer the question`,
    prompts: {
      systemPrompt: `Reply to the user's query.`
    },
    assets: {},
    includeChatHistory: true
  }
}

const Think = actions['think:'] = {
  type: 'think:',
  name: 'Thinking',
  actionID: 'think',
  autonomy:'auto',
  loader:true,
  agent: {
    aftermodel: (res, action, modelRes) => {
      res.systemResponse = JSON.stringify(modelRes, null, 2);
      res.oppyResponse = modelRes.response;
    }
  },
  model: {
    description: `Review the previous response`,
    prompts: {
      systemPrompt: `Review the user's most recent query and your response. Think through the user's query and explain your thinking as a chain of thought. Call out anything in your initial response that was incorrect or requires clarification. After your chain of thought explanation provide a brief response stating you either need to correct your previous response or that the initial response was okay.`
    },
    function_description: `This function reviews responses and thinks through the best way to provide an accurate and helpful reponse`,
    function_call_props_dsadsadasdsa: {
      //chain_of_thought: {
      //  type: 'string',
      //  description: `A detailed chain of thought explanation of how best to responds to the user\'s query that includes every step required to arrive at an accurate response`
      //},
      //response: {
      //  type: 'string',
      //  description: `A short response that corrects the initial response or confirms that the initial response was okay`
      //}
    },
    required: ['associated_words'],
    assets: {},
    includeChatHistory: true
  }
}

tasks['ask:'] = {
  type: 'ask:',
  name: 'Ask',
  planList: [ Reply, Think ]
}