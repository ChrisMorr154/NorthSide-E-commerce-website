const generateOrderXML = (order) => {
    const itemsXML = order.items.map(item => `
      <Item>
          <ProductID>${item.productId}</ProductID>
          <Title>${item.title}</Title>
          <Quantity>${item.quantity}</Quantity>
          <Price>${item.price}</Price>
      </Item>
    `).join('');
  
    const orderXML = `
  <?xml version="1.0" encoding="UTF-8"?>
  <Order>
      <OrderID>${order.POnumber}</OrderID>
      <CustomerName>${order.customerName}</CustomerName>
      <ShiptoName>${order.shiptoName}</ShiptoName>
      <Address>${order.address}</Address>
      <City>${order.city}</City>
      <State>${order.state}</State>
      <Country>${order.country}</Country>
      <ZipCode>${order.zipCode}</ZipCode>
      <TotalAmount>${order.totalAmount}</TotalAmount>
      <CreatedDate>${order.createdDate}</CreatedDate>
      <Items>
          ${itemsXML}
      </Items>
  </Order>
    `;
    return orderXML.trim();
  };
  
  module.exports = { generateOrderXML };
  