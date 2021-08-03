import React ,{useState,useEffect} from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BsFillCalendarFill} from "react-icons/bs";
import { ImLocation } from "react-icons/im";

import { FaSearchLocation,FaTimes } from "react-icons/fa";


export const Namaz = () => {
    let date= new Date().toLocaleTimeString()
    let day=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    //  let response=false;
    // console.log(date)
    const [search, setSearch] = useState(false)
    const [calender, setCalender] = useState(false)
    const [response, setresponse] = useState(false)
    const [select, setSelect] = useState('')
    const [cLock, setCLock] = useState(date)
    const [locationValue, setLocationValue] = useState('')
    // console.log(select)
    // namaz state
    const [fajr, setfajr] = useState('')
    const [juhur, setjuhur] = useState('')
    const [asor, setasor] = useState('')
    const [magrib, setmagrib] = useState('')
    const [isha, setisha] = useState()

    
    const clockUpadete=()=>{
       date=new Date().toLocaleTimeString();
       setCLock(date)
    }

   setInterval(clockUpadete,1000)

    const todayPrayerTime=async(e)=>{
        e.preventDefault();
        if(select===''){

        const url=`https://api.pray.zone/v2/times/today.json?city=${locationValue}&timeformat=1`
        const res= await fetch(url);
        const data=await res.json()
        setfajr(data.results.datetime[0].times.Fajr)
        setjuhur(data.results.datetime[0].times.Dhuhr)
        setasor(data.results.datetime[0].times.Asr)
        setmagrib(data.results.datetime[0].times.Maghrib)
        setisha(data.results.datetime[0].times.Isha)
        console.log(` from location ${data}`)
        setresponse(true);
        setSearch(false)
        }
        else if( locationValue===''){
            alert(`please enter your city`)
        }

        else{
            const baseurl= `https://api.pray.zone/v2/times/day.json?city=${locationValue}&date=${select}&timeformat=1`
            const res=await fetch(baseurl);
            const data= await res.json()
            setfajr(data.results.datetime[0].times.Fajr)
            setjuhur(data.results.datetime[0].times.Dhuhr)
            setasor(data.results.datetime[0].times.Asr)
            setmagrib(data.results.datetime[0].times.Maghrib)
            setisha(data.results.datetime[0].times.Isha)
            setCalender(false)
            console.log(` from date ${data}`)
            setresponse(true);
            // setSearch(false)

        }
    }
  


    return (
        <>
            <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-5 col-sm-12 dv">
                   <video src="/video/fajr.mp4" autoPlay loop muted></video> 
                <div className="main-div">
                <div className="main-con text-center mt-4">
                <h1>Today</h1>
                
                <div className="info-section">
                    <h5>{select===''? day:select}</h5> 
                    <div className="d-flex align-content-center" >
                    <FaSearchLocation onClick={()=>{setSearch(true)}} className={search===false?"search-icon d-block":"d-none"} ></FaSearchLocation>
                    <div className={search===true?"location-input d-block":"location-input-add"}>
                      <form action=""  className="d-flex">
                    <input type="text" placeholder="Location" onChange={(e)=>{setLocationValue(e.target.value)}} className="search-input" />
                    <button type="submit"  className="submit-btn" > {locationValue===''?<FaTimes onClick={()=>{setSearch(false)}} ></FaTimes> : <FaSearchLocation onClick={todayPrayerTime}></FaSearchLocation>}</button>
                    </form>  

                    </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-content-center my-3'>
                <div className="clock ">
                    <h4 className="text-center">{cLock}</h4>
                </div>
                </div>
               
                <div className="my-4 d-flex justify-content-between">
                <div>
                <BsFillCalendarFill
                 onClick={()=>{ setCalender(true) }}
                  className={calender===false? "d-block":"d-none"} >
                </BsFillCalendarFill> 
                <div className={calender===false?"d-none":"d-block"}>
                <form  className=""  >
                <input type="date"  className="shadow input-date" onChange={(e)=>{setSelect(e.target.value)}} /><br />
                <input type="submit" onClick={todayPrayerTime}  value="Paryer Time" className=" btn fw-bolder mt-1 wi "/>
                </form>
                </div>
                </div>
                
                <div className="crLocation">
                <ImLocation ></ImLocation><strong>{locationValue}</strong>
                </div>

                </div>
                {/* times div */}
                <div className={response===true?'d-block overflow-auto h-25':'d-none'} >
                <div className="namaz my-3">
                    <h6>Fajr</h6><h6>{fajr}</h6>
                </div>
                <div className="namaz my-3">
                    <h6>Dhure</h6> <h6>{juhur}</h6>
                </div>
                <div className="namaz my-3">
                    <h6>Asr</h6> <h6>{asor}</h6>
                </div>
                <div className="namaz my-3">
                    <h6>Magrib</h6> <h6>{magrib}</h6>
                </div>
                <div className="namaz my-3">
                    <h6>Isha</h6> <h6>{isha}</h6>
                </div>
                
                </div>
                {/* times div ens */}

                </div>
         
                </div>
               
                {/* <Calendar
                    onChange={(e)=>{ setSelect(e)}}
                 className={aclender===false?"d-none":"d-block shadow" }>
                 </Calendar>
                 <button className={calender===false?"d-none":"d-block  wi bg-white"} >Prayer Time</button> */}
               
                </div>
            </div>
            </div>
            
        </>
    )
}
