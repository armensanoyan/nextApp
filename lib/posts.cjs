import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
const articlesDirectory = path.join(process.cwd(), "articles");

function getSortedPostsData(directory) {
  if (directory === "articles") {
    directory = articlesDirectory;
  } else {
    directory = postsDirectory;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function getAllPostIds(directory = "posts") {
  if (directory === "articles") {
    directory = articlesDirectory;
  } else {
    directory = postsDirectory;
  }
  const fileNames = fs.readdirSync(directory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

async function getPostData(id, directory = "posts") {
  if (directory === "articles") {
    directory = articlesDirectory;
  } else {
    directory = postsDirectory;
  }
  const fullPath = path.join(directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const { remark } = await (await import("remark")).default;
  const html = (await (await import("remark-html")).default).default;

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

module.exports = {
  getPostData,
  getAllPostIds,
  getSortedPostsData,
};
