import React from 'react'
import Child2 from "./Child2.jsx"

const Child1 = React.memo(
    (props)=>{

  function heading() {
    console.log(`child fucntion is exceuting unnecessarily: ,${props.name} `);
    return <h1>Hii from child1</h1>
  }
  return (
    <>
      <p>Hello1 Child1</p>
      {heading()}
      <Child2 />
    </>
  )
}

)

export default Child1;