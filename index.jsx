/**
 * Created by vivekp on 17-05-2017.
 */
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './editableLabel.css';

class EditableLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            value: this.props.value
        };
        this.onEditClicked = this.onEditClicked.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    onEditClicked() {
        this.setState({ showInput: true });
    }
    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.setState({ showInput: false, value: e.target.value });
            if (typeof this.props.saveAction === 'function') {
                this.props.saveAction(e.target.value, e.target.name, e);
            }
        }
    }
    onChangeValue() {
        this.setState({ showInput: false });
    }

    render() {
        const newClass = this.props.className ? this.props.className : 'input-label-group form-group clearfix';
        const topClass = `${newClass}`;
        return (
          <div className={topClass}>

            {!this.state.showInput ?
                (<div><div className="col-sm-8">
                  {this.props.children}
                  <label className="profile-label">{this.state.value}</label>
                </div>
                  <div className="col-sm-4">
                    {this.props.showEdit ?
                      <span
                        className="float-right edit-link"
                        onClick={this.onEditClicked}
                      >{this.props.extraInfo}
                        {this.props.extraInfo ? ' |' : ''} Edit</span> :
                      <span className="float-right">{this.props.extraInfo}</span>
                  }

                  </div></div>) :
                (<input
                  data-index={this.props.index}
                  className="col-sm-12"
                  defaultValue={this.props.value} name={this.props.name}
                  onBlur={this.onChangeValue} onKeyPress={this.onKeyPress}
                  autoFocus
                />)
            }
          </div>

        );
    }
}
EditableLabel.PropTypes = {
    value: PropTypes.string,
    extraInfo: PropTypes.string,
    showEdit: PropTypes.bool,
    saveAction: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    index: PropTypes.number
};
export default EditableLabel;
