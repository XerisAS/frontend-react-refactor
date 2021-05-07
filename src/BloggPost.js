import { useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { normalizeName, fixLinks, normalizeTime } from './utilities';
import { addComment } from './Comments';

const BloggPost = () => {
    const {id} = useParams();
    const post = useSelector((state) => state.blogreducer.find(({ blogPostId }) => blogPostId == id));
    const author = normalizeName(post.author);
    const dispatch = useDispatch();
    const content = Array.isArray(post.Content) ? post.Content : [post.Content];

    const ref = useRef(null);

    const contentWithFixedLinks = fixLinks(content);

    const comments = useSelector((state) => state.comment);

    //console.log(post.times)

    return (
        <div>
            <header>
                <h1>{post.title}</h1>
                <div>By: <Link to={`/users/${post.author.id}`}>{author.last}, {author.first}</Link></div>
                {post.times.posted ? <div><strong>Posted: </strong>{post.times.posted}</div> : null}
                {post.times.created ? <div><strong>Created: </strong>{new Date(normalizeTime(post.times.created)).toISOString()}</div> : null}
                {post.times.modified ? <div><strong>Modified: </strong>{post.times.modified}</div> : null}
            </header>
            <article>
                {
                    contentWithFixedLinks
                }
            </article>
            <aside>
                <h1>Comments</h1>
                <ul>
                {
                    comments.filter(({id, contents}) => [post.comments.id].flat().filter((commentid) => commentid === id).length > 0).map(com => <li>{com.contents}</li>)
                }
                </ul>
                {
                    /* Can not get this to work properly. It always ends up showing one comment off when I write new comments, and will not post comments on
                       post #3 (I am Jane)
                     * I can not figure either of those out.
                    <form onSubmit={(e) => { e.preventDefault(); dispatch(addComment({ postId: id, comment: ref.current.value})); ref.current.value = ''; }}>
                        <label>New Comment</label>
                        <input ref={ref} name="comment" placeholder={"Write The New Comment"}></input>
                    </form>
                    */
                }
            </aside>
        </div>
    );
}

export default BloggPost;