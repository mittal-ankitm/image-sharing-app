import React,{useEffect,useState,useContext} from 'react'
import {usercontext} from '../../App'
import {useParams} from 'react-router-dom'

const UserProfile= ()=>{

    const [userprofile,setprofile]=useState(null) 
    
    const {state,dispatch}=useContext(usercontext)
    const {userid} =useParams()
    const[showfollow,setshowfollow] =useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userid}`,{
            mehtod:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
             setprofile(result)
        })
    },[])

    const followuser=()=>{
        fetch("http://localhost:5000/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            } ,
            body:JSON.stringify({
                followid:userid
            })
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setprofile((prevstate)=>{
                return {
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:[...prevstate.user.followers,data._id]
                    }
                }
            })
            setshowfollow(false)
        })
    }

    const unfollowuser=()=>{
        fetch("http://localhost:5000/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            } ,
            body:JSON.stringify({
                unfollowid:userid
            })
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setprofile((prevstate)=>{
                const newfollower=prevstate.user.followers.filter(item=>item !== data._id)
                return {
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:newfollower
                    }
                }
            })
            setshowfollow(true)
            
        })
    }

return(
    <div>
    { userprofile ?

        <div>
        <div>
            <div>{userprofile.user.name}</div>
            <div><img src={userprofile.user.pic} /> </div>
            <div>{userprofile.user.following.length} following</div>
            <div>{userprofile.user.followers.length} followers</div>

            {showfollow ?
             <button onClick={()=>followuser()}>follow</button>
           :<button onClick={()=>unfollowuser()}>unfollow</button>
        
        }
            
            <div>{userprofile.posts.length} posts</div>
        </div>
        <div>
            {
                userprofile.posts.map(item=>{
                    return (
                        <img key={item._id} src={item.photo} />
                    )
                })
            }
        </div>
        </div>
    :
    <h2>loading...</h2>}
</div>
)

}

export default UserProfile