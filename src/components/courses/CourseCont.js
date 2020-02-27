import React from 'react';
import Courses from './Courses.js'

export default class CourseCont extends React.Component {
    constructor() {
        super();
        this.toggleAddCourse = this.toggleAddCourse.bind(this);
        this.state = {
            showAddCourse: false
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row my-3 myc">
                            <i className="material-icons" id="addCourseBtn" onClick={this.toggleAddCourse}>
                                add_circle
                            </i>
                            <h1 className="col-4">COURSE</h1>
                            <div className="col-4">display filter</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Courses addCourse={this.state.showAddCourse} closeAddCourse={() => this.toggleAddCourse} />
                </div>
            </div>
        )
    }

    toggleAddCourse(e) {
        e.stopPropagation()
        this.setState((state) => ({
            showAddCourse: !state.showAddCourse
        }));
    }
}

/* add new course
- DONE add a blank row in the table to register a new course
- DONE input is na, code is incremental
- DONE cancel and persist to database button
*/
// Display available courses
// delete course
// edit course