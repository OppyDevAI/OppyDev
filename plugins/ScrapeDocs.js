console.log('GetDocs Plugin Loaded');

const sanitizeFileName = (fileName) => {
  // Replace invalid file name characters with underscore
  return fileName.replace(/[<>:"/\\|?*]+/g, '-').toLowerCase();
};

actions['set update docs:'] = {
  // Action Properties
  type: 'set update docs:',
  name: 'Reviewing Documentation',
  actionID: 'review_docs',
  autonomy:'auto',
  loader:false,
  workspace: {
    read: (res, action) => {
    	
      const content = res.data.content[res.data.content.length-1]; // Use the last added content item
			
			if (!content.content) {
      	res.oppyError = 'No content was found when scraping'
      	return; // Do nothing if no content is returned
      }
			
			var fileName = '';
			
		  let contentDesc = `The following content was gathered so it can be used for creating documentation:`;
		  if (content?.siteName) {
		  	contentDesc += `\nSource Material Site Name: ${content.siteName}`;
		  	fileName += content.siteName;
		  }
		  if (content?.url) contentDesc += `\nSource Material URL: ${content.url}`;
		  if (content?.title) {
		  	contentDesc += `\nArticle Title: ${content.title}`;
		  	if (fileName) fileName += '_';
		  	fileName += content.title;
		  }
		  if (content?.byline) contentDesc += `\nAuthor: ${content.byline}`;
		  if (content?.publishedTime) contentDesc += `\nPublished On: ${content?.publishedTime}`;

			fileName += '_docs.md';
			
			// Sanitize the file name
			fileName = sanitizeFileName(fileName);
			
			const docsContent = `### DOCUMENTATION REFERENCE MATERIAL ###\n${contentDesc}\n\n\`\`\`\n${content.content}\n\`\`\`\n\n`;
			
      const taskList = res.taskList;
      let updateIndex = res.taskNum + 1;

      // Add a new "update file" action to the task list
      addNewAction(taskList, updateIndex, {
        type: 'update file:',
        input: 'Write documentation into '+fileName+' based on the content provided in the documentation reference material',
        model: { assets: { custom: docsContent } },
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
    {type: 'set update docs:'}
  ]
};