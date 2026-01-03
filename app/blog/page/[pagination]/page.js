import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/app/components/paginations'
import { getAllBlogs, blogsPerPage } from '../../../utils/mdQueries'

export const metadata = {
    title: "ブログ",
    descrition: "これはブログページです",
}

//const Blog = async(props) => {
const Blog = async ({ params }) => {
	const { blogs, numberPages } = await getAllBlogs() 

	//const currentPage = props.params.pagination
 	const { pagination } = await params       // ← ここがポイント
  	const currentPage = Number(pagination)    // 文字列→数値

	const limitedBlogs = blogs.slice(
		(currentPage - 1) * blogsPerPage, 
		currentPage * blogsPerPage
	)

	return (
		<>
		<div className="wrapper">
			<div className="container">   
				<h1>Blog</h1>
				<p>エンジニアの日常生活をお届けします</p>
					{limitedBlogs.map((blog, index) => 
						<div key={index} className="blogCard"> 
							<div className="cardContainer">
								<h2>{blog.frontmatter.title}</h2>
								<p>{blog.frontmatter.excerpt}</p>
								<p>{blog.frontmatter.date}</p>
								<Link href={`/blog/${blog.slug}`}>Read More</Link>
							</div>
							<div className="blogImg">
								<Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} priority={true} />
							</div>
						</div>
					)}  
			</div>  
			<Pagination numberPages={numberPages} />
		</div>
		</> 
	)
}

export default Blog

export async function generateStaticParams() {
	const {numberPages} = await getAllBlogs()

	// let paths = []
	// Array.from({length:numberPages}).map((_,index) => paths.push(`/blog/page/${index + 2}`))
	// return paths

	// /blog が 1ページ目で、/blog/page/2 以降を静的生成する想定
  	return Array.from({ length: numberPages - 1 }, (_, index) => ({
    pagination: String(index + 2),
  }));
}