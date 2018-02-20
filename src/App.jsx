import React from 'react';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
import './App.css';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            // Get users from LS
            users: JSON.parse(localStorage.getItem('users')) || [],
        };

        this.onUserAdd = this.onUserAdd.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
    }

    onUserAdd(user) {
        this.setState((prevState) => {
            const userToAdd = Object.assign({}, user);
            userToAdd.id = prevState.users.length + 1;

            return {
                users: [
                    ...prevState.users,
                    userToAdd,
                ],
            };
        }, () => {
            // Update users in LS
            localStorage.setItem('users', JSON.stringify(this.state.users));
        });
    }

    onUserDelete(userId) {
        this.setState(prevState => ({
            users: prevState.users.filter(user => user.id !== userId),
        }), () => {
            // Update users in LS
            localStorage.setItem('users', JSON.stringify(this.state.users));
        });
    }

    render() {
        return (
            <div className="App">
                <UserForm
                    onSubmit={this.onUserAdd}
                />
                <UsersTable
                    onItemDelete={this.onUserDelete}
                    users={this.state.users}
                />
            </div>
        );
    }
}
