const Modal = React.createClass({

    getInitialState: function() {
        return {
            firstName: this.props.employee.firstName,
            lastName: this.props.employee.lastName,
            accountNumber: this.props.employee.accountNumber
        }
    },

    renderOnClose: function(){
        var self = this;
        $.ajax ({
            url: "http://localhost:8080/app/findall"
        }).then (function(data) {
            self.setState({employees: data});
            ReactDOM.render(
                <EmployeeTable employees={self.state.employees} />, document.getElementById('body')
            );
        });
    },

    componentWillMount: function(){
        const id = "modal-" + this.props.employee.id;
        this.setState({id: id, dataTarget : '#' + id});
    },

    render: function() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={this.state.dataTarget }>
                    Edit
                </button>
                <div className="modal fade text-dark" data-backdrop="static" id={this.state.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body container">
                                <Edit employee={this.props.employee} onClick={this.props.onClick} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.renderOnClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const Edit = React.createClass({
    getInitialState: function() {
        return {
            firstName: this.props.employee.firstName,
            lastName: this.props.employee.lastName,
            accountNumber: this.props.employee.accountNumber
        }
    },

    update: function() {
        this.state.firstName = this.props.state.firstName,
        this.state.lastName = this.props.state.lastName,
        this.state.accountNumber = this.props.state.accountNumber
    },

    reRender: function() {
        if (typeof this.props.onClick === "function" ) {
            this.props.onClick(this.props.employee.firstName, this.props.employee.lastName, this.props.employee.accountNumber);
        }
    },

    nameChange: function(e) {
        this.setState({
            firstName: e.target.value
        })
    },
    lastChange: function(e) {
        this.setState({
            lastName: e.target.value
        })
    },
    accountNumberChange: function(e) {
        this.setState({
            accountNumber: parseInt(e.target.value)
        })
    },

    submit: function (e){
        e.preventDefault();

        console.log(this.props.employee.id);
        const data = {
            "id": this.props.employee.id,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "accountNumber": this.state.accountNumber
        };

        const jsonData = JSON.stringify(data);

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "app/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonData
        };

        $.ajax(settings)
            .done(function(data) {
                console.log("Hello")
            })
            .fail(function(jqXhr) {
                console.log("data : " + data );
                console.log('failed to register');
            });
    },

    render: function () {
        return (
            <div className="container text-dark">
                <form onSubmit={this.submit.bind(null,this)}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.nameChange} val={this.state.firstName} defaultValue={this.props.employee.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name" onChange={this.lastChange} val={this.state.lastName} defaultValue={this.props.employee.lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAccountNum">Account Number</label>
                        <input type="text" className="form-control" id="inputAccountNumber" placeholder="Account Number" onChange={this.accountNumberChange} val={this.state.accountNumber} defaultValue={this.props.employee.accountNumber}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" reRenderParent={this.props.onClick}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
});

const Navbar = React.createClass({
    AddAccounts() {
        ReactDOM.render(
            <Add />, document.getElementById("body")
        );
    },

    Dashboard() {
        ReactDOM.render(
            <Dash />, document.getElementById("body")
        );
    },

    ViewAccounts() {
        ReactDOM.render(
            <App />, document.getElementById("body")
        );
    },

    render: function(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#" onClick={this.Dashboard}>AccountsApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#" onClick={this.Dashboard}>Dashboard <span className="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="#" onClick={this.ViewAccounts}>Accounts</a>
                        <a className="nav-item nav-link" href="#" onClick={this.AddAccounts}>Add Account</a>
                    </div>
                </div>
            </nav>
        );
    }
});

const Add = React.createClass({
    getInitialState: function() {
        return {}
    },

    nameChange: function(e) {
        this.setState({
            firstName: e.target.value
        })
    },
    lastChange: function(e) {
        this.setState({
            lastName: e.target.value
        })
    },
    accountNumberChange: function(e) {
        this.setState({
            accountNumber: parseInt(e.target.value)
        })
    },

    submit: function (e){
        e.preventDefault();

        const data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "accountNumber": this.state.accountNumber
        };

        e.target.reset();

        const jsonData = JSON.stringify(data);

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "app/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonData
        };

        $.ajax(settings)
            .done(function(data) {
                console.log("Hello")
            })
            .fail(function(jqXhr) {
                console.log("data : " + data );
                console.log('failed to register');
            });
    },

    render: function () {
        return (
            <div className="container bg-dark text-light">
                <form onSubmit={this.submit.bind(null,this)}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.nameChange} val={this.state.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name" onChange={this.lastChange} val={this.state.lastName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAccountNum">Account Number</label>
                        <input type="text" className="form-control" id="inputAccountNumber" placeholder="Account Number" onChange={this.accountNumberChange} val={this.state.accountNumber} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});

const Dash = React.createClass({
    render: function () {
        return (
            <div className="container bg-dark text-light">
                <div className="jumbotron bg-dark">
                    <h1>Welcome</h1>
                    <p>Use the tabs above to manage your accounts...</p>
                </div>
            </div>
        );
    }
});

const Employee = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        const self = this;
        $.ajax({
            "url": "http://localhost:8080/app/delete",
            type: 'DELETE',
            data: JSON.stringify(self.props.employee),
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c7bb89b4-2b6c-3cdb-cd22-86fdba25c43c"
            },
            "processData": false,
            success: function(result) {
                // self.setState({display: false});
                self.setState({delete: true});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    reRender: function(firstName, lastName, accountNumber) {
        this.props.employee.firstName = firstName;
        this.props.employee.lastName = lastName;
        this.props.employee.accountNumber = accountNumber;
        this.forceUpdate();
    },
    render: function() {
        if (!this.state.delete) {
            return (
                <tr>
                    <td>{this.props.employee.firstName}</td>
                    <td>{this.props.employee.lastName}</td>
                    <td>{this.props.employee.accountNumber}</td>
                    <td>
                        <button className="btn btn-warning" onClick={this.handleDelete}>Delete</button>
                    </td>
                    <td>
                        <Modal employee={this.props.employee} onClick={this.reRender}/>
                    </td>
                </tr>);
        } else {
            return null;
        }
    }
});

const App = React.createClass({
    loadEmployeesFromServer: function () {
        const self = this;
        $.ajax({
            url: "http://localhost:8080/app/findall"
        }).then(function (data) {
            self.setState({employees: data});
        });
    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },
    componentWillMount: function () {
        this.loadEmployeesFromServer();
    },

    statics: {
        update: function() {
            self.loadEmployeesFromServer();
            this.render();
        }
    },

    render() {
        console.log(this.state.employees);
        return ( <EmployeeTable employees={this.state.employees}/> );
    }
});

const EmployeeTable = React.createClass({
    render: function() {
        const rows = [];
        this.props.employees.forEach(function(employee) {
            rows.push(<Employee employee={employee} />);
        });
        return (
            <div className="container">
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Account Number</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
});

const Main = React.createClass({
    render: function(){
        return (
            <div>
                <Navbar />
                <div id='body'>
                    <Dash />
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('nav')
);