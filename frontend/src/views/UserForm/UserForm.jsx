import axiosClient from "../../axiosClient";
import {useState,useEffect} from "react";
import {useNavigate,useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const UserForm =()=>{
    const {id} =useParams();
    const navigate=useNavigate();
    const [users,setUsers]=useState({
        id:null,
        name:'',
        email:'',
        password:''
    });

    const notifySuc = (message) => {toast.success(message, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });};
    
    const notifyErr=(message)=>{toast.error(message, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
    
    }

    const[loading,setLoading]=useState(false);
    const[errors,setErrors]=useState(null);

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/user/${id}`)
            .then (({data})=>{
                setLoading(false)
                setUsers(data)
            })
            .catch(()=>{
                setLoading(false)
            })
        },[])
    }
    const onSubmit = ev => {
        ev.preventDefault()
        if (users.id) {

          axiosClient.put(`/user/${users.id}`, users)
          .then(() => {
              notifySuc("User updated successfully!");
              setTimeout(() => {
                  navigate('/admin-dashboard');
              }, 2000);
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                const errors = response.data.errors;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        notifyErr(errors[key][0]);
                    }
                }
              }
            })
        } else {
          axiosClient.post('/user', users)
            .then(() => {
              notifySuc("User Created successfully!");
              setTimeout(() => {
                  navigate('/admin-dashboard');
              }, 2000);
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                const errors = response.data.errors;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        notifyErr(errors[key][0]);
                    }
                }
              }
            })
        }
      }

    return( 
<>
<ToastContainer/>
      {users.id && <h1>Update User: {users.name}</h1>}
      {!users.id && <h1 style={{color: 'white'}}>Add New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={users.name} style={{borderRadius: '10px'}} onChange={ev => setUsers({...users, name: ev.target.value})} placeholder="Name"/>
            <input value={users.email} style={{borderRadius: '10px'}} onChange={ev => setUsers({...users, email: ev.target.value})} placeholder="Email"/>
            <input type="password" style={{borderRadius: '10px'}} onChange={ev => setUsers({...users, password: ev.target.value})} placeholder="Password"/>
            <button style={{borderRadius: '10px'}} className="btn">Save</button>
          </form>
        )}
      </div>
    </>
    )

}

export default UserForm;