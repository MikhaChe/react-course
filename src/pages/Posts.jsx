import React, { useEffect, useState } from 'react';
import PostService from '../API/PostService';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from '../components/PostForm.jsx'
import PostFilter from '../components/PostFilter.jsx'
import PostList from '../components/PostList.jsx'
import { useFetching } from '../hooks/useFetch';
import {usePosts} from '../hooks/usePost'
import { getPagesCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import Loader from '../components/UI/Loader/Loader';




function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPagesCount(totalCount, limit));
  });

  //В useEffect вторым аргументом в качестве элемента массива подставлено page для своевременного изменения этого состояния  
  useEffect(() => {
    fetchPosts();
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  // Получение поста из дочернего компонента
  const removePost = (post) => {
    console.log("I'm removePost")
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Add post!
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
        
      />
      {postError &&
        <h1>${postError} is error!! </h1>
      }
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} title = "Post's list" posts={sortedAndSearchedPosts}/> 
      }
    </div>
  );
}

export default Posts;