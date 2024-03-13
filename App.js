
import { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';
import { clear } from '@testing-library/user-event/dist/clear';
function App() {
  const [data,setData] = useState([])
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [age,setAge] = useState('')
  const [id,setId] = useState(0)
  const [isUpdate,setIsUpdate] = useState(false)
  
  
  useEffect(() => {
    setData(EmployeeData)
  },[]);

  const handleEdite = (id) =>{
 const dt = data.filter(item => item.id === id)
 if(dt !== undefined){
   setIsUpdate(true)
  setId(id);
 setFirstName(dt[0].firstName);
 setLastName(dt[0].lastName);
 setAge(dt[0].age);
   }
  }

  const handleDelete = (id) =>{
  if(id > 0){
    if (window.confirm('are you sure want to delete?')){
    const dt = data.filter(item => item.id !== id);
    setData(dt)}
  }
  }

  const handleSave = (e) =>{
   e.preventDefault();
   const dt = [...data];
   const newObject ={
    id : EmployeeData.length + 1,
    firstName : firstName,
    lastName : lastName,
    age : age,

   }
   dt.push(newObject)
   setData(dt)
  }

  const handleClear = () =>{
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  }

  const handleUpdate = () =>{
   const index = data.map((item, index)=>{
    return item.id
   }).indexOf(id);
   const dt =[...data];
   dt[index].firstName = firstName;
   dt[index].lastName = lastName;
   dt[index].age = age;
   setData(dt);
   handleClear();

  }

  return (
    <div className="App">

<div style={{display:'flex',justifyContent:'center',marginTop:'30px',marginBottom:'20px'}}>
  <div>
    <label>First Name</label>
    <input type='text' placeholder='Enter First name' onChange={(e) =>setFirstName(e.target.value)}value={firstName}/>
  </div>
  <div>
    <label>Last Name</label>
    <input type='text' placeholder='Enter Last name'onChange={(e) =>setLastName(e.target.value)}value={lastName } />
  </div> 
   <div>
    <label>Age</label>
    <input type='text' placeholder='Enter Age'onChange={(e) =>setAge(e.target.value)}value={age}/>
  </div>

  <div>
    {
      !isUpdate ?
      <button className='btn btn-primary'onClick={(e)=> handleSave(e)}>Save</button>
      :
      <button className='btn btn-primary'onClick={()=> handleUpdate()}>Update</button>
    }
  
              <button className='btn btn-danger'onClick={()=> handleClear()}>clear</button>
  </div>
  </div>      

<table className='table table-hover'>
  <thead>
    <tr>
      <td>sr.No</td>
      <td>Id</td>
      <td>First Name</td>
      <td>Last Name</td>
      <td>age</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
    {
      data.map((item,index) => {
        return(
          <tr key={index}>
            <td>{index+1}</td>
            <td>{item.id}</td> 
            <td>{item.firstName}</td> 
            <td>{item.lastName}</td> 
            <td>{item.age}</td> 
            <td>
              <button className='btn btn-primary'onClick={()=> handleEdite(item.id)}>Edit</button>&nbsp;
              <button className='btn btn-danger'onClick={()=> handleDelete  (item.id)}>Delete</button>
            </td>
          </tr>
        )
      })
    }
  </tbody>
</table>
    </div>
  );
}

export default App;
