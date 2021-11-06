import React, {Component} from "react";
import {Alert, Form} from "react-bootstrap";

class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
            validateform:false,
            username:'',
            password:'',
            err:''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('type')!==null){
            window.location.replace('/');
        }
    }
    handleSubmit=e=>{
        e.preventDefault();
        if (this.state.username===""||this.state.password===""){
            this.setState({
                validateform:true,
            })
        }else {
            this.setState({
                validateform:false,
            })
            if (this.state.username===global.username){
                if (this.state.password===global.password){
                    this.setState({
                        err:"",
                    });
                    localStorage.setItem("username",global.username);
                    localStorage.setItem('type',"Admin");
                    window.location.reload();
                }else{
                    this.setState({
                        err:"Incorrect Password",
                    })
                }
            }else{
                this.setState({
                    err:"Incorrect Username",
                })
            }

        }

    }
    changeHandler=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        return <>
            <br/>
            <div className="container">
                <h1 className="card text-dark bg-light mb-3" >Login</h1>
                <div className="row" >
                    <div className="col-md-3" ></div>
                    <div className="col-md-6" >
                        <div className="card">
                            {this.state.err!==''?(
                                <Alert variant="danger">{this.state.err}</Alert>
                            ):(
                                <></>
                            )}


                            <Form noValidate  validated={this.state.validateform}   onSubmit={this.handleSubmit}>
                            <label htmlFor="">Username <span>*</span></label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                id="username"
                                value={this.state.username}
                                name="username"
                                onChange={this.changeHandler}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Username.
                            </Form.Control.Feedback>
                                <br/>
                                <label htmlFor="">Password <span>*</span></label>
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        id="password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.changeHandler}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Password.
                                    </Form.Control.Feedback>
                                <br/>
                                <br/>
                                <button className="btn btn-primary">Login</button>


                            </Form>
                        </div>
                    </div>
                </div>
            </div>


        </>;
    }
}export default Login;