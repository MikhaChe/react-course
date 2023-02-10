//import Counter from './components/Counter';
import React, {useState} from 'react';

import PostList from './components/PostList';
import './styles/App.css';


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'Javascript VUE', body: 'Description'},
    {id: 3, title: 'Javascript React', body: 'Description'},
    {id: 4, title: 'Javascript Node JS', body: 'Description'}
  ])


  return (
    <div className="App">
      <PostList posts={posts}/>
    </div>
  );
}

export default App;
