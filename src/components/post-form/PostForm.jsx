import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData) {
            alert("Missing User Data! Please login again.");
            return;
        }

        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            alert("Error: " + error.message);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto">
            
            {/* --- LEFT COLUMN: Editor --- */}
            <div className="w-full md:w-2/3 flex flex-col gap-6">
                
                {/* Title & Slug */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="mb-4">
                        <Input
                            placeholder="Title of your story..."
                            className="text-3xl md:text-4xl font-serif font-bold text-gray-900 border-none px-0 placeholder:text-gray-300 focus:ring-0 bg-transparent w-full"
                            {...register("title", { required: true })}
                        />
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-400 bg-gray-50 rounded px-3 py-2">
                        <span className="mr-2 text-gray-500 font-mono">slug:</span>
                        <input
                            type="text"
                            className="bg-transparent border-none focus:ring-0 w-full text-gray-600 font-mono text-xs md:text-sm"
                            placeholder="url-slug-here"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>
                </div>

                {/* RTE Editor */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm min-h-[500px]">
                    <RTE 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")} 
                    />
                </div>
            </div>

            {/* --- RIGHT COLUMN: Sidebar --- */}
            <div className="w-full md:w-1/3 flex flex-col gap-6">
                
                {/* 1. Featured Image Panel (Now on Top) */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        Featured Image
                    </h3>
                    
                    {post && post.featuredImage && (
                        <div className="w-full mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}
                    
                    <Input
                        label={post ? "Change Image" : "Upload Cover"}
                        type="file"
                        className="bg-gray-50 border border-gray-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>

                {/* 2. Publishing Panel (Now Below Image - Sticky) */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                        Publishing
                    </h3>
                    
                    <div className="mb-6">
                        <Select
                            options={["active", "inactive"]}
                            label="Visibility"
                            className="bg-gray-50 border border-gray-200 mb-4"
                            {...register("status", { required: true })}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-emerald-600" : "bg-black"} 
                        className="w-full py-3 font-medium transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                        {post ? "Update Story" : "Publish Story"}
                    </Button>
                </div>

            </div>
        </form>
    );
}