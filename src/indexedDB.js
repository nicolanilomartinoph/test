export default class indexedDB {
    constructor() {
        console.log("Initializing IndexedDB")
        this.IDBDatabase = new Promise((resolve, reject) => {
            const IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
            const IDBOpenDBRequest = IDBFactory.open("test")
            IDBOpenDBRequest.onerror = event => {
                console.log(`IDBOpenDBRequest Error: ${event.target.errorCode}`)
                reject(event.target.errorCode)
            }
            IDBOpenDBRequest.onblocked = event => {
                console.log(`IDBOpenDBRequest blocked: ${event.target.errorCode}`)
                reject(event.target.errorCode)
            }
            IDBOpenDBRequest.onsuccess = event => {
                console.log("IDBOpenDBRequest success")
                event.target.result.onclose = () => console.log("CLOSING IDB")
                resolve(event.target.result)
            }
            IDBOpenDBRequest.onupgradeneeded = event => {
                console.log("IDB Database Upgrade needed")
                const IDBDatabase = event.target.result

                const coursesStore = IDBDatabase.createObjectStore("courses", { keyPath: "courses", autoIncrement: true })
                coursesStore.createIndex("course_name", "course_name", { unique: true })
                coursesStore.createIndex("course_code", "course_code", { unique: true })

                const studentStore = IDBDatabase.createObjectStore("students", { keyPath: "students", autoIncrement: true })
                studentStore.createIndex("name", "name")
                studentStore.createIndex("email", "email", { unique: true })
                studentStore.createIndex("status", "status")

                coursesStore.transaction.oncomplete = () => console.log("Course database create!")
                studentStore.transaction.oncomplete = () => console.log("Student database create!")
                console.log("Successfully upgraded IDB Database!")
            }
        })
    }

    getObjectStore(IDBDatabase, ObjectStore, mode = "readonly") {
        return IDBDatabase.transaction(ObjectStore, mode).objectStore(ObjectStore)
    }

    getIDBResult(IDBRequest) {
        return new Promise((resolve, reject) => {
            IDBRequest.onsuccess = () => resolve(IDBRequest.result)
            IDBRequest.onerror = event => reject(event.target.errorCode)
        })
    }
}

/*
================== SAMPLE OPERATION ======================

const IDB = new indexedDBx()
IDB.IDBDatabase.then(result => {
    const RequestResult = IDB.getIDBResult(IDB.getObjectStore(result, "courses").getAll())
    RequestResult.then(res => {
        console.log(res)
    }).catch(res => {
        console.log(`Error: ${res}`)
    })
})

================== SAMPLE OPERATION ======================
*/

/* PROTOTYPE



    createIDBDatabase(database = "test") {
        return new Promise((resolve, reject) => {
            const IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
            const IDBOpenDBRequest = IDBFactory.open(database)
            IDBOpenDBRequest.onerror = event => reject(event.target.errorCode)
            IDBOpenDBRequest.onsuccess = event => resolve(event.target.result)
        })
    }

    getIDBTransaction(ObjectStore, IDBDatabase, mode = "readonly") {
        return new Promise((resolve, reject) => {
            const IDBTransaction = IDBDatabase.transaction(ObjectStore, mode)
            const IDBObjectStore = IDBTransaction.objectStore(ObjectStore)
            const IDBRequest = IDBObjectStore.getAll()
            IDBRequest.onsuccess = event => resolve(IDBRequest.result)
            IDBRequest.onerror = event => reject(event.target.errorCode)
        })
    }

    getStoreContent(ObjectStore, database = "test") {
        this.createIDBDatabase(database).then(IDBDatabase => {
            this.getIDBTransaction(ObjectStore, IDBDatabase).then(result => {
                let items = []
                result.map(item => {
                    let data = { "course code": item.course_code, "course name": item.course_name }
                    items.push(data)
                })
                return new Promise((resolve, reject) => {
                    resolve(items)
                })
            }).catch(x => console.log(x))
        }).catch(x => console.log(x))
    }
    */