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
  const [body, setBody] = useState('');
  // const bodyInputRef = useRef();

  const addNewPost = (event) => {
    event.preventDefault();
    const newPost = {
      id: Date.now(),
      title, 
      body
    }
    setPosts([...posts, newPost]);
    setTitle('');
    setBody('');
  }


  return (
    <div className="App">
      <form>
        {/* Управляемый компонент, двухстороннее связывание */}
        <MyInput 
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text" 
          placeholder='name of post'
        />
        {/* Управляемый компонент, двухстороннее связывание */}
        <MyInput 
          value={body}
          onChange={e => setBody(e.target.value)}
          type="text" 
          placeholder='description of post'
        />
        <MyButton onClick={addNewPost}>Create</MyButton>
      </form>
      <PostList title = "Post\'s list" posts={posts}/>
    </div>
  );
}

export default App;
