import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import ShareButtons from '../components/ui/ShareButtons';
import { useLanguage } from '../contexts/LanguageContext';

const BlogPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { blogPosts } = useContent();
    const { t } = useLanguage();
    
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-brand-blue">{t('blog.postNotFound')}</h2>
                    <Link to="/blog" className="text-brand-turquoise hover:underline mt-4 inline-block">
                        &larr; {t('blog.backToBlog')}
                    </Link>
                </div>
            </div>
        );
    }

    const postUrl = window.location.href;

    return (
        <div className="container mx-auto px-6 py-12">
             <Link to="/blog" className="text-brand-turquoise hover:underline mb-6 inline-block">
                &larr; {t('blog.backToAllPosts')}
            </Link>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img className="h-96 w-full object-cover" src={post.imageUrl} alt={post.title} />
                <div className="p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                        <p className="text-slate-500">
                            {t('blog.by')} <span className="font-semibold">{post.author}</span> {t('blog.on')} {post.createdAt}
                        </p>
                        <ShareButtons title={post.title} url={postUrl} />
                    </div>
                    <div className="prose prose-lg max-w-none mt-8 text-slate-700 whitespace-pre-wrap border-t pt-8">
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;