import PostPresentation from "../presentation/PostPresentation";
import { getPostById, Post } from "@/app/services/posts";
import { useEffect, useState } from "react";

interface PostContainerProps {
    id:number;
}

export interface ErrorType {
    api: string;
}

export default function PostContainer({id}: PostContainerProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | null>(null);

    const handlePost= async()=>{
        setLoading(true);
        try{
            const response = await getPostById(id);
            setPost(response);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch post";
            setError({ api: errorMessage });
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        handlePost();
    }, [id]);

    return (
        <div>
            <PostPresentation post={post} loading={loading} error={error}/>
        </div>
    );
}