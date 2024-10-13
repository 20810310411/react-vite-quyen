// () => { } 

import './style.css'
  
const MyComponent = () => {
  const cua = "1 2 3 con tho"
    return (
      <>
      <div> {JSON.stringify(cua)} co dep trai ko </div>
      <div> Cua handsome </div>
      <div className='thenao'> vai ca l </div>
      </>
    );
  }

export default MyComponent;