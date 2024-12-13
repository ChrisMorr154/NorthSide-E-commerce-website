export const generateOrderJSON = (order) => {
  const orderData = {
    OrderID: order.POnumber,
    CustomerName: order.customerName,
    ShiptoName: order.shiptoName,
    Address: order.address,
    City: order.city,
    State: order.state,
    Country: order.country,
    ZipCode: order.zipCode,
    TotalAmount: parseFloat(order.totalAmount),
    CreatedDate: new Date().toISOString(),
    Items: order.items.map(item => ({
      ProductID: item.productId,
      Title: item.title,
      Quantity: item.quantity,
      Price: parseFloat(item.price)
    }))
  };
  return JSON.stringify(orderData, null, 2); // Pretty print JSON with indentation
};

export const generateOrderXML = (order) => {
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
    <CreatedDate>${new Date().toISOString()}</CreatedDate>
    <Items>
        ${itemsXML}
    </Items>
</Order>
  `;
  return orderXML.trim();
};
