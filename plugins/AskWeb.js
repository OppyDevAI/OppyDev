console.log('Ask Web Loaded');

const PickResults = actions['pick web results:'] = {
  // Action Properties
  type: 'pick web results:',
  name: 'Picking Results',
  actionID: 'pick_web_results',
  autonomy:'auto',
  loader:true,
  agent: {
    aftermodel: (returnObj, action, modelRes) => {
      console.log('Pick Web Results:', modelRes);

      if (!modelRes?.search_results) return;
      
      const taskList = returnObj.taskList;
      let updateIndex = returnObj.taskNum + 1;
      let actionsAdded = 0;
      const maximumResultsChecked = 3;
      let resultsOutput = '';

      for (var result of modelRes.search_results) {
        addNewAction(taskList, updateIndex, {type: 'scrape:', autonomy:'auto', url:returnObj?.data?.web_search?.results?.[result]?.link});
        updateIndex++;
        // You can use OppyDev's built in note taking action of you can use your own defined below
        addNewAction(taskList, updateIndex, {type: 'take notes:', streamer:'plugin'});
        // addNewAction(taskList, updateIndex, TakeNotes);
        updateIndex++;


        resultsOutput += returnObj?.data?.web_search?.results?.[result]?.['title'] + ' - ' + returnObj?.data?.web_search?.results?.[result]?.['link'] + '\n';
        resultsOutput += 'Description: ' + returnObj?.data?.web_search?.results?.[result]?.['description'] + '\n';
        resultsOutput += 'Snippet: ' + returnObj?.data?.web_search?.results?.[result]?.['snippet'] + '\n\n';

        // Stopping adding more result checking actions if you have reached the maximum amount
        actionsAdded++;
        if (actionsAdded >= maximumResultsChecked) break;
      }

      resultsOutput = 'Pick Results: '+actionsAdded+' result have been selected for the following search term:\n"'+returnObj?.data?.web_search?.searchTerm+'"\n\n'+resultsOutput;
      returnObj.systemResponse = resultsOutput;
    }
  },
  model: {
    description: `This action picks the most relavent search results from a list of search results.`,
    prompts: {
      systemPrompt: `You are a helpful assistant whose task is to pick the most relavent search results from a list of search results.`,
    },
    function_description: `The function receives a list of search results from a search engine. It returns a list of the search results that are most relavent to the user's query. The results will be returned with the most relavent result at the top.`,
    function_call_props: {
      search_results: {
        type: 'array',
        description: 'A list of search results that are most relavent to answering the user\'s query.',
        items: {
          type: 'integer',
          description: `The number of the search result that should be used to answer the user's query`
        }
      }
    },
    required: ['search_results'],
    assets: {
      web_search: true
    },
    includeChatHistory: true
  }
}

const TakeNotes = actions['take web notes:'] = {
  // Action Properties
  type: 'take web notes:',
  name: 'Taking Notes',
  actionID: 'take_web_notes',
  autonomy:'auto',
  loader:true,

  // Lifecycle Functions
  constructor: undefined,
  prep: undefined,
  submit: undefined,
  os: undefined,
  read: undefined,
  stream: undefined,
  taskComplete: undefined
}

const CompleteResearch = actions['complete ask web:'] = {
  // Action Properties
  type: 'complete ask web:',
  name: 'Finishing Up',
  actionID: 'complete_ask_web',
  autonomy:'auto',
  streamer: 'plugin',
  model: {
    description: `This action completes the ask google task by summarizing the research.`,
    prompts: {
      systemPrompt: `Use the notes that have been taken to respond to the user's query. Include a summary of the notes as well as the most useful quotes from the original source material and an explanation of why they are relevant to the user's original query. All quotes should reference the original source material the quote came from. You are welcome to draw your own conclusions but you must be sure to mention all the different viewpoints that were captured during the note taking process.`,
    },
    assets: {
      notes: true
    },
    includeChatHistory: true
  }
}

tasks['ask web:'] = {
  type: 'ask web:',
  name: 'Ask Web',
  functionCallName: 'ask_web',
  sayComplete: true,
  planList: [
    {type: 'search:', name: 'Searching', functionCallName: 'search', autonomy:'auto', loader:true},
    PickResults,
    // Scraping and take notes will be added here by the pick results action
    CompleteResearch
  ]
}