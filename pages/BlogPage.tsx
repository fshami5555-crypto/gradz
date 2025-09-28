import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { BlogPost } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img className="h-56 w-full object-cover" src={post.imageUrl} alt={post.title} />
            <div className="p-6">
                <h3 className="text-2xl font-bold text-brand-blue mb-2">{post.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{t('blog.by')} {post.author} {t('blog.on')} {post.createdAt}</p>
                <p className="text-slate-600 mb-6">{post.content.substring(0, 120)}...</p>
                <Link to={`/blog/${post.id}`} className="font-semibold text-brand-turquoise hover:text-brand-orange transition-colors">
                    {t('blog.readMore')} &rarr;
                </Link>
            </div>
        </div>
    );
}

const BlogPage: React.FC = () => {
    const { blogPosts } = useContent();
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-brand-blue">{t('blog.title')}</h2>
                <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;