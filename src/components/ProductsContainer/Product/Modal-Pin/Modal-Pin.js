import React from 'react';
import {Text, Icon} from "gestalt";
import ReactModal from "react-modal";

import "gestalt/dist/gestalt.css";
import "./Modal-Pin.css";

class ModalPin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editModalProductDescription: false
		};

	}

	submitNewPersonalizedDescription = (event) => {
		if (this.state.editModalProductDescription && event.target.id !== "description") {
			this.setState({ editModalProductDescription: false });
		}
		event.preventDefault();
	};

	render() {
		return (
			<ReactModal
				isOpen={this.props.modalStatus}
				onRequestClose={this.props.toggleModal}
				className="modalPin"
				overlayClassName="ReactModalPin__Overlay"
				contentLabel="Pin Modal"
			>
				<div className="modalPin_ProductSummary" onClick={this.submitNewPersonalizedDescription}>
					<div className="productPic">
						<img src={this.props.productImage} alt=""/>
					</div>
					<div>
						{ this.state.editModalProductDescription
							? <form>
								<textarea
									id="description"
									rows="6"
									placeholder="Description"
									value={this.props.productDescription}
									onChange={this.edit}
								/>
							  </form>
							: <div onClick={() =>
								this.setState({ editModalProductDescription: true })
							   }>
								<div className="modalPin_productDescription">
									<Text color="midnight"
										  bold={true}
										  size="sm">
										{this.props.productDescription}
									</Text>
								</div>
								<div className="modalPin_productDescriptionEdit">
									<Icon
										accessibilityLabel="edit"
										icon="edit"
										color="darkGray"
										inline={true}
										size={20}
									/>
								</div>
							</div>
						}
					</div>
				</div>
				<div className="modalPin_Boards">
					<h2>Choose Boards</h2>
				</div>
			</ReactModal>
		)
	}
}

export default ModalPin;