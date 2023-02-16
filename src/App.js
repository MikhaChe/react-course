//import Counter from './components/Counter';
import React, {useEffect, useState} from 'react';
import {usePosts} from './hooks/usePost.js';

import './styles/App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import PostService from './API/PostService.js';
import Loader from './components/UI/Loader/Loader.jsx';


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Javascript Description'},
    {id: 2, title: 'VUE JS', body: 'VUE JS Description'},
    {id: 3, title: 'React JS', body: 'React JS Description'},
    {id: 4, title: 'Node JS', body: 'Description Node JS '}
  ])

  const [filter, setFilter] = useState({sort:'', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostLoading, setIsPostLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    setIsPostLoading(true);
    
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostLoading(false);
    }, 1000) 
    
  }

  // Получение поста из дочернего компонента
  const removePost = (post) => {
    console.log("I'm removePost")
    setPosts(posts.filter(p => p.id !== post.id));
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
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} title = "Post's list" posts={sortedAndSearchedPosts}/> 
      }
    </div>
  );
}

export default App;
