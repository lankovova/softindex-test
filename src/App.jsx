import React from 'react';
import Form from './Form';
import Table from './Table';
import './App.css';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [
                {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Stone',
                    phone: '5553555',
                    gender: true,
                    age: 24,
                },
                {
                    id: 2,
                    firstName: 'Mad',
                    lastName: 'Damon',
                    phone: '333322211',
                    gender: true,
                    age: 26,
                },
                {
                    id: 3,
                    firstName: 'Kate',
                    lastName: 'Gasoline',
                    phone: '000999888',
                    gender: false,
                    age: 21,
                },
            ],
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
        });
    }

    onUserDelete(userId) {
        this.setState(prevState => (
            {
                users: prevState.users.filter(user => user.id !== userId),
            }
        ));
    }

    render() {
        return (
            <div className="App">
                <Form
                    onSubmit={this.onUserAdd}
                />
                <Table
                    onItemDelete={this.onUserDelete}
                    users={this.state.users}
                />
            </div>
        );
    }
}
