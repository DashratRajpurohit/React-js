import React from 'react'

export default function Card(props) {
  return (

        <div className="main1">
              <div className="id1 common">
                <div className="img">
                  <img src={props.img1} alt="" className='image'/>
                </div>
                <h2>“A random person with no known identity.”</h2>
                <p>A wide-angle fashion shot of a man standing in the center of an empty concrete parking garage. He is wearing a brown hoodie, baggy grey trousers, and a white cap, showcasing a relaxed streetwear aesthetic against an industrial architectural backdrop.</p>
              </div>
              <div className="id2 common">
                <div className="img">
                  <img src={props.img2} alt=""className='image'/>
                </div>
                <h2>“A face without a name or a story.”</h2>
                <p>A wide-angle fashion shot of a man standing in the center of an empty concrete parking garage. He is wearing a brown hoodie, baggy grey trousers, and a white cap, showcasing a relaxed streetwear aesthetic against an industrial architectural backdrop.</p>
              </div>
        </div>
      
  )
}
