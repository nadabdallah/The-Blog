export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
export interface Photo{
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
export const getRecentPosts = (posts: Post[], count: number): Post[] => {
  return [...posts]
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
};

export const getPosts = async (): Promise<Post[]> =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const posts: Post[] = await response.json();
    return posts;
}

export const getPostById = async (id: number): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch post with id ${id}`);
    }
    const post: Post = await response.json();
    return post;
}

export const getPhotos = async () :Promise<Photo[]> => { 
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    if (!response.ok) {
        throw new Error("Failed to fetch photos");
    }
    const photos: Photo[] = await response.json();
    return photos;
}

export const getUser = async(id:number): Promise<{name: string, email: string, username: string}> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user with id: ${id}`);
    }
    const user = await response.json();
    return { name: user.name, email: user.email, username: user.username };
}