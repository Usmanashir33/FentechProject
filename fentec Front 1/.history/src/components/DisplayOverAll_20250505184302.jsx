
// import spiner1 from  '../assets/form_spinner.gif'
import spiner1 from  '../assets/spn.gif'
import { useContext } from 'react';
// import spiner1 from  '../assets/Lock.gif'
import loadingIcon from '../assets/Loading.gif'
import { uiContext } from '../customContexts/UiContext';


const DisplayOverAll = () => {
    const {formLoading,loading,success,setSuccess,err} = useContext(uiContext);
    // const []

    return ( 
        <div className="display-over-all" style={{zIndex:'99999'}}>
            {<div className="popup red-popup">{'showRedPopup'}</div>}
            { formLoading && <div className="form-spinner">
                <img src={spiner1} alt="" className='' onClick={(e) => {
                    e.stopPropagation();
                }}/>
            </div>}
            { loading && <div className="">
                <img src={loadingIcon} alt="" className="spiner-image"  onClick={(e) => {
                    e.stopPropagation();
                }}/>

            </div>}
        </div>
     );
}
 
export default DisplayOverAll;