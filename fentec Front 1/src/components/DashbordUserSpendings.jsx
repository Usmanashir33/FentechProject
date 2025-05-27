import { useContext } from "react";
import { authContext } from "../customContexts/AuthContext";

const DashbordUserSpendings = () => {
    const {currentUser} = useContext(authContext)
    return ( 
        <div className="user-spendings">
                                <div className="balance-card">
                                    <div className="balance-names">
                                        <span className="b-name"> Balance</span>
                                        <span className="b-chart"> Chart</span>
                                    </div>
                                    <div className="card-footer">
                                        <span>${Math.floor(currentUser?.account?.account_balance)} </span>
                                        <span> + 120</span>
                                    </div>
                                </div>

                                <div className="inflow-card">
                                    <div className="balance-names">
                                        <span className="b-name"> Inflow</span>
                                        <span className="b-chart"> Chart</span>
                                    </div>
                                    <div className="card-footer">
                                        <span>$12,050</span>
                                        <span> + 120</span>
                                    </div>
                                </div>

                                <div className="outflow-card">
                                    <div className="balance-names">
                                        <span className="b-name"> Outflow</span>
                                        <span className="b-chart"> Chart</span>
                                    </div>
                                    <div className="card-footer">
                                        <span>$12,050</span>
                                        <span> + 120</span>
                                    </div>
                                </div>

                        </div>
     );
}
 
export default DashbordUserSpendings;