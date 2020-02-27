export default class indexedDB {
    constructor() {
        console.log("Initializing IndexedDB")
        this.IDBDatabase = null
        this.IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        this.IDBOpenDBRequest = this.IDBFactory.open("test")
        this.IDBOpenDBRequest.onerror = event => console.log(`Error: ${event.target.errorCode}`)
        this.IDBOpenDBRequest.onsuccess = event => {
            console.log("Established connection with database")
            this.IDBDatabase = event.target.result

            this.IDBDatabase.onclose = event => {
                console.log("CLOSING IDB")
                console.log(event.target)
            }
        }
        this.IDBOpenDBRequest.onblocked = event => console.log(`IDBOpenDBRequest blocked: ${event.target.errorCode}`)
        this.IDBOpenDBRequest.onupgradeneeded = event => {
            console.log("Established connection & upgradeneeded")
            this.IDBDatabase = event.target.result

            console.log("creating Course store & indexes")
            var coursesStore = this.IDBDatabase.createObjectStore("courses", { keyPath: "courses", autoIncrement: true })
            coursesStore.createIndex("course_name", "course_name", { unique: true })
            coursesStore.createIndex("course_code", "course_code", { unique: true })

            console.log("creating Student store & indexes")
            var studentStore = this.IDBDatabase.createObjectStore("students", { keyPath: "students", autoIncrement: true })
            studentStore.createIndex("name", "name")
            studentStore.createIndex("email", "email", { unique: true })
            studentStore.createIndex("status", "status")

            coursesStore.transaction.oncomplete = (event) => console.log("Course database create!")
            studentStore.transaction.oncomplete = (event) => console.log("Student database create!")
            console.log("creating IDB Database!")
        }
    }

    getIDBDatabase(database = "test") {
        return new Promise((resolve, reject) => {
            const IDBFactory = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
            const IDBOpenDBRequest = IDBFactory.open(database)
            IDBOpenDBRequest.onerror = event => reject(event.target.errorCode)
            IDBOpenDBRequest.onsuccess = event => resolve(event.target.result)
        })
    }

    getIDBTransaction(ObjectStore, IDBDatabase) {
        return new Promise((resolve, reject) => {
            const IDBTransaction = IDBDatabase.transaction(ObjectStore)
            const IDBObjectStore = IDBTransaction.objectStore(ObjectStore)
            const IDBRequest = IDBObjectStore.getAll()
            IDBRequest.onsuccess = event => resolve(IDBRequest.result)
            IDBRequest.onerror = event => reject(event.target.errorCode)
        })
    }

    getStoreContent(ObjectStore, database = "test") {
        this.getIDBDatabase(database).then(IDBDatabase => {
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
}