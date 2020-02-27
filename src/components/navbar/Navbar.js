import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row myr" id="NavHeader">
                        <Link to="/" className="col-2 my-auto">
                            Test Answer for you
                        </Link>
                        <Link to="/students" className="col-1 offset-8 my-auto">
                            Students
                        </Link>
                        <Link to="/courses" className="col-1 my-auto">
                            Courses
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
