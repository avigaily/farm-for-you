import React from 'react';

export function OrderList(props) {
    
    return  <div className="table-container"> <table className="manage-table" >
        <thead>
            <tr>
                <th>Items</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Manage</th>

            </tr>
        </thead>
        <tbody>
            {props.shop.orders.map((order, idx) => {
                return <tr key={idx}>

                    <td>
                        <ul>
                            {order.items.map((item)=>{
                                return <li key={item._id}>{item.title},</li>
                            })}
                        </ul>
                    </td>
                    <td className="date">
                        {order.createdAt}
                    </td>
                    <td>
                        ${order.totalPrice}
                    </td>
                    <td className={order.status}>
                        <h3>{order.status} </h3>
                    </td>
                    <td>
                        <button className="accept" onClick={()=>{
                           order.status="approved"
                            props.save(props.shop)
                        }}>Accept</button>
                        <button className="decline" onClick={()=>{
                           order.status="declined"
                            props.save(props.shop)
                        }}>Decline</button>

                    </td>
                </tr>
            })}
        </tbody>
    </table>
    </div>
}