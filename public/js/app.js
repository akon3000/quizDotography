
class App extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            todoItems: localStorage.todoItems ? JSON.parse(localStorage.todoItems) : []
        };
        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        console.log(this.state)
    } 

    addTodo(newTodo) {
        this.state.todoItems.push({
            descrip: "this task your about home page",
            time:  moment().format('MMMM Do YYYY, h:mm:ss a'),
            check: true,
            edit: false
        })
        this.setState({
            todoItems: this.state.todoItems
        })
        localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    }

    editTodo(index) {
         this.state.todoItems[index].edit = true
         this.setState({
            todoItems: this.state.todoItems
        })
        localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    }

    saveTodo(index, newValue) {
         this.state.todoItems[index].edit = false
         newValue = newValue || this.state.todoItems[index].descrip
         this.state.todoItems[index].descrip = newValue
         this.setState({
            todoItems: this.state.todoItems
         })
         localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    }

    removeTodo(index){
        this.state.todoItems.splice(index, 1)
        this.setState({
            todoItems: this.state.todoItems
        })
        localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    }

     handleInputChange(i) {
        this.state.todoItems[i].check = !this.state.todoItems[i].check
        this.setState({
            todoItems: this.state.todoItems
        })
        localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
    }

    render() {
        let { todoItems } = this.state
        return (
            <div className="container">
                <h1 className="page-header">
                    Reminders
                    <button onClick={this.addTodo} className="btn btn-default pull-right">
                        <i className="glyphicon glyphicon-plus"></i>
                    </button>
                </h1>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {todoItems.length > 0 ? <span className="text-success">Completed</span> : <span className="text-danger">Incomplete</span> }
                    </div>
                    <div className="panel-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th width="20"></th>
                                    <th width="50">TaskID</th>
                                    <th>Description</th>
                                    <th width="100"></th>
                                    <th width="100"></th>
                                </tr>
                            </thead>
                            <Todolist items={todoItems} remove={this.removeTodo} edit={this.editTodo} save={this.saveTodo} handle={this.handleInputChange} />
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { discrip: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    } 
    handleChange(event) {
        this.setState({discrip: event.target.value});
    }
    handleCheck(event) {
         const target = event.target;
         const value = target.type === 'checkbox' ? target.checked : target.value;
         const name = target.name;

         console.log(target.name)

         this.setState({
            [name]: value
         });
         this.props.handle(value);
    }


    render() {
        
        let { items, remove, edit, save, handle } = this.props
        let { discrip  } = this.state
        let handleChange =  this.handleChange
        let handleCheck = this.handleCheck
        let setCheck = this.setCheck
        let saveAs = function(id, discrip) {
            save(id, discrip)
            handleChange({ target : { value: "" } })
        }


        return  (
            <tbody>
                {
                   items.map(function(todo, id) {
                        return (
                            <tr>
                                <td><input type="checkbox"  checked={todo.check} onChange={() => handle(id)} /></td>
                                <td className="text-center">{id}</td>
                                <td>
                                    {
                                        todo.edit
                                        ? 
                                            <div className="col-md-6">
                                                <input className="form-control" value={discrip} onChange={handleChange}  />
                                            </div>
                                        : 
                                            <div className="col-md-6">
                                                 <p><b>{todo.descrip}</b></p> <small className="text-info"> {todo.time}</small>
                                            </div>
                                    }
                                </td>
                                <td className="text-center">
                                    {
                                        todo.edit 
                                        ? (<button onClick={() => saveAs(id, discrip)} className="btn btn-info">Save</button>) 
                                        : (<button onClick={() => edit(id)} className="btn btn-primary">Edit</button>)
                                    }
                                </td>
                                <td className="text-center">
                                    <button onClick={() => remove(id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }
}


ReactDOM.render( <App />, document.getElementById('myApp') );