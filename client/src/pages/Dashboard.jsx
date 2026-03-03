import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services/api";
import { Plus, X, Droplets, Calendar, Mail, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inventoryType, setInventoryType] = useState("in");
    const [bloodGroup, setBloodGroup] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [email, setEmail] = useState("");

    // get function
    const getBloodRecords = async () => {
        try {
            const { data } = await API.get("/inventory/get-inventory");
            if (data?.success) {
                setData(data?.inventory);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBloodRecords();
    }, []);

    // handle modal submission
    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!bloodGroup || !quantity || !email) {
                return alert("Please Provide All Fields");
            }
            const { data } = await API.post("/inventory/create-inventory", {
                email,
                organisation: user?._id,
                inventoryType,
                bloodGroup,
                quantity,
            });
            if (data?.success) {
                alert("New Record Added");
                setShowModal(false);
                setBloodGroup("");
                setQuantity(0);
                setEmail("");
                getBloodRecords();
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <div className="dashboard-view">
            <div className="page-header">
                <div className="header-title">
                    <h2>Inventory Dashboard</h2>
                    <p>Overview of blood supplies and transactions</p>
                </div>
                <button className="add-btn interactive-hover" onClick={() => setShowModal(true)}>
                    <Plus size={20} />
                    <span>Add Record</span>
                </button>
            </div>

            <div className="table-responsive glass">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th><div className="th-flex"><Droplets size={14} /> <span>Blood Group</span></div></th>
                            <th>Status</th>
                            <th>Quantity</th>
                            <th><div className="th-flex"><Mail size={14} /> <span>Donar Email</span></div></th>
                            <th><div className="th-flex"><Calendar size={14} /> <span>Date & Time</span></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id} className="interactive-row">
                                <td className="blood-td">
                                    <span className="blood-tag">{record.bloodGroup}</span>
                                </td>
                                <td>
                                    <div className={`status-badge ${record.inventoryType}`}>
                                        {record.inventoryType === "in" ? (
                                            <><ArrowDownRight size={14} /> <span>Inbound</span></>
                                        ) : (
                                            <><ArrowUpRight size={14} /> <span>Outbound</span></>
                                        )}
                                    </div>
                                </td>
                                <td className="quantity-td">
                                    <strong>{record.quantity}</strong> <small>ML</small>
                                </td>
                                <td className="email-td">{record.email}</td>
                                <td className="date-td">
                                    {new Date(record.createdAt).toLocaleDateString()}
                                    <span className="time-sub">{new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass animate-fade-in">
                        <div className="modal-header">
                            <div>
                                <h3>Add Blood Record</h3>
                                <p>Fill in the details to update inventory</p>
                            </div>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleModalSubmit} className="modal-form">
                            <div className="type-toggle">
                                <label className={`type-btn ${inventoryType === "in" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="inventoryType"
                                        value="in"
                                        checked={inventoryType === "in"}
                                        onChange={(e) => setInventoryType(e.target.value)}
                                    />
                                    <span>Inbound (Donation)</span>
                                </label>
                                <label className={`type-btn ${inventoryType === "out" ? "active" : ""}`}>
                                    <input
                                        type="radio"
                                        name="inventoryType"
                                        value="out"
                                        checked={inventoryType === "out"}
                                        onChange={(e) => setInventoryType(e.target.value)}
                                    />
                                    <span>Outbound (Supply)</span>
                                </label>
                            </div>

                            <div className="form-grid">
                                <div className="form-input-group">
                                    <label>Blood Group</label>
                                    <select
                                        value={bloodGroup}
                                        onChange={(e) => setBloodGroup(e.target.value)}
                                        className="form-select"
                                        required
                                    >
                                        <option value={""}>Select Group</option>
                                        {["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"].map(bg => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-input-group">
                                    <label>Quantity (ML)</label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="e.g. 500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-input-group">
                                <label>{inventoryType === "in" ? "Donar Email" : "Hospital Email"}</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter contact email"
                                    required
                                />
                            </div>

                            <button type="submit" className="login-submit-btn">
                                Confirm & Add Record
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
