import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import List, { ListItem } from 'material-ui/List';
import { openCloseModal } from '../Actions';
import Grid from 'material-ui/Grid';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
	}
});

class SimpleModal extends React.Component {
	state = {
		open: true
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.openCloseModal(false);
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.props.open}
					onClose={this.handleClose}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<List component="nav">
							<ListItem>
								<Typography variant="headline" id="modal-title">
									{`Powered by Wushi & Alipay`}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="title" id="modal-title">
									Tong's Garden
								</Typography>
							</ListItem>
							<ListItem>
								<Grid container spacing={24}>
									<Grid item xs={6}>
										<Typography variant="title" gutterBottom>
											{`Pay : AUD $ ${this.props.amount}`}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body2" gutterBottom>
											Wushi Discount applied *
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
						</List>
						{this.props.alipayImage && (
							<img
								src={this.props.alipayImage}
								alt="scan code"
								style={{ width: '200px', height: '200px' }}
							/>
						)}
						{!this.props.alipayImage && (
							<Typography variant="subheading" gutterBottom>
								{' '}
								Generating Scan code...{' '}
							</Typography>
						)}
						<SimpleModalWrapped />
					</div>
				</Modal>
			</div>
		);
	}
}

SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ alipayState }) => {
	return {
		alipayImage: alipayState.alipayImage
	};
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(connect(mapStateToProps, { openCloseModal })(SimpleModal));

export default SimpleModalWrapped;
