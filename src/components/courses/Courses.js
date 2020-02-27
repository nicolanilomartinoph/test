import React from 'react';
import CourseRow from './CourseRow.js';
import AddCourse from './AddCourse.js';
import indexedDB from '../../indexedDB.js'

const IDB = new indexedDB()

export default class Courses extends React.Component {
    constructor(props) {
        super(props)
        this.triggerUpdate = this.triggerUpdate.bind(this)
        this.state = {
            updateHappened: false,
            IDBRecord: null
        }
    }

    render() {
        console.log("PARENT COURSES RENDER")
        return (
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>CODE</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.addCourse &&
                        <AddCourse
                            closeAddCourse={this.props.closeAddCourse}
                            triggerUpdate={() => this.triggerUpdate()}
                        />
                    }
                    <CourseRow
                        IDBRecord={this.state.IDBRecord}
                        triggerUpdate={() => this.triggerUpdate()}
                    />
                </tbody>
            </table>
        )
    }

    componentDidMount() {
        this.triggerUpdate()
    }

    triggerUpdate() {
        console.log("Update triggered")
        IDB.IDBDatabase.then(result => {
            const RequestResult = IDB.getIDBResult(IDB.getObjectStore(result, "courses").getAll())
            RequestResult.then(result => {
                let courseRows = []
                result.map(item => {
                    courseRows.push(item)
                })
                this.setState(() => ({
                    IDBRecord: courseRows
                }))
            })
        }).catch(res => {
            console.log(`Error: ${res}`)
        })
    }

}


