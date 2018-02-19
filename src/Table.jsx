import React from 'react';
import { sortArrayByProperty } from './utils';
import './Table.css';

function TableItem({ onItemDelete, user }) {
    return (
        <div className="TableItem">
            <div>{user.id}</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.phone}</div>
            <div>{user.gender ? 'male' : 'female'}</div>
            <div>{user.age}</div>
            <div
                onClick={() => onItemDelete(user.id)}
                role="button"
                aria-hidden
            >
                &#10005;
            </div>
        </div>
    );
}

function TableHeaderItem({
    title,
    onClick,
    isSortedByThis,
    isReversed,
}) {
    let className = 'TabelHeader-Item';

    if (isSortedByThis) {
        className += ' sorted';
        if (isReversed) className += ' reversed';
    }

    return (
        <div
            className={className}
            role="button"
            aria-hidden
            onClick={() => onClick()}
        >
            {title}
        </div>
    );
}

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedBy: 'id',
            reversed: false,
        };
    }

    sortBy(sortByWhat) {
        this.setState(prevState => ({
            sortedBy: sortByWhat,
            reversed: (prevState.sortedBy === sortByWhat) ? !prevState.reversed : false,
        }));
    }

    render() {
        const { onItemDelete, users } = this.props;

        const usersList = sortArrayByProperty(users, this.state.sortedBy);
        if (this.state.reversed) {
            usersList.reverse();
        }

        const tableHeaderItems = [
            { title: '#', propName: 'id' },
            { title: 'First name', propName: 'firstName' },
            { title: 'Last name', propName: 'lastName' },
            { title: 'Phone', propName: 'phone' },
            { title: 'Gender', propName: 'gender' },
            { title: 'Age', propName: 'age' },
        ];

        return (
            <div className="Table">
                <div className="TableHeader TableItem">
                    {
                        tableHeaderItems.map(item => (
                            <TableHeaderItem
                                key={item.propName.toString()}
                                isSortedByThis={item.propName === this.state.sortedBy}
                                isReversed={this.state.reversed}
                                title={item.title}
                                onClick={() => this.sortBy(item.propName)}
                            />
                        ))
                    }
                    <div className="TabelHeader-Item">Action</div>
                </div>
                <div className="TableContents">
                    {
                        usersList.map(user => (
                            <TableItem
                                onItemDelete={onItemDelete}
                                key={user.id}
                                user={user}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}
