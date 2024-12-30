import {useRef,useState} from 'react'
import {Link} from 'react-router-dom'
import { useStateContext } from '../../contexts/contextprovider';
import axiosClient from '../../axiosClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register=()=>{

    const notifyErr=(message)=>{toast.error(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });};


    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();

    const {setUser,setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
            window.location.href = '/user';
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            const errors = response.data.errors;
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    notifyErr(errors[key][0]);
                }
            }

        }
    });
}


    return(
        <div className='login-signup-form animated fadeinDown'>
            <ToastContainer/>
        <div className='form'>
            <h1 className='title'>
                
                <div style={{ fontSize: "25px" }}>Create A New Account</div>
            </h1>
            <form onSubmit={Submit}>
                <input ref={nameRef} type="name" placeholder='Name' style={{borderRadius: "10px" }}/>
                <input ref={emailRef}  type="email" placeholder='Email' style={{borderRadius: "10px" }}/>
                <input ref={passwordRef} type="password" placeholder='Password' style={{borderRadius: "10px" }}/>
                <button className='btn btn-block' style={{ backgroundColor: "black", borderRadius: "10px",color:"white" }}>Register</button>
                <p className='message'>
                    Already Have An Account? <Link to='/login' style={{ color: "white", textDecoration: "none" }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Login</Link>
                </p>
            </form>
        </div>
        
    </div>
 

    )

}

export default Register;