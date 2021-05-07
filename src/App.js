import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { MenuItem } from './MenuItem';
import { useSelector } from 'react-redux';

import BloggPost from './BloggPost';
import BloggList from './BloggList';

import Users, { User } from './Users.js';

const BlogMenuList = ({ posts }) => {
  const postsWithTimefix = posts
    .map(({ times, ...post }) => ({
      ...post,
      times: {
        created: times.created,
        modified: times.modified ? Date.parse(times.modified) : undefined,
        posted: times.posted ? Date.parse(times.posted) : undefined,
      }
    }))
    .map(({ times, ...post }) => {
      return ({
      ...post,
      times,
      last: Math.max(...Object.values(times).filter(t => t !== undefined)),
    })});
    
    postsWithTimefix.sort(({ last: alast }, { last: blast }) => alast - blast);
    //console.table(postsWithTimefix.map(v => ({ id: v.blogPostId, last: v.last, ...v.times })))
    

    return (
      <ul>
        {postsWithTimefix.map(({ blogPostId, title, last }) => (
          <MenuItem bloggPostId={blogPostId} title={title} lastTime={last}></MenuItem>
        ))}
      </ul>
    );
};


const App = () => {
  const users = useSelector((state) => {
    return state.blogreducer
      .map((v) => v.author)
      .map((v) => ({ 
        name: v.name ? v.name : `${v.first} ${v.lastName}`, 
        id: v.id 
      }))
      .reduce((a, v) => a.map(v => v.name).includes(v.name) ? [...a] : [...a, v], []);
  });

  const { posts } = useSelector(state => ({
    posts: state.blogreducer,
  }));

  return (
    <Router>
      <ul>
        <li><Link to="/users">All Users</Link></li>
        <li><ul>
          {users.map(({id, name}) => <li><Link to={`users/${id}`}>{`${name}`}</Link></li>)}
        </ul></li>
        <li><Link to="/">All Blog posts</Link></li>
        <li>
          <BlogMenuList posts={posts} />
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<BloggList />} />
        <Route path="post">
          <Route path="/" element={<Navigate to='/' />} />
          <Route path=":id" element={<BloggPost />} />
        </Route>
        <Route path='users'>
          <Route path="/" element={<Users users={users} />} />
          <Route path=":userid" element={<User />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default App;
