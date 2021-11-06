import React, {Component} from "react";
import {Link} from "react-router-dom";

class Posts extends Component{

    constructor(props) {
        super(props);
        this.state={
            post:this.props.data
        }

    }



    render() {
        return <>
            <div className="col-md-3">
            <Link to={"/viewpost/"+this.state.post.id}>
                <div className="card" >
                    <img className="card-img-top" src={global.backend+this.state.post.coverImage} alt={this.state.post.postTitle} />
                    <div className="card-body">
                        <p className="card-text">{this.state.post.postTitle}</p>
                    </div>
                </div>
            </Link>
            </div>
        </>;
    }
}export default Posts;