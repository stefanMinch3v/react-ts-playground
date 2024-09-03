import { ReactNode, useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import imageSrc from "./assets/data-fetching.png"
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  body: string;
  title: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[] | undefined>()
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

      try {
        const response = await get<RawDataBlogPost[]>('https://jsonplaceholder.typicode.com/posts');
      
        const blogPosts: Array<BlogPost> = response.map(x => {
          return {
            id: x.id,
            title: x.title,
            text: x.body
          }
        });
  
        setFetchedPosts(blogPosts);
      } catch (err) {
        setError((err as Error).message);
      }

      setIsFetching(false);
    }
    
    fetchPosts();
  }, []);

  let content: ReactNode;

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />
  }
  
  if (isFetching) {
    content = <p id="loading-fallback">Fetching...</p>
  }

  if (error) {
    content = <ErrorMessage text={error} />
  }

  return <main>
    <img src={imageSrc}></img>
    { content }
  </main>;
}

export default App;
