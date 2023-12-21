import axios from 'axios';
import {useEffect,useState} from "react";
let App=()=>{
  let [posts,setPosts]=useState([])
  let [data,setData]=useState([])
  let [sf,setSF]=useState("")
  let [fv,setFV]=useState("body")
 let fun=(e)=>{
   setSF(e.target.value)
   let reg=new RegExp(e.target.value)
   setPosts(data.filter((item)=>reg.test(item[fv])))
 }
 let fun2=(e)=>{
   setFV(e.target.value)
   setSF("")
   setPosts(data)
 }
  let fun1=(fn)=>{
    for(let i=0;i<posts.length-1;i++){
      for(let j=i+1;j<posts.length;j++){
          if(posts[i][fn]>posts[j][fn]){
            let t=posts[i]
            posts[i]=posts[j]
            posts[j]=t
          }
      }
    }
    setPosts([...posts])
  }
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res)=>{
      setPosts(res.data)
      setData(res.data)
    })
  },[])
  return(<div>
     <select onChange={fun2}>
    <option selected disabled>Select any</option>
    <option value="postId">PostID</option>
    <option value="id">ID</option>
    <option value="email">Email</option>
    <option value="name">Name</option>
    <option value="body">Body</option>
     </select>
    <input type='text' onChange={fun} value={sf}/>
    {
      posts.length>0 &&<table border={1}>
        <tr>
        <th onClick={()=>fun1('postId')}>Postid</th>
        <th onClick={()=>fun1('id')}>id</th>
        <th onClick={()=>fun1('name')}>name</th>
        <th onClick={()=>fun1('email')}>email</th>
        <th>body</th>
        </tr>
        {
          posts.map((item,index)=>{
            return(
              <tr>
                <td>{item.postId}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
              </tr>
            )
          })
        }
      </table>
    }
  </div>)
}
export default App;