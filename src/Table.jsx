import React from 'react';
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

export default function Table({ onItemDelete, users }) {
    return (
        <div className="Table">
            {
                users.map(user =>
                    (<TableItem
                        onItemDelete={onItemDelete}
                        key={user.id}
                        user={user}
                    />))
            }
        </div>
    );
}
