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
    // paddingTop: 50,
    // paddingHorizontal:50
    flexDirection: "column",
    padding: 30,
  },
  content: {
    paddingBottom: 10,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  textHeader: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 5,
    width: "50%",
  },
  textHeaderMedium: {
    fontSize: 12,
    fontWeight: "bold",
    width: "50%",
  },
  textEmployee: {
    fontSize: 8,
    fontWeight: "bold",
  },
  textContent: {
    fontSize: 8,
    fontWeight: "bold",
    paddingVertical: 5,
    width: "50%",
  },

  textContentSmall: {
    fontSize: 6,
    fontWeight: "bold",
    paddingVertical: 5,
    width: "100%",
  },
  textContentMedium: {
    fontSize: 8,
    fontWeight: "extralight",
    width: "50%",
    paddingVertical: 5,
  },
  textContentBorder: {
    fontSize: 8,
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
    paddingVertical: 5,
    borderBottomColor: borderColor,
    borderStyle: "dashed",
  },
  border: {
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: borderColor,
    borderStyle: "solid",
  },
  borderExtra: {
    width: "100%",
    paddingVertical: 5,
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
    paddingVertical: 5,
    flexWrap: "wrap",
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
    textAlign: "center",
  },
});
const PayrollPdf = (data, logo) => {
  function toCamelCase(str) {
    if (str == "value_to_add") return "Penerimaan";
    if (str == "value_to_reduce") return "Potongan";
    if (str == "late_penalty") return "Terlambat";
    if (str == "jht_by_employee") return "JHT oleh Karyawan";
    if (str == "jht_by_company") return "JHT oleh Perusahaan";
    if (str == "kesehatan_by_employee") return "Kesehatan oleh Karyawan";
    if (str == "kesehatan_by_company") return "Kesehatan oleh Perusahaan";
    if (str == "jp_by_company") return "JP oleh Perusahaan";
    if (str == "jkm_by_company") return "JKM oleh Perusahaan";
    if (str == "jkk_by_company") return "JKK oleh Perusahaan";
    if (str == "jp_by_employee") return "JP oleh Karyawan";
    if (str == "other_insurance_by_employee")
      return "Asuransi Lain oleh Karyawan";
    if (str == "other_insurance_by_company")
      return "Asuransi Lain oleh Perusahaan";
    if (str == "fix_deduction") return "Potongan Tetap";
    if (str == "not_fix_deduction") return "Potongan Tidak Tetap";
    if (str == "pajak") return "Pph21";
    return str
      .replace(/_([a-z])/g, (match, char) => " " + char.toUpperCase())
      .replace(/^./, (firstChar) => firstChar.toUpperCase());
  }
  let tunjangan_harian = [];
  let total_tunjangan_harian = 0;
  data.value_to_add.tunjangan_harian.details.map((val) => {
    total_tunjangan_harian +=
      (val.amount / data.value_to_add.total_workday_per_month) *
      data.value_to_add.total_attendance;
    let obj = {
      name:
        val.name +
        " " +
        `${data.value_to_add.total_attendance} hari x ${
          parseInt(val.amount / data.value_to_add.total_workday_per_month)
        }`,
      total_tax: val.total_tax,
      is_final_tax: val.is_final_tax,
      amount:
        (val.amount / data.value_to_add.total_workday_per_month) *
        data.value_to_add.total_attendance,
      amount_tax: val.amount_tax,
    };
    tunjangan_harian.push(obj);
  });
  let payroll_data = {
    id: data.id,
    employee_id: data.employee_id,
    employee_name: data.employee_name,
    final_salary: data.final_salary,
    value_to_add: {
      total_add: data.value_to_add.total_add,
      gaji_pokok: data.value_to_add.gaji_pokok,
      tunjangan_tetap: {
        total: data.value_to_add.tunjangan_tetap.total,
        details: data.value_to_add.tunjangan_tetap.details,
      },
      tunjangan_harian: {
        total: total_tunjangan_harian,
        details: tunjangan_harian,
      },
      insentive_bonus: {
        total: data.value_to_add.insentive_bonus.total,
        details: data.value_to_add.insentive_bonus.details,
      },
      tunjangan_tidak_tetap: {
        total: data.value_to_add.tunjangan_tidak_tetap.total,
        details: data.value_to_add.tunjangan_tidak_tetap.details,
      },
      lembur: data.value_to_add.lembur,
    },
    value_to_reduce: {
      total_reduce: data.value_to_reduce.total_reduce,
      late_penalty: data.value_to_reduce.late_penalty,
      kasbon: {
        total: data.value_to_reduce.kasbon.total,
        details: data.value_to_reduce.kasbon.details,
      },
      asuransi_karyawan: {
        jht_by_employee: data.value_to_reduce.asuransi.jht_by_employee,
        kesehatan_by_employee:
          data.value_to_reduce.asuransi.kesehatan_by_employee,
        jp_by_employee: data.value_to_reduce.asuransi.jp_by_employee,
        other_insurance_by_employee:
          data.value_to_reduce.asuransi.other_insurance_by_employee,
      },
      fix_deduction: {
        total: data.value_to_reduce.fix_deduction.total,
        details: data.value_to_reduce.fix_deduction.details,
      },
      not_fix_deduction: {
        total: data.value_to_reduce.not_fix_deduction.total,
        details: data.value_to_reduce.not_fix_deduction.details,
      },
      pajak: data.value_to_reduce.pajak,
    },

    asuransi_dibayarkan_perusahaan: {
      jht_by_company: data.value_to_reduce.asuransi.jht_by_company,
      kesehatan_by_company: data.value_to_reduce.asuransi.kesehatan_by_company,
      jp_by_company: data.value_to_reduce.asuransi.jp_by_company,
      jkm_by_company: data.value_to_reduce.asuransi.jkm_by_company,
      jkk_by_company: data.value_to_reduce.asuransi.jkk_by_company,
      other_insurance_by_company:
        data.value_to_reduce.asuransi.other_insurance_by_company,
    },
    other_informations: {
      bank_name: data.other_informations.bank_name,
      bank_account: data.other_informations.bank_account,
      pajak_perusahaan: data.value_to_add.tax_paid_by_company,
      total_attendance: data.value_to_add.total_attendance,
      total_workday_per_month: data.value_to_add.total_workday_per_month,
    },
  };
  const user = SysJWTDecoder();
  const date = new Date();
  let total_penerimaan = payroll_data.value_to_add.total_add;
  let total_potongan = payroll_data.value_to_reduce.total_reduce;
  let pajak_perusahaan = payroll_data.other_informations.pajak_perusahaan;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text style={[styles.textHeader]}>{user.company}</Text>
          {/* {logo ? (
          <img src={logo} height={30} style={{ objectFit: "contain" }}></img>
        ) : null} */}

          <View style={[styles.border, { flexDirection: "row-reverse" }]}>
            <Text style={styles.textEmployee}>
              {payroll_data.employee_id} - {payroll_data.employee_name} -{" "}
              {SysMonthTransform(date.getMonth() + 1, "long", "in")}{" "}
              {date.getFullYear()}
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.containerRow}>
              {Object.keys(payroll_data).map((data_key) => {
                if (
                  typeof payroll_data[data_key] == "object" &&
                  data_key != "other_informations"
                ) {
                  let total_key = 0;
                  return (
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={styles.textContentBorder}>
                          {toCamelCase(data_key)}
                        </Text>
                      </View>
                      {Object.keys(payroll_data[data_key]).map((key) => {
                        total_key += payroll_data[data_key][key];
                        if (key == "total_add" || key == "total_reduce") {
                          return null;
                        }
                        if (typeof payroll_data[data_key][key] == "object") {
                          if (
                            payroll_data[data_key][key].details != undefined
                          ) {
                            total_key += payroll_data[data_key][key].total;
                            // if (data_key == "value_to_add") {
                            //   total_penerimaan +=
                            //     payroll_data[data_key][key].total;
                            // } else if (data_key == "value_to_reduce") {
                            //   total_potongan +=
                            //     payroll_data[data_key][key].total;
                            // }
                            return (
                              <div>
                                <View style={styles.tableRow}>
                                  <Text style={styles.textContentMedium}>
                                    {toCamelCase(key)}
                                  </Text>
                                </View>
                                {payroll_data[data_key][key].details.map(
                                  (val) => {
                                    return (
                                      <View style={styles.tableRow}>
                                        <Text
                                          style={[
                                            styles.textContentMedium,
                                            { marginLeft: 15 },
                                          ]}
                                        >
                                          {val.name
                                            ? val.name
                                            : val.title
                                            ? val.title
                                            : val.description}
                                        </Text>
                                        <Text
                                          style={[
                                            styles.textContentMedium,
                                            styles.right_align,
                                          ]}
                                        >
                                          {SysCurrencyTransform({
                                            num: val.amount,
                                            currency: "",
                                          })}
                                        </Text>
                                      </View>
                                    );
                                  }
                                )}
                                <View style={styles.tableRowBorder}>
                                  <Text
                                    style={[
                                      styles.textContentMedium,
                                      styles.right_align,
                                    ]}
                                  >
                                    Total
                                  </Text>
                                  <Text
                                    style={[
                                      styles.textContentMedium,
                                      styles.right_align,
                                    ]}
                                  >
                                    {SysCurrencyTransform({
                                      num: payroll_data[data_key][key].total,
                                      currency: "",
                                    })}
                                  </Text>
                                </View>
                                ;
                              </div>
                            );
                          } else {
                            let total = 0;

                            return (
                              <div>
                                <View style={styles.tableRow}>
                                  <Text style={[styles.textContentMedium]}>
                                    {toCamelCase(key)}
                                  </Text>
                                </View>
                                {Object.keys(payroll_data[data_key][key]).map(
                                  (val) => {
                                    total += payroll_data[data_key][key][val];
                                    total_key +=
                                      payroll_data[data_key][key][val];

                                    // if (data_key == "value_to_add") {
                                    //   total_penerimaan +=
                                    //     payroll_data[data_key][key][val];
                                    // } else if (data_key == "value_to_reduce") {
                                    //   total_potongan +=
                                    //     payroll_data[data_key][key][val];
                                    // }
                                    return (
                                      <View style={styles.tableRow}>
                                        <Text
                                          style={[
                                            styles.textContentMedium,
                                            { marginLeft: 15 },
                                          ]}
                                        >
                                          {toCamelCase(val)}
                                        </Text>
                                        <Text
                                          style={[
                                            styles.textContent,
                                            styles.right_align,
                                          ]}
                                        >
                                          {SysCurrencyTransform({
                                            num: payroll_data[data_key][key][
                                              val
                                            ],
                                            currency: "",
                                          })}
                                        </Text>
                                      </View>
                                    );
                                  }
                                )}
                                <View style={styles.tableRowBorder}>
                                  <Text
                                    style={[
                                      styles.textContentMedium,
                                      styles.right_align,
                                    ]}
                                  >
                                    Total
                                  </Text>
                                  <Text
                                    style={[
                                      styles.textContentMedium,
                                      styles.right_align,
                                    ]}
                                  >
                                    {SysCurrencyTransform({
                                      num: total,
                                      currency: "",
                                    })}
                                  </Text>
                                </View>
                              </div>
                            );
                          }
                        } else {
                          // total_key += payroll_data[data_key][key];
                          if (
                            data_key == "total_add" ||
                            data_key == "total_reduce"
                          ) {
                            return null;
                          }
                          // if (data_key == "value_to_add") {
                          //   total_penerimaan += payroll_data[data_key][key];
                          // } else if (data_key == "value_to_reduce") {
                          //   total_potongan += payroll_data[data_key][key];
                          // }
                          return (
                            <View style={styles.tableRowBorder}>
                              <Text style={styles.textContentMedium}>
                                {toCamelCase(key)}
                              </Text>
                              <Text
                                style={[styles.textContent, styles.right_align]}
                              >
                                {SysCurrencyTransform({
                                  num: payroll_data[data_key][key],
                                  currency: "",
                                })}
                              </Text>
                            </View>
                          );
                        }
                      })}

                      <View style={styles.tableRow}>
                        <Text style={styles.textContentBorder}></Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={[styles.textContentMedium]}>
                          Total {toCamelCase(data_key)}
                        </Text>
                        <Text
                          style={[styles.textContentMedium, styles.right_align]}
                        >
                          {SysCurrencyTransform({
                            num:
                              data_key == "value_to_add"
                                ? total_penerimaan
                                : data_key == "value_to_reduce"
                                ? total_potongan
                                : total_key,
                            currency: "",
                          })}
                        </Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={styles.textContentBorder}></Text>
                      </View>
                    </View>
                  );
                }
              })}
            </View>

            <View style={styles.containerRow}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.textContentMedium]}>
                    Total Penerimaan
                  </Text>
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

          <View style={styles.containerRow}>
            <Text style={styles.textContentSmall}>
              HARAP DIPERHATIKAN, ISI PERNYATAAN INI ADALAH RAHASIA KECUALI ANDA
              DIMINTA UNTUK MENGUNGKAPKANNYA UNTUK KEPERLUAN PAJAK, HUKUM, ATAU
              KEPENTINGAN PEMERINTAH. SETIAP PELANGGARAN ATAS KEWAJIBAN MENJAGA
              KERAHASIAAN INI AKAN DIKENAKAN SANKSI, YANG MUNGKIN BERUPA
              TINDAKAN KEDISIPLINAN.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PayrollPdf;
