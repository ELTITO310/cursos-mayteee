import ReactPlayer from 'react-player'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { useState } from 'react'

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  
  // Importar dinámicamente todos los videos de la carpeta assets
  const videoModules = import.meta.glob('./assets/*.webm', { eager: true })
  
  // Convertir los módulos importados en un arreglo de URLs
  const videos = Object.values(videoModules).map((module: any) => module.default)
  
  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }
  
  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-48'>
      <h1 className='text-2xl font-bold mb-4'>Estos son todos los videos de tus ejercicios {":)"}</h1>
      <p className='text-sm text-gray-600 mb-4'>Video {currentVideoIndex + 1} de {videos.length}</p>
      
      <Disclosure as='div' className='w-full flex flex-col items-center gap-5 bg-gray-300 rounded-md py-3'>
        <DisclosureButton className="py-2 bg-gray-300 rounded-t-md w-full">Ver Ejercicio</DisclosureButton>
        <DisclosurePanel transition className="bg-gray-300 flex flex-col items-center w-full origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0">
          <ReactPlayer src={videos[currentVideoIndex]} controls width="80%" height="80%" />
          
          <div className='flex gap-4 mt-4'>
            <button 
              onClick={prevVideo}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Anterior
            </button>
            <button 
              onClick={nextVideo}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Siguiente
            </button>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}

export default Home;