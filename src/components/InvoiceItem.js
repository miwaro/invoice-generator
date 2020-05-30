import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import '../styles/LayoutStyles.css';

const styles = theme => ({
    root: {
    },
    PageFormInput: {
        margin: 20
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class InvoiceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            unit: null,
            rate: null,
            feeType: '',
            total: 0
        };
    };

    componentDidMount() { 
        this.setState({ 
            description: this.props.item.description,
            unit: this.props.item.unit,
            rate: this.props.item.rate,
            feeType: this.props.item.feeType,
            total: this.props.item.total,
            FeeTypes: this.props.FeeTypes
        })
    }

    handleFeeTypeChange = e => {
        this.setState({ feeType: e.target.value });
        this.calculateTotal();
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    };

    handleRateChange = e => {
        this.setState({ rate: parseInt(e.target.value) || 0 });
        this.calculateTotal();
    };

    handleUnitChange = e => {
        console.log(e);
        this.setState({ unit: parseInt(e.target.value) || 0 });
        
        this.calculateTotal();
    };

    calculateTotal = () => {
        console.log(this.state);
        const { unit = 0, rate = 0, feeType } = this.state;
        let total = 0;
        if (feeType === 'Flat fee') {
            total = Math.round(rate, 2);
        } else {
            total = Math.round(unit * rate, 2);
        }

        console.log('Calculate total was called')
        console.log(total);
        this.setState(() => ({ total }));
       
    }

    render() {
        const { classes, FeeTypes } = this.props;
        const { description, unit, rate, feeType, total } = this.state;
 
        return (

            <div>
                <div className='TextFieldContainer'>
                    <div  className='RemoveInvoiceButton'>
                        <HighlightOffIcon />
                    </div>
                    
                    <div className='InvoiceDescription'>
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder="Description"
                            onChange={this.handleDescriptionChange}
                            value={description}
                        >
                        </TextField>
                    </div>
                    
                    <div className='SecondRowInvoice'>
                        <div
                            style={{
                                width: '50px'
                            }}>
                            {this.state.feeType !== 'Flat fee' &&
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Unit"
                                type="number"
                                onChange={this.handleUnitChange}
                                value={unit}
                            >
                            </TextField>}
                        </div>
                        
                        <div style={{
                                width: '50px'
                            }}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                placeholder="Rate"
                                type="number"
                                onChange={this.handleRateChange}
                                value={rate}
                                >
                            </TextField>
                        </div>
                        
                        <Select
                            open={this.state.open}
                            onChange={this.handleFeeTypeChange}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={feeType ? FeeTypes.FeeTypes.find(type => type === feeType): ''}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'feeType',
                                id: 'controlled-open-select',
                            }}
                        >
                            {
                                FeeTypes.FeeTypes.map((feeType, i) => (
                                    <MenuItem key={i} value={feeType}>{feeType}</MenuItem>
                                ))
                            }
                        </Select>

                        <p className='InvoiceItemTotal'>
                            {feeType === 'Flat fee' ? (rate) : (rate * unit)}
                        </p>
                    </div>
                </div>
            </div>
            
            
        );
    }
};

InvoiceItem.propTypes = {
    FeeTypes: PropTypes.object.isRequired
};

// const mapStateToProps = (state) ({
//     feeType: state.FeeTypes.FeeTypes
// })


export default (withStyles(styles)(InvoiceItem));
