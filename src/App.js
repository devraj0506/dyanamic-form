import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [formData,setFormData] = useState([
    {"name":"",
      "job":""}
])


const addMore = () =>{
  let newFields = {"name":"", "job":""}
  setFormData([...formData,newFields])
}

const HandleForm = (index,e)=>{
  let data = [...formData]
  data[index][e.target.name] = e.target.value
  setFormData(data)
}

const HandleSubmit = async (e) =>{
  e.preventDefault()
  for (let index = 0; index < formData.length; index++) {
   await axios.post("https://reqres.in/api/users",formData[index])
   .then((response)=>console.log(response))
   .catch((err)=>console.log(err))
  }
}

const RemoveField=(index)=>{
  let data = [...formData]
  data.splice(index,1)
  setFormData(data)
}

setTimeout(() => {
  localStorage.setItem('data', formData)
}, 600);

let prevData=localStorage.getItem('data') 
if(prevData){
  setFormData(prevData)
}

  return (
    <div className="App">
      <form onSubmit={HandleSubmit}>
     { formData.map((input,index)=>
       (<div key={index}>
        
         <input type="text" onChange={(e)=>HandleForm(index,e)} name="name" placeholder='name' value={input.name} />
         <input type="text" onChange={(e)=>HandleForm(index,e)} name="job" placeholder='job' value={input.class} />
         <button onClick={()=>RemoveField(index)} >Remove</button>
       </div>
         )
        )
      }
      <button onClick={addMore}>ADD More...</button>
      <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
