# Welcome to OppyDev!

A couple things to note before you start...

If you have a promo code enter it in the user menu in the bottom right and click the check button to submit. After entering your promo code you can get started using OppyDev right away. 

If you don't have a promo code or haven't added credit to your OppyDev account you can still use OppyDev by providing your own API keys for pinecone and OpenAI. Make sure you've entered your pinecone API key and environment in the user menu in the bottom right. You will also need to enter your OpenAI API key in the same menu. Go to https://oppydev.ai/download/#getting-set-up for detailed instructions on using your own API keys.

The key to getting good results with AI is to focus its attention where it needs to be. OppyDev does this by creating a working memory of your codebase so it has a broad overview of how things work. It is able to then use that to answer questions and automatically implement updates across multiple files. The current state of the art AI models can get better results if a developer can focus their attention and then work through the problem with them. OppyDev is built with a set of tools that streamlines this back and forth process between the developer and the AI.

# Getting Started

When you're ready click the folder plus icon in the top left to open a new project folder. If you are going to start using OppyDev with a pre-existing project you may get prompted to create an .oppyignore file in the root of your project folder to ignore files that aren't part of your codebase. Oppy will do this automatically when opening up a project folder for the first time if your project is large enough. The .oppyignore file is very important, since Oppy keeps a working memory of your codebase he won't be able to function well if you include lots of unrelated files. This applies to library folders like node_modules and venv as well as versioning folders like .git. Ignoring the build folder if you have one is also helpful. A good rule of thumb is to ignore all files that you yourself would never look at. The more you can focus Oppy's attention the better your results will be. If you have a .gitignore file OppyDev will copy its contents into the .oppyignore file automatically.

The next step is to add your folder's content to Oppy's memory. This will also trigger automatically when opening up a new project folder. I recommend picking a small or medium sized codebase to start with. Oppy will check the codebase first and estimate the cost of commiting your project to memory. Click the green button to continue and Oppy will begin reading through your codebase and committing the details to his project memory. You will see output in the bottom left of the application displaying the files as they are reviewed. You can cancel this process at any time by clicking the red cross box next to the output. This should be done in a minute or two but could take longer for a bigger codebase. You are now ready to begin coding!

For a general purpose guide on getting the most out of AI assisted development take a look at [Best Practices: A guide to coding with AI](https://medium.com/p/8e80b7714613).

# Basic Usage

OppyDev features a natural language interface. His responses will be very similar to what you would get out of chatGPT but with the added benefit of being able to search, review and edit all your files. If you ask a question about your codebase or instruct Oppy to write some code OppyDev will start going through a new task step by step so you can follow along. When getting a response from Oppy the green button will accept the changes and/or move Oppy to the next step in a task. The red button will discard changes or skip the next step in the task. Sometimes Oppy will enter the next recommended step into the prompt box with a prewritten prompt. If needed you can edit these prompts to add more detail, fix mistakes or to rephrase the prompt to get better results.

The prompt button in the bottom right can be clicked to send prompts. While Oppy is streaming a response this icon will switch to an [x]. You can click on the [x] to cancel a stream if you no longer need it. You can also send prompts by pressing enter.

When updating or referencing a file Oppy will always use the current version of the file you’re working on even if you haven’t saved it. This allows you to iterate quickly and try new things without having to update the original file until you are happy with the results.

As you use OppyDev Oppy will add references to your code which will appear as tabs below the prompt box. This means that Oppy is able to see these files whilst carrying out tasks. You can remove these files at any time by clicking the x in the top right of the tab. It's good to remove reference files that are no longer needed in order to save on token costs. Clicking on the tab will open the file in a popup so you can review and edit it directly.

Once Oppy has updated your file it will save automatically. Auto-saving can be turned off in the user menu if needed. After making an update you can revert the changes or add further updates yourself. After the initial update Oppy will the review the changes made and suggest additional updates if required. You can trigger the suggested update by clicking the revise button. If your project is generating logs he will also respond to error logs made after an update. Try testing your code immediately after an update, if Oppy sees an error posted in the logs he will update his proposed revision and suggest additional changes. Revising updates can also be turned off in the user menu. You can learn more about working with logs and OppyDev in the logs section.

A full guide on how to use OppyDev with video and images can be found at https://oppydev.ai/documentation#getting-started

# Interactive Diff

Its great to have the code written for you, but you’ll still need to be able to follow along whilst working with Oppy. Modern AIs are very capable but they still fall short in many ways. This is where the interactive diff can help smooth out the process.

Once you’ve asked Oppy to update the code you’ll get back the file you updated with a diff of the changes. The removed code is highlighted in red. The green code is the code that’s been added. You can make updates on top of these changes if something still needs adjustment. You won’t be able to make adjustments within the red code blocks since those will be removed anyway once the file is saved.

If you want to see what the file looks like without the diff markup click on the diff button.

A diff is always applied when you update a file, but you can turn this feature off in the user settings by hovering over the user menu icon in the bottom right of the application.

# Adding and Using Credit

The amount of credit you have left will appear in the credit display at the bottom right of the screen next to your username. If you don't have credit you will automatically be set into the free tier and it will display "free" instead of listing your credit. Click on the credit display to open a menu that you can use to add credit to your account. You can top up as much as you want or sign up for a regular subscription.
Your credit will count down gradually as you use the service based on your token usage. If you want to get a sense of how many tokens are being sent in each request use the token counter which appears to the left of the credit display. Hover over the token counter to get a break down of what is contributing to your total token count.

# Manual Controls

Everything done with Oppy automatically can also be done by hand. This is really useful if you know exactly what you want and don't want to go through the whole process of searching through the code and planning updates. Click on the pencil icon next to a file in the file nav to add it as a write file. It will appear in a code editor in the chat window. You can edit it and save it yourself, or you can write a prompt to have Oppy update that specific file. When a file is selected as a write file the prompt box will switch to a double lined border and say "Update File" above it and the prompt button will switch to a pencil icon. This means that any prompt you enter will be considered a command to update the write file. To resume normal usage click on the pencil icon on the file tab under the prompt box to return the file to a regular reference. You can also update a specific section of the code when a file is selected as a write file by selecting the section of the code you want to update. Once the text is selected the prompt box will switch to a thick dashed line border and say "Update by Selection" above it. This is useful for limiting the scope of the update and is also very helpful in big files and can speed up Oppy's response.

OppyDev tries to make the interaction between you and the AI as fluid as possible. For example, you can open a file, add a couple changes or some comments explaining what you want, then put in a prompt and ask Oppy to fill in the details. Once you get the response back you can edit right on top of the diff so you get exactly what you want before saving the file. If you need more changes to the same file, just type another prompt and Oppy will continue working until you get what you need. This whole process is saved in the conversation window so you can scroll back at any point to review your progress.

Manually add a file reference by clicking the file name in the file nav. Oppy will now be able to see this file when making updates or answering questions. Write and read files are added to a bar below the prompt input box. You can click on the pencil or paperclip icon to switch the file between a write file and a reference file. You can click on the x to remove it from the references.

You can add a new file by clicking the plus file button at the top of the file nav. A drop down text box will appear for you to enter the file name. Press enter and a blank file will open in the conversation window. You can also create a new file by asking Oppy to create it for you.

The refresh icon above the nav bar can be used to refresh the file nav if changes were made in the project folder outside of OppyDev's interface.

You can also select part of an open file and click the button that appears in the bottom right of the file editor to add just the selection for Oppy to reference. This can be very helpful when trying to reduce the token usage or focus Oppy's attention on a specific part of the code.

## Tasks

The AI agent that powers OppyDev works by stringing together different actions in order to complete a task. Each of these tasks and actions can be triggered by Oppy automatically or manually by the user by entering them into the prompt box. Enter the task into the prompt box with a colon at the end to trigger the task. Some tasks can accept additional input as instructions, others are run as is. When your cursor is in an empty prompt box you can press tab to cycle through several of the most useful tasks.

**ask oppy:** This will return an immediate response to your prompt from the AI. Typically this would be used when you want a quick answer to a question. Your project details and files references will also be visible to the AI when generating it's response.

**ask search:** This will search the web first to find sources that can help respond to your prompt before sending the results of the search to the AI to generate a response. The AI will identify relevant details in the online sources and then summarize the results in order to respond to your prompt. Chrome needs to be installed on your computer for this task to work.

**get docs:** This will write documentation to a .md file based on a URL you pass into the task. The file will automatically be saved into the documentation folder of your current project. You can then use this documentation as a reference when prompting Oppy to give him a better understanding of the coding environment you are working in. Chrome needs to be installed on your computer for this task to work.

**update codebase:** This will start a new coding task to update your codebase. Oppy will first search his long term memory to find which files he needs to be referenced to complete the task. He will keep suggesting files to reference until he feels that he has all the information he needs. Then he will make a plan to update the files and start stepping through the updates. He will give you a brief explanation of his reasoning during each step so you can follow along and correct any mistakes.

**plan code updates:** If you already have the files you want to work with referenced you can use this action to skip passed searching the memory and finding files to go straight to planning and executing updates. This will save time and costs.

**ask codebase:** Ask Oppy anything about your codebase. He will search his long term memory and then suggest which files need to be referenced to answer the question. As soon as he finds the answer he will reply to your question.

**remember codebase:** This will start reviewing your project folder and adding the files to Oppy's project memory. It will only add files it hasn't seen before. This can be useful to use if you've added several files to the codebase outside of using OppyDev. It can take a couple minutes to complete if there are a lot of new files. This action will be limited to 100 files in order to avoid incurring high costs from running through a very large amount of files. You can easily continue the process if this happens by clicking continue. This will also tell Oppy to search through his memory to check if any of the files in your project folder have been deleted and need to be removed from his memory.

**remove project memory:** This action will remove the project memory for the project folder that is currently opened by OppyDev. This can be useful if you want to save space in Oppy's memory or you want to remove your project details from Oppy's memory database.

# Monitoring Tools

**File Nav**
The file nav also gives useful information about how the AI is seeing your project. Oppy automatically ignores unknown file types to improve his focus and save token space. These files will be greyed in the file nav but can still be used as references by adding them manually. Files that are colored red are to big for Oppy to work with.

**Task Queue Display**
You can see the current task queue in the bottom right of the application by hovering over the current task display whilst a task is running. View documentation for all the OppyDev tasks and actions at https://github.com/OppyDevAI/OppyDev/blob/main/OppyDevActions.md.

**Token Monitor**
You can monitor how many tokens are being sent in each request by using the token counter which appears to the left of the credit display in the bottom right of the application. Hover over the token counter to get a break down of what is contributing to your total token count. This is an estimate of the total token count and may not always be 100% accurate.

**Log monitor**
OppyDev will automatically monitor any logs that are being generated by your project. This can be very useful for having him respond to errors or other output in the logs. The most recent log will be displayed in the bottom left, click on it to open the full log view. You can use the keyboard shortcut ctrl ` to open the log viewer. This will display all the logs in your project. OppyDev will automatically order your logs by timestamp allowing you to see a composite view of all the logs output by your project. It is recommended to use a JSON based logging system so you can specify the exact timestamp when the log was posted, if this does not exist it will timestamp all the logs read with the last time that the log file was updated.

OppyDev also outputs internal logs that include details you may find helpful when using the application. These details allow you to see relevant information that is being used to generate Oppy's responses. These logs can be helpful to better understand how the system works and are also very useful if you try to build your own custom plugins.

## Plugins

OppyDev allows you to create and share your own plugins that make use of OppyAgent, the AI agent that powers OppyDev. Find out more using the links listed below.

* [OppyDev Plugin Creation](https://github.com/OppyDevAI/OppyDev/blob/main/CustomPlugins.md) - Simple explainer to get started creating plugins
* [Action Definition Guide](https://github.com/OppyDevAI/OppyDev/blob/main/ActionDefinitionGuide.md) - Documentation on defining a new action for OppyAgent
* [OppyAgent Action Template](https://github.com/OppyDevAI/OppyDev/blob/main/plugins/IntroductionToPluginActions.js) - An example template that demonstrates how to define new actions
* [OppyDev Actions](https://github.com/OppyDevAI/OppyDev/blob/main/OppyDevActions.md) - A list of built in actions supported by OppyAgent

## Internal Logs

Every action will output a log line before its sent and when it returns. They will inlude the following information that is used to generate Oppy's responses.
- `Time`: A timestamp of when the log was created
- `Time Stamp`: A high definition version of the same timestamp
- `Message`: The log message
- `Object`: An object of the data getting passed to the agent. This includes the chat history, the task queue, file references and other shared action data.
- `Prompts`: An array of the prompts that get sent to the AI to generate a response. These can be very useful when debugging responses or trying to understand why the AI may not be generating the response that you expect.

## Log Fields

Regular text based logs will work as you would expect with OppyDev. To get the most out of the console you can also use OppyDev's JSON logging format. JSON logs get displayed in the OppyDev console with several features that make it easier to parse the logs and track what's happening. Use this format when logging with plugins to get the most out of the OppyDev logger.

- `time`: A timestamp of when the log was triggered.
- `name`: A name to associate with the log. It can be an application name, or a plugin name, or something else.
- `source.function`: The source function that is triggering the log.
- `source.file`: The file that is triggering the log.
- `source.line`: The line of code that is triggering the log.
- `msg`: The message for the log.
- `logFile`: The log file that the log has come from.
- `level`: The level of the log, e.g. ERROR, WARN, INFO, DEBUG.
- `channel`: The channel for the log, e.g. ios, android, web.
- `version`: The version of the application that triggered the log.
- `build_os`: The OS the log is being triggered in, e.g. OSX, Windows, Linux.
- `obj`: An object that accompanies the log. An abridged version of this will appear in the one line log message along with a detailed output of the whole object in the log body.
- `stack`: A stack trace of where the log was triggered.
- `prompts`: An array of the prompts that are sent to the AI. This is output to the console in a format that is easy to read.

# Shortcut Keys

Press "ctrl p" to open the file finder in the file nav

Press "ctrl `" to open the console and see logs output by OppyDev as well as a composite view of the logs output by your own project

Press Tab in the prompt box whilst it's empty to cycle through frequently used tasks and actions in order to trigger them manually

You can press the ⬆️ and ⬇️ key to cycle through your previous prompts

You can use "shift enter" to create a new line when prompting

When stepping through a task you can click enter to move to the next task instead of having to click the green button

Press "ctrl shift +" to zoom in and "ctrl -" to zoom out. Press "ctrl 0" to reset view to standard.

Undo with "ctrl z" and redo with "ctrl y"

Clear the session data with "ctrl r"

Do a hard reload of the application front end with "ctrl shift r" (This will not clear the app state entirely. Close and reopen the app if you want to do that.)

Open and close full screen mode with F11

# User Settings

You can access user settings by hovering over the user icon in the bottom right of the application

The following settings are available:

* Inference Model – Select which model you want to use for inference actions. This will be used when generating responses to questions or generating code.
* Agent Model – Select which model you want to use when running tasks and actions. These requests make use of function calling and expect formatted resonses.
* Tab Spacing - Select how many spaces you want to use in a tab. You can also select if you want to use tabs or spaces.
* OpenAI API Key - Add your OpenAI API key if here when using the free version of the app.
* Pinecone API Key - Enter your pinecone API key here.
* Pinecone Environment - Enter your pinecone environment here.
* Auto Show Diff - Turns on/off applying a diff to updated files.
* Capture Training Data - This will capture training data when you are making updates to the code that could be used in the future to finetune a customized AI model.
* Review & Revise Updates - This will turn on/off reviewing the code updates after they are made and suggesting additional changes.
* Auto-save Updates - This will turn on/off automatically saving the current file after Oppy makes an update to the code.
* Promo Code - If you have a promo code enter it here and then click the check circle button to submit the code and receive your promotional offer
* Set Personality - Make your coding session a little more entertaining by giving your AI coding partner a personality. Put it any description you want, such as the name of a fictional character or a description of the AI's desired personality and speaking style.
* Reset Session - This is the same as pressing "ctrl r". It will reset the current session by removing all referenced files, chat history, etc.
* Logout – Logs you out of the application. This will remove all saved data in the app including API keys.

# Limitations and Getting the Most out of Coding with Oppy

Oppy doesn’t have a memory of all the changes he’s made, just which files he’s worked on. This is done intentionally so that you can better direct Oppy’s attention by specifying the files you want him to respond to.

Oppy is not able to move, delete or rename your files.

When updating files it works best to phrase your update as an instruction. Don’t ask questions when you have a file selected for update, he will answer your question in the code file and it won’t run.

Try to keep your code files small. It will reduce costs, be faster and get you better result.

You can have OppyDev ignore files in your project folder by creating an .oppyignore file and listing them there as you would with .gitignore. It is important to ignore large unused folders like a build folder, or .git. It can also be useful to hide sensitive files that you don't want included in training data or sent to the LLM. You can also hide content from OppyDev by placing it inside a folder called oppyignore.

A good trick for helping Oppy to write better code is to grab the most recent documentation of any libraries you are using from the readme in their git repo and add it into the documentation folder for your project. You can also use the "get docs:" task to write documentation files into your codebase based on a URL.

Read our best practices guide for getting the most out of AI assisted development at https://medium.com/@Alex_OppyDev/best-practices-a-guide-to-coding-with-ai-8e80b7714613.

# Managing Databases and Other Data

OppyDev stores it's knowledge of your project in its memory using a vector database. To do this OppyDev stores metadata about your code files in a remote database hosted by Pinecone. It does not store the code itself, only the metadata.

If using your own pinecone database you can delete your pinecone database by logging into your pinecode account and going to "Indexes" and deleting "oppydev-codebase".

When using the paid version of OppyDev you can delete your vector DB by using the `remove project memory:` command in the project folder of the vector DB you want to remove.

The saved application data, local database and training data saved when using OppyDev can be deleted at any time by deleting it from the application data folder. Delete the whole folder if you are uninstalling OppyDev and want to clean up any data saved by the application. The application data folder can be found in the following locations:

Windows: `C:\Users\YOUR_ACCOUNT\AppData\Roaming\OppyDev`
Mac: `/Users/YOUR_ACCOUNT/Library/Application Support/OppyDev`

During the beta period paid pay as you go users are guaranteed 2000 indexes in their project memory. Paid subscribers are guaranteed 5000 indexes. This is usually more than enough to support several projects. This limit is not enforced, if we see that you are using up a lot of vector space we will reach out to you to find a solution. If a project memory has not been used in a long time and it is taking up a lot of space we may remove it. If this happens the project memory can be recreated very easily by reopening your project folder or using the "setup project memory:" command. If you require a lot of memory space for a very large project you may want to consider setting up your own pinecone DB and supplying your own API key. There is a free version available that gives you 100,000 vectors with the caveat that it will be cleaned up if it is not used within 7 days. In this case you can recreate the project memory simply by opening up the selected project folder or using the "setup project memory:". If at any point you want to resync the project state with Oppy's memory you can use the "remember codebase:" command.

# Attributions

- Node – https://nodejs.org/
- Electron – https://electronjs.org/
- Express – https://expressjs.com/
- Ace Editor – https://ace.c9.io/
- Webpack – https://webpack.js.org/
- html-loader – https://webpack.js.org/loaders/html-loader/
- copy-webpack-plugin – https://webpack.js.org/plugins/copy-webpack-plugin/
- LangChain - https://www.langchain.com/
- JS-Tiktoken - https://github.com/dqbd/tiktoken
- Readability - https://github.com/mozilla/readability