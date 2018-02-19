import React from 'react';
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import { sortArrayByProperty } from './utils';
import './Table.css';

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedBy: 'id',
            reversed: false,
        };

        this.sortBy = this.sortBy.bind(this);
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

        return (
            <div className="Table">
                <TableHeader
                    sortTableBy={this.sortBy}
                    sortedBy={this.state.sortedBy}
                    isReversed={this.state.reversed}
                />
                <TableContent
                    onItemDelete={onItemDelete}
                    items={usersList}
                />
            </div>
        );
    }
}
