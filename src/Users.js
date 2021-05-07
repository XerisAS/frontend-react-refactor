import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { normalizeName } from "./utilities";
import { useSelector } from "react-redux";

const Users = ({users}) => {
    const normalizedNames = Object.entries(users
        .map((user) => ({ id: user.id, ...normalizeName(user) }))
        .reduce((acc, {id, ...val}) => ({ ...acc, [id]: val }), { })
    )
    .map(([key, value]) => ({ id: key, ...value }));

    return (
        <div>
            <h1>UserList</h1>
            <ul>
            {
                normalizedNames.map(u => (
                    <li key={u.id}>
                        <Link to={`/users/${u.id}`}>
                            {`${u.last}, ${u.first}`}
                        </Link>
                    </li>
                )
                )
            }
            </ul>
        </div>
    )
}

export function User() {
    let {userid} = useParams();

    const user = useSelector((state) => state.blogreducer.find(post => post.author.id === Number(userid))?.author);
    const posts = useSelector((state) => state.blogreducer);

    const usersPosts = posts.filter(({author}) => author.id === user.id);

    return (
        <div><h2>{normalizeName(user).last}, {normalizeName(user).first}</h2>
        <h3>Posts</h3>
        <ol>
        {
            usersPosts.map((post) => <li key={post.blogPostId}><Link to={`/post/${post.blogPostId}`}>{post.title}</Link></li>)
        }
        </ol>
        </div>
    )
}

export default Users;