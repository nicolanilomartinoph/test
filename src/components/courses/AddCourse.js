import React from 'react';
import indexedDB from '../../indexedDB'
import { ClickAwayListener } from '@material-ui/core';

export default class AddCourse extends React.Component {
    constructor(props) {
        super(props)
        this.submitCourse = this.submitCourse.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = { value: "" }
    }

    render() {
        return (
            <tr>
                <td >
                    <ClickAwayListener onClickAway={this.props.closeAddCourse()}>
                        <input className="col-10 offset-1 mt-1 w3-input"
                            value={this.state.value} type="text"
                            onChange={this.handleChange}
                            autoFocus required
                        />
                    </ClickAwayListener >
                </td>
                <td >
                    <button onClick={this.props.closeAddCourse()} >
                        <i className="material-icons mx-auto  mt-1" title="cancel">
                            clear
                        </i>
                    </button>
                    <button type="submit" onClick={this.submitCourse} title="save">
                        <i className="material-icons mx-auto  mt-1">
                            create
                        </i>
                    </button>
                </td>
            </tr>

        )
    }

    handleChange(e) {
        this.setState({ value: e.target.value })
    }

    submitCourse(event) {
        event.preventDefault()

        // Empty input validation
        var name;
        if (this.state.value) {
            name = this.state.value
        }
        else {
            alert("Course name is empty! Please enter something.")

            return 0;
        }

        // Duplicate resource validation
        var validate = name.toLowerCase()

        // Unique ID generator
        var ID = function () {
            return (Math.random() * 999).toString(8)
        }

        console.log("Submitting new course")

        // Connect to IDB and persist

        const IDB = new indexedDB()
        IDB.IDBDatabase.then(result => {
            const RequestResult = IDB.getIDBResult(IDB.getObjectStore(result, "courses", "readwrite")
                .add({ course_code: `C${ID()}`, course_name: validate }))
            RequestResult.then(res => {
                this.setState({ value: '' }) // Refresh input
                this.props.triggerUpdate() // Refresh course display
                console.log(`Course successfully added `)
            }).catch(res => {
                alert("Operation Failed! Make sure your input is unique and contains valid characters.")
                console.log(`Error: ${res}`)
            })
        })
    }
}