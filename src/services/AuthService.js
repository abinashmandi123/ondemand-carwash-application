import axios from "axios";

const API_URL = "http://localhost:8085/bookings/";

const API_URL2="http://localhost:8081/cars/";

const API_URL3="http://localhost:8082/customers/";

const API_URL4="http://localhost:9009/washers/";

class AuthService {
  createBooking(carNumber,carModel,owner,washPackage,location,date){
    return axios.post(API_URL+"/add",{
      carNumber,
      carModel,
      owner,
      washPackage,
      location,
      date
    });
  }

  viewOrders(){
    return axios.get(API_URL);
  }

  viewBookings(){
    const user=JSON.parse(localStorage.getItem('user'));
    let owner=user.username;
    return axios.get(API_URL+`get/${owner}`);
  }

  login(username, password) {
    return axios
      .post(API_URL3 + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }
  washerLogin(username, password) {
    return axios
      .post(API_URL4 + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

  register(name,username, email, password) {
    return axios.post(API_URL3 + "add", {
      name,
      username,
      email,
      password
    });
  }
  registerWasher(name,username, email, password) {
    return axios.post(API_URL4 + "register", {
      name,
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  editProfile(name,username,email,password,contact,address,profilePic){
    const user = JSON.parse(localStorage.getItem('user'));
    let username1=user.username;
    const config={
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    }
    let formData=new FormData();
    formData.append("name",name);
    formData.append("username",username);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("contact",contact);
    formData.append("address",address);
    formData.append("profilePic",profilePic);
    return axios.put(API_URL3 + `update/${username1}`,formData,config);
  }

  getBooking(id){
    return axios.get(API_URL+`${id}`);
  }

  updateBooking(id,carNumber,carModel,owner,washPackage,location,date,status){
    const config={
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    }
      return axios.put(API_URL+`update/${id}`,{
        carNumber,
        carModel,
        owner,
        washPackage,
        location,
        date,
        status
      },config)
  }
 
  updateSchedule(id,carNumber,carModel,owner,washPackage,location,date,time,status){
    const config={
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    }
      return axios.put(API_URL+`schedule/update/${id}`,{
        carNumber,
        carModel,
        owner,
        washPackage,
        location,
        date,
        time,
        status
      },config)
  }
  scheduleWash(carNumber,carModel,owner,washPackage,location,date,time){
    return axios.post(API_URL + "schedule/add",{
      carNumber,
      carModel,
      owner,
      washPackage,
      location,
      date,
      time
    })
  }

  getSchedules(){
    return axios.get(API_URL + "schedule/getall");
  }

  getScheduleByOwner(owner){
    return axios.get(API_URL + `schedule/getByOwner/${owner}`);
  }

  addCar(carNumber,owner,carType,carModel,carImage){
    const user = JSON.parse(localStorage.getItem('user'));
    owner=user.username;

    let formData=new FormData();
    formData.append("carNumber",carNumber);
    formData.append("owner",owner);
    formData.append("carType",carType);
    formData.append("carModel",carModel);
    formData.append("carImage",carImage);

    const config={
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'multipart/form-data'
      }
    }

    return axios.post(API_URL2 + "add", formData,
   config
  );
    
  }
viewCustomers(){
  // const config={
  //   headers:{
  //     'Access-Control-Allow-Origin':'*'
  //   }
  // }
  return axios.get(API_URL3);
}

getCustomer(id){
  return axios.get(API_URL3 + `${id}`);
}

viewWashers(){
  return axios.get(API_URL4+"getwashers");
}

getWasher(id){
  return axios.get(API_URL4 + `get/${id}`)
}

  viewCar(){
    const user = JSON.parse(localStorage.getItem('user'));
    let owner=user.username;
    return axios.get(API_URL2+`getcars/${owner}`);
  }

  viewAllCars(){
    return axios.get(API_URL2+"/get");
  }

  getCarById(id){
    return axios.get(API_URL2 + `${id}`);
  }

  editCar(id,carNumber,owner,carType,carModel,carImage){
    const user = JSON.parse(localStorage.getItem('user'));
    owner=user.username;

    let formData=new FormData();
    formData.append("carNumber",carNumber);
    formData.append("owner",owner);
    formData.append("carType",carType);
    formData.append("carModel",carModel);
    formData.append("carImage",carImage);

    const config={
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'multipart/form-data'
      }
      
  }
  return axios.put(API_URL2 + `${id}`, formData,
  config
 );
  }
  deleteCar(id){
    const config={
      headers:{
        'Access-Control-Allow-Origin':'*'
      }
    }
    return axios.delete(API_URL2 + `delete/${id}`,"",config)
  }

  deleteBooking(id){
   
    return axios.delete(API_URL + `delete/${id}`)
  }
  // redirectPayment(){
  //    axios.post("http://localhost:9090/submitPaymentDetail");
  // }
}

export default new AuthService();