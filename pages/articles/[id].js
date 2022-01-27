import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts.cjs";

export default function Articles({ articleData }) {
  return (
    <Layout>
      {articleData.title}
      <br />
      {articleData.id}
      <br />
      {articleData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds("articles");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articleData = await getPostData(params.id, "articles");
  return {
    props: {
      articleData,
    },
  };
}
