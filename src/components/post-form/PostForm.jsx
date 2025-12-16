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
        <form onSubmit={handleSubmit(submit)} className="flex flex-col-reverse md:flex-row flex-wrap gap-8 py-8">
            
            {/* LEFT COLUMN: The Writing Canvas (2/3 width) */}
            <div className="w-full md:w-2/3">
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    
                    {/* 1. Title Input - Styled as a Headline */}
                    <div className="mb-6">
                        <Input
                            placeholder="Title of your story..."
                            className="text-4xl font-serif font-bold text-gray-900 border-none px-0 placeholder:text-gray-300 focus:ring-0 bg-transparent w-full"
                            {...register("title", { required: true })}
                        />
                    </div>

                    {/* 2. Slug - Subtle & Technical */}
                    <div className="mb-6 flex items-center text-sm text-gray-400 font-mono bg-gray-50 rounded px-3 py-2">
                        <span className="mr-2 text-gray-500">slug:</span>
                        <input
                            type="text"
                            className="bg-transparent border-none focus:ring-0 w-full text-gray-600"
                            placeholder="url-slug-here"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>

                    {/* 3. Editor */}
                    <div className="min-h-[500px] prose prose-lg max-w-none">
                        <RTE 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")} 
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: The Publishing Sidebar (1/3 width) */}
            <div className="w-full md:w-1/3 space-y-6">
                
                {/* Panel 1: Status & Action */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        Publishing
                    </h3>
                    
                    <div className="mb-4">
                        <Select
                            options={["active", "inactive"]}
                            label="Visibility"
                            className="mb-4 bg-gray-50 border border-gray-200"
                            {...register("status", { required: true })}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-emerald-600" : "bg-black"} 
                        className="w-full py-3 font-medium transition-all hover:shadow-lg"
                    >
                        {post ? "Update Story" : "Publish Story"}
                    </Button>
                </div>

                {/* Panel 2: Featured Image */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        Featured Image
                    </h3>
                    
                    {post && (
                        <div className="w-full mb-4 rounded-lg overflow-hidden border border-gray-200">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-40 object-cover"
                            />
                        </div>
                    )}
                    
                    <Input
                        label={post ? "Change Image" : "Upload Cover"}
                        type="file"
                        className="bg-gray-50 border border-gray-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>
            </div>
        </form>
    );
}