import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Home.css';


function Home() {
  const [listOfEmp, setListOfEmp] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8001/employees")
      .then((response) => {
        setListOfEmp(response.data);        
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data:", error);
      });
  }, []);

  const handleDelete = (employeeID) => {
    setShowConfirm(true);
    setEmployeeToDelete(employeeID);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8001/employees/${employeeToDelete}`);
      setListOfEmp((prevList) => prevList.filter(emp => emp.id !== employeeToDelete));
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employeeID) => {
    navigate(`/edit/${employeeID}`); // Navigating to the edit page with employee ID
  };

  return (
    <div className="tableContainer">
      <table className="employeeTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOfEmp.map((value, key) => {
            return (
              <tr
                key={value.id}
                
              >
                <td>{value.name}</td>
                <td>{value.employeeID}</td>
                <td>{value.email}</td>
                <td>{value.phone}</td>
                <td>{value.department}</td>
                <td>{new Date(value.dateOfJoining).toLocaleDateString()}</td>
                <td>{value.role}</td>
                <td>
                  <button className='actionButton editButton' onClick={() => handleEdit(value.id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className='actionButton deleteButton' onClick={(e) => { e.stopPropagation(); handleDelete(value.id); }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showConfirm && (
        <div className='confirmDialog'>
          <p>Are you sure you want to delete this employee?</p>
          <button className="confirmYes" onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default Home;