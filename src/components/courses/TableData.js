import React, { createRef } from 'react';
import indexedDB from '../../indexedDB'
import { ClickAwayListener } from '@material-ui/core';

class TableData extends React.Component {
    constructor(props) {
        super(props)
        this.inputValue = React.createRef()
        this.save = this.save.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.state = {
            editMode: false,
            value: this.props.rowValue["course_name"],
        }
    }

    componentDidUpdate() {
        if (this.props.rowValue["course_name"] !== this.state.value) {
            this.setState({ value: this.props.rowValue["course_name"] })
        }
    }

    render() {
        console.log("data")
        const displayMode = <span ref={this.displayMode}>{this.state.value}</span>

        const editMode =
            <ClickAwayListener onClickAway={e => this.toggleEditMode(e, "closing edit mode")}>
                <div className="row">
                    <input className="mt-1 w3-input col-8 offset-2"
                        ref={this.inputValue}
                        defaultValue={this.state.value}
                        onClick={e => e.stopPropagation()}
                        autoFocus />
                    <i className="material-icons col-1 m-auto offset-1 myr"
                        onClick={e => this.save(e, "saving edits", this.inputValue.current.value)}>
                        create
                    </i>
                </div >
            </ClickAwayListener >

        return (
            <td onClick={e => this.toggleEditMode(e, "opening edit mode")}>
                {this.state.editMode ? editMode : displayMode}
            </td>
        )
    }

    toggleEditMode(e, message) {
        e.stopPropagation()
        console.log(message)
        this.setState((state) => ({
            editMode: !state.editMode
        }));
    }

    save(e, message, inputValue) {
        e.stopPropagation()
        const emptyInput = inputValue ? false : true
        //const duplicateEntry = 
        //const thereAreChanges 
        //validate if there are changes, if yes, persist. if the same, dont,
        //validate for empty input and
        //validate duplicate edit
        console.log(message)
        const newValue = inputValue
        console.log(inputValue)
        const id = this.props.rowValue["courses"]
        console.log(id)

        const IDB = new indexedDB()
        IDB.IDBDatabase.then(result => {
            const RequestResult = IDB.getIDBResult(IDB.getObjectStore(result, "courses", "readwrite").openCursor(id))
            RequestResult.then(res => {
                res.value.course_name = newValue
                const updating = res.update(res.value)
                updating.onsuccess = () => {
                    this.props.triggerUpdate()
                    console.log("Successfully edited!")
                }
            }).catch(res => {
                console.log(`Error: ${res}`)
            })
        })

        this.setState((state) => ({
            editMode: !state.editMode,
        }));

    }
}

export default TableData

/*
 persist and trigger update
*/