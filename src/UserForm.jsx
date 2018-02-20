import React from 'react';
import { onlyNumbers, validName } from './utils';
import './UserForm.css';

const INPUT_STATES = {
    UNTOUCHED: 'UNTOUCHED',
    ERROR: 'ERROR',
    PASS: 'PASS',
};

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            gender: true,
            phone: '',
            age: '',
            formIsValid: false,
            inputFieldsData: {
                firstName: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
                lastName: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
                phone: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
                age: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
            },
        };

        // Object to store input fields refs
        this.inputFields = {};

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Reset form fields
    clearFields() {
        this.setState({
            firstName: '',
            lastName: '',
            gender: true,
            phone: '',
            age: '',
            formIsValid: false,
            inputFieldsData: {
                firstName: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
                lastName: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
                phone: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
                age: {
                    errors: [],
                    state: INPUT_STATES.UNTOUCHED,
                },
            },
        });
    }

    handleUserInput(event) {
        const { target } = event;
        const { name } = target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(
            { [name]: value },
            // Validate all fields except checkboxes
            () => { if (target.type !== 'checkbox') this.validateField(name, value); }
        );
    }

    validateField(name, value) {
        let hasError = false;
        const errorMessages = [];

        // Common validation rules for all fields
        if (value.length === 0) {
            hasError = true;
            errorMessages.push('Field length must be greater that 0');
        }
        if (value.length > 50) {
            hasError = true;
            errorMessages.push('Field length must be less or equal 50');
        }

        switch (name) {
            case 'firstName':
            case 'lastName': {
                if (!validName(value)) {
                    hasError = true;
                    errorMessages.push('Name field could contain only letters, hyphens and single quotes');
                }
                break;
            }
            case 'phone': {
                if (!onlyNumbers(value)) {
                    hasError = true;
                    errorMessages.push('Phone field could contain only numbers');
                }
                break;
            }
            case 'age': {
                if (!onlyNumbers(value)) {
                    hasError = true;
                    errorMessages.push('Age field could contain only numbers');
                }
                if (value.length > 3) {
                    hasError = true;
                    errorMessages.push('Age field length should be less or equal 3');
                }
                break;
            }
            default: { break; }
        }

        this.setState((prevState) => {
            const newInputStates = prevState.inputFieldsData;
            newInputStates[name].state = (hasError) ? INPUT_STATES.ERROR : INPUT_STATES.PASS;
            newInputStates[name].errors = errorMessages;

            return { inputFieldsData: newInputStates };
        }, () => { this.validateForm(); });
    }

    validateForm() {
        let formIsValid = true;

        Object.values(this.state.inputFieldsData).forEach((field) => {
            if (field.state !== INPUT_STATES.PASS) {
                formIsValid = false;
            }
        });

        this.setState({ formIsValid });
    }

    handleSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        if (this.state.formIsValid) {
            this.props.onSubmit(this.state);
            this.clearFields();
        } else {
            // Validate all fields to show errors
            Object.values(this.inputFields).forEach((field) => {
                this.validateField(field.name, field.value);
            });
        }
    }

    inputStateClass(state) {
        switch (state) {
            case INPUT_STATES.ERROR:
                return 'has-error';
            case INPUT_STATES.PASS:
                return 'no-error';
            default:
                return '';
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="Form">
                {/* TODO: Extract textInput element from here */}
                <input
                    className={`FormInput ${this.inputStateClass(this.state.inputFieldsData.firstName.state)}`}
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    ref={el => this.inputFields.firstName = el}
                    value={this.state.firstName}
                    onChange={this.handleUserInput}
                />
                {
                    this.state.inputFieldsData.firstName.errors.map(error => (
                        <div className="error" key={error.toString()}>{error}</div>
                    ))
                }
                <input
                    className={`FormInput ${this.inputStateClass(this.state.inputFieldsData.lastName.state)}`}
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    ref={el => this.inputFields.lastName = el}
                    value={this.state.lastName}
                    onChange={this.handleUserInput}
                />
                {
                    this.state.inputFieldsData.lastName.errors.map(error => (
                        <div className="error" key={error.toString()}>{error}</div>
                    ))
                }
                <input
                    className={`FormInput ${this.inputStateClass(this.state.inputFieldsData.phone.state)}`}
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    ref={el => this.inputFields.phone = el}
                    value={this.state.phone}
                    onChange={this.handleUserInput}
                />
                {
                    this.state.inputFieldsData.phone.errors.map(error => (
                        <div className="error" key={error.toString()}>{error}</div>
                    ))
                }
                <label className="FormCheckbox" htmlFor="genderField">
                    <input
                        type="checkbox"
                        name="gender"
                        id="genderField"
                        checked={this.state.gender ? 'checked' : ''}
                        value={this.state.gender}
                        onChange={this.handleUserInput}
                    />
                    {(this.state.gender) ? 'Male' : 'Female'}
                </label>
                <input
                    className={`FormInput ${this.inputStateClass(this.state.inputFieldsData.age.state)}`}
                    type="text"
                    name="age"
                    placeholder="Age"
                    ref={el => this.inputFields.age = el}
                    value={this.state.age}
                    onChange={this.handleUserInput}
                />
                {
                    this.state.inputFieldsData.age.errors.map(error => (
                        <div className="error" key={error.toString()}>{error}</div>
                    ))
                }
                <input className="FormSubmit" type="submit" value="Submit" />
            </form>
        );
    }
}
