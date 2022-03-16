  import React,{ useState } from 'react';

  
  const Home = () => {

    const [count,setCount] = useState(0);
    
    const onIncrease = () => {
      setCount(count => count + 1);
    }

    const onDecrease = () => {
      setCount(count - 1);
    }


      return (
          <div>
            {count}
            <br/>
            <button onClick={onIncrease}>증가</button>
            <br/>
            <button onClick={onDecrease}>감소</button>
          </div>
      );
    };

    export default React.memo(Home);