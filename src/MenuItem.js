import { BrowserRouter as Router, Link } from 'react-router-dom';
import React from 'react';
import { normalizeTime } from './utilities.js';
import {useSelector} from 'react-redux';

import { findLatestTime } from './utilities.js';

export const MenuItem = ({bloggPostId}) => {
    const post = useSelector(state => state.blogreducer.find(post => post.blogPostId === bloggPostId));
    const last = findLatestTime(Object.values(post.times).map((v) => { /*console.log(v);*/ return v;}).map((time) => normalizeTime(time)).map((v) => { /*console.log(v);*/ return v;}));

    return (<><li key={post.blogPostId}><Link to={'post/'+post.blogPostId}>{post.title} - { new Date(last).toISOString() }</Link></li></>);
}