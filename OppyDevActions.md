# OppyDev Actions

The AI agent that powers OppyDev works by stringing together different actions in order to complete a task. Each of these tasks and actions can be triggered by Oppy automatically or manually by the user by entering them into the prompt box. Enter the task into the prompt box with a colon at the end to trigger the task. Some tasks can accept additional input as instructions, others are run as is. When your cursor is in an empty prompt box you can press tab to cycle through several of the most useful tasks.

**ask oppy:** This will return an immediate reponse to your prompt from the AI. Typically this would be used when you want a quick answer to a question. Your project details and files references will also be visible to the AI when generating it's response.

**ask search:** This will search the web first to find sources that can help respond to your prompt before sending the results of the search to the AI to generate a response. The AI will identify relavent details in the online sources and then summarize the results in order to respond to your prompt. Chrome needs to be installed on your computer for this task to work.

**get docs:** This will write documentation to a .md file based on a URL you pass into the task. The file will automatically be saved into the documentation folder of your current project. You can then use this documentation as a reference when prompting Oppy to give him a better understanding of the coding environment you are working in. Chrome needs to be installed on your computer for this task to work.

**update codebase:** This will start a new coding task to update your codebase. Oppy will first search his long term memory to find which files he needs to be referenced to complete the task. He will keep suggesting files to reference until he feels that he has all the information he needs. Then he will make a plan to update the files and start stepping through the updates. He will give you a brief explanation of his reasoning during each step so you can follow along and correct any mistakes.

**plan code updates:** If you already have the files you want to work with referenced you can use this action to skip passed searching the memory and finding files to go straight to planning and executing updates. This will save time and costs.

**ask codebase:** Ask Oppy anything about your codebase. He will search his long term memory and then suggest which files need to be referenced to answer the question. As soon as he finds the answer he will reply to your question.

**remember codebase:** This will start reviewing your project folder and adding the files to Oppy's project memory. It will only add files it hasn't seen before. This can be useful to use if you've added several files to the codebase outside of using OppyDev. It can take a couple minutes to complete if there are a lot of new files. This action will be limited to 100 files in order to avoid incurring high costs from running through a very large amount of files. You can easily continue the process if this happens by clicking continue. This will also tell Oppy to search through his memory to check if any of the files in your project folder have been deleted and need to be removed from his memory.

**remove project memory:** This action will remove the project memory for the project folder that is currently opened by OppyDev. This can be useful if you want to save space in Oppy's memory or you want to remove your project details from Oppy's memory database.

**clean memory:** This will tell Oppy to search through his memory to check if any of the files in your project folder have been deleted and need to be removed from his memory. This is typically done automatically but may be useful to trigger manually in some circumstances. 

**setup project memory:** If you have just used "remove project memory:" this can be used to setup a new project memory if one doesn't exist already for your project folder. It will automatically review all your project files after setting up the new project memory. This is triggered automatically when opening up a new project folder.

**update file:** This is used to update a specific file. You will need to have a write file selected to use this.

**remember file:** This is used to index a specific file. You will need to have a write file selected to use this.

**search code:** This action does a semantic search of the project files and returns the most similar results. The results can be read from data.codebaseSearchResults. When being accessed by plugins the search results are read only.

**scrape:** This action will use the user's local chrome installation to scrape a target URL. You can pass the URL in as input when calling the action or define it on the url parameter of the actions itself.

**take notes:** This action looks at the content parameter from the action immidietly before it and asks the AI to take notes on the content in order to capture the details that are relavent to the user's query.

