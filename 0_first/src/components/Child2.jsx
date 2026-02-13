import React from 'react'

export default function Child2() {
    function handle(){
        console.log("Child2 is also called");
        return <h1>Child2 component</h1>
    }
  return (
    <>
        <p>child2 component in paragraph</p>
        {handle()}
    </>
  )
}