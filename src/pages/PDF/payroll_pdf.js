import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import convert from "../../model/payrollModel";
import {
  SysCurrencyTransform,
  SysJWTDecoder,
  SysMonthTransform,
} from "../../utils/global_store";
const borderColor = "#ECA5CB";
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  textHeader: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 10,
    width: "50%",
  },
  textHeaderMedium: {
    fontSize: 14,
    fontWeight: "bold",
    width: "50%",
  },
  textEmployee: {
    fontSize: 10,
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 10,
    fontWeight: "bold",
    paddingVertical: 5,
    width: "50%",
  },
  textContentMedium: {
    fontSize: 10,
    fontWeight: "extralight",
    width: "50%",
    paddingVertical: 5,
  },
  textContentBorder: {
    fontSize: 10,
    fontWeight: "extrabold",
    borderBottomWidth: 2,
    borderStyle: "solid",
    borderBottomColor: borderColor,
    paddingVertical: 5,
    width: "100%",
  },
  borderDash: {
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: borderColor,
    borderStyle: "dashed",
  },
  border: {
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: borderColor,
    borderStyle: "solid",
  },
  borderExtra: {
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  containerRow: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 3,
    justifyContent: "space-between",
    borderBottomColor: borderColor,
    borderStyle: "dashed",
    paddingVertical: 10,
  },
  table: {
    display: "table",
    width: "48%",
  },
  tableRow: {
    flexDirection: "row",
  },

  tableRowBorder: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: borderColor,
    borderStyle: "dashed",
  },
  tableCell: {
    width: "25%",
    padding: 5,
  },
  right_align: {
    textAlign: "right",
    marginRight: 10,
  },

  center_align: {
    textAlign: "right",
  },
});
const PayrollPdf = (data,logo) => {
  function toCamelCase(str) {
    return str
      .replace(/_([a-z])/g, (match, char) => " " + char.toUpperCase())
      .replace(/^./, (firstChar) => firstChar.toUpperCase());
  }
  const payroll_data = convert.objectOfpayrollModel(data);
  const user = SysJWTDecoder();
  const date = new Date();
  let total_penerimaan = 0;
  let total_potongan = 0;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.textHeader]}>{user.company}</Text>
        {
          logo?<img src={logo} height={30} style={{objectFit:"contain"}} ></img>:null
        }
        
        <View style={[styles.border, { flexDirection: "row-reverse" }]}>
          <Text style={styles.textEmployee}>
            {payroll_data.employee_id} - {payroll_data.employee_name} -{" "}
            {SysMonthTransform(date.getMonth() + 1, "long", "in")}{" "}
            {date.getFullYear()}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.containerRow}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}>Penerimaan</Text>
              </View>
              {Object.keys(payroll_data.value_to_add).map((key) => {
                total_penerimaan += payroll_data.value_to_add[key];
                return (
                  <View style={styles.tableRowBorder}>
                    <Text style={styles.textContentMedium}>
                      {toCamelCase(key)}
                    </Text>
                    <Text style={[styles.textContent, styles.right_align]}>
                      {SysCurrencyTransform({
                        num: payroll_data.value_to_add[key],
                        currency: "",
                      })}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  Total
                </Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_penerimaan,
                    currency: "",
                  })}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}></Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium]}>Total Penerimaan</Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_penerimaan,
                    currency: "",
                  })}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}></Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}>Potongan</Text>
              </View>
              {Object.keys(payroll_data.value_to_reduce).map((key) => {
                if (typeof payroll_data.value_to_reduce[key] === "object") {
                } else {
                  total_potongan += payroll_data.value_to_reduce[key];
                  return (
                    <View style={styles.tableRowBorder}>
                      <Text style={styles.textContentMedium}>
                        {toCamelCase(key)}
                      </Text>
                      <Text style={[styles.textContent, styles.right_align]}>
                        {SysCurrencyTransform({
                          num: payroll_data.value_to_reduce[key],
                          currency: "",
                        })}
                      </Text>
                    </View>
                  );
                }
              })}
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  Total
                </Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_potongan,
                    currency: "",
                  })}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}></Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium]}>Total Potongan</Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_potongan,
                    currency: "",
                  })}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}></Text>
              </View>
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium]}>Total Penerimaan</Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_penerimaan,
                    currency: "",
                  })}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium]}>Total Potongan</Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_potongan,
                    currency: "",
                  })}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.textContentBorder}></Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium]}>Gaji Bersih</Text>
                <Text style={[styles.textContentMedium, styles.right_align]}>
                  {SysCurrencyTransform({
                    num: total_penerimaan - total_potongan,
                    currency: "",
                  })}
                </Text>
              </View>
            </View>

            <View style={[styles.table]}>
              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium, styles.center_align]}>
                  Dibuat Oleh
                </Text>
                <Text style={[styles.textContentMedium, styles.center_align]}>
                  Diterima Oleh
                </Text>
              </View>

              <View style={[styles.tableRow, { height: "40px" }]}></View>

              <View style={styles.tableRow}>
                <Text style={[styles.textContentMedium, styles.center_align]}>
                  {user.full_name}
                </Text>
                <Text style={[styles.textContentMedium, styles.center_align]}>
                  {payroll_data.employee_name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PayrollPdf;
