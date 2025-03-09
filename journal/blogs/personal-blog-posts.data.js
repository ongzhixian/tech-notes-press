// NOTE: createContentLoader is a data loader that is executed only at build time
// That's why it can use node modules like fs and path.
import fs from 'fs';
import path from 'path';
import { createContentLoader } from 'vitepress';

export default createContentLoader('journal/blogs/personal-blog-posts/*.md', {
    transform(rawData) {

        const projectPath = process.cwd(); // Yeah, a bit...

        // Use file system timestamps if frontmatter does not define timestamps
        // It is recommended to define timestamp in frontmatter because file systems timestamp will not work correctly if doing CI/CD
        rawData.map((value, index, array) => {
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

    let createdTimestamp = 0;

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
