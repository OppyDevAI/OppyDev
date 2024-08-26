console.log('GetDocs Plugin Loaded');

const sanitizeFileName = (fileName) => {
  // Replace invalid file name characters with underscore
  return fileName.replace(/[<>:"/\\|?*]+/g, '-').toLowerCase();
};

const ReviewDocs = actions['set update docs:'] = {
  // Action Properties
  type: 'set update docs:',
  name: 'Reviewing Documentation',
  actionID: 'review_docs',
  autonomy:'auto',
  loader:false,
  workspace: {
    read: (res, action) => {
    	
      const lastAction = getLastAction(res.taskNum, res.taskList);
			
			if (!lastAction.content) {
      	res.oppyError = 'No content was found when scraping'
      	return; // Do nothing if no content is returned
      }
			
			var fileName = '';
			
		  let contentDesc = `The following content was gathered so it can be used for creating documentation:`;
		  if (lastAction?.siteName) {
		  	contentDesc += `\nSource Material Site Name: ${lastAction.siteName}`;
		  	fileName += lastAction.siteName;
		  }
		  if (lastAction?.url) contentDesc += `\nSource Material URL: ${lastAction.url}`;
		  if (lastAction?.title) {
		  	contentDesc += `\nArticle Title: ${lastAction.title}`;
		  	if (fileName) fileName += '_';
		  	fileName += lastAction.title;
		  }
		  if (lastAction?.byline) contentDesc += `\nAuthor: ${lastAction.byline}`;
		  if (lastAction?.publishedTime) contentDesc += `\nPublished On: ${lastAction?.publishedTime}`;

			fileName += '_docs.md';
			
			// Sanitize the file name
			fileName = sanitizeFileName(fileName);
			
			const docsContent = `### DOCUMENTATION REFERENCE MATERIAL ###\n${contentDesc}\n\n\`\`\`\n${lastAction.content}\n\`\`\`\n\n`;
			
      const taskList = res.taskList;
      let updateIndex = res.taskNum + 1;

      // Add a new "update file" action to the task list
      addNewAction(taskList, updateIndex, {
        type: 'update file:',
        input: 'Write documentation into '+fileName+' based on the content provided in the documentation reference material',
        customReference: docsContent,
        data: {
          updateFile: {
            fileName: fileName,
            folderPath: 'marvinclient/src/documentation',
            text: null
          }
        }
      });
    },
  }
}

tasks['scrape docs:'] = {
  type: 'scrape docs:',
  name: 'Getting Documentation from Web URL',
  sayComplete: true,
  planList: [
    {type: 'scrape:'},
    ReviewDocs
  ]
};