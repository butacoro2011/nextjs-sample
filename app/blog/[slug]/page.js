import Image from "next/image"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"

async function getSingleBlog(params) {
	console.log("***")
	console.log(params)
	const { slug } = params
	console.log(slug)
	const data = await import(`../../../data/${slug}.md`)
	const singleDocument = matter(data.default)

	return {
		singleDocument: singleDocument
	}
}

//const SingleBlog = (props) => {
const SingleBlog = async ({ params, searchParams }) => {
	const p = await params
	const sp = await searchParams
	console.log({ params: p, searchParams: sp })

	const {singleDocument} = await getSingleBlog(p)

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
            </div>
        </>
	)
}

export default SingleBlog

export async function generateStaticParams() {
	async function getAllBlogs() {
		const files = fs.readdirSync(path.join("data"))
		const blogs = files.map((fileName) => {
			const slug = fileName.replace(".md", "")
			const fileData = fs.readFileSync(
				path.join("data", fileName),
				"utf-8"
			)
			const { data } = matter(fileData)
			return {
				frommatter: data,
				slug: slug
			}
		})
		return {
			blogs: blogs
		}
	}

	const { blogs } = await getAllBlogs()
	//const paths = blogs.map((blog) => `/${blog.slug}`)
	//return paths
	const paths = blogs.map((blog) => ({ slug: blog.slug })) //修正
	return paths //修正
}