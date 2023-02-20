import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetch';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching( async (id) => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  })  
  const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
    const response = await PostService.getCommentsByPostId(params.id);
    setComments(response.data);
  })  

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, [])

  return (
    <div>
      <h1>You are in the post's ID: {params.id} location</h1>
      {isLoading
        ? <Loader/>
        : <div>{post.id}. {post.title}</div>
      }
      <br/>
      <h2>
        Comment's by the current post
      </h2>
      {isComLoading
        ? <Loader/>
        : <div>
            {comments.map(comm => 
              <div
                key={comm.id} 
                style={{marginTop: 15}}>
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
              </div>
            )}
          </div>
      }
    </div>
  );
};

export default PostIdPage;