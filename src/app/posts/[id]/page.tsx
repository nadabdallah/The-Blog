"use client";
import { useParams } from "next/navigation";
import PostContainer from "@/app/components/modules/posts/container/PostContainer";

export default function PostPage(){
    const params = useParams();
    const idParam = params?.id;
    const id = typeof idParam === "string" ? Number(idParam) : NaN;
    return (
        <PostContainer id={id}/>
    );
}