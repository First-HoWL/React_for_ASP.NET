//import logo from './logo.svg';
import { useState,  useEffect } from 'react';
import './App.css';

// function GetInfo({element}){
//   return(
//       <><tr>
//         <td>{element.id}</td>
//         <td>{element.name}</td>
//         <td>{element.surname}</td>
//         <td>{element.premium}</td>
//         <td>{element.salary}</td>
//         <td>{element.departmentId}</td>
//         </tr>
//       </>
//     )
// }

// function EditPage({callback, Cpage, pagesCount, totalCount, itemsOnPage}){

//   //const [buttons, setButtons] = useState("");
  
//   const buttons = [];

//   if(pagesCount <= 5){
//     for (let i = 1; i <= Math.min(pagesCount, 5); i++) {
//       buttons.push(
//         <button key={i} onClick={() => callback(i)} className={i == Cpage ? 'btn-choose-page active' : 'btn-choose-page' }>
//           {i}
//         </button>
//       );
//     }
//   }
//   else if (Cpage <= 3) {
//     for (let i = 1; i <= Math.min(pagesCount, 4); i++) {
//       buttons.push(
//         <button key={i} onClick={() => callback(i)} className={i == Cpage ? 'btn-choose-page active' : 'btn-choose-page' }>
//           {i}
//         </button>
//       );
//     }
//     if(pagesCount - Cpage >= 2){
//       if(pagesCount - Cpage >= 3){
//         buttons.push(
//           <span className='btn-choose-page'>
//             ...
//           </span>
//         );
//       }
//       buttons.push(
//         <button key={pagesCount} onClick={() => callback(pagesCount)} className={pagesCount == Cpage ? 'btn-choose-page active' : 'btn-choose-page' }>
//           {pagesCount}
//         </button>
//       );
      
//     }
//   } else {
//     if(Cpage >= 4){
//     buttons.push(
//         <button key={1} onClick={() => callback(1)} className={1 == Cpage ? 'btn-choose-page active' : 'btn-choose-page' }>
//           1
//         </button>
//       );
//       buttons.push(
//         <span className='btn-choose-page'>
//           ...
//         </span>
//       );
//     }
//     for (let i = Cpage - 1; i <= Math.min(pagesCount, Cpage + 1); i++) {
//       buttons.push(
//         <button key={i} onClick={() => callback(i)} className={i == Cpage ? 'btn-choose-page active' : 'btn-choose-page' }>
//           {i}
//         </button>
//       );
//     }

//     if(pagesCount - Cpage >= 2){
//       if(pagesCount - Cpage >= 3){
//         buttons.push(
//           <span className='btn-choose-page'>
//             ...
//           </span>
//         );
//       }
//       buttons.push(
//         <button key={pagesCount} onClick={() => callback(pagesCount)} className={pagesCount == Cpage ? 'btn-choose-page active' : 'btn-choose-page' }>
//           {pagesCount}
//         </button>
//       );
      
//     }

//   }

//   return (
//     <div className='btn-row-gen'>
//       <div className='btn-row'>
//         <button onClick={() => {callback(Cpage - 1)}} className='btn-choose-page'>←</button>
//         {/* <span>{Cpage} / {pagesCount}</span> */}
//           {buttons}
//         <button onClick={() => {callback(Cpage + 1)}} className='btn-choose-page'>→</button>
//       </div>
//       <div className='right-row'>
//         {Math.max(itemsOnPage * (Cpage - 1))} - {Math.min(itemsOnPage * Cpage, totalCount)} from {totalCount}
//       </div>
//     </div>
//   )
// }


// function App() {

//   const itemsOnPage = 2;
//   const [Gpage, setPage] = useState(1);
//   const [htmldata, setHtmlData] = useState();
//   const [state, setState] = useState(1);
//   const [formData, setFormData] = useState({
//     id: 0,
//     name: "",
//     surname: "",
//     premium: "",
//     salary: "",
//     departmentId: "",
//   });

//   const [totalCount, setTotalCount] = useState(0);
//   const [pagesCount, setPagesCount] = useState(0);


//   // https://localhost:7198/Doctors/doctors

//   async function func(page = Gpage){
//     let a = await fetch(`https://localhost:7198/Doctors/paged/${page}?size=${itemsOnPage}`)
//     let b = await a.json()
//     //console.log(b)
//     if(b !== null && b !== undefined){
//       //setData(b)

//       setTotalCount(b.totalCount)
//       setPagesCount(b.pagesCount)
//       setHtmlData("")
//       b.items.forEach(e =>{
//         setHtmlData((prev) =>([...prev, <GetInfo element={e}/>]))
        
//       })
//     }

//   }
//   useEffect(() => {func()}, []);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function AddDoctor(){
//     fetch("https://localhost:7198/Doctors/AddDoctors",{
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     } )
//   }

//   async function UpdatePage(newpage){
//     if(newpage > 0 && newpage <= pagesCount){
//       await setPage(newpage)
//       // console.log(newpage)
//       func(newpage)
//     }
//   }

//   return (
//     <>
//     <button onClick={() => setState(1)}>Doctors</button>
//     <button onClick={() => setState(2)}>Add doctor</button>
//     {state === 1 && htmldata != null &&
//     <>
//     <table>
//       <thead>
//         <tr>
//           <td>ID</td>
//           <td>Name</td>
//           <td>Surname</td>
//           <td>Premium</td>
//           <td>Salary</td>
//           <td>DepartmentId</td>
//         </tr>
//       </thead>
//       <tbody>
//         {htmldata}

//         </tbody>
//     </table>
//     <EditPage callback= {(e)=> UpdatePage(e)} Cpage={Gpage} pagesCount={pagesCount} totalCount={totalCount} itemsOnPage={itemsOnPage}/>
    
//     </>
//     }
//     { state === 2 && 
//     <>
//     <form onSubmit={(e) => {
//       e.preventDefault();
//       AddDoctor();

//       setTimeout(() => func(), 2000);
//     }}>
//       <input required name='name' value={formData.name} onChange={handleChange} placeholder='Name'></input>
//       <input required name='surname' value={formData.surname} onChange={handleChange} placeholder='Surname'></input>
//       <input required type='number' name='premium' value={formData.premium} onChange={handleChange} placeholder='Premium'></input>
//       <input required type='number' name='salary' value={formData.salary} onChange={handleChange} placeholder='Salary'></input>
//       <input required name='departmentId' value={formData.departmentId} onChange={handleChange} placeholder='DepartmentId'></input>
//       <button type='submit'>Add</button>
//     </form>
//     </>

//     }
//     </>
//   );
// }



function GetMap({map}){
  const mapHtml = []


  for(let i = 0; i < 10; i++){
    let items = []
    for(let j = 0; j < 10; j++){
      items.push(<td 
        className={
          map[i][j] === "B" ? "bomb" : 
          map[i][j] === "O" ? "clear" :
          map[i][j] === "1" ? "numb1" :
          map[i][j] === "2" ? "numb2" :
          map[i][j] === "3" ? "numb3" :
          map[i][j] === "4" ? "numb4" :
          map[i][j] === "5" ? "numb5" :
          map[i][j] === "6" ? "numb6" :
          map[i][j] === "7" ? "numb7" :
          map[i][j] === "8" ? "numb8" :
          map[i][j] === "F" ? "flag" : "closen"

        }
        >{map[i][j]}</td>)
    }
    mapHtml.push(<tr>{items}</tr>)
  }

  return (mapHtml)
}

function App() {
  const [id, setId] = useState(3)
  const [map, setMap] = useState()
  async function func(){
    let a = await fetch(`https://localhost:7198/FieldsControler/fields/${id}`)
    let b = await a.json()
    console.log(b)
    setMap(JSON.parse(b.fullFieldJson))
    
    // if(b !== null && b !== undefined){
    //   //setData(b)

    //   setTotalCount(b.totalCount)
    //   setPagesCount(b.pagesCount)
    //   setHtmlData("")
    //   b.items.forEach(e =>{
    //     setHtmlData((prev) =>([...prev, <GetInfo element={e}/>]))
        
    //   })
    // }

  }
  useEffect(() => {func()}, []);

  return (<>
    {map != null && <table>
      <GetMap map={map}/>
    </table> }

  </>)
}


export default App;
