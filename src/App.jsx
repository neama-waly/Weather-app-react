import { useState } from "react"
import "./App.css"


function App() {
const [fetched_data , setfetched_data] =useState(null);
const [city ,setcity] = useState("cairo")



const fetched_Weather = async()=>{
  setfetched_data(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;


  try{
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`);
  const data = await response.json();
  if(!response.ok){
    setfetched_data({errormsg:"City NOT FOUND "})
  }else{
    setfetched_data(data);
  }
  // eslint-disable-next-line no-unused-vars
  } catch (error){
    setfetched_data({isError : true , msg:"something wrong"});
  }
}
  const handleSubmit = (e) =>{
    e.preventDefault();
    fetched_Weather();
  };


  return (
    <>
    <div className="container">
    <h1 className="title">WEATHER APP</h1>

    <form onSubmit={handleSubmit} className="search">
          <input className="input"
           type="text"
            placeholder="Enter your city name ..."
            value={city}
             onChange={(e) => setcity(e.target.value)}/>
             
        <button className="button" type="submit"
                onClick={fetched_Weather}>
                  🔍 
        </button>
    </form>

 
    {fetched_data && (
      
      <div className="results">
        {fetched_data.errormsg ? (
          <p className="errormsg">{fetched_data.errormsg}</p>
        ):(
          <div>
        <h2 className="location">- {fetched_data.location.name} -- {fetched_data.location.country}</h2>
        <h1 className="temp">- {fetched_data.current.temp_c}`C</h1>
        <p className="condition">- {fetched_data.current.condition.text}</p>
        <img className="icon" src={fetched_data.current.condition.icon} alt="icon"/>

      </div>
        )}
      </div>
      
    )}
    </div> 
    </>
  )
}

export default App
