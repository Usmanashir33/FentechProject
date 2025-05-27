import { FaCalendarCheck } from "react-icons/fa6"

const CalenderFilterer = (filteringData,setData) => {
    const [displayFilter, setDisplayFilter] = useState(false)
    const [selectedDate, setSelectedDate] = useState('All')

    const handleDateSelection =(range,setSelectedDate,setData) => {
            setSelectedDate(range)

            // also calender selecetion 
            let calenderDate = new Date(range)
            let next_day = new Date(calenderDate)
            next_day.setDate(calenderDate.getDate() + 1)

            if (calenderDate !== 'Invalid Date'){
                let calender_data = setSelectedDate.filter(item => {
                    const itemDate = new Date(item.trx_date);
                    if (itemDate < next_day && itemDate >= calenderDate){
                        return item
                        
                    }
                })
                setData(calender_data);
            }
            const now = new Date();
            const Today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const Yesterday = new Date(Today);
            Yesterday.setDate(Yesterday.getDate() - 1);

            const ThisWeek = new Date(Today);
            ThisWeek.setDate(ThisWeek.getDate() - 7);

            const LastWeek = new Date(Today);
            LastWeek.setDate(LastWeek.getDate() - 14);

            const LastMonth = new Date(Today);
            LastMonth.setMonth(LastMonth.getMonth() - 1);
            setDisplayFilter(false);
            
              switch (range) {
                case 'today':
                  return setData(setSelectedDate.filter(item => {
                    const itemDate = new Date (item.trx_date);
                    return itemDate >= Today ? item : null ;
                  }))

                case 'yesterday':
                    return setData(setSelectedDate.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        return (itemDate >= Yesterday && itemDate < Today)? item : null ;
                      }))

                case 'thisWeek':
                    let this_weekly = setSelectedDate.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= ThisWeek){
                            return item
                        }});
                    return setData(this_weekly);

                case 'lastWeek':
                    let weekly = setSelectedDate.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= LastWeek && itemDate < ThisWeek){
                            return item
                        }});
                    return setData(weekly);

                case 'thisMonth':
                    let this_month = setSelectedDate.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-1){
                            return item
                        }
                    })
                    return setData(this_month);
                case 'lastMonth':
                    let last_month = setSelectedDate.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-2){
                            return item
                        }
                    })
                    return setData(last_month);
                case 'clear':
                    setData(data)
                    setSelectedDate('All')

                default:
                    setDisplayFilter(false);
                    return true; // no filter
                }
            
    }


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