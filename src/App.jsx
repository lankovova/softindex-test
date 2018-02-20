import React from 'react';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
import './App.css';

export default class App extends React.Component {
    constructor() {
        super();

        // Get users from LS
        const usersFromLS = JSON.parse(localStorage.getItem('users')) || [];

        this.state = {
            users: usersFromLS,
            nextUserId: usersFromLS.length + 1,
        };

        this.onUserAdd = this.onUserAdd.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
    }

    onUserAdd(user) {
        this.setState((prevState) => {
            const userToAdd = Object.assign({}, user);
            userToAdd.id = prevState.nextUserId;

            return {
                users: [
                    ...prevState.users,
                    userToAdd,
                ],
                nextUserId: prevState.nextUserId + 1,
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
