import React, { useState, useRef, useEffect } from 'react'
import Announcement from './Announcement'
import "./index.css"
import Navbar from './Navbar'

const App = () => {
  const [brightness, setBrightness] = useState({
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  })

  const [contrast, setContrast] = useState({
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  })

  const [saturation, setSaturation] = useState({
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  })

  const [grayscale, setGreyscale] = useState({
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  })

  const [sepia, setSepia] = useState({
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  })

  const [hueRotate, setHueRotate] = useState({
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  })

  const [blur, setBlur] = useState({
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  })

  const [background, setBackground] = useState('https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg')
  
  const [imageLoaded, setImageLoaded] = useState(false)

  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = background
    image.onload = () => {
      setImageLoaded(true)
    }
    imageRef.current = image
  }, [background])

  const applyFilters = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = imageRef.current

    if (imageLoaded) {
      canvas.width = image.width
      canvas.height = image.height
      ctx.filter = `
        ${brightness.property}(${brightness.value}${brightness.unit})
        ${contrast.property}(${contrast.value}${contrast.unit})
        ${saturation.property}(${saturation.value}${saturation.unit})
        ${grayscale.property}(${grayscale.value}${grayscale.unit})
        ${sepia.property}(${sepia.value}${sepia.unit})
        ${blur.property}(${blur.value}${blur.unit})
        ${hueRotate.property}(${hueRotate.value}${hueRotate.unit})
      `
      ctx.drawImage(image, 0, 0)
    }
  }

  const downloadImage = () => {
    applyFilters()
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'modified-image.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div>
      <Announcement />
      <Navbar setBackground={setBackground} />
      <div className='wrapper'>
        <div className='img_wrapper'>
          <div className='image'>
            <img src={background}
              style={{
                filter: `
                  ${brightness.property}(${brightness.value}${brightness.unit})
                  ${contrast.property}(${contrast.value}${contrast.unit})
                  ${saturation.property}(${saturation.value}${saturation.unit})
                  ${grayscale.property}(${grayscale.value}${grayscale.unit})
                  ${sepia.property}(${sepia.value}${sepia.unit})
                  ${blur.property}(${blur.value}${blur.unit})
                  ${hueRotate.property}(${hueRotate.value}${hueRotate.unit})
                `
              }}
              alt=""
            />
          </div>
        </div>
        <div className='options'>
          <div className='mode'>
            <span>Brightness</span>
            <input type="range" min={brightness.range.min} max={brightness.range.max} value={brightness.value}
              onChange={(e) => { setBrightness({ ...brightness, value: `${e.target.value}` }) }} />
            <span>Contrast</span>
            <input type="range" min={contrast.range.min} max={contrast.range.max} value={contrast.value}
              onChange={(e) => { setContrast({ ...contrast, value: `${e.target.value}` }) }} />
          </div>
          <div className='mode'>
            <span>Saturation</span>
            <input type="range" min={saturation.range.min} max={saturation.range.max} value={saturation.value}
              onChange={(e) => { setSaturation({ ...saturation, value: `${e.target.value}` }) }} />
            <span>Grayscale</span>
            <input type="range" min={grayscale.range.min} max={grayscale.range.max} value={grayscale.value}
              onChange={(e) => { setGreyscale({ ...grayscale, value: `${e.target.value}` }) }} />
          </div>
          <div className='mode'>
            <span>Sepia</span>
            <input type="range" min={sepia.range.min} max={sepia.range.max} value={sepia.value}
              onChange={(e) => { setSepia({ ...sepia, value: `${e.target.value}` }) }} />
            <span>Hue Rotate</span>
            <input type="range" min={hueRotate.range.min} max={hueRotate.range.max} value={hueRotate.value}
              onChange={(e) => { setHueRotate({ ...hueRotate, value: `${e.target.value}` }) }} />
          </div>
          <div className='mode blur'>
            <span>Blur</span>
            <input type="range" min={blur.range.min} max={blur.range.max} value={blur.value}
              onChange={(e) => { setBlur({ ...blur, value: `${e.target.value}` }) }} />
          </div>
        </div>
        <div className='download'>
          <button className='download-btn' onClick={downloadImage}>Download Modified Image</button>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
      </div>
    </div>
  )
}

export default App
