import React from 'react';

export default function ListItems() {
  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Value</th>
              <th>Monthy Price</th>
              <th>Setup Price</th>
              <th>Currency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>value</td>
              <td>Monthy Price here</td>
              <td>Setup Price here</td>
              <td>Currency here</td>
              <td>
                <a href="#editEmployeeModal" className="edit">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                  >
                    &#xE254;
                  </i>
                </a>
                <a href="#deleteEmployeeModal" className="delete">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td>Monthy Price here</td>
              <td>Setup Price here</td>
              <td>Currency here</td>
              <td>
                <a
                  href="#editEmployeeModal"
                  className="edit"
                  data-toggle="modal"
                >
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                  >
                    &#xE254;
                  </i>
                </a>
                <a
                  href="#deleteEmployeeModal"
                  className="delete"
                  data-toggle="modal"
                >
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td>Monthy Price here</td>
              <td>Setup Price here</td>
              <td>Currency here</td>
              <td>
                <a href="#editEmployeeModal" className="edit">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                  >
                    &#xE254;
                  </i>
                </a>
                <a href="#deleteEmployeeModal" className="delete">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td>Monthy Price here</td>
              <td>Setup Price here</td>
              <td>Currency here</td>
              <td>
                <a href="#editEmployeeModal" className="edit">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                  >
                    &#xE254;
                  </i>
                </a>
                <a href="#deleteEmployeeModal" className="delete">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            </tr>
            <tr>
              <td>value</td>
              <td>Monthy Price here</td>
              <td>Setup Price here</td>
              <td>Currency here</td>
              <td>
                <a href="#editEmployeeModal" className="edit">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                  >
                    &#xE254;
                  </i>
                </a>
                <a href="#deleteEmployeeModal" className="delete">
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
