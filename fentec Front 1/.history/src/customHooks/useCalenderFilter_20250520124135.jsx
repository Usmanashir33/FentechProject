import { FaCalendarCheck } from "react-icons/fa6"

const CalenderFilterer = (data,setData) => {
    const [displayFilter, setDisplayFilter] = useState(false)
    const [selectedDate, setSelectedDate] = useState('All')
    const CalenderDisplayer = () => {
        return (
            <div className="filtered-date relative " onClick={() => {setDisplayFilter(true)}}>
                < FaCalendarCheck/>
                <span className="date">{selectedDate}</span>
            </div>
        )
    }
    const CalenderScreen = () => {
        return (
            { displayFilter && <div className="filter-container">
                <div className=" relative">
                    <FontAwesomeIcon icon={faMultiply} className="cancel" onClick={() => {setDisplayFilter(false)}}/>
                </div>
                <div className="sel-days">
                    <div className={``} onClick={() => {handleDateSelection('today', transections?.results ,setFilteredTrxs)}}>Today</div>
                    <div className={``} onClick={() => {handleDateSelection('yesterday', transections?.results ,setFilteredTrxs)}}>Yesterday</div>
                    <div className={``} onClick={() => {handleDateSelection('thisWeek', transections?.results ,setFilteredTrxs)}}>This Week</div>
                                                <div className={``} onClick={() => {handleDateSelection('lastWeek', transections?.results ,setFilteredTrxs)}}>Last Week</div>
                    <div className={``} onClick={() => {handleDateSelection('thisMonth', transections?.results ,setFilteredTrxs)}}>This Month</div>
                    <div className={``} onClick={() => {handleDateSelection('lastMonth', transections?.results ,setFilteredTrxs)}}>Last Month</div>
                    <div className={``} onClick={() => {handleDateSelection('clear', transections?.results ,setFilteredTrxs)}}>Clear</div>
                    <div className={`flex`} onClick={handleCustomClick}>
                        custom
                        <input type='date' name="" id="date"  className="" ref={calender} onChange={(e) => {
                            handleDateSelection(e.target.value,transections?.results ,setFilteredTrxs)
                        }}/>
                    </div>
                </div>
            </div>}
        )
    }
    return ( {

    } );
}
 
export default CalenderFilterer; 