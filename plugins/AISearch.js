// ai search: What is the best unit testing framework for my codebase?

const generateSearchTermSystemPrompt = `Generate a high quality search term based on the user's question. The search term should be concise, relevant, and likely to yield useful results.`;

actions['generate search term:'] = {
  // Action Properties
  type: 'generate search term:',
  name: 'Generating Search Term',
  actionID: 'generate_search_term',
  autonomy: 'auto',
  workspace: {
  	prep: (res, action) => {
      if (!res.taskList) { // If there is no task list this action was triggered manually, so we should add the input to the chatHistory
    		console.log('Input: ' + res.input);
        res.chatHistory.push({role: "user", content: res.input});
      }
    }
  },
  agent: {
    aftermodel: (res, action, modelRes) => {
      // res.systemResponse = JSON.stringify(modelRes, null, 2);
      const search_term = modelRes?.search_term;
      console.log('Search Term: ' + search_term);
      res.systemResponse = 'search term: ' + search_term;
      // if (isDirectActionCall(res.taskList, actions['generate search term:'])) { // This is useful for testing when manually triggering the action
      //   res.oppyResponse = `Generated search term: ${search_term}`;
      // }

      // Add to chat history so AI is aware of what it has done. The user won't see this.
      res.chatHistory.push({role:'assistant', content: `Let me see what I can find online. I'll use the search term "${search_term}"`});
      // This isn't strictly necessary. Maintaining a consistant back and forth in the chat history seems to help prevent the AI from getting confused.
      res.chatHistory.push({role:'user', content: `Okay`});

      action.search_term = search_term;
    }
  },
  model: {
    description: `This action generates a high quality search term from the user's query.`,
    prompts: {
      systemPrompt: generateSearchTermSystemPrompt,
    },
    function_description: `This action generates a high quality search term from the user's query.`,
    function_call_props: {
      search_term: {
        type: 'string',
        description: 'Generate a high quality search term based on the user\'s query. The search term should be concise, relevant, and likely to yield useful results.'
      }
    },
    required: ['search_term'],
    assets: {
      reference_files: {}
    },
    includeChatHistory: true
  }
}

// Use this action if you want to implement your own search endpoint
// actions['search online:'] = {
//   // Action Properties
//   type: 'search online:',
//   name: 'Search Online',
//   actionID: 'search_online',
//   autonomy:'auto',
//   loader:true,
//   workspace: {
//     prep: async (res, action) => {
//       const GOOGLE_SEARCH_URL = `https://www.googleapis.com/customsearch/v1?key=YOUR_KEY_HERE&cx=CX_ID_HERE&q=`

//       var searchUrl = GOOGLE_SEARCH_URL + encodeURIComponent(res.input);
//       if (action.num) searchUrl += '&num=' + encodeURIComponent(action.num);
//       if (action.start) searchUrl += '&start=' + encodeURIComponent(action.start);

//       console.log('searchGoogle: ' + searchUrl);
//       var response;
//       var error;
//       try {
//         response = await fetch(searchUrl)
//         .then(async response => {
//           if (response.status < 400) {
//             return response.json();
//           } else {
//             error = await response.json();
//             console.error('Error: searchGoogle:', error);
//             return {message:`Error accessing service: Error ${response.status} returned from google`};
//           }
//         })
//         .then(serviceResponse => {
//           // Add 1000 tokens per google request since services costs are stored per 1000 tokens
//           return {serviceResponse};
//         });
//       } catch (err) {
//         error = err;
//       }

//       if (!error && !response?.serviceResponse?.items?.length) error = new Error(`No search results returned from google`);

//       // console.log('Google Search: ', response);
//       error = error || response?.serviceResponse?.message;
//       if (error) {
//         console.error(error, response);
//         res.oppyError = error.message || error;
//         return;
//       }

//       const responseJson = response.serviceResponse;
//       const results = [];

//       // Include only the top three responses
//       for (let i = 0; i < responseJson.items.length; i++) {
//         const result = responseJson.items[i];
//         // logger.debug('Search Item: ', result);
//         const trimmedResult = {
//           title: result.title,
//           link: result.link,
//           snippet: result.snippet,
//           description: result?.['pagemap']?.['metatags']?.[0]?.['og:description'] || '',
//           image: result?.['pagemap']?.['cse_image']?.[0]?.['src'],
//           thumbnail: result?.['pagemap']?.['cse_thumbnail']?.[0]?.['src']
//         };
//         results.push(trimmedResult);
//       }
//       console.log('search google results:\n\n' + JSON.stringify(results, null, 2));

//       if (!res?.data?.web_search) res.data.web_search = {};
//       res.data.web_search.searchTerm = res.input
//       res.data.web_search.results = results;
//     }
//   }
// }

actions['select web results:'] = {
  // Action Properties
  type: 'select web results:',
  name: 'Selecting Results',
  actionID: 'select_web_results',
  autonomy:'auto',
  loader:true,
  agent: {
    aftermodel: (res, action, modelRes) => {
      console.log('Selecting Web Results:\n\n' + JSON.stringify(modelRes, null, 2));

      if (!modelRes?.search_results) return;
      
      let resultsOutput = '';
      if (modelRes?.chain_of_thought) resultsOutput += modelRes.chain_of_thought + '\n\n';
      let pickedResults = [];

      resultsOutput += `I've picked the following search results to help answer your query:\n`;
      for (var resultIndex of modelRes.search_results) {
        let result = res.data.web_search.results[resultIndex];
        if (!result) continue;
        pickedResults.push(result);

        resultsOutput +=  '* ';
        if (result.title) resultsOutput += result.title + ' - ';
        resultsOutput +=  result.link + '\n';
        // resultsOutput += 'Description: ' + result.description + '\n';
        // resultsOutput += 'Snippet: ' + result.snippet + '\n\n';
      }

      console.log('Pick Results: results have been selected for the following search term:\n"'+res?.data?.web_search?.searchTerm+'"\n\n'+resultsOutput);

      // Add to chat history so AI is aware of what it has done. The user won't see this.
      res.chatHistory.push({role:'assistant', content: resultsOutput});
      // This isn't strictly necessary. Maintaining a consistant back and forth in the chat history seems to help prevent the AI from getting confused.
      res.chatHistory.push({role:'user', content: `Okay`});

      // Replace search results with new results
      res.systemResponse = modelRes?.chain_of_thought + '\n\n picked results: ' + JSON.stringify(modelRes.search_results) + '\n\n' + JSON.stringify(pickedResults, null, 2);

      // Output Video Results
      if (modelRes.video_results && modelRes.video_results.length) {
        res.oppyResponse = `These videos look like they match what you are looking for:\n### Video Results\n\n`;
        for (var videoIndex of modelRes.video_results) {
          let result = res.data.web_search.results[videoIndex];
          if (!result) continue;
          res.oppyResponse +=  '* ';
          if (result.title) res.oppyResponse += result.title + ' - ';
          res.oppyResponse +=  result.link + '\n';
        }
      }

      // Overwrite the search results to be used by future actions
      res.data.web_search.results = pickedResults;
    }
  },
  model: {
    filter: (res, action) => {
      console.log('Selecting Web Filter:', action);
      // for (var i=0; i < res.data.web_search.results; i++) {
      //   res.data.web_search.results[i].index = i+1;
      //   delete
      // }
      var index = 0;
      const trimmedArray = res.data.web_search.results.map(({ title, link, snippet, description }) => {
        return { title, index: index++, link, snippet, description };
      });
      action.model.assets.custom = `# Search Results\n\n${JSON.stringify(trimmedArray, null, 2)}\n`;
    },
    description: `This action picks the most relevant search results from a list of search results.`,
    prompts: {
      systemPrompt: `You are a helpful assistant whose task is to pick the most relevant search results from a list of search results. The search engine doesn't always return the most relevant results at the top of the list. Rearrange the results so that the most useful ones are at the beginning of the list. Only include the results that will be most useful for answering the user's query. If a search result is unlikely to be useful leave it out of the updated list. Do not include links to videos in the main search results list, those must be included in a separate list that is only for videos.`,
    },
    function_description: `The function receives a list of search results from a search engine. It thinks through which results will be most useful for answering the user's query and returns a list of the search results that are most relevant to the user's query. The results will be returned with the most relevant result at the start of the array. If a relevant search result links to a video it will not be included in the main search results and instead will be included as part of the video results list.`,
    function_call_props: {
      chain_of_thought: {
        type: 'string',
        description: `A concise response thinking through which search results will be most useful for answering the user's query. The response will be structured and methodical. It will include chain of thought reasoning and use self-evaluation to ensure accuracy and quality. The response should not be longer than a single paragraph.`
      },
      search_results: {
        type: 'array',
        description: 'A list of the search results indices that are most relevant to answering the user\'s query with the most relevant result at the beginning, e.g. [0, 3, 2, 1, 4]. This will not include links to videos.',
        items: {
          type: 'integer',
          description: `The index of the original search result that should occupy this spot in the reordered results`
        }
      },
      video_results: {
        type: 'array',
        description: 'A list of the search results indices relevant to answering the user\'s query that link to a video. The most relevant video link will be at the beginning, e.g. [0, 3, 2, 1, 4]',
        items: {
          type: 'integer',
          description: `The index of the original video search result that should occupy this spot in the list of video results`
        }
      }
    },
    required: ['chain_of_thought', 'search_results'],
    // llm: 'gpt-4o-mini-2024-07-18', // This is faster, cheaper and probably good enough
    assets: {
      web_search: true
    },
    includeChatHistory: true
  }
}

const completeResearchSystemPrompt = `Use the information that has been gathered from online sources to respond to the user's query. Follow the rules below when generating your response:

  - If the user is asking a question respond with an answer to the users questions. Then give several quotations from the source material that backup your answer with a markdown link at the end.
  - If the user is looking for information in general return a summary of the information you found. Then include quotations from the most useful sources with a link back to the source.

Here is an abbreviated example of what a response might look like when the user prompts "what is a duck?"

"A duck is a type of waterfowl..."

"Duck is the common name for numerous species of waterfowl in the family Anatidae" [wikipedia.com](https://en.wikipedia.org/wiki/Duck)

Include up to three quotes that backup your answer. All quotes must reference the original source material the quote came from. You are welcome to draw your own conclusions but you must be sure to mention all the different viewpoints that were represented in the source material.`

actions['complete ai search:'] = {
  // Action Properties
  type: 'complete ai search:',
  name: 'Finishing Up',
  actionID: 'complete_ai_search',
  autonomy:'auto',
  streamer: 'plugin',
  model: {
    description: `This action completes the ask google task by summarizing the research.`,
    prompts: {
      systemPrompt: completeResearchSystemPrompt,
    },
    assets: {
      content: {title: 'Online Sources', tokenLimit:90000}, // Limit the token length to leave space for other content and a response
      reference_files: {}
    },
    includeChatHistory: true
  }
}

tasks['ai search:'] = {
  type: 'ai search:',
  name: 'Searching',
  functionCallName: 'ai_search',
  sayComplete: true,
  planList: [
    {type: 'generate search term:'},
    // {type: 'search online:', num:10}, // Use this action for implementing your own search endpoint
    {type: 'search:', showResults:true, num:10, sets:2},
    {type: 'select web results:'},
    {type: 'scrape:'},
    {type: 'complete ai search:'}
  ]
}