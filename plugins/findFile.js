const RespondFindFile = actions['respond find file:'] = {
  type: 'respond find file:',
  name: 'Responding to user with search results',
  functionCallName: 'respond_to_user',
  autonomy: 'auto',
  loader: false,
  streamer: 'plugin',
  model: {
    llm: undefined, // This can be set to any valid LLM used by OppyDev, it defaults to GPT-4
    temperature: 0.5, // This defines how creative the responses are 1 is the most creative, 0 is the least
    description: `Respond to the user with the results of the file search.`,
    prompts: {
      systemPrompt: `You are a helpful assistant. Respond to the user with the results of the file search.`,
    },
    assets: {
      long_term_memory: true
    },
    includeChatHistory: false, // No need to include chat history for this response
    usePersonality: true // This tells the LLM if it should use the user selected personality when generating responses.
  }
}

const FindFileTask = {
  type: 'find file:',
  name: 'Find a file based on a regex search',
  sayComplete: true, // This tells the system to output "task complete" once it's finished
  planList: [
    {
      type: 'search code:',
      name: 'Searching for file',
      functionCallName: 'search',
      autonomy: 'auto',
      loader: true
    },
		RespondFindFile
  ]
};

// Register the task
tasks['find file:'] = FindFileTask;