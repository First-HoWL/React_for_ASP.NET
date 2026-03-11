import { useState,  useEffect } from 'react';
import './App.css';
import {  Route, Routes, useNavigate, useParams } from 'react-router';



function LoginPage(){
  
  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem("token") != null){
      
      navigate("/", {replace:true})
    }
    
  })

  function login(e){
    e.preventDefault()

    let credentials = {
      "email" : document.getElementById("userEmail").value,
      "password" : document.getElementById("userPassword").value,
    }
    fetch("https://localhost:7198/Users/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(response => response.text())
    .then(data => {
      localStorage.setItem("token", data)
      navigate("/", {replace:true})
    })
    .catch(err => {
      console.log(err)
    })

  }

  return(
    <>
    <form onSubmit={(e) => login(e)}>
      <input id="userEmail" type='email' placeholder='email'/>
      <input id="userPassword" type='password' placeholder='password'/>
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}

function RegistrationPage(){
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if (localStorage.getItem("token") != null){
      
  //     navigate("/", {replace:true})
  //   }
  // })

  function login(){

    let credentials = {
      "email" : document.getElementById("userEmail").value,
      "password" : document.getElementById("userPassword").value,
    }
    fetch("https://localhost:7198/Users/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(response => response.text())
    .then(data => {
      localStorage.setItem("token", data)
      navigate("/", {replace:true})
    })
    .catch(err => {
      console.log(err)
    })

  }

  function registration(e){
    e.preventDefault()

    let credentials = {
      "id": 0,
      "name" : document.getElementById("userName").value,
      "email" : document.getElementById("userEmail").value,
      "passwordHash" : document.getElementById("userPassword").value,
      "birthday" : document.getElementById("userBirthday").value,
      "gender" : document.getElementById("userGender").value,
      "role" : ""
    }
    fetch("https://localhost:7198/Users/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(response => {
      if(response.status === 200){
        login()
      }
    })

  }

  return(
    <>
    <form onSubmit={(e) => registration(e)}>
      <input id="userEmail" type='email' placeholder='email'/>
      <input id="userPassword" type='password' placeholder='password'/>
      <input id="userName" type='text' placeholder='name'/>
      <input id="userBirthday" type='date'/>
      <select id="userGender" >
        <option>Male</option>
        <option>Female</option>
        <option>Croisant</option>
        <option>None</option>
      </select>
      <button type='submit'>Submit</button>
    </form>
    </>
  )
}

function Users(){
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    if (token === null){
      navigate("/login", {replace:true})
    }

    fetch("https://localhost:7198/Users", {
        method: "GET",
        headers:{
          "Authorization": `Bearer ${token}`
      }
      }).then(response => {
        if(response.status === 401 || response.status === 403){
          // localStorage.removeItem("token")
          console.log(response)
          navigate("/", {replace:true})
        }
        else {
          return response.json()
        }
        
      })
      .then(data => {
        if(!data){
          return
        }
        console.log(data)
        setUsers(data)

    })
  }, [])

  

  return(
    <>
    <table>
      <thead>
        <tr >
            <td>id</td>
            <td>name</td>
            <td>email</td>
            <td>passwordHash</td>
            <td>gender</td>
            <td>birthday</td>
            <td>role</td>
            <td>buttons</td>
          </tr>
      </thead>
      <tbody>
        {users !== null && users.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.passwordHash}</td>
            <td>{e.gender}</td>
            <td>{e.birthday}</td>
            <td>{e.role}</td>
            <td>
              <button value={e.id} className='edit' onClick={(e) => 
                navigate(`/users/edit/${e.target.value}`, {replace:true})}>
                Edit
              </button>
              <button className='remove'>
                Remove
              </button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

function Edit(){
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    passwordHash: "",
    birthday: "",
    gender: "",
    role: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function Update(e){
    e.preventDefault()

    fetch("https://localhost:7198/Users/Edit", {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if(response.status === 200){
          navigate("/users", {replace:true})
      }
    })

  }


  useEffect(()=>{
    if (token === null){
      navigate("/login", {replace:true})
    }

    fetch(`https://localhost:7198/Users/byId?id=${id}`, {
        method: "GET",
        headers:{
          "Authorization": `Bearer ${token}`
      }
      }).then(response => {
        if(response.status === 401 || response.status === 403){
          // localStorage.removeItem("token")
          console.log(response)
          navigate("/", {replace:true})
        }
        else {
          return response.json()
        }
        
      })
      .then(data => {
        if(!data){
          return
        }
        console.log(data)
        setUser(data)

        setFormData({
          id: data.id,
          name: data.name,
          email: data.email,
          passwordHash: data.passwordHash,
          birthday: data.birthday,
          gender: data.gender,
          role: data.role
        })

    })
  }, [])

  return(
    <>
    <form onSubmit={(e) => Update(e)}>
      <input  type='email' name="email" value={formData.email} placeholder='email' onChange={(e) => handleChange(e)}/>
      <input type='text' name="passwordHash" value={formData.passwordHash} placeholder='password' onChange={(e) => handleChange(e)}/>
      <input type='text' name="name" value={formData.name}placeholder='name' onChange={(e) => handleChange(e)}/>
      <input type='date' name="birthday"  value={formData.birthday}onChange={(e) => handleChange(e)}/>
      <select name="gender" value={formData.gender} onChange={(e) => handleChange(e)}>
        <option>Male</option>
        <option>Female</option>
        <option>Croisant</option>
        <option>None</option>
      </select>
      <input type='text' placeholder='role' name="role" value={formData.role} onChange={(e) => handleChange(e)}/>

      <button type='submit'>Submit</button>
    </form>
    </>
  )

}

function IndexPage(){
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  useEffect(()=>{
    if (token === null){
      navigate("/login", {replace:true})
    }
    else{
      fetch("https://localhost:7198/Users/me", {
      method: "GET",
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      if(response.status === 401){
        localStorage.removeItem("token")
        //console.log(response)
        navigate("/login", {replace:true})
      }
        
    })
    }

  })
  return(
    <>
    <h2>Lorem ipsum 1</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget viverra nibh. In dictum fermentum dui. Cras vel commodo libero, ut condimentum ex. Sed enim purus, tincidunt eget varius ac, pretium sed metus. Nunc sed felis convallis, vulputate nisl quis, pulvinar ex. Donec in lacus enim. Nam faucibus, sem ut convallis lacinia, elit velit ornare lacus, et laoreet magna felis nec enim. Proin egestas imperdiet mattis. Donec ac tellus nunc. Praesent blandit erat a lorem cursus maximus. Nulla at laoreet mi. Suspendisse metus felis, euismod vitae urna id, volutpat faucibus est. Curabitur lobortis tincidunt sapien et gravida.</p>

    <h2>Lorem ipsum 2</h2>
    <p>Duis elementum augue sit amet odio dignissim, in viverra eros malesuada. Duis dapibus sapien vel neque rutrum consectetur. Donec porta fringilla est, eget posuere ex egestas ut. Nullam efficitur nisi at est lobortis suscipit. Maecenas ante diam, blandit vitae velit nec, hendrerit tristique magna. Nunc finibus varius lectus eget malesuada. Integer nunc diam, dictum ac lorem blandit, placerat elementum odio. Nunc gravida dolor in lacus venenatis cursus. Ut finibus leo sed justo volutpat, in lobortis justo aliquet.</p>

    <h2>Lorem ipsum 3</h2>
    <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque tempor dui eget velit ultricies, eget efficitur risus aliquam. Vestibulum volutpat vulputate felis vitae maximus. Vestibulum ac mattis lacus. Aenean tortor mauris, vestibulum sed lacinia in, blandit sed est. Sed blandit, nulla pellentesque fringilla porttitor, lorem urna finibus urna, eget placerat orci purus et felis. Mauris cursus pretium molestie. Ut laoreet cursus mauris a accumsan. Proin volutpat massa eget feugiat convallis.</p>

    <h2>Lorem ipsum 4</h2>
    <p>Ut non tortor eget purus maximus condimentum. Proin viverra augue tortor, nec lacinia tortor pulvinar vitae. Suspendisse tempor at nunc in aliquam. Morbi volutpat metus dui. Donec ipsum urna, maximus non ex convallis, consectetur hendrerit purus. Fusce id interdum sem. Praesent iaculis elit eu dui dignissim, eget lacinia mi interdum.</p>

    <h2>Lorem ipsum 5</h2>
    <p>Praesent lobortis odio ut neque accumsan gravida. Donec pulvinar vulputate nisi, in faucibus turpis sollicitudin ornare. Aenean faucibus ipsum diam, ac interdum odio imperdiet in. Cras tellus ex, laoreet quis ante nec, rutrum dictum tortor. Etiam a porta felis. Phasellus non turpis consequat, pulvinar neque ac, blandit enim. Praesent vel sem tortor. Sed nulla ante, tincidunt blandit nisi eget, ullamcorper hendrerit ante.</p>
    </>
  )
}


function App() {


  return(
    <>
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='/users' element={<Users />} />
      <Route path='/users/edit/:id' element={<Edit />} />
      
    </Routes>
    </>
  )
}

export default App;
