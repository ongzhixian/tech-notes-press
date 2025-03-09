// NOTE: createContentLoader is a data loader that is executed only at build time
// That's why it can use node modules like fs and path.
import fs from 'fs';
import path from 'path';
import { createContentLoader } from 'vitepress';

export default createContentLoader('journal/blogs/tech-blog-posts/*.md', {
    transform(rawData) {

        const projectPath = process.cwd(); // Yeah, a bit...

        // Use file system timestamps if frontmatter does not define timestamps
        // It is recommended to define timestamp in frontmatter because file systems timestamp will not work correctly if doing CI/CD
        rawData.map((value) => {
            value.timestamp = value.frontmatter.timestamp ?? getFileSystemTimestamp(projectPath, value.url.replace('.html', '.md'));
        });

        // Sort results by timestamps
        return rawData.sort((a, b) => {
            return a.timestamp - b.timestamp;
        })
    }
});

// PRIVATE FUNCTIONS

function getFileSystemTimestamp(baseFullPath, fileRelativePath) {

    let createdTimestamp;

    const filePath = path.join(baseFullPath, fileRelativePath);
    const fileStat = fs.statSync(filePath);

    if (fileStat.birthtimeMs !== undefined) {
        createdTimestamp = fileStat.birthtimeMs;
    } else if (stats.ctimeMs !== undefined) {
        createdTimestamp = fileStat.ctimeMs;
    } else {
        createdTimestamp = fileStat.mtimeMs;
    }

    return Math.trunc(createdTimestamp);
}

// IGNORE; other reference code

// console.log(import.meta.filename);  // C:\src\github.com\ongzhixian\tech-notes-press\journal\blogs\tech-blog-posts.data.js
// console.log(import.meta.dirname);   // C:\src\github.com\ongzhixian\tech-notes-press\journal\blogs

// import { createContentLoader } from 'vitepress'
// import { createContentLoader } from 'vitepress';
// export default createContentLoader('/journal/blogs/tech-blog-posts/*.md', /* options */)

//import fs from 'node:fs';
//import { parse } from 'csv-parse/sync'

// export default {
//     watch: ['./tech-blog-posts/*.md'],
//     load(watchedFiles) {
//         // watchedFiles will be an array of absolute paths of the matched files.
//         // generate an array of blog post metadata that can be used to render
//         // a list in the theme layout
//         return watchedFiles.map((file) => {
//             return file;
//             // return parse(fs.readFileSync(file, 'utf-8'), {
//             //     columns: true,
//             //     skip_empty_lines: true
//             // })
//         })
//     }
// }

// import { createContentLoader } from 'vitepress';
//
// export default createContentLoader('tech-blog-posts/*.md') {
//
// }

// export default {
//     load() {
//         return {
//             hello: 'world'
//         }
//     }
// }

