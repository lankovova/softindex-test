import React from 'react';
import './TableContent.css';

export default function TableContent({ items, onItemDelete }) {
    return (
        <div className="TableContent">
            {
                items.map(item => (
                    <TableUserItem
                        key={item.id}
                        user={item}
                        onItemDelete={onItemDelete}
                    />
                ))
            }
        </div>
    );
}

function TableUserItem({ user, onItemDelete }) {
    return (
        <div className="TableRow">
            <div className="TableCell">{user.id}</div>
            <div className="TableCell">{user.firstName}</div>
            <div className="TableCell">{user.lastName}</div>
            <div className="TableCell">{user.phone}</div>
            <div className="TableCell">{user.gender ? 'male' : 'female'}</div>
            <div className="TableCell">{user.age}</div>
            <div
                className="TableCell"
                onClick={() => onItemDelete(user.id)}
                role="button"
                aria-hidden
            >
                &#10005;
            </div>
        </div>
    );
}
