import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import {
  Link,
  Page,
  Text,
  View,
  Image,
  Document,
  PDFViewer,
  StyleSheet,
} from '@react-pdf/renderer';

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          padding: 10,
          marginTop: 20,
          fontFamily: 'Helvetica',
        },
        view: {
          border: '1px solid black',
          borderRadius: 5,
          borderColor: '#EBEBEB',
          padding: 20,
          height: 400,
        },
        container: {
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          height: '100%',
        },
        left: {
          width: '25vw',
          borderRight: '2px solid #EBEBEB',
        },
        right: {
          width: '75vw',
          paddingHorizontal: 20,
          display: 'flex',
          justifyContent: 'space-between',
        },
        rightHeader: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontSize: '7px',
        },
        rightHeaderContent: {
          display: 'flex',
          gap: 3,
        },
        from: {
          fontSize: '7px',
          marginVertical: 30,
        },
        to: {
          fontSize: '7px',
          width: 120,
        },
        image: {
          width: 60,
          padding: 1,
        },
        lineBreak: {
          backgroundColor: '#EBEBEB',
          width: '100%',
          height: 1,
          marginTop: 20,
        },
        table: {
          display: 'grid',
          marginTop: 10,
          borderBottom: '1px',
          borderColor: '#EBEBEB',
          height: 60,
        },
        tableHead: {
          backgroundColor: '#F5F5F5',
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderRadius: 5,
          fontSize: '6px',
          color: '#8E8E93',
        },
        tableRow: {
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        },
        tableBody: {
          fontSize: '6px',
          paddingVertical: 8,
          paddingHorizontal: 10,
          color: '#231F20',
        },
        tableItem: {
          width: '20%',
        },
        overview: {},
        amount: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '6px',
          borderTop: '1px',
          borderBottom: '1px',
          borderColor: '#EBEBEB',
          paddingVertical: 10,
        },
      }),
    []
  );

const InvoicePDF = ({ data }) => {
  const styles = useStyles();

  // console.log('DSADS', data);

  return (
    data && (
      <PDFViewer
        style={{
          height: '100vh',
          border: 'none',
          borderRadius: 10,
        }}
      >
        <Document>
          <Page style={styles.page}>
            <View style={styles.view}>
              <View style={styles.container}>
                {/* Left Side Container */}
                <View style={styles.left}>
                  <Image src="/cc_logo.png" style={styles.image} />

                  <View style={styles.from}>
                    <Text style={{ color: '#8E8E93' }}>From</Text>
                    <View style={{ marginTop: 8 }}>
                      <Text style={{ fontWeight: 600 }}>{data.invoiceFrom.name}</Text>
                      <Text style={{ fontWeight: 400, marginVertical: 3 }}>
                        {data.invoiceFrom.phoneNumber}
                      </Text>
                      <Text style={{ fontWeight: 400 }}>{data.invoiceFrom.email}</Text>
                    </View>
                  </View>

                  <View style={styles.to}>
                    <Text style={{ color: '#8E8E93' }}>Issued To</Text>
                    <View style={{ marginTop: 8 }}>
                      <Text>Cult Creative Sdn. Bhd. (1374477-W)</Text>
                      <Text style={{ marginVertical: 4 }}>(+60)12-849 6499</Text>
                      <Text style={{ lineHeight: 1.4 }}>
                        4-402, Level 4, The Starling Mall, Lot 4-401 &, 6, Jalan SS 21/37, Damansara
                        Utama, 47400 Petaling Jaya, Selangor
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Right Side Container */}
                <View style={styles.right}>
                  <View>
                    <View style={styles.rightHeader}>
                      <View style={styles.rightHeaderContent}>
                        <Text>Invoice ID</Text>
                        <Text
                          style={{
                            color: '#231F20',
                          }}
                        >
                          {data.invoiceNumber}
                        </Text>
                      </View>
                      <View style={styles.rightHeaderContent}>
                        <Text>Date Created</Text>
                        <Text
                          style={{
                            color: '#231F20',
                          }}
                        >
                          {dayjs(data.createdAt).format('LL')}
                        </Text>
                      </View>
                      <View style={styles.rightHeaderContent}>
                        <Text>Payment Due</Text>
                        <Text
                          style={{
                            color: '#231F20',
                          }}
                        >
                          {dayjs(data.dueDate).format('LL')}
                        </Text>
                      </View>
                      <View style={styles.rightHeaderContent}>
                        <Text>Invoice Status</Text>
                        <Text
                          style={{
                            color: data.status === 'draft' ? '#231F20' : '#026D54',
                          }}
                        >
                          {data.status === 'draft'
                            ? 'WAITING FOR APPROVAL'
                            : data.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.lineBreak} />

                    {/* Table 1 */}
                    <View style={styles.table}>
                      <View style={styles.tableHead}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableItem}>#</Text>
                          <Text style={styles.tableItem}>Recipient Name</Text>
                          <Text style={styles.tableItem}>Bank Name</Text>
                          <Text style={styles.tableItem}>Account No.</Text>
                          <Text style={styles.tableItem}>Recipient Email</Text>
                        </View>
                      </View>
                      <View style={styles.tableBody}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableItem}>1</Text>
                          <Text style={styles.tableItem}>{data.invoiceFrom.name}</Text>
                          <Text style={styles.tableItem}>{data.bankAcc.bankName}</Text>
                          <Text style={styles.tableItem}>{data.bankAcc.accountNumber}</Text>
                          <Text style={styles.tableItem}>{data.invoiceFrom.email}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Table 2 */}
                    <View style={styles.table}>
                      <View style={styles.tableHead}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableItem}>#</Text>
                          <Text style={styles.tableItem}>Campaign</Text>
                          <Text style={styles.tableItem}>Title</Text>
                          <Text style={styles.tableItem}>Description</Text>
                          <Text style={styles.tableItem}>Amount (MYR)</Text>
                        </View>
                      </View>
                      <View style={styles.tableBody}>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableItem}>1</Text>
                          <Text style={styles.tableItem}>{data.campaign.name}</Text>
                          <Text style={styles.tableItem}>{data.campaign.name}</Text>
                          <Text style={styles.tableItem}>{data.campaign.description}</Text>
                          <Text style={styles.tableItem}>RM {data.amount}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Overview */}
                  <View style={styles.overview}>
                    <View style={styles.amount}>
                      <Text>Amount Due / Total</Text>
                      <Text
                        style={{
                          fontSize: '10px',
                        }}
                      >
                        RM {data.amount}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          fontSize: '6px',
                          color: '#636366',
                        }}
                      >
                        <Text>Notes</Text>
                        <Text>Have a Question?</Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          fontSize: '6px',
                          color: '#636366',
                        }}
                      >
                        <Text>
                          We appreciate your business. Should you need us to add VAT or extra notes
                          let us know!
                        </Text>
                        <Link>hello@cultcreative.asia</Link>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    )
  );
};

export default InvoicePDF;

InvoicePDF.propTypes = {
  data: PropTypes.object,
};
