import React from 'react'

const EmployeeDetail = (props) => {
    return (
        <div>
            employee Number : {props.emp_no} <br />
            name : {`${props.first_name} ${props.last_nama}`} <br/>
            Birth Date : {props.birth_date} <br />
            Gender : {props.gender} <br />
            <hr />
        </div>
    );
}
 
export default EmployeeDetail;