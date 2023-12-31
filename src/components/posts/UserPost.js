import { useEffect, useState } from "react";
import { deletePost, viewUserPost } from "../../managers/posts";
import { getCategories } from "../../managers/categories"
import { useNavigate, useParams } from "react-router-dom";


export const UserPost = ({ token }) => {
  const [userPosts, setUserPosts] = useState([]); // Change 'posts' to 'userPosts'
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const { postId } = useParams()

  useEffect(() => {
    viewUserPost({ token }).then((postsData) => setUserPosts(postsData)); // Pass token as an object
    getCategories().then(categoriesData => setCategories(categoriesData))
  }, [token]);


  const deleteButton = (postId) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm("Are you sure you want to delete this post?");
      if (shouldDelete) {
        deletePost(postId).then(() => {
          setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        });
      }
    };

    return (
      <button onClick={handleDelete}>
        Delete
      </button>
    );
  };


  const editButton = (post) => {
    return (
      <button onClick={() => { navigate(`/my-posts/${post.id}/edit`) }}>
        Edit
      </button>
    )
  }


  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>My Posts</h1>
      <article className="posts">
        {userPosts.map((post) => {
          const category = categories.find((category) => category.id === post.category_id) || {};
          return (
            <section className="post" key={post.id}>
              <div>==============================</div>
              <div>Title: {post.title}</div>
              <div>Category: {category.label}</div>
              <footer>{deleteButton(post.id)}</footer>
              <footer>{editButton(post)}</footer>

            </section>
          );
        })}
      </article>
    </div>
  );
};