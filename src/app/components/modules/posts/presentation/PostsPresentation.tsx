import { Post, Photo } from "@/app/services/posts";
import Container from "@/app/components/layout/Container";
import { Card, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/app/components/ui/pagination";
import { Button } from "@/app/components/ui/button";

interface PostPresentationProps{
    users: { id: number; name: string; email: string; username: string }[];
    recentPosts: Post[];  
    posts: Post[];
    loading: boolean;
    error: {api:string} | null;
    goToPost: (id: number) => void;
}

export default function PostsPresentation({ recentPosts, posts, loading, error, goToPost, users}: PostPresentationProps) {
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

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


  return (
    <div className="px-6 text-[var(--text)]">
        <div className="flex flex-col items-center gap-4 my-8">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            <h1 className="text-6xl font-extrabold tracking-tight text-center">
                THE BLOG
            </h1>
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div>
            <Container className="p-6">
                <h2 className="text-2xl font-bold mb-4 ">Recent posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 max-w-7xl mx-auto">
                    {recentPosts.map((post) => {
                        const user = users.find((u) => u.id === post.userId);
                        return(
                        <Card key={post.id} className="w-full bg-background">
                            <CardContent className="flex flex-col justify-between h-full pl-6 ">
                                <Image
                                    src={`https://picsum.photos/seed/${post.id}/300/200`||"/placeholder.svg"}
                                    alt={post.title}
                                    width={300}
                                    height={200}
                                    className="rounded-lg"
                                />
                                {user && <p className="mt-2 text-sm text-[var(--secondary)]"> {user.name}</p>}
                                <h3 className="my-2 font-semibold text-xl cursor-pointer hover:underline transition-all duration-150" onClick={() => goToPost(post.id)}>{post.title}</h3>
                                <p className="text-[var(--primary)] mb-1">{post.body}</p>
                                <div className="flex justify-end mt-auto">
                                    <Button variant="ghost" size="sm" className="text-[var(--secondary)] cursor-pointer"  onClick={() => goToPost(post.id)}>
                                    Read more →
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )})}
                </div>
            </Container>
        </div>
        <div>
            <Container className="p-6">
                <h2 className="text-2xl font-bold mb-4 ">All blog posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 max-w-7xl mx-auto">
                    {paginatedPosts.map((post) => {
                        const user = users.find((u) => u.id === post.userId);
                        return(
                            <Card key={post.id} className="w-full bg-background" >
                                <CardContent className="flex flex-col justify-between h-full pl-6">
                                    <Image
                                        src={`https://picsum.photos/seed/${post.id}/300/200`||"/placeholder.svg"}
                                        alt={post.title}
                                        width={300}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                    {user && <p className="mt-2 text-sm text-[var(--secondary)]"> {user.name}</p>}
                                    <h3 className="my-2 font-semibold text-xl cursor-pointer hover:underline transition-all duration-150" onClick={() => goToPost(post.id)}>{post.title}</h3>
                                    <p className="text-[var(--primary)] text mb-1">{post.body}</p>
                                    <div className="flex justify-end mt-auto">
                                        <Button variant="ghost" size="sm" className="text-[var(--secondary)] cursor-pointer"  onClick={() => goToPost(post.id)}>
                                        Read more →
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                <div className="flex flex-col items-center mt-8">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    {/* Mobile*/}
                        <div className="flex justify-between items-center w-full mt-4 md:hidden px-2">
                            <Button variant="ghost"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}>
                                ← Prev
                            </Button>
                            <span className="text-sm text-muted-foreground">
                            Page {page} of {totalPages}
                            </span>
                            <Button variant="ghost"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                                Next →
                            </Button>
                        </div>
                        {/* Desktop*/}
                    <Pagination className="hidden md:flex mt-4">
                        <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                            size="default"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-disabled={page === 1}
                            className="cursor-pointer"
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i + 1}>
                            <PaginationLink
                                size="default"
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                                className="cursor-pointer"
                            >
                                {i + 1}
                            </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                            size="default"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            aria-disabled={page === totalPages}
                            className="cursor-pointer"
                            />
                        </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </Container>
        </div>
    </div>
    );
}