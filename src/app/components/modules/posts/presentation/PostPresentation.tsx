import { Post } from "@/app/services/posts";
import Image from "next/image";

interface PostPresentationProps {
    post: Post | null;
    loading : boolean;
    error: {api:string} | null;

}

export default function PostPresentation({post, loading, error}: PostPresentationProps) {
    if (loading) {
        return (
            <div className="flex flex-col gap-2 justify-center items-center pt-50">
                <div className="animate-spin rounded-full h-15 w-15 border-t-2 border-b-2 border-primary" /> 
                <p className="text-[var(--primary)] text-lg">Loading....</p>
            </div>
        );
    }
    if (error){
        return <p className="text-red-500 text-lg flex justify-center items-center pt-70">Failed to load posts</p>;
    }
    return(
        <div className="text-[var(--text)] px-4 py-8 max-w-4xl mx-auto ">
            <h1 className="text-center font-bold text-2xl mb-6 ">{post?.title}</h1>
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
                <Image
                src={`https://picsum.photos/seed/${post?.id}/1200/600`}
                alt={post?.title || "Post Image"}
                fill
                className="object-cover"
                />
            </div>
            <div className="text-lg">
                <p >{post?.body}</p>
            </div>
        </div>
    );
}