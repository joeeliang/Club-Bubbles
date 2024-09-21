
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css'
import {useEffect} from "react";


function Join() {
    useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Cleanup function to reset the overflow property on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-gradient-to-r tw-from-blue-950 tw-to-blue-200">
            
        </div>
    )
}

export default Join
