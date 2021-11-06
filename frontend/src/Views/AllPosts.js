import React, {Component} from "react";
import axios from 'axios';
import '../Asserts/css/ViewAllPost.css';

import Posts from "../Components/Posts";
class AllPosts extends Component{

    constructor(props) {
        super(props);
        this.state={
            posts:[]
        }
    }

    componentDidMount() {

        axios({
            methode:'GET',
            url:global.backend+'/posts',
            params:{pid:"all"}
        }).then(res=>{
            res.data=res.data.sort((a,b)=>a._id>b._id?-1:1)
            this.setState({
                posts:res.data
            });
        }).catch(err=>console.log(err));
    }

    render() {
        return <>
            <br/>
        <div className="container">
            <div className="row">
                {this.state.posts.length===0?(
                    <h1 className="nopost" >No Post Yet</h1>
                ):(this.state.posts.map(post=>(

                            <Posts data={post} key={post.id}/>

                        ))
                )}


           </div>
        </div>
        </>;
    }
}export default AllPosts;