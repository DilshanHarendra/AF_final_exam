import React, {Component} from "react";
import '../Asserts/css/AddNewPost.css'
import CKEditor from 'ckeditor4-react';

import {Card, Form} from "react-bootstrap";
import { FilePond,  registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';


import axios from 'axios';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginImageResize,FilePondPluginFileValidateType,FilePondPluginImageValidateSize)



class UpdatePost extends Component{
    constructor(props) {
        super(props);

        this.state={
            id:this.props.match.params.id,
            data:'',
            files:[],
            topic:'',
            validateform:false,
            showUpload:true
        }

        if ((localStorage.getItem('type')!=="Admin")){
            window.location.replace('/');
        }

    }

    componentDidMount() {
        axios({
            methode:'GET',
            url:global.backend+'/posts',
            params:{pid:this.state.id}
        }).then(res=>{
            var file=res.data.coverImage;
            if (res.data.coverImage==="none"){
                file=[];
            }
            this.setState({
                postData:res.data,
                data:res.data.postBody,
                files:file,
                topic:res.data.postTitle,
                showUpload:(res.data.coverImage!=='none')
            })
            console.log(res.data);
        })
            .catch(err=>console.log(err));
    }

    onEditorStateChange=e=>{
        this.setState({
            data:e.editor.getData()
        });
    }
    changeHandler=e=>{
        this.setState({
            topic:e.target.value
        });
    }

    handleInit() {
        //  console.log('FilePond instance has initialised', this.state.files);

    }

    handleSubmit=e=>{
        e.preventDefault();
        if (this.state.topic===''||this.state.data===''||this.state.file===''){
            this.setState({
                validateform:true
            });
        } else {
            this.setState({
                validateform:false
            });

            try {
                let cImage=this.state.files;
                if (!this.state.showUpload){

                    const formData = new FormData();
                    formData.append('file', this.state.files[0])

                    axios.put(global.backend+'/posts/uploadImage/'+this.state.id,formData)
                        .then(res=>{

                        })
                        .catch(err=>console.log(err));
                    cImage="/Uploads/"+this.state.id+"_"+this.state.files[0].name;
                }


                let fdata={
                    postTitle:this.state.topic,
                    postBody:this.state.data,
                    coverImage:cImage,
                    id:this.state.id

                }
                axios.put(global.backend+'/posts/post',fdata)
                    .then(response=>{
                        console.log(response.data)
                        window.location.replace('/viewpost/'+response.data);
                    })
                    .catch(err=>console.log(err));

            }catch (e) {

            }

        }
    }

    deleteImage=(image)=>{
        var value={
            path:image,
            id:this.state.id

        }
        axios.delete(global.backend+"/posts/deleteImage",{data:value})
            .then(res=>{
                console.log(res)
          this.setState({
              showUpload:false,
              files:[]
          });
        }).catch(err=>{
                console.log("img delete err",err)
            })

    }


    render() {
        return <>
            <br/>
            <Form noValidate ref={form => this.formEl = form} validated={this.state.validateform} encType="multipart/form-data"  onSubmit={this.handleSubmit}>
                <div className="container">
                    <h1 className="card text-white bg-primary mb-3" >Update Post</h1>
                    <div className="card">

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <label htmlFor="">Enter Topic <span>*</span></label>
                                    <Form.Control
                                        type="text"
                                        placeholder="post..."
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={this.changeHandler}
                                        value={this.state.topic}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Topic.
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-5">
                                    <label htmlFor="">Enter Cover Image <span>*
                                        {this.state.validateform&&this.state.files===""?(<p>Please select Images</p>):(<></>)}
                                </span></label>
                                    {this.state.showUpload?(
                                        <>
                                            <img  className="coverImage" src={global.backend+this.state.files} alt={this.state.topic}/><br/>
                                            <div className="btn btn-danger" onClick={()=>this.deleteImage(this.state.files)} >Remove Image</div>
                                        </>

                                    ):(
                                        <FilePond
                                            required={true}
                                            ref={ref => this.pond = ref}
                                            files={this.state.files}
                                            allowMultiple={false}
                                            maxFiles={1}
                                            labelIdle='Drag & Drop your Product Images or <span class="filepond--label-action"> Browse </span>'
                                            acceptedFileTypes={['image/*']}
                                            labelFileTypeNotAllowed={"Invalid file"}
                                            imageResizeMode={'cover'}
                                            imagePreviewMaxHeight={400}
                                            imageResizeTargetWidth={500}
                                            imageResizeTargetHeight={775}
                                            imageValidateSizeMinHeight={200}
                                            imageValidateSizeMinWidth={200}
                                            oninit={() => this.handleInit() }
                                            onupdatefiles={(fileItems) => {

                                                this.setState({
                                                    files: fileItems.map(fileItem => fileItem.file)

                                                });






                                            }}


                                        >

                                        </FilePond>
                                    )}




                                    <Form.Control.Feedback type="invalid">
                                        Please Enter Topic.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                            <hr/>
                            <Card.Body>
                                <label htmlFor="">POST <span>*
                                    {this.state.validateform&&this.state.data===""?(<p>Please Enter Post</p>):(<></>)}
                            </span></label>
                                <CKEditor
                                    required
                                    data={this.state.data}
                                    type="classic"
                                    onChange={this.onEditorStateChange}

                                />
                            </Card.Body>
                        </div>
                        <hr/>
                        <button className="btn btn-primary">Update Post</button>
                    </div>



                </div>
            </Form>


            <br/><br/>




        </>;
    }

}export default UpdatePost;