import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import convert from "../../model/payrollModel";
import { SysCurrencyTransform } from "../../utils/global_store";
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop:10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    fontSize:12
  },
  tableCell: {
    width: "25%", // Adjust this value to control column widths
    padding: 5,
  },
});
const PayrollPdf = (data) => {
  const payroll_data = convert.objectOfpayrollModel(data);
  console.log(payroll_data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>{payroll_data.employee_name}</Text>

          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Deskripsi</Text>
              <Text style={styles.tableCell}>Nominal</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Gaji Pokok</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_add.gaji_pokok,
                })}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Insentif</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_add.insentive_bonus,
                })}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Lembur</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_add.lembur,
                })}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tunjangan Harian</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_add.tunjangan_harian,
                })}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tunjangan Tetap</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_add.tunjangan_tetap,
                })}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tunjangan Tidak Tetap</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_add.tunjangan_tidak_tetap,
                })}
              </Text>
            </View>
            <View style={{height:30}}></View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Asuransi</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_reduce.asuransi,
                })}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Potongan Tetap</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_reduce.fix_deduction,
                })}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Telat</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_reduce.late_penalty,
                })}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Potongan Tidak Tetap</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_reduce.not_fix_deduction,
                })}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Pajak</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_reduce.pajak,
                })}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Kasbon</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.value_to_reduce.kasbon,
                })}
              </Text>
            </View>
            <View style={{height:30}}></View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total</Text>
              <Text style={styles.tableCell}>
                {SysCurrencyTransform({
                  num: payroll_data.final_salary,
                })}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PayrollPdf;
