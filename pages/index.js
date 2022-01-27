import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts.cjs";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Date from "../components/date.js";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allarticlesData = getSortedPostsData("articles");

  return {
    props: {
      allPostsData,
      allarticlesData,
    },
  };
}

export default function Home({ allPostsData, allarticlesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>My self introduction</p>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <Link href={`/posts/${id}`}>
              <li className={utilStyles.listItem} key={id}>
                <a>{title}</a>
                <br />
                {id}
                <br />
                <Date dateString={date} />
              </li>
            </Link>
          ))}
        </ul>
      </section>
      <hr />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Articles</h2>
        <ul className={utilStyles.list}>
          {allarticlesData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
