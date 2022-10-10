import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, setDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import {db} from '../firebase';
import {AuthContext} from '../context/AuthContext';
const Search = () => {
  const [userName, setUserName] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);
  const handleSearch =async ()=>{
      const q = query(collection(db,"users"),where("displayName","==",userName));
      const querySnapshot = await getDocs(q);
      try{
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setUser(doc.data());
        });
      }
      catch(err){
        setErr(true);
      }
  }
  const handleKey = e=>{
    e.code === "Enter" && handleSearch();
  }
  const handleSelect = async ()=>{
    //check whether the group(chats in firestore) exisits, if not create 
    //create user chat
    const combineId = currentUser.uid > user.uid ?
                      currentUser.uid+user.uid : 
                      user.uid+currentUser.uid;
    try{
      const res = await getDoc(doc(db,"chats",combineId));
      if(!res.exists()){
        //create chat in chats collections
        await setDoc(doc(db,"chats", combineId),{messages:[]});
        
        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combineId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
          },
          [combineId+".date"]:serverTimestamp()
        })

        await updateDoc(doc(db,"userChats",user.uid),{
          [combineId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combineId+".date"]:serverTimestamp()
        })
      }
    }
    catch(err){

    }
    setUser(null);
    setUserName("");
  }
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Search...' 
        onKeyDown={handleKey} 
        onChange={e=>setUserName(e.target.value)}
        value={userName}
        />
      </div>
      {err && <span>User not found</span>}
      {
        user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>
      }
    </div>
  )
}

export default Search