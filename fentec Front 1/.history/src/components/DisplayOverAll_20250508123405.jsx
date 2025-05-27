
// import spiner1 from  '../assets/form_spinner.gif'
import spiner1 from  '../assets/spn.gif'
import { useContext, useEffect } from 'react';
// import spiner1 from  '../assets/Lock.gif'
import loadingIcon from '../assets/Loading.gif'
import { uiContext } from '../customContexts/UiContext';


const DisplayOverAll = () => {
    const {formLoading,loading,success,setSuccess,error,setError} = useContext(uiContext);
    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSuccess('');
          }, 2000);
          return () => clearTimeout(timer);
    },[success,error])

    return ( 
        <div className="dis" style={{zIndex:''}}>
            {success && <div className="popup">{success}</div>}
            {error && <div className="popup red-popup">{error}</div>}
            { formLoading && <div className="form-spinner">
                <img src={spiner1} alt="" className='' onClick={(e) => {
                    e.stopPropagation();
                }}/>
            </div>}
            { !loading && <div className=""> 
                <img src={loadingIcon} alt="" className="spiner-image"  onClick={(e) => {
                    e.stopPropagation();
                }}/>

            </div>}
        </div>
     );
}
 
export default DisplayOverAll;