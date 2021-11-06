import React, {Component} from "react";

import '../Asserts/css/Home.css'

import axios from "axios";
import Posts from "../Components/Posts";
import {Link} from "react-router-dom";
class Home extends Component{

    constructor(props) {
        super(props);
        this.state={
            posts:[]
        }
    }

    componentDidMount() {

        axios({
            methode:'GET',
            url:global.backend+'/posts/letest',
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
            <div style={{backgroundImage:"url('/images/homeMain.jpg')"}} className="main">
                <h1 className="topic" >Family Health Care</h1>

            </div>
            <br/>
            <div className="container">
            <h1 className="card text-white bg-primary mb-3">Latest</h1>
                <div className="row">
                    {this.state.posts.length===0?(
                        <h1 className="nopost" >No Post Yet</h1>
                    ):(this.state.posts.map(post=>(

                                <Posts data={post}  key={post.id} />

                            ))
                    )}



                </div>
            </div>
        </>;
    }

}export default Home;