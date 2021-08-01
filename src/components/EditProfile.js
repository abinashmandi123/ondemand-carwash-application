import React, { Component } from "react";

import AuthService from "../services/AuthService";
import "../css/editProfile.css";

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.handleEditProfile = this.handleEditProfile.bind(this);
    // this.onChangeName = this.onChangeName.bind(this);
    // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeProfilePic=this.onChangeProfilePic.bind(this);

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      contact: "",
      address: "",
      profilePic:null,
      redirect: null,
    };
  }
  componentDidMount(){
    const user=JSON.parse(localStorage.getItem('user'));
    this.setState({
      name:user.name,
      username:user.username,
    })
  }
  // componentDidUpdate(){
  //   this.setState({
  //     profilePic:this.state.profilePic
  //   })
  // }
  // onChangeName = (event) => {
  //   this.setState({
  //     name: event.target.value,
  //   });
  // };
  // onChangeUsername = (event) => {
  //   this.setState({
  //     username: event.target.value,
  //   });
  // };
  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  onChangeContact = (event) => {
    this.setState({
      contact: event.target.value,
    });
  };
  onChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  onChangeProfilePic=(event)=>{
    this.setState({
      profilePic:event.target.files[0]
    })
  }
  handleEditProfile() {
    AuthService.editProfile(
      this.state.name,
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.contact,
      this.state.address,
      this.state.profilePic
    )
      .then((response) => {
        alert("profile updated succesfully");
        this.props.history.push("/profile");
        window.location.reload();
        console.log(response);
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  render() {
    const profilePic=this.state.profilePic;
    return (
      <>
       <div class="container rounded bg-white mt-5">
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src={`data:image/jpeg;base64,${profilePic}`} width="90"/><span class="font-weight-bold"></span><span class="text-black-50"></span><span></span></div>
            <div><input  type="file"
                    class="form-control"
                    onChange={this.onChangeProfilePic}/></div>
            
        </div>
        {/* "https://i.imgur.com/0eg0aG0.jpg" */}
        <div class="col-md-8">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                        <h6>Back to home</h6>
                    </div>
                    <h6 class="text-right">Edit Profile</h6>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Full Name" defaultValue={this.state.name}  /></div>
                    <div class="col-md-6"><input type="text" class="form-control"  placeholder="Username"  value={this.state.username}/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Email"  onChange={this.onChangeEmail}/></div>
                    <div class="col-md-6"><input type="text" class="form-control"  placeholder="Phone number" onChange={this.onChangeContact}/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="address" onChange={this.onChangeAddress}/></div>
                    <div class="col-md-6"><span></span></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="password" class="form-control" placeholder="Password" onChange={this.onChangePassword}/></div>
                    <div class="col-md-6"><span></span></div>
                </div>
                
            </div>
        </div><div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button" onClick={this.handleEditProfile}>Save Profile</button></div>
    </div>
</div>
      </>
    );
  }
}

export default EditProfile;
