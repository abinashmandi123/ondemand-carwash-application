import React, { Component } from 'react'

export class Report extends Component {
    render() {
        return (
            <>
                <div class="container">
    <div class="row">
        <div class="well col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6">
                    <strong th:text="${result}"></strong>
                    <br/>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 text-right">
                    <p>
                        <em>Receipt #: 34522677W</em>
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="text-center">
                    <h1>Receipt</h1>
                </div>
               
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Components</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr th:each="entry : ${parameters}">

                        <td th:text="${entry.key} + '  : -  ' + ${entry.value}"></td>
                      
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
            </>
        )
    }
}

export default Report
