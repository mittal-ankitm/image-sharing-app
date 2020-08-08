import React,{useEffect,useState,useContext} from 'react'
import {usercontext} from '../../App'
import {useParams,Link} from 'react-router-dom'

const Searchbar= ()=>{
    const [query,setquery]=useState("")
    const [details,setdetails]=useState([])
    const{state,dispatch}=useContext(usercontext)
    const searchuser=(text)=>{
        setquery(text)
        fetch('http://localhost:5000/search',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({query})
        }).then(res=>res.json())
        .then(result=>{
            setdetails(result.user);
            console.log(result.user)
        })
    }

    return(
        <div>
        
        <input type='text' onChange={(e)=>searchuser(e.target.value)} placeholder='search' />
        <div>
        <ul>

            {
                details.map(userdata=>{
                    return(
                    <li>
                        <Link to={userdata._id !==state._id ? '/profile/'+userdata._id : '/profile'} >
                            {userdata.email}
                        </Link>
                    </li>
                    )
                })
            }
        </ul>
        </div>
        </div>
    )

    }
export default Searchbar