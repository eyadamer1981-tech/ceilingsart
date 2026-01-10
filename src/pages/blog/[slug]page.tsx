// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import connectDB from '../../lib/mongodb';
import { Blog } from '../../lib/models';

interface BlogProps {
  blog: {
    title: string;
    content: string;
    processedContent?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
}

export default function BlogPage({ blog }: BlogProps) {
  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || ''} />
        <meta name="keywords" content={blog.metaKeywords?.join(',') || ''} />
      </Head>
      <main style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{blog.title}</h1>
        <article
          dangerouslySetInnerHTML={{ __html: blog.processedContent || blog.content }}
          style={{ lineHeight: '1.8', fontSize: '1rem' }}
        />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const blogs = await Blog.find();
  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // لو المقال جديد هيتولد عند الطلب
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await connectDB();
  const slug = params?.slug as string;

  const blog = await Blog.findOne({ slug });
  if (!blog) {
    return { notFound: true };
  }

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)), // تحويل Mongoose document إلى JSON عشان Next.js
    },
    revalidate: 60, // يعيد توليد الصفحة كل 60 ثانية لتحديث المحتوى
  };
};
