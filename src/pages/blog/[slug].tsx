import { BlogDetailPage } from '../../components/BlogDetailPage';
import { LanguageProvider } from '../../contexts/LanguageContext';

export default function BlogPost() {
  return (
    <LanguageProvider>
      <BlogDetailPage />
    </LanguageProvider>
  );
}
