//import logo from './logo.svg';
import { useState,  useEffect } from 'react';
import './App.css';

function GetInfo({element}){
  return(
      <><tr>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{element.surname}</td>
        <td>{element.premium}</td>
        <td>{element.salary}</td>
        <td>{element.departmentId}</td>
        </tr>
      </>
    )
}



function App() {

  
  const [htmldata, setHtmlData] = useState();
  const [state, setState] = useState(1);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    surname: "",
    premium: "",
    salary: "",
    departmentId: "",
  });
  // https://localhost:7198/Doctors/doctors

  async function func(){
    let a = await fetch("https://localhost:7198/Doctors/doctors")
    let b = await a.json()
    console.log(b)
    if(b !== null && b !== undefined){
      //setData(b)

      setHtmlData("")
      b.forEach(e =>{
        setHtmlData((prev) =>([...prev, <GetInfo element={e}/>]))
        
      })
    }

  }
  useEffect(() => {func()}, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function AddDoctor(){
    fetch("https://localhost:7198/Doctors/AddDoctors",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    } )
  }

  return (
    <>
    <button onClick={() => setState(1)}>Doctors</button>
    <button onClick={() => setState(2)}>Add doctor</button>
    {state === 1 && htmldata != null &&
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Surname</td>
          <td>Premium</td>
          <td>Salary</td>
          <td>DepartmentId</td>
        </tr>
      </thead>
      <tbody>
        {htmldata}
        </tbody>
    </table>
    }
    { state === 2 && 
    <>
    <form onSubmit={(e) => {
      e.preventDefault();
      AddDoctor();
      func();
    }}>
      <input required name='name' value={formData.name} onChange={handleChange} placeholder='Name'></input>
      <input required name='surname' value={formData.surname} onChange={handleChange} placeholder='Surname'></input>
      <input required type='number' name='premium' value={formData.premium} onChange={handleChange} placeholder='Premium'></input>
      <input required type='number' name='salary' value={formData.salary} onChange={handleChange} placeholder='Salary'></input>
      <input required name='departmentId' value={formData.departmentId} onChange={handleChange} placeholder='DepartmentId'></input>
      <button type='submit'>Add</button>
    </form>
    </>

    }
    </>
  );
}

export default App;
