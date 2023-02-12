//import Counter from './components/Counter';
import React, {useState, useMemo} from 'react';

import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

import './styles/App.css';


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Javascript Description'},
    {id: 2, title: 'VUE JS', body: 'VUE JS Description'},
    {id: 3, title: 'React JS', body: 'React JS Description'},
    {id: 4, title: 'Node JS', body: 'Description Node JS '}
  ])

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    console.log('Sorted!')
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }, [selectedSort, posts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  // Получение поста из дочернего компонента
  const removePost = (post) => {
    console.log("I'm removePost")
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sorting"
          options={[
            {value: 'title', name: 'Title'},
            {value: 'body', name: 'Description'}
          ]}
        />
      </div>
      {posts.length !== 0
      ? <PostList remove={removePost} title = "Post's list" posts={sortedPosts}/>
      : <h1 style={{textAlign: 'center', paddingTop: '35px'}}> 
          Posts not found! 
        </h1>
      }
    </div>
  );
}

export default App;
