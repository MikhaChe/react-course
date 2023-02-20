import React from 'react';
import { useHistory } from 'react-router-dom';
import MyButton from './UI/button/MyButton';
// import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {

  // react-router-dom версии 6
  // const navigate = useNavigate();

  // react-router-dom версии 5 
  const router = useHistory();

  return (
    <div>
      <div className='post'>
        <div className='post__content'>
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
            {props.post.body}
          </div>
        </div>
        <div className='post__btns'>

          {/* react-router-dom версии 6 */}
          {/* <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open</MyButton> */}

          {/* react-router-dom версии 5 */}
          <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>Open</MyButton>
          <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
        </div>
      </div>
    </div>
  );
};

export default PostItem;