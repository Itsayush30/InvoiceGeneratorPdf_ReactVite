import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: '1cm',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    titleContainer: {
      textAlign: 'left',
      width: '50%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '24px',
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '16px',
    },
    invoiceContainer: {
      width: '50%',
      textAlign: 'right',
    },
    invoiceTitle: {
      fontWeight: 'bold',
      fontSize: '24px',
      marginBottom: '10px',
      color: '#007bff',
    },
    invoiceItem: {
      marginBottom: '10px', // Add margin between items
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc', // Add border color
    },
  });
  
  const PDFInvoice = ({ invoiceData, grandTotal }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Levitation Infotech</Text>
            <Text style={styles.subtitle}>New Delhi, India</Text>
          </View>
          <View style={styles.invoiceContainer}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
        {invoiceData.map((invoice, index) => (
          <View key={index} style={styles.invoice}>
            <Text style={styles.title}>Product #{index + 1}</Text>
            <Text style={styles.item}>Produc Name: {invoice.product}</Text>
            <Text style={styles.item}>Quantity: {invoice.qty}</Text>
            <Text style={styles.item}>Rate: {invoice.rate}</Text>
            <Text style={styles.item}>Total Price: {invoice.total}</Text>
            <View style={styles.horizontalLine} /> {/* Add horizontal line */}
          </View>
        ))}
        <View style={styles.section}>
          <Text style={styles.title}>Grand Total (with 18% GST):</Text>
          <Text>{grandTotal}</Text>
        </View>
      </Page>
    </Document>
  );
  
  export default PDFInvoice;
