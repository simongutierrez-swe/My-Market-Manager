import React, { Component } from 'react';

class SingleStock extends Component {
    constructor() {
        super()

        this.state = {
            amount: 1,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.id]: event.target.value,
        });
      }

    render() {
        // amount needs to be changeable in this component.
        const {searchResults} = this.props;
        const stock = {};
        const currentPrice = Number.parseFloat(searchResults.latestPrice).toFixed(2);
        console.log(searchResults)

        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">
                            <span className="bold-text-style">Company: {searchResults.companyName}({searchResults.symbol}) </span>
                        </span>

                        <ul className="placeholder">
                            <li>
                            <span className="bold-text-style" >Current Price: ${currentPrice}</span>
                            </li>
                            
                            <li>
                                <label htmlFor="amount">
                                Number of Shares<span className="red-text-color">*</span>
                                </label>

                                <input
                                type="number"
                                id="amount"
                                value={this.state.amount}
                                min="1"
                                onChange={this.handleChange}
                                />
                            </li>
                            
                            <li>
                                <span className="bold-text-style">Total: ${Number.parseFloat(this.state.amount * currentPrice).toFixed(2)}</span>
                            </li>
                        </ul>
                        <div className="input-field">
                            <button 
                            className="btn blue lighten-1 z-depth-0"
                            onClick={
                                () => {this.props.buyStock(this.state.amount, stock)
                            }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default SingleStock;