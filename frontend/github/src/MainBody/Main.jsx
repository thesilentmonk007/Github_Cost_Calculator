import cheerio from 'cheerio';
import axios from 'axios';
import "./Main.css"
import { useEffect, useState } from 'react';


export function MainHead() {
const [followerCount , setFollowerCount] = useState("")
const [followingCount , setFollowingCount] = useState("")
const [getUrl , setUrl] = useState("")
const [totalNumber ,setTotal] = useState(0);
const [link , setLink] = useState("")

const callerFunction = ()=>{
  setLink(getUrl)
}



useEffect(()=>{
  if(!link){
    return
  }
  const FunctionCaller = async () => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `/api/${link}`,
    headers: {
      // Use your GitHub token if necessary
'Cookie': '_octo=GH1.1.182094238.1716735801; logged_in=no'  
}

  }

  try {
    let outputData = await axios.request(config);
    let userFunction = HTMLcaller(outputData.data);
    Calculations(userFunction)
  } catch (err) {
    console.log(err);
  }
}

FunctionCaller();

},[link])



const HTMLcaller = (value) => {
  const $ = cheerio.load(value);
  let followerCount = $('span.text-bold').first().text().trim();
  let followingCount =   $('a[href*="following"] > span.text-bold.color-fg-default').text().trim();
  setFollowerCount(followerCount)
  setFollowingCount(followingCount)
  // console.log(followerCount);
  // console.log(followingCount);

  return {
    followerCount,
    followingCount,

  };
};


const Calculations = ({followerCount,followingCount})=>{
let Myfollower = followerCount;
let Myfollowing = followingCount;

let FollowerTrack = "";
let FollowingTrack = "";

let flag1 = false;
let flag2 = false;

if(Myfollower[Myfollower.length - 1] == 'k'){
  flag1 = true;
  for(let i = 0 ; i<Myfollower.length-1 ; i++){
    FollowerTrack += Myfollower[i];
  }
}

else{
  for(let i = 0 ; i<Myfollower.length ; i++){
    FollowerTrack += Myfollower[i];
  }
}

if(Myfollowing[Myfollowing.length - 1] == 'k'){
  flag2 = true;
  for(let i = 0 ; i<Myfollowing.length-1 ; i++){
    FollowingTrack += Myfollowing[i];
  }
}

else{
  for(let i = 0 ; i<Myfollowing.length ; i++){
    FollowingTrack += Myfollowing[i];
  }
}

if(flag1){
  FollowerTrack = parseFloat(FollowerTrack) *1000 + 1
}

else{
  FollowerTrack = parseInt(FollowerTrack) + 1
}

if(flag2){
  FollowingTrack = parseFloat(FollowingTrack)*1000 + 1
}
else{
  FollowingTrack = parseFloat(FollowingTrack) + 1
}

if(Myfollower==0){
  FollowerTrack = 0.01
}

let total = (FollowerTrack)/(FollowingTrack) * 1000 
setTotal(total)
}



  return (
    <>
      <h1 className='flex value-head justify-center text-4xl relative top-8 font-extrabold text-white'>
      <i className="githubLogo fa-brands fa-github"></i>  
      <p className='relative left-7 '>Value Calculator</p></h1>
      <div className='relative Input-box'>
        <input placeholder='Enter your Github userName' className='p-2' onChange={(e)=>setUrl(e.target.value)}></input>
        <button onClick={callerFunction} className='bg-green-500 w-36 btn text-white font-medium'>Submit</button>
      </div>

      {/* <h1>{followingCount}</h1><br></br>
      <h1>{followerCount}</h1> */}
      <div className='flex flex-col p-8 bg-black main-box'>
         <h1  className='text-black flex justify-center text-4xl second-head'>Results</h1>
         <ul className='results text-black relative top-14 space-y-7 text-3xl followerHead'>
           <li>Your Followers : {followerCount}</li>
           <li>Your Following : {followingCount}</li>
           <li className='text-xl cost-text'>Your Github Cost : <span className='text-xl'>₹ {totalNumber}</span></li>
           {/* <li></li> */}
         </ul>
      </div>
    </>
  );
}
