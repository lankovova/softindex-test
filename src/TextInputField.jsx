import React from 'react';
import './TextInputField.css';

export default class TextInputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps({ value }) {
        // Update state here
        // for parent to be able to change value
        this.setState({ value });
    }

    handleChange(event) {
        const { value } = event.target;

        this.setState({ value });
        this.props.handleChange(event);
    }

    render() {
        const {
            errors,
            errorClass,
            inputRef,
            name,
            placeholder,
        } = this.props;

        return (
            <div>
                <input
                    className={`FormInput ${errorClass}`}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    ref={inputRef}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                {
                    errors.map(error => (
                        <div className="InputError" key={error.toString()}>{error}</div>
                    ))
                }
            </div>
        );
    }
}
