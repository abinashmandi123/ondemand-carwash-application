import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import Home from './Home';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      user:[],
      profilePic:[]
    };
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    let id=this.state.currentUser.id;

    if(user){
      user.roles.forEach(role=>{
        if(role==="ROLE_WASHER"){
          AuthService.getWasher(id).then((res)=>{
            this.setState({
              user:res.data,
              profilePic:res.data.profilePic
            })
            
          })
        }
        else{
          AuthService.getCustomer(id).then((res)=>{
            this.setState({
              user:res.data,
              profilePic:res.data.profilePic
            })
            console.log(this.state.user);
            console.log(this.state.profilePic);
          });
        }
      })
    }

    
   
    

    
  
  }

  render() {
     const profilePic = this.state.profilePic;
    const user=this.state.user;
    return (
      <div>
        <div className="container rounded bg-white mt-5">
            <div className="row">
               <div className="col-md-4 border-right">
                {profilePic ? (<div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src={`data:image/jpeg;base64,${profilePic.data}`} width="90"/><span class="font-weight-bold"></span><span class="text-black-50"></span><span></span></div>)
                  :(<div class="d-flex flex-column align-items-center text-center p-3 py-5"><span class="font-weight-bold"></span><span class="text-black-50"></span><span></span></div>)}
                </div>
                <div className="col-md-8">
                    <div className="row mt-5">
                        <p>{user.name}</p>
                    </div>
                    <div className="row mt-5">
                        <p>{user.username}</p>
                    </div>
                    <div className="row mt-5">
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    );
  }
}