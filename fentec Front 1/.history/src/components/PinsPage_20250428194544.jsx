import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMultiply} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState } from "react";

const PinsPage = ({toggleInsertPin,insertPinAction = null,digit = '4'}) => {
    const [error,setError] = useState()
    const pwd1 = useRef('');
    const pwd2 = useRef('');
    const pwd3 = useRef('');
    const pwd4 = useRef('');
    const pwd5 = useRef('');
    const pwds = digit === '5' ? [ pwd1,pwd2,pwd3,pwd4,pwd5] : [ pwd1,pwd2,pwd3,pwd4]

    const handleButtonClick = () => {
        let pins = [] ;
        pwds.forEach((pwd) => {
            if (pwd.current.value){
                pins.push(pwd.current.value)
            }
            if (pwds.length == pins.length){
                insertPinAction(pins.join('').toString())
                toggleInsertPin();
            }else{
                setError('Incomplete Pins!')
                setTimeout(() => {
                    setError(null)
                }, 2000);
            }
        })
        
    }

    const pinClicked = (e,inline='keybord',value=null) => { 
        let num =(inline === 'keybord') ? (e.target.value) : value ;
        let empty_pwds = []
        const onlyDigitReg = /[1234567890]/ig;

        if (inline === 'keybord'){
            let pwd = e.target
            e.target.value = '' ; // store the value and empty the field to place it dynamically
        }
        const numPressed = num.match(onlyDigitReg)
       
        if (numPressed){
            pwds.forEach((p) => {
                if(!p.current.value){
                    empty_pwds.push(p)
                }
            })
            if (empty_pwds.length > 1){
                empty_pwds[0].current.value = num
                empty_pwds[1].current.focus()
            }else if(empty_pwds.length === 1){
                empty_pwds[0].current.value = num
            }
            // console.log('empty_pwds ',  empty_pwds );

            // formDetails['otp'] = `${pwd1.current.value}${pwd2.current.value}${pwd3.current.value}${pwd4.current.value}${pwd5.current.value}`
        }
    }
    
    const pinClearAll = () => {
        pwds.forEach((pwd) => {
            pwd.current? pwd.current.value = '' : null;
        })
    }
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace'){
                pinClearAll()
            }
        })
        return document.removeEventListener('keydown', (e) => {})
    },[])
    return ( 
        <div className=" pay-page confirm-payment-plate " >
                <div className="c-text">{digit === '4'? '' : 'Enter Otp Sent to your Email'}</div>
                <div className="cancel-icon">
                    <FontAwesomeIcon  icon={faMultiply} className="" onClick={() => {
                        toggleInsertPin();
                    }}/>
                </div>
                
                {<div className=" select-account show-pin flex">
                            <input type="password" className ="pin-dis" id="pin-dig-1" maxLength="1"  ref={pwd1} autoFocus 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-2" maxLength="1" ref={pwd2} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-3" maxLength="1" ref={pwd3} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-4" maxLength="1" ref={pwd4} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            {(digit === '5' ) && 
                            <input type="password" className ="pin-dis" id="pin-dig-5" maxLength="1" ref={pwd5} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />}
                    </div>}

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}
                <div className="num-divs">
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','1')}}>1</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','2')}}>2</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','3')}}>3</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','4')}}>4</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','5')}}>5</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','6')}}>6</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','7')}}>7</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','8')}}>8</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','9')}}>9</div>
                    <div className="num-div" onClick={(e) => {pinClicked(e,'inlineDegit','0')}}>0</div>
                </div>

                <button type="button" className="confirm-pay-btn" onClick={(e) => {handleButtonClick()}}> Validate </button>
            </div>
     );
}
 
export default PinsPage;