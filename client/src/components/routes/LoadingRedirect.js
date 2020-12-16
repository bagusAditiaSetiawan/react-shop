import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

const LoadingRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(()=>{
        const countInterval = setInterval(()=>{
            setCount(currentCount=>--currentCount);
        }, 1000);

        count === 0 && history.push('/login');

        return () => clearInterval(countInterval);
    },[history, count])

    return (
        <div className="text-center p-5">
            will redirected {count} seconds
        </div>
    );
}



export default LoadingRedirect;