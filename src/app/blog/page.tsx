import { Metadata } from 'next';
import connectDB from '../../lib/mongodb';
import { Blog as BlogModel, SEOConfig } from '../../lib/models';
import { BlogPage as BlogListComponent } from '../../components/BlogPage';
import { Footer } from '../../components/Footer';
import PageLayout from '../../components/PageLayout';

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB();
    const config: any = await SEOConfig.findOne({ configKey: 'global' }).lean();

    const siteName = config?.siteName || 'سلينجز ارت';
    const description = 'اكتشف أحدث المقالات والنصائح حول الأسقف الفرنسية المشدودة، الإضاءة المبتكرة، وعزل الصوت بجودة عالية في السعودية. متخصصون في سقف روز، باريسول، وألواح الأكوستيك.';

    return {
      title: `المقالات والأخبار | ${siteName} للاسقف الفرنسيه والعزل الصوتي`,
      description: description,
      keywords: ['مقالات سلينجز ارت', 'نصائح الاسقف الفرنسية', 'ديكورات اسقف 2025', 'عزل صوتي السعودية', 'تركيب باريسول'],
      openGraph: {
        title: `المقالات والأخبار | ${siteName}`,
        description: description,
        url: 'https://www.ceilingsart.sa/blog',
        siteName: siteName,
        locale: 'ar_SA',
        type: 'website',
        images: [config?.defaultOGImage || '/newlogo.png']
      },
      twitter: {
        card: 'summary_large_image',
        title: `المقالات والأخبار | ${siteName}`,
        description: description,
        site: config?.twitterHandle || undefined,
        images: [config?.defaultOGImage || '/newlogo.png']
      }
    };
  } catch (e) {
    return {
      title: 'المقالات والأخبار | سلينجز ارت',
    };
  }
}

export const dynamic = 'force-dynamic';

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs for archiving:", error);
    return [];
  }
}

export default async function BlogArchivePage() {
  const blogs = await getBlogs();

  return (
    <PageLayout>
      <BlogListComponent initialBlogs={blogs} />
      <Footer />
    </PageLayout>
  );
}
