import { FaCalendarCheck } from "react-icons/fa6"

const CalenderFilterer = (filteringData,setData) => {
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
        return ( <>
                { displayFilter && <div className="filter-container">
                    <div className=" relative">
                        <FontAwesomeIcon icon={faMultiply} className="cancel" onClick={() => {setDisplayFilter(false)}}/>
                    </div>
                    <div className="sel-days">
                        <div className={``} onClick={() => {handleDateSelection('today' )}}>Today</div>
                        <div className={``} onClick={() => {handleDateSelection('yesterday' )}}>Yesterday</div>
                        <div className={``} onClick={() => {handleDateSelection('thisWeek' )}}>This Week</div>
                        <div className={``} onClick={() => {handleDateSelection('lastWeek' )}}>Last Week</div>
                        <div className={``} onClick={() => {handleDateSelection('thisMonth' )}}>This Month</div>
                        <div className={``} onClick={() => {handleDateSelection('lastMonth' )}}>Last Month</div>
                        <div className={``} onClick={() => {handleDateSelection('clear' )}}>Clear</div>
                        <div className={`flex`} onClick={handleCustomClick}>
                            custom
                            <input type='date' name="" id="date"  className="" ref={calender} onChange={(e) => {
                                handleDateSelection(e.target.value)
                            }}/>
                        </div>
                    </div>
                </div>}
        </>
        )
    }
    return ( {

    } );
}
 
export default CalenderFilterer; 