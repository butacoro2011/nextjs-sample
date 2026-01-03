import Image from "next/image"
import ReactMarkdown from "react-markdown"
import PrevNext from "@/app/components/prevNext"
import { getAllBlogs,getSingleBlog } from "@/app/utils/mdQueries"


//const SingleBlog = (props) => {
const SingleBlog = async ({ params, searchParams }) => {
	const p = await params
	const sp = await searchParams
	//console.log({ params: p, searchParams: sp })

	const {singleDocument} = await getSingleBlog(p)

	const {blogs} = await getAllBlogs()
	const prev = blogs.filter(blog => blog.frontmatter.id === singleDocument.data.id - 1)
	const next = blogs.filter(blog => blog.frontmatter.id === singleDocument.data.id + 1)


	return (
        <>
            <div className="img-container">
                <Image src={singleDocument.data.image} alt="blog-image" height={500} width={1000} quality={90} priority={true} />
            </div>
            <div className="wrapper">
                <div className="container">               
                    <h1>{singleDocument.data.title}</h1>
                    <p>{singleDocument.data.date}</p> 
                    <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
                </div> 
				<PrevNext prev={prev} next={next} />
            </div>
        </>
	)
}

export default SingleBlog

export async function generateStaticParams() {

	const { blogs } = await getAllBlogs()
	//const paths = blogs.map((blog) => `/${blog.slug}`)
	//return paths
	const paths = blogs.map((blog) => ({ slug: blog.slug })) //修正
	return paths //修正
}