import React from 'react'
import {getPosts,getPostDetails} from "../../services";
import {PostDetail,Categories,RelatedPosts,Author, CommentsForm} from "../../components";
import {AdjacentPosts} from "../../sections";

const PostDetails = ({post}) => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-8">
                    <PostDetail post={post}/>
                    <Author author={post.author}/>
                    <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
                    <CommentsForm slug={post.slug}/>
                </div>
                <div className="col-span-4">
                    <div className="sticky top-8">
                        <RelatedPosts slug={post.slug} categories={post.categories.map(category => category.slug)}/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails

export async function getStaticProps({ params}) {
    const data = await getPostDetails(params.slug)
    return {
      props: {
        post: data,
        // relatedPosts: data.relatedPosts || [],
        // previousPost : data.previousPost || null,
        // nextPost : data.nextPost || null
      },
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()
    return {
        paths: posts.map(({node:{ slug }}) => (
            {
            params: { slug },
        })),
        fallback: true,
    }
}