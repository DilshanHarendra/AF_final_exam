import React, {Component} from "react";
import '../Asserts/css/Header.css';
import {Link} from "react-router-dom";

class Header extends Component{

constructor(props) {
    super(props);
    this.state={
        isLogin:(localStorage.getItem('type')===null)
    }
}

    logout=e=>{
        localStorage.clear();
        window.location.replace('/');
        this.setState({
            isLogin:(localStorage.getItem('type')===null)
        })
    }


    render() {
        return <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="navbar-brand" >Family Health Care</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/"className="nav-link" >Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/lessons" className="nav-link" >All Posts</Link>
                        </li>


                        {this.state.isLogin?(
                            <li className="nav-item">
                                <Link to="/login"   className="nav-link" >Login</Link >
                            </li>
                        ):(
                            <>
                                <li className="nav-item">
                                    <Link to="/addnewpost"   className="nav-link" >Add New Post</Link >
                                </li>
                                <li className="nav-item">
                                    <div onClick={this.logout}  className="nav-link" >Logout</div >
                                </li>
                            </>

                        )}



                    </ul>

                </div>
            </nav>
        </>;
    }

}export default Header;