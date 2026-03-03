import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Droplets, TrendingUp, TrendingDown, Activity } from "lucide-react";

const Analytics = () => {
    const [data, setData] = useState([]);

    // get blood group data
    const getBloodGroupData = async () => {
        try {
            const { data } = await API.get("/analytics/bloodGroups-data");
            if (data?.success) {
                setData(data?.bloodGroupData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBloodGroupData();
    }, []);

    return (
        <div className="analytics-view">
            <div className="page-header">
                <div className="header-title">
                    <h2>Blood Analytics</h2>
                    <p>Real-time data visualization of blood reserves</p>
                </div>
            </div>

            <div className="analytics-grid">
                {data?.map((record, i) => (
                    <div className="analytics-card glass interactive-hover animate-fade-in" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                        <div className="card-header">
                            <div className="blood-icon-circle">
                                <Droplets size={24} color="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                            </div>
                            <span className="blood-group-display">{record.bloodGroup}</span>
                        </div>

                        <div className="card-stats">
                            <div className="stat-row">
                                <div className="stat-info">
                                    <TrendingUp size={14} className="icon-in" />
                                    <span>Total In</span>
                                </div>
                                <strong>{record.totalIn} <small>ML</small></strong>
                            </div>
                            <div className="stat-row">
                                <div className="stat-info">
                                    <TrendingDown size={14} className="icon-out" />
                                    <span>Total Out</span>
                                </div>
                                <strong>{record.totalOut} <small>ML</small></strong>
                            </div>
                        </div>

                        <div className="card-footer-inventory">
                            <div className="available-label">
                                <Activity size={14} />
                                <span>Current Available</span>
                            </div>
                            <div className="available-value">
                                {record.availabeBlood} <span>ML</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;
