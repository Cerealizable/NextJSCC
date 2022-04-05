import {server} from '../../../config'
import Meta from '../../../components/Meta'
import Link from 'next/link'
// import {useRouter} from 'next/router'

const article = ({article}) => {
    // const router = useRouter();
    // const {id} = router.query;

    return(
        <>
            <Meta title={article.title} />
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href='/'>Go back</Link>
        </>
    )
}

// uses api from /pages
export const getStaticProps = async(context) =>{
    const res = await fetch(`${server}/api/articles/${context.params.id}`);

    const article = await res.json();

    return {
        props:{
            article
        }
    };
};

export const getStaticPaths = async () =>{
    const res = await fetch(`${server}/api/articles`);

    const articles = await res.json();

    const ids = articles.map(article => article.id);
    const paths = ids.map(id=> ({params: {id: id.toString()}}));

    return {
        paths,
        fallback: false 
    };
}

// // uses json placeholder
// // orginally used as getServerSideProps but now updated to be getStaticProps to work with getStaticPaths
// export const getStaticProps = async(context) =>{
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);

//     const article = await res.json();

//     return {
//         props:{
//             article
//         }
//     };
// };

// export const getStaticPaths = async () =>{
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

//     const articles = await res.json();

//     const ids = articles.map(article => article.id);
//     const paths = ids.map(id=> ({params: {id: id.toString()}}));

//     return {
//         paths,
//         fallback: false // returns 404 page for data not found
//     };
// }

export default article;