import React from 'react';
import TableData from './TableData.js'
import indexedDB from '../../indexedDB'

export default class CourseRow extends React.Component {
    constructor(props) {
        super(props)
        this.deleteCourse = this.deleteCourse.bind(this)
        this.state = {
            IDB: this.props.IDBRecord
        }
    }

    componentDidUpdate() {
        if (this.state.IDB !== this.props.IDBRecord) {
            this.setState({ IDB: this.props.IDBRecord })
        }
        return true
    }

    render() {
        const template = [<tr key="x"><td>Loading...</td><td>Loading...</td></tr>]


        if (this.state.IDB) {
            template.pop()
            for (let i in this.state.IDB) {
                template.push(

                    <tr key={this.state.IDB[i]["courses"]}>

                        <TableData key={this.state.IDB[i]["courses"]}
                            triggerUpdate={() => this.props.triggerUpdate()}
                            rowValue={this.state.IDB[i]}>
                        </TableData>

                        <td >{this.state.IDB[i]["course_code"]}
                            <i id={this.state.IDB[i]["courses"]}
                                onClick={event => this.deleteCourse(event)}
                                className="trashANDedit deleteIcon material-icons"
                                title="delete">
                                delete
                            </i>
                        </td>
                    </tr >
                )
            }
        }

        return (
            <>
                {template}
            </>

        )
    }

    deleteCourse(event) {
        console.log("DELETE EVENT")
        event.stopPropagation()
        const id = parseInt(event.target.id)
        const IDB = new indexedDB()
        IDB.IDBDatabase.then(result => {
            const RequestResult = IDB.getIDBResult(IDB.getObjectStore(result, "courses", "readwrite")
                .delete(id))
            RequestResult.then(() => {
                console.log("deleted course")
                this.props.triggerUpdate()
            }).catch(res => {
                console.log(`Error: ${res}`)
            })
        })
    }
}


/*

delete course when trash icon is clicked
edit
*/
