import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import Gallary from './components/Gallary'
import Cal from './components/Cal'
import Card from './components/Card'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Child1 from "./components/Child1.jsx"

//install package(library) -> terminal -> npm install react-route-dom

//library -> App.jsx -> 1. import{BrowserRouter, Routes, Rout} from "react-router-dom"

function App() {

    // useEffect -> (API), -> Behaviour(3) and syntax
    //1. useEffect(callback function(//kaam), dependency -> [](array)) -> 2 arguments ..
    //addEventListner("depend", ()=>{})

    //2. dependency -> nun -> array[]-> empty -> only once and then never execute ..

    //3. second argument is optional -> if it is not present inside useEffect then it will consider the entire component as it's own dependency

    //  props == Data shared from parent to child mostly in one level only 

    // Props-Drilling == when we need to pass some data with the help of "props" concept but in between this the sander and reciver component 
    //                   holding Data but if there is no. of components then they have to hold that unecessary data which is useless.

    //   Solotion of props Drolling !

    //  Context API === Data{ in Container like wherehouse} -->  Provider --> Consumer {Component}


    // var [count, setCount] = useState(0);
    // var [Name, setName] = useState("Dashrat");

    // function handelClick() {
    //     setCount(count + 1);
    //     setName("Rajpurohit")
    // }

    var [count, setCount] = useState(0);
    var [value, setValue] = useState(0);

    const handleClick = useCallback(() => {
        console.log("parent function is called");
        setCount(++count);
    }, [value]);

    function handleClick1() {
        console.log("re-rendered bacause of variable changes");
        setValue(++value);
    }



    return (
        <>



            <Nav logo="Headder" about="Routes" />
            <BrowserRouter>
                <Routes>

                    <Route path='/Card' element={<Card img1="https://images.unsplash.com/photo-1765568562615-4bf854edcf1a?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        img2="https://images.unsplash.com/photo-1765916093860-28dc1bdd2de9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />} ></Route>

                    <Route path='/Gallery' element={<Gallary />}></Route>

                    <Route path='/' element={[<Gallary />,
                    <Card img1="https://images.unsplash.com/photo-1765568562615-4bf854edcf1a?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        img2="https://images.unsplash.com/photo-1765916093860-28dc1bdd2de9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                        , <Gallary />]}></Route>

                </Routes>
            </BrowserRouter>

            <Nav logo="footer" about="cadr and gallery" />


            <p>Count: {count}</p>
            <p>Value: {value}</p>
            <button onClick={handleClick}>Click Me</button>
            <button onClick={handleClick1}>Click Me1</button>
            <Child1 name={handleClick} />


            <br />
            {/* <p>Count: {count} <br /> Name: {Name}</p>
            <button type='button' onClick={handelClick}>Click me!</button>

            <Cal count1={count} />
             */}



            {/* <div className="main">
                <div className="div1">
                    <div className="spid">
                        <img src="https://github.com/DashratRajpurohit/CGxSU_Semester_1/blob/main/html_css_js/CSS/00.assignment/02.level_2/01.superwars/super-1.png?raw=true"
                            alt="spider" />
                        <h4>Spiderman</h4>
                        <h1>12</h1>
                    </div>
                    <div className="wond">
                        <img src="https://github.com/DashratRajpurohit/CGxSU_Semester_1/blob/main/html_css_js/CSS/00.assignment/02.level_2/01.superwars/super-3.png?raw=true"
                            alt="" />
                        <h4>Wonder Women</h4>
                        <h1>30</h1>
                    </div>
                </div>
                <div className="div2">
                    <h1>5-0</h1>
                </div>
                <div className="div3">
                    <div className="capt">
                        <img src="https://github.com/DashratRajpurohit/CGxSU_Semester_1/blob/main/html_css_js/CSS/00.assignment/02.level_2/01.superwars/super-2.png?raw=true"
                            alt="" />
                        <h4>Captain America</h4>
                        <h1>50</h1>
                    </div>
                    <div className="gem">
                        <img src="https://github.com/DashratRajpurohit/CGxSU_Semester_1/blob/main/html_css_js/CSS/00.assignment/02.level_2/01.superwars/super-4.png?raw=true"
                            alt="" />
                        <h4>Gem Woman</h4>
                        <h1>12</h1>
                    </div>
                </div>
            </div> */}




        </>
    )
}

export default App
