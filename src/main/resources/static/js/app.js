{/* Contains Navbar and all navigation functions */}
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

{/* Add new account */}
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
            <div className="container">
                <form onSubmit={this.submit.bind(this)}>
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

{/* Dashboard tab content */}
const Dash = React.createClass({
    render: function () {
        return (
            <h1>Welcome to the Dashboard</h1>
        );
    }
});

{/* Accounts tab content */}
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
    render: function() {
        if (!this.state.delete) {
            return (
                <tr>
                    <td>{this.props.employee.firstName}</td>
                    <td>{this.props.employee.lastName}</td>
                    <td>{this.props.employee.accountNumber}</td>
                    <td>
                        <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
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

{/* Accounts table */}
const EmployeeTable = React.createClass({
    render: function() {
        const rows = [];
        this.props.employees.forEach(function(employee) {
            rows.push(<Employee employee={employee} />);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Acc Number</th>
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