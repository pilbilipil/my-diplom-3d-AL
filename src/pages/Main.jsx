import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Box } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function MyBox() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.008;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2.3, 2.3, 2.3]} />
      <meshStandardMaterial color="#23395B" />
    </mesh>
  );
}

function MyThreeComponent() {
  return (
    <div style={{ position: 'relative' }}>
      <Canvas style={{ background: '#E3ECF2', height:'100vh'}}>
        <ambientLight intensity={7.5} /> {/* Добавляем ambientLight с интенсивностью 0.5 */}
        <pointLight position={[1, 0.3, 1.5]} />
        <MyBox />
      </Canvas>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md flex flex-col">
      <h1 className='text-[#E3ECF2] shadow-md shadow-black font-bold text-6xl mb-12'>CRP</h1>
       <input type="text" placeholder="Email" className="w-48 px-4 py-2 text-lg mb-6 rounded-md bg-[#E3ECF2] bg-opacity-80 hover:shadow-md hover:shadow-white focus:outline-none" />
       <input type="text" placeholder="Password" className="w-48 px-4 py-2 text-lg mb-8 rounded-md bg-[#E3ECF2] bg-opacity-80 hover:shadow-md hover:shadow-white focus:outline-none" />
       <div>
       <button class="bg-cyan-400 hover:bg-cyan-300 hover:shadow-cyan-300 hover:shadow-md text-white font-bold py-2 px-4 mr-4 rounded">
       Sign IN
       </button>
       <button class="bg-white text-black hover:shadow-white hover:shadow-md  text-white font-bold py-2 px-4 rounded">
       Sign UP
       </button>
       </div>
     </div>
    </div>
  );
}


export default MyThreeComponent;
