import { useEffect, useState } from "react";
import PostsPresentation from "../presentation/PostsPresentation";
import { getPosts, Post, getRecentPosts, getUser } from "@/app/services/posts";
import { useRouter } from "next/navigation";

export interface ErrorType {
    api: string;
}

export default function PostsContainer() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<{ id: number; name: string; email: string; username: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const router = useRouter();

    const handlePosts = async ()=>{
        setLoading(true);
        try{
            const response = await getPosts();
            const newPosts = await getRecentPosts(response, 4);
            const userIds = Array.from(new Set(response.map((post: Post) => post.userId)));
            const userResponses = await Promise.all(userIds.map(async (id) => {
                const user = await getUser(id);
                return { id, ...user };
            }));
            setUsers(userResponses);
            setPosts(response);
            setRecentPosts(newPosts);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch posts";
            setError({ api: errorMessage });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handlePosts();
    }, []);

    const goToPost = (id: number) => {
        router.push(`/posts/${id}`);
    }
    return (
        <div>
            <PostsPresentation recentPosts={recentPosts} posts={posts} loading={loading} error={error} goToPost= {goToPost} users={users}/>
        </div>
    );
}