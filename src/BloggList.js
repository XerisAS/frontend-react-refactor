import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BloggList = () => {
    const posts = useSelector(state => state.blogreducer);

    return (<div>
        <h1>BloggList</h1>
        <ul>
            {posts.map((post) => (
                <li>
                    <Link to={`post/${post.blogPostId}`}>
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>);
}

export default BloggList;