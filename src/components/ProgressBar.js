import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            completed: 0,
            total: 7
          };
    };

    componentDidMount() {
        this.setState({
            completed: this.calculateNumberCompleted(this.props),
            total: this.calculateTotal(this.props)
        });
    }
 
    componentWillReceiveProps(nextProps) {
        this.setState({
            completed: this.calculateNumberCompleted(nextProps),
            total: this.calculateTotal(nextProps)
        });
    };

    calculateNumberCompleted = (nextProps) => {
        const { devType, customerType, devInfo, customerInfo, description, specs, paymentTerms, sigInfoDev, sigInfoCustomer } = nextProps;
        let totalCompleted = 0;

        if (devType !== '') totalCompleted++;
        if (customerType !== '') totalCompleted++;
        if (devInfo.zip !== '') totalCompleted++;
        if (customerInfo.zip !== '') totalCompleted++;
        if (description !== '') totalCompleted++;
        if (specs !== '') totalCompleted++;
        if (paymentTerms !== '') totalCompleted++;
        if (devType === 'business' && sigInfoDev.sigName !== '') totalCompleted++;
        if (customerType === 'business' && sigInfoCustomer.sigName !== '') totalCompleted++;

        console.log(totalCompleted);
        return totalCompleted;
    };

    calculateTotal(nextProps) {
        const { devType, customerType } = nextProps;
        let total = 7;

        if (devType === 'business') total++;
        if (customerType === 'business') total++;

        return total;
    };

  render() {
    const { classes } = this.props;
    const { completed, total } = this.state;
    
    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={Math.floor(completed / total * 100)} />
        <br />
        <div className='Dashboard-progressTextContainer'>
            <Typography variant='body1' color='primary'>
                Draft Progress: {Math.floor(completed / total * 100)}%
            </Typography>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
    classes: PropTypes.object.isRequired,
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired,
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    specs: PropTypes.string.isRequired,
    paymentTerms: PropTypes.string.isRequired,
    sigInfoDev: PropTypes.object.isRequired,
    sigInfoCustomer: PropTypes.object.isRequired,
    currentPage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    devType: state.contractInfo.devType,
    customerType: state.contractInfo.customerType,
    devInfo: state.contractInfo.devInfo,
    customerInfo: state.contractInfo.customerInfo,
    description: state.contractInfo.description,
    specs: state.contractInfo.specs,
    paymentTerms: state.contractInfo.paymentTerms,
    sigInfoDev: state.contractInfo.sigInfoDev,
    sigInfoCustomer: state.contractInfo.sigInfoCustomer,
    currentPage: state.pages.currentPage
});

export default connect(mapStateToProps)(withStyles(styles)(ProgressBar));