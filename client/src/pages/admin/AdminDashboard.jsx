import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Users, Building2, Trash2, Shield } from "lucide-react";

const AdminDashboard = () => {
    const [donars, setDonars] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [organisations, setOrganisations] = useState([]);

    // get donar list
    const getDonarsList = async () => {
        try {
            const { data } = await API.get("/admin/donar-list");
            if (data?.success) {
                setDonars(data?.donarData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // get hospital list
    const getHospitalList = async () => {
        try {
            const { data } = await API.get("/admin/hospital-list");
            if (data?.success) {
                setHospitals(data?.hospitalData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // get org list
    const getOrgList = async () => {
        try {
            const { data } = await API.get("/admin/org-list");
            if (data?.success) {
                setOrganisations(data?.orgData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDonarsList();
        getHospitalList();
        getOrgList();
    }, []);

    return (
        <div className="admin-view">
            <div className="page-header">
                <div className="header-title">
                    <h2>Control Panel</h2>
                    <p>Manage donors and health partners</p>
                </div>
                <div className="admin-badge glass">
                    <Shield size={16} />
                    <span>Administrator Access</span>
                </div>
            </div>

            <div className="admin-sections">
                <section className="admin-section">
                    <div className="section-title">
                        <Users size={20} />
                        <h3>Donors Directory <small>({donars.length})</small></h3>
                    </div>
                    <div className="table-responsive glass">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donars?.map((record) => (
                                    <tr key={record._id} className="interactive-row">
                                        <td><strong>{record.name}</strong></td>
                                        <td>{record.email}</td>
                                        <td>{record.phone}</td>
                                        <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="admin-section">
                    <div className="section-title">
                        <Building2 size={20} />
                        <h3>Hospitals Network <small>({hospitals.length})</small></h3>
                    </div>
                    <div className="table-responsive glass">
                        <table className="inventory-table">
                            <thead>
                                <tr>
                                    <th>Hospital Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hospitals?.map((record) => (
                                    <tr key={record._id} className="interactive-row">
                                        <td><strong>{record.hospitalName}</strong></td>
                                        <td>{record.email}</td>
                                        <td>{record.phone}</td>
                                        <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
