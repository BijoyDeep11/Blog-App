import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Check if the current user is the author
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                {/* 1. THE ARTICLE HEADER (Title & Actions) */}
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    
                    
                    {isAuthor && (
                        <div className="flex justify-center gap-4 mt-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-gray-100" className="text-gray-900! hover:bg-gray-200 border border-gray-300 transition-all">
                                    Edit Story
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-50" className="text-red-600! hover:bg-red-100 border border-red-200 transition-all" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* 2. CINEMATIC HERO IMAGE */}
                <div className="w-full max-w-5xl mx-auto mb-12 relative shadow-lg rounded-2xl overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-auto max-h-[600px] object-cover"
                    />
                </div>

            
                <div className="max-w-3xl mx-auto">
                    <div className="browser-css font-sans text-lg text-gray-800 leading-relaxed space-y-4">
                        {parse(post.content)}
                    </div>
                </div>
                
                {/* 4. FOOTER DIVIDER */}
                <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-400 italic font-serif">Thanks for reading.</p>
                </div>
            </Container>
        </div>
    ) : null;
}