import React from 'react';

const Report = () => {
  // Assuming that `result` and `parameters` are passed as props or are fetched from somewhere
  const result = "Some Result"; // Replace this with actual data or props if available
  const parameters = [
    { key: "Component 1", value: "Value 1" },
    { key: "Component 2", value: "Value 2" },
    { key: "Component 3", value: "Value 3" },
  ]; // Replace this with actual data or props if available

  return (
    <div className="container">
      <div className="row">
        <div className="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6">
              <strong>{result}</strong>
              <br />
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 text-right">
              <p>
                <em>Receipt #: 34522677W</em>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="text-center">
              <h1>Receipt</h1>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Components</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.key}  : -  {entry.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
