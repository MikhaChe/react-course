//import Counter from './components/Counter';
import React, {useState} from 'react';

import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css';


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'Javascript VUE', body: 'Description'},
    {id: 3, title: 'Javascript React', body: 'Description'},
    {id: 4, title: 'Javascript Node JS', body: 'Description'}
  ])

  const [title, setTitle] = useState('');

  const addNewPost = (event) => {
    event.preventDefault();
    console.log(title);
  }


  return (
    <div className="App">
      <form>
        {/* Управляемый компонент */}
        <MyInput 
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text" 
          placeholder='name of post'
        />
        <MyInput type="text" placeholder='description of post'/>
        <MyButton onClick={addNewPost}>Create</MyButton>
      </form>
      <PostList title = "Post\'s list" posts={posts}/>
    </div>
  );
}

export default App;
