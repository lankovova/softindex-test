import React from 'react';
import './TableHeader.css';

export default function TableHeader({ sortTableBy, sortedBy, isReversed }) {
    const tableHeaderItems = [
        { title: '#', propName: 'id' },
        { title: 'First name', propName: 'firstName' },
        { title: 'Last name', propName: 'lastName' },
        { title: 'Phone', propName: 'phone' },
        { title: 'Gender', propName: 'gender' },
        { title: 'Age', propName: 'age' },
    ];

    return (
        <div className="TableHeader TableRow">
            {
                tableHeaderItems.map(item => (
                    <TableHeaderItem
                        key={item.propName.toString()}
                        isSortedByThis={item.propName === sortedBy}
                        isReversed={isReversed}
                        title={item.title}
                        onClick={() => sortTableBy(item.propName)}
                    />
                ))
            }
            <div className="TabelHeader-Item TableCell">Action</div>
        </div>
    );
}

function TableHeaderItem({
    title,
    onClick,
    isSortedByThis,
    isReversed,
}) {
    let className = 'TabelHeader-Item TableCell';

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
