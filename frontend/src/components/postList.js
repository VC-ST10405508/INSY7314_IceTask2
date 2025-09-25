import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import '../App.css';

const Post = (props) =>(
<tr>
    <td>{props.post.user}</td>
    <td>{props.post.content}</td>
    <td>{props.post.user}</td>
    <td>
        {props.post.image && (
        <img
        src={`data:image/jpeg;base64,${props.post.image}`}
        alt="Post image"
        style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover"}}
        />
      )}
    </td>
    <td>
        <button className="btn btn-link" onClick={() => {
            props.deletePost(props.post._id);
        }}> 
        Delete
        </button>
    </td>
</tr>
);



export default function PostList(){


    const [posts, setPosts] = useState([]);

    //this method fetches the posts from the database:
    useEffect(() => {
        async function getPosts() {
            const response = await fetch("https://localhost:3000/posts/");
            if(!response.ok)
            {
             const message = "An Error occurred: " + response.statusText;
            window.alert(message);
             return;
            }

            const posts = await response.json();
            setPosts(posts);
        }

        getPosts();

        return;
    }, [posts.length]);

    //this method will delete a post
    async function deletePost(id){
        const token = localStorage.getItem("jwt");
        await fetch(`https://localhost:3000/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${token}`,
            },
        });

        const newPosts = posts.filter((e1) => e1._id !== id);
        setPosts(newPosts);
    }

    function PostList(){
        return posts.map((post) =>{
            return(
                <Post 
                post={post}
                deletePost={() => deletePost(post._id)}
                key={post._id}
                />
            );
        });
    }
return(
        <div>
            <div className="container">
                <h1 className="header"> INSY7314 notice board</h1>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Caption</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{PostList()}</tbody>
                </table>
            </div>
        </div>
    );
}