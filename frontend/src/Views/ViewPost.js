import React, {Component} from "react";
import axios from 'axios';
import '../Asserts/css/ViewPost.css'
import {Link} from "react-router-dom";
class ViewPost extends Component{

    constructor(props) {
        super(props);
        this.state={
            pid:this.props.match.params.id,
            postData:[],
            isAdmin:(localStorage.getItem('type')==="Admin")
        }

    }
    componentDidMount() {
        this.getPost();
    }
    getPost=()=>{
        axios({
            methode:'GET',
            url:global.backend+'/posts',
            params:{pid:this.state.pid}
        }).then(res=>{
                this.setState({
                    postData:res.data
                })
            console.log(this.state.postData.postBody);
            })
            .catch(err=>console.log(err));
    }

    deletePost=()=>{
        var value={
            id:this.state.pid,
            imagePath:this.state.postData.coverImage
        }
        axios.delete(global.backend+"/posts/post",{data:value})
            .then(res=>{
                console.log(res);
                window.location.replace('/lessons');
            }).catch(err=>{
            console.log("img delete err",err)
        })
    }

    render() {
        return <>
            <br/>
            <div className="container" >
                <h1 className="card text-white bg-primary mb-3" >{this.state.postData.postTitle}</h1>
                <div className="row">
                    {this.state.isAdmin?(
                        <>
                            <div className="col-md-6">
                                <img className="coverImage" src={global.backend+this.state.postData.coverImage} alt={this.state.postData.postTitle}/>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <h2>Admin Pannel</h2>
                                    <Link to={"/updatepost/"+this.state.postData.id}><button className="btn btn-success" >Update</button></Link>
                                    <button onClick={this.deletePost} className="btn btn-danger" >Delete</button>
                                </div>
                            </div>
                        </>
                    ):(
                        <img className="coverImage" src={global.backend+this.state.postData.coverImage} alt=""/>
                    )}


                    <div className="col-md-12" >
                    <div className="card" >
                        <div className="card-body" >
                            <div dangerouslySetInnerHTML={{__html:this.state.postData.postBody}}></div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>


        </>;
    }
}export default ViewPost;