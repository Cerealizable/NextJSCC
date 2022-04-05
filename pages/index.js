import Head from 'next/head';
import ArticleList from '../components/ArticleList'

export default function home({articles}) {
  return(
    <div>
      <Head>
        <title>WebDev Newz</title>
        <meta name="keywords" content="im great for SEO!"/>
      </Head>
      
      <ArticleList articles={articles}/>
    </div>
  )
}

// fetch data 
export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}