// journal/blogs/personal-blog-posts.data.js
import fs from "fs";
import path from "path";
import { createContentLoader } from "file:///C:/src/github.com/ongzhixian/tech-notes-press/node_modules/vitepress/dist/node/index.js";
var personal_blog_posts_data_default = createContentLoader("journal/blogs/personal-blog-posts/*.md", {
  transform(rawData) {
    const projectPath = process.cwd();
    rawData.map((value, index, array) => {
      value.timestamp = value.frontmatter.timestamp ?? getFileSystemTimestamp(projectPath, value.url.replace(".html", ".md"));
    });
    return rawData.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
  }
});
function getFileSystemTimestamp(baseFullPath, fileRelativePath) {
  let createdTimestamp = 0;
  const filePath = path.join(baseFullPath, fileRelativePath);
  const fileStat = fs.statSync(filePath);
  if (fileStat.birthtimeMs !== void 0) {
    createdTimestamp = fileStat.birthtimeMs;
  } else if (stats.ctimeMs !== void 0) {
    createdTimestamp = fileStat.ctimeMs;
  } else {
    createdTimestamp = fileStat.mtimeMs;
  }
  return Math.trunc(createdTimestamp);
}
export {
  personal_blog_posts_data_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiam91cm5hbC9ibG9ncy9wZXJzb25hbC1ibG9nLXBvc3RzLmRhdGEuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxzcmNcXFxcZ2l0aHViLmNvbVxcXFxvbmd6aGl4aWFuXFxcXHRlY2gtbm90ZXMtcHJlc3NcXFxcam91cm5hbFxcXFxibG9nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcc3JjXFxcXGdpdGh1Yi5jb21cXFxcb25nemhpeGlhblxcXFx0ZWNoLW5vdGVzLXByZXNzXFxcXGpvdXJuYWxcXFxcYmxvZ3NcXFxccGVyc29uYWwtYmxvZy1wb3N0cy5kYXRhLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9zcmMvZ2l0aHViLmNvbS9vbmd6aGl4aWFuL3RlY2gtbm90ZXMtcHJlc3Mvam91cm5hbC9ibG9ncy9wZXJzb25hbC1ibG9nLXBvc3RzLmRhdGEuanNcIjsvLyBOT1RFOiBjcmVhdGVDb250ZW50TG9hZGVyIGlzIGEgZGF0YSBsb2FkZXIgdGhhdCBpcyBleGVjdXRlZCBvbmx5IGF0IGJ1aWxkIHRpbWVcclxuLy8gVGhhdCdzIHdoeSBpdCBjYW4gdXNlIG5vZGUgbW9kdWxlcyBsaWtlIGZzIGFuZCBwYXRoLlxyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gJ3ZpdGVwcmVzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb250ZW50TG9hZGVyKCdqb3VybmFsL2Jsb2dzL3BlcnNvbmFsLWJsb2ctcG9zdHMvKi5tZCcsIHtcclxuICAgIHRyYW5zZm9ybShyYXdEYXRhKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3RQYXRoID0gcHJvY2Vzcy5jd2QoKTsgLy8gWWVhaCwgYSBiaXQuLi5cclxuXHJcbiAgICAgICAgLy8gVXNlIGZpbGUgc3lzdGVtIHRpbWVzdGFtcHMgaWYgZnJvbnRtYXR0ZXIgZG9lcyBub3QgZGVmaW5lIHRpbWVzdGFtcHNcclxuICAgICAgICAvLyBJdCBpcyByZWNvbW1lbmRlZCB0byBkZWZpbmUgdGltZXN0YW1wIGluIGZyb250bWF0dGVyIGJlY2F1c2UgZmlsZSBzeXN0ZW1zIHRpbWVzdGFtcCB3aWxsIG5vdCB3b3JrIGNvcnJlY3RseSBpZiBkb2luZyBDSS9DRFxyXG4gICAgICAgIHJhd0RhdGEubWFwKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlLnRpbWVzdGFtcCA9IHZhbHVlLmZyb250bWF0dGVyLnRpbWVzdGFtcCA/PyBnZXRGaWxlU3lzdGVtVGltZXN0YW1wKHByb2plY3RQYXRoLCB2YWx1ZS51cmwucmVwbGFjZSgnLmh0bWwnLCAnLm1kJykpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTb3J0IHJlc3VsdHMgYnkgdGltZXN0YW1wc1xyXG4gICAgICAgIHJldHVybiByYXdEYXRhLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEudGltZXN0YW1wIC0gYi50aW1lc3RhbXA7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBQUklWQVRFIEZVTkNUSU9OU1xyXG5cclxuZnVuY3Rpb24gZ2V0RmlsZVN5c3RlbVRpbWVzdGFtcChiYXNlRnVsbFBhdGgsIGZpbGVSZWxhdGl2ZVBhdGgpIHtcclxuXHJcbiAgICBsZXQgY3JlYXRlZFRpbWVzdGFtcCA9IDA7XHJcblxyXG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYmFzZUZ1bGxQYXRoLCBmaWxlUmVsYXRpdmVQYXRoKTtcclxuICAgIGNvbnN0IGZpbGVTdGF0ID0gZnMuc3RhdFN5bmMoZmlsZVBhdGgpO1xyXG5cclxuICAgIGlmIChmaWxlU3RhdC5iaXJ0aHRpbWVNcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY3JlYXRlZFRpbWVzdGFtcCA9IGZpbGVTdGF0LmJpcnRodGltZU1zO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0cy5jdGltZU1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjcmVhdGVkVGltZXN0YW1wID0gZmlsZVN0YXQuY3RpbWVNcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3JlYXRlZFRpbWVzdGFtcCA9IGZpbGVTdGF0Lm10aW1lTXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1hdGgudHJ1bmMoY3JlYXRlZFRpbWVzdGFtcCk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUNqQixTQUFTLDJCQUEyQjtBQUVwQyxJQUFPLG1DQUFRLG9CQUFvQiwwQ0FBMEM7QUFBQSxFQUN6RSxVQUFVLFNBQVM7QUFFZixVQUFNLGNBQWMsUUFBUSxJQUFJO0FBSWhDLFlBQVEsSUFBSSxDQUFDLE9BQU8sT0FBTyxVQUFVO0FBQ2pDLFlBQU0sWUFBWSxNQUFNLFlBQVksYUFBYSx1QkFBdUIsYUFBYSxNQUFNLElBQUksUUFBUSxTQUFTLEtBQUssQ0FBQztBQUFBLElBQzFILENBQUM7QUFHRCxXQUFPLFFBQVEsS0FBSyxDQUFDLEdBQUcsTUFBTTtBQUMxQixhQUFPLEVBQUUsWUFBWSxFQUFFO0FBQUEsSUFDM0IsQ0FBQztBQUFBLEVBQ0w7QUFDSixDQUFDO0FBSUQsU0FBUyx1QkFBdUIsY0FBYyxrQkFBa0I7QUFFNUQsTUFBSSxtQkFBbUI7QUFFdkIsUUFBTSxXQUFXLEtBQUssS0FBSyxjQUFjLGdCQUFnQjtBQUN6RCxRQUFNLFdBQVcsR0FBRyxTQUFTLFFBQVE7QUFFckMsTUFBSSxTQUFTLGdCQUFnQixRQUFXO0FBQ3BDLHVCQUFtQixTQUFTO0FBQUEsRUFDaEMsV0FBVyxNQUFNLFlBQVksUUFBVztBQUNwQyx1QkFBbUIsU0FBUztBQUFBLEVBQ2hDLE9BQU87QUFDSCx1QkFBbUIsU0FBUztBQUFBLEVBQ2hDO0FBRUEsU0FBTyxLQUFLLE1BQU0sZ0JBQWdCO0FBQ3RDOyIsCiAgIm5hbWVzIjogW10KfQo=
