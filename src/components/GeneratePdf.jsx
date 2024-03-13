import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFInvoice from './PDFInvoice';

const GeneratePdf = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3010/api/v1/generatepdf', {
          headers: {
            'x-access-token': token
          }
        });
        setInvoiceData(response.data.data);
        
        // Calculate grand total with GST
        const totalBeforeGST = response.data.data.reduce((acc, curr) => acc + curr.total, 0);
        const gstAmount = totalBeforeGST * 0.18;
        const totalWithGST = totalBeforeGST + gstAmount;
        setGrandTotal(totalWithGST);
        
        // Store PDF data
        setPdfData(response.data);
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg" style={{ width: '21cm', height: '29.7cm' }}>
      <h1 className="text-3xl font-bold mb-8 text-center">Invoice Details</h1>
      {invoiceData.map((invoice, index) => (
        <div key={index} className="text-lg mb-8">
          <p><strong>Product Name:</strong> {invoice.product}</p>
          <p><strong>Quantity:</strong> {invoice.qty}</p>
          <p><strong>Rate:</strong> {invoice.rate}</p>
          <p><strong>Total:</strong> {invoice.total}</p>
        </div>
      ))}
      <div className="text-lg mb-8">
        <p><strong>Grand Total (incl. 18% GST):</strong> {grandTotal}</p>
      </div>
      {pdfData && (
        <div className="text-center">
          <PDFDownloadLink document={<PDFInvoice invoiceData={pdfData.data} grandTotal={grandTotal} />} fileName="invoice.pdf">
            {({ blob, url, loading, error }) => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default GeneratePdf;
