import React, { Component } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './table.css'


class DataTable extends Component {
  constructor(props) {
    super(props);
    const dataWithSelection = props.data.map(row => ({
      ...row,
      selected: false,
    }));
    this.state = {
        data: dataWithSelection,
        headers: props.headers,
        type: props.type,
        showTrash: props.showTrash === undefined ? true : props.showTrash,
        selectAll: false,
        selectedList: []
    };
  }

    // Select/ UnSelect Table rows
  handleSelectAll(e) {
    let tempList = this.state.data;
    // Check/ UnCheck All Items
    tempList.map((data) => (data.selected = e.target.checked));

    //Update State
    this.setState(
      {
        selectAll: e.target.checked,
        data: tempList,
        selectedList: this.state.data.filter((e) => e.selected),
      })
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.data.map((data) => {
      if (data.id === item.id) {
        return {
          ...data,
          selected: e.target.checked
        };
      }
      return data;
    });
  
    //To Control Master Checkbox State
    const totalItems = tempList.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
  
    // Update State
    this.setState(
      {
        selectAll: totalItems === totalCheckedItems,
        data: tempList,
        selectedList: tempList.filter((e) => e.selected),
      }
    );
  }



  render() {
    const { data, headers, type, showTrash, selectAll } = this.state;

    return (
      <div style={{ borderRadius: '10px', border: '1px solid #039BE5', overflow: 'hidden' }}>
         <table className="table" style={{  borderCollapse: 'collapse', width: '100%' }}>
         <thead style={{ backgroundColor: '#E6F7FF', color: '#039BE5' }}>
            <tr>
              <th className="text-center" data-sortable={false}>
                <div className="custom-control custom-checkbox">
                  <input
                      type="checkbox"
                      className="form-check-input form-check-primary"
                      checked={this.state.selectAll}
                  
                      onChange={(e) => this.handleSelectAll(e)}
                    />
                </div>
              </th>
              {headers.map((header) => (
                <th key={header} data-sortable={false}>{header}</th>
              ))}
              
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="text-center">
                  <div className="custom-control custom-checkbox">
                    <input 
                    className="form-check-input form-check-primary" 
                    type="checkbox" 
                    checked={row.selected}
                    onChange={(e) => this.onItemCheck(e, row)} />
                  </div>

                </td>
                {Object.keys(row).map((key) => (
        key !== "selected" && <td key={key}>{row[key]}</td>
      ))}
                <td>
                  { this.state.showTrash ? (
                          <div className="btn-group" role="group">
                            <a href="#0" className="btn icon btn-primary btn-sm">
                              <i className="bi bi-file-text"></i>
                            </a>
                            <a href="#0" className="btn icon btn-danger btn-sm">
                              <i className="bi bi-trash"></i>
                            </a>
                          </div>
                          )
                          : (
                            <>
                            <a href="#0" className="btn icon btn-primary btn-sm">
                              <i className="bi bi-file-text"></i>
                            </a>
                            </>
                          )
                          }
                </td>
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    );
  }
}

export default DataTable;