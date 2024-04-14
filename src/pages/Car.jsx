import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let scene, camera, renderer;

          // Создаем сцену
          scene = new THREE.Scene();
          scene.background = new THREE.Color('#E3ECF2'); // RGB-цвет бежевого фона
    
          // Создаем камеру
          camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.z = 2;
    
          // Создаем рендерер
          renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          mountRef.current.appendChild(renderer.domElement);
    
    
          // Добавляем свет
          const light = new THREE.AmbientLight(0xffffff, 10);
          light.position.set(0.5, 0.5, 0.5);
          scene.add(light);
    
          const pointLight1 = new THREE.PointLight(0xffffff, 12); // Цвет, Интенсивность
          pointLight1.position.set(0, 1, 0); // Положение источника света
          scene.add(pointLight1);

          const circleGeometry = new THREE.CircleGeometry(1, 100); // Радиус круга: 5, число сегментов: 32
          const circleMaterial = new THREE.MeshStandardMaterial({ color: '#161925' }); // серый цвет
          const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
          circleMesh.rotation.x = -Math.PI / 2; // Поворачиваем плоскость чтобы она была параллельна оси X
          scene.add(circleMesh);

          controlsRef.current = new OrbitControls(camera, renderer.domElement);
          controlsRef.current.enableDamping = true;
          controlsRef.current.dampingFactor = 0.25;
          controlsRef.current.enableZoom = true;
          controlsRef.current.autoRotate = true;
          controlsRef.current.autoRotateSpeed = 0.5;
          
          const loader = new GLTFLoader().setPath('src/toyota_camry_40/');

          const init = () => {
            const animate = () => {
              requestAnimationFrame(animate);
              renderer.render(scene, camera);
            };
          
            const updateRendererSize = () => {
              const { width, height } = mountRef.current.getBoundingClientRect();
              camera.aspect = width / height;
              camera.updateProjectionMatrix();
              renderer.setSize(width, height);
            };
          
            // Загружаем 3D модель
            loader.load(
              'scene.gltf', // Укажите путь к вашей модели
              (gltf) => {
                const mesh = gltf.scene;
                mesh.scale.set(0.5, 0.5, 0.5); // Устанавливаем масштаб по осям X, Y и Z
                mesh.position.set(0, 0, 0);
                scene.add(mesh);

                mesh.traverse((node) => {
                if (node.isMesh) {
                    node.userData.onClick = () => {
                        // Обработчик для клика на части модели
                        console.log('Clicked on mesh:', node.name);
                        // Добавьте здесь код для открытия окна или выполнения другого действия
                    };
                }
                });

                
                // Обновляем размеры рендерера после загрузки модели
                updateRendererSize();
          
                // Запускаем анимацию после загрузки модели
                animate();
              },
              undefined,
              (error) => {
                console.error('Error loading GLTF model:', error);
              }
            );
          };
          

          init();

    // Обработчик изменения размера окна
    const handleResize = () => {
      const { width, height } = mountRef.current.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      controlsRef.current.dispose(); // Очищаем ресурсы управления камерой
    };
    
  }, []);



  return (
  <div className="relative">
    <div ref={mountRef} className="relative">

 <div className="absolute top-20 left-3/4 flex flex-col space-y-4 text-black font-bold">
  <div className="flex items-center justify-between">
    <span className="mr-2">Price:</span> {/* Добавлен класс "mr-2" для создания отступа справа */}
    <div className="h-4 w-48 bg-gray-300 rounded-lg">
      <div className="h-full bg-sky-500  rounded-lg" style={{ width: `${3 * 10}%` }}></div>
    </div>
  </div>
  <div className="flex items-center justify-between">
    <span className="mr-2">Comfort:</span> {/* Добавлен класс "mr-2" для создания отступа справа */}
    <div className="h-4 w-48 bg-gray-300 rounded-lg">
      <div className="h-full bg-sky-500 rounded-lg" style={{ width: `${4 * 10}%` }}></div>
    </div>
  </div>
  <div className="flex items-center justify-between">
    <span className="mr-2">Reliable:</span> {/* Добавлен класс "mr-2" для создания отступа справа */}
    <div className="h-4 w-48 bg-gray-300 rounded-lg">
      <div className="h-full bg-sky-500 rounded-lg" style={{ width: `${8 * 10}%` }}></div>
    </div>
  </div>
  <div className="flex items-center justify-between">
    <span className="mr-2">Service:</span> {/* Добавлен класс "mr-2" для создания отступа справа */}
    <div className="h-4 w-48 bg-gray-300 rounded-lg">
      <div className="h-full bg-sky-500 rounded-lg" style={{ width: `${8 * 10}%` }}></div>
    </div>
  </div>
</div>


      <div className="absolute top-20 left-20 text-white text-lg bg-black bg-opacity-30 p-4 rounded-lg animate-slideIn hover:shadow-lg hover:shadow-black">
      {!isOpen && (
        <button className='rounded-lg text-white flex items-center justify-center' onClick={toggleChat}>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="4" height="4" fill="none" viewBox="0 0 24 24">
           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/>
          </svg>
        </button>
      )}
      {isOpen && (
        <div>
          <button className='rounded-lg text-white flex items-center justify-center' onClick={closeChat}>
            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="4" height="4" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
          <div className='text-left'>
          <p>
          Stamp:<br/>
          Title:<br/>
          Engine:<br/>

          Basic information:<br/>

          Common problems:<br/>
          </p>
          </div>
        </div>
      )}
      </div>
    </div>
  </div>
  );
};

export default ThreeScene;
