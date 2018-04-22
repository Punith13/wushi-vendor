import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { getAlipayImage, openCloseModal } from './Actions';
import AlipayScreen from './components/AlipayScreen';
import Helmet from 'react-helmet';

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

class MenuAppBar extends React.Component {
	state = {
		auth: true,
		anchorEl: null
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handlePayClick = () => {
		let discountedRate = parseFloat(this.state.amount) - parseFloat(this.state.amount) * 5 / 100;
		this.props.openCloseModal(true);
		this.setState({ discountedRate });
		this.props.getAlipayImage('AUD', discountedRate);
	};

	handleInputChange = e => {
		this.setState({ amount: parseFloat(e.target.value) });
	};

	render() {
		const { classes } = this.props;
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<Helmet title="Wushi Integrated Vendor" />
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" className={classes.flex}>
							Wushi : Integrated Platform - Tong's Garden
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid container spacing={24}>
					<Grid item xs={12} style={{ marginTop: '20px', marginLeft: '20px' }}>
						<Typography variant="display1" color="inherit" className={classes.flex}>
							Welcome Wushi Customer
						</Typography>
					</Grid>
					<Grid item xs={3} style={{ marginTop: '20px', marginLeft: '20px' }}>
						<Typography variant="headline" color="inherit" className={classes.flex}>
							Amount To Pay :
						</Typography>
					</Grid>
					<Grid item xs={3} style={{ marginTop: '20px' }}>
						<FormControl fullWidth className={classes.margin}>
							<Input
								id="adornment-amount"
								value={this.state.amount}
								startAdornment={<InputAdornment position="start">$</InputAdornment>}
								onChange={e => this.handleInputChange(e)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={3} style={{ marginTop: '20px' }}>
						<Button
							onClick={this.handlePayClick}
							variant="raised"
							color="primary"
							className={classes.button}
						>
							Pay
						</Button>
					</Grid>
					<AlipayScreen open={this.props.open} amount={this.state.discountedRate} />
				</Grid>
			</div>
		);
	}
}

MenuAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ alipayState }) => {
	return {
		open: alipayState.open
	};
};

export default withStyles(styles)(connect(mapStateToProps, { getAlipayImage, openCloseModal })(MenuAppBar));
