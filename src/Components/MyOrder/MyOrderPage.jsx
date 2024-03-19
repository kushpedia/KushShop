import React from 'react'
import './MyOrderPage.css'
import Table from './../Common/Table';
const MyOrderPage = () => {
	return (
		<section className="align_center myorder_page">
			<Table headings={["Order", "Products","Total","Status"]}>

					<tr>
						<td>1</td>
						<td>iPhone 14, Power Bank</td>
						<td>$1239</td>
						<td>Shipped</td>
					</tr>
				
			</Table>
	
			</section>
	)
}

export default MyOrderPage
