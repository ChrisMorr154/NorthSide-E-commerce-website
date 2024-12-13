import React from "react";
import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NavBar from "../components/NavBar";

const ContactPage = () => {
  const contactDetails = [
    { label: "Orders Inquiries", email: "Orders@domainname.com" },
    { label: "Allocation Inquiries", email: "Allocation@domainname.com" },
    { label: "Routing Inquiries", email: "Routing@domainname.com" },
    { label: "Purchasing Inquiries", email: "Purchasing@domainname.com" },
    { label: "EDI Inquiries", email: "EDI@domainname.com" },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
          Contact Us
        </Typography>
        <List>
          {contactDetails.map((contact, index) => (
            <ListItem key={index} sx={{ mb: 2 }}>
              <ListItemIcon>
                <MailIcon sx={{ color: '#63645E' }} />
              </ListItemIcon>
              <ListItemText
                primary={contact.label}
                secondary={contact.email}
                primaryTypographyProps={{
                  variant: 'h6',
                  sx: { fontWeight: 'bold' },
                }}
                secondaryTypographyProps={{
                  variant: 'body1',
                  sx: { color: '#000000' },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ContactPage;
