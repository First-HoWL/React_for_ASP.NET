import { useState,  useEffect } from 'react';
import './App.css';
import { replace, Route, Routes, useLocation, useNavigate } from 'react-router';


// document.addEventListener('contextmenu', (event) => {
//     event.preventDefault(); // Запрещает появление браузерной панели
// });


// function GetMap({map, callBackFetch, islose, flagsMap, setFlagsMap}){
//   const mapHtml = []
//   //let flagsMap = flagsMaps
//   for(let i = 0; i < 10; i++){
//     let items = []
//     for(let j = 0; j < 10; j++){
//       items.push(<td 
//         className={
//           map[i][j] === "B" ? "bomb" : 
//           map[i][j] === "O" ? "clear" :
//           map[i][j] === "1" ? "numb1" :
//           map[i][j] === "2" ? "numb2" :
//           map[i][j] === "3" ? "numb3" :
//           map[i][j] === "4" ? "numb4" :
//           map[i][j] === "5" ? "numb5" :
//           map[i][j] === "6" ? "numb6" :
//           map[i][j] === "7" ? "numb7" :
//           map[i][j] === "8" ? "numb8" :
//           flagsMap[i][j] === "F" ? "flag" : "closen"
//         }
//         onMouseDown={
//           map[i][j] === "" ? (e) => 
//             {
//               //console.log(e.button)
//               if(e.button === 0){
//                 if(flagsMap[i][j] !== "F"){
//                   callBackFetch(j, i)
//                   }
//               }
//               else if (e.button === 2){
//                 console.log(e.button)
//                 //if(flagsMap[i][j] !== "F")
//                   flagsMap[i][j] = "F";
//                 // else
//                 //   flagsMap[i][j] = "";            
//               }
//             }
//            : undefined}
//         >{map[i][j] !== "B" ? map[i][j] !== "O" ? map[i][j] : "" : "" }</td>)
//     }
//     mapHtml.push(<tr>{items}</tr>)
//   }
//   return (mapHtml)
// }
// function App() {
//   const [id, setId] = useState()
//   const [map, setMap] = useState()
//   let flagsMap = Array(10).fill(null).map(() => Array(10).fill(""))
//   const [iswin, setIswin] = useState(false)
//   const [islose, setIslose] = useState(false)
//   async function func(){
//     let a = await fetch(`https://localhost:7198/FieldsControler/fields/${id}`)
//     let b = await a.json()
//     console.log(b)
//     setMap(JSON.parse(b.userFieldJson))
//     // if(b !== null && b !== undefined){
//     //   //setData(b)
//     //   setTotalCount(b.totalCount)
//     //   setPagesCount(b.pagesCount)
//     //   setHtmlData("")
//     //   b.items.forEach(e =>{
//     //     setHtmlData((prev) =>([...prev, <GetInfo element={e}/>]))        
//     //   })
//     // }
//   }
//   async function fetchMove(x, y){
//     let a = await fetch(`https://localhost:7198/FieldsControler/move?id=${id}&x=${x}&y=${y}`, {method: "Post"})
//     let b = await a.json()
//     console.log(b)
//     setMap(b.field)
//     setIslose(b.isLose)
//     setIswin(b.isWin)
//   }
//   async function createNewField(sizeX = 10, sizeY = 10, mines = 10){
//     let a = await fetch(`https://localhost:7198/FieldsControler/CreateField?SizeX=${sizeX}&SizeY=${sizeY}&Mines=${mines}`, {method: "Post"})
//     let b = await a.json()
//     console.log(b)
//     setId(b.id)
//     setMap(JSON.parse(b.userFieldJson))
//     setIslose(false)
//     setIswin(false)
//     flagsMap = Array(10).fill(null).map(() => Array(10).fill(""))
//   }
//   useEffect(() => {
//   id !== undefined && func();
//   }, []);
//   return (<>
//   <button onClick={() => createNewField()}>Create new Field</button>
//   <input name="Id" placeholder='Id' value={id} onChange={(e) => {setId(e.target.value)}}></input>
//   <button onClick={() => func()}>Find</button>
//     {map != null && <table>
//       <tbody>
//       <GetMap map={map} islose={islose} flagsMap = {flagsMap} setFlagsMap = {(a) => flagsMap = a} callBackFetch={(x, y) => fetchMove(x, y)}/>
//         </tbody>
//     </table> }
//   {islose && <h1>You Lose!</h1>}      
//   {iswin && <h1>You Win!</h1>}
//   </>)
// }
// export default App;




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
function IndexPage(){

  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem("token") === null){
      navigate("/login", {replace:true})
    }

  })
  return(
    <>
    <h1>Index</h1>
    </>
  )
}


function App() {

  function function1(){
  fetch("https://localhost:7198/Users").then(data => data.json()).then(text => console.log(text))
  }

  return(
    <>
    <Routes>
      <Route path='/' element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
    <button onClick={() => function1()}>Click me!</button>
    </>
  )
}

export default App;
