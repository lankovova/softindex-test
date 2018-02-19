import React from 'react';
import './TableContent.css';

export default function TableContent({ onItemDelete, items }) {
    return (
        <div className="TableContent">
            {
                items.map(item => (
                    <TableUserItem
                        onItemDelete={onItemDelete}
                        key={item.id}
                        user={item}
                    />
                ))
            }
        </div>
    );
}

function TableUserItem({ onItemDelete, user }) {
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
