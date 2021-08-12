import React, {useRef, useState} from 'react'

const ResponseCheck = () => {
  const [state, setState] = useState('waiting')
  const [message,setMessage] = useState('클릭해서 시작하세요.')
  const [result,setResult] = useState('')
  const [result2,setResult2] = useState('')

  const timeOut = useRef()
  const startTime = useRef()
  const endTime = useRef()

  const onClickScreen = () => {
    
      if(state==='waiting') {
        setState('ready')
        setMessage('초록색이 되면 클릭하세요')
        setResult2('')

        timeOut.current = setTimeout( () => {
          setState('now')
          setMessage('클릭하세요!')

          startTime.current = new Date()
        }, Math.floor(Math.random()*1000)+ 2000)
      } else if(state === 'ready') {
        clearTimeout(timeOut.current)
        setState('waiting')
        setMessage('초록색이 된 후에 클릭해주세요.')

      } else if(state === 'now') {
        endTime.current = new Date()
        setState('waiting')
        setMessage('클릭해서 시작하세요')
        setResult((prevResult)=> {
          return [...prevResult, endTime.current - startTime.current]
        })
        setResult2(`${endTime.current - startTime.current}ms`)
        
      }
      }
    
  

  const onReset = () => {
    setResult([])
    setResult2('')
  }

  const  renderAverage = () => {

      return (result.length === 0 
      ? null 
      :<>
      <div>평균 시간: {result.reduce((a,c) => a+c) / result.length}ms</div>
      <button onClick={onReset}>리셋!</button>
      </>      
      )
  }

  return (
    <>
    <div id = "screen"
    className={state}
    onClick={onClickScreen}
    >
      {message}
      {result2}
    </div>
    {renderAverage()}
    </>
  )
}

export default ResponseCheck