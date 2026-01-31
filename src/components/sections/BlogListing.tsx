"use client";

import { useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { BlogPost, blogCategories, formatDate } from "@/lib/blogData";
import { motion, AnimatePresence } from "framer-motion";

interface BlogListingProps {
    posts: BlogPost[];
}

export function BlogListing({ posts }: BlogListingProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredPosts = activeCategory === "all"
        ? posts
        : posts.filter(p => p.category === activeCategory);

    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    return (
        <>
            {/* Categories Filter */}
            <section className="py-8 bg-white border-b border-neutral-100 sticky top-[72px] z-30 shadow-sm">
                <div className="container-custom">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {blogCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 border ${activeCategory === category.id
                                        ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/20"
                                        : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-primary-300 hover:bg-primary-50"
                                    }`}
                            >
                                <span>{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {activeCategory === "all" && featuredPost && (
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="mb-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-widest mb-4">
                                🌟 Öne Çıkan Yazı
                            </span>
                        </div>
                        <article className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 group">
                            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden">
                                <OptimizedImage
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>
                            <div className="p-8 lg:p-16">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {blogCategories.find((c) => c.id === featuredPost.category)?.name}
                                    </span>
                                    <span className="text-neutral-400 text-sm font-medium">
                                        {formatDate(featuredPost.date)}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 leading-tight group-hover:text-primary-600 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-neutral-600 mb-8 leading-relaxed text-lg">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-8 border-t border-neutral-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold shadow-lg">
                                            {featuredPost.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900">{featuredPost.author}</p>
                                            <p className="text-xs text-neutral-400 font-medium">{featuredPost.readTime}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/blog/${featuredPost.slug}`}
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-primary-600 transition-all shadow-xl"
                                    >
                                        Yazıyı Oku
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            {/* All/Other Posts Grid */}
            <section className="section bg-neutral-50 min-h-[500px]">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl md:text-3xl font-black text-neutral-900">
                            {activeCategory === "all" ? "Son Paylaşımlar" : `${blogCategories.find(c => c.id === activeCategory)?.name} Yazıları`}
                        </h2>
                        <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-neutral-200">
                            {filteredPosts.length} İçerik
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        <AnimatePresence mode="popLayout">
                            {(activeCategory === "all" ? otherPosts : filteredPosts).map((post) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={post.id}
                                    className="group bg-white rounded-[2rem] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <OptimizedImage
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                    {blogCategories.find((c) => c.id === post.category)?.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-xs font-bold text-neutral-400 mb-4 uppercase tracking-widest">
                                                <span>{formatDate(post.date)}</span>
                                                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-neutral-900 mb-4 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-neutral-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags.slice(0, 2).map((tag) => (
                                                        <span key={tag} className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-32 bg-white rounded-[3rem] border border-neutral-100 shadow-sm mt-8">
                            <span className="text-7xl mb-6 block">📚</span>
                            <h3 className="text-2xl font-black text-neutral-900 mb-2">Henüz Yazı Yok</h3>
                            <p className="text-neutral-500">Bu kategori için içeriklerimiz çok yakında burada olacak.</p>
                            <button
                                onClick={() => setActiveCategory("all")}
                                className="mt-6 px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:shadow-lg transition-all"
                            >
                                Tüm Yazılara Dön
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
