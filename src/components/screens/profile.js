import React,{useEffect,useState,useContext} from 'react'
import {usercontext} from '../../App'
const Profile= ()=>{

    const [mypics,setpics]=useState([])
    const {state,dispatch}=useContext(usercontext)
    const [image,setimage]=useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/mypost',{
            mehtod:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setpics(result.mypost)
        })
    },[])
    useEffect(()=>{
        if(image){
            const data=new FormData()
        data.append("file",image )
        data.append("upload_preset","image-sharing")
        data.append("cloud_name","abcdab123")
        fetch("https://api.cloudinary.com/v1_1/abcdab123/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           //localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            //dispatch({type:"UPDATEPIC",payload:data.url})
            fetch('http://localhost:5000/updatepic',{
                method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                pic:data.url
            })
            }).then(res=>res.json())
            .then(result=>{
                localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
            })
           
        }).catch(err=>{
            console.log(err)
        })
        }
    },[image])
    const updatepic=(file)=>{
        setimage(file)
    }

return(
<div>
    <div>{console.log(state)}
        <div>{state?state.name:"loading"}</div>
        <div><img src={state?state.pic:"loading"} /> </div>
        < input type='file' onChange={(e)=>updatepic(e.target.files[0])} />
        {console.log(state)}
      <div>{mypics.length} posts</div>
    <div>{state?state.following.length:0} following</div>
    <div>{state?state.followers.length:0} followers</div>

        </div>
    <div>
        {
            mypics.map(item=>{
                return (
                    <img key={item._id} src={item.photo} />
                )
            })
        }
    </div>
    </div>
)

}

export default Profile

