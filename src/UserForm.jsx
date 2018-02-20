import React from 'react';
import TextInputField from './TextInputField';
import Checkbox from './Checkbox';
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
            phone: '',
            age: '',
            gender: true,
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

        this.handleUserCheckboxToggle = this.handleUserCheckboxToggle.bind(this);
        this.handleUserTextInput = this.handleUserTextInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserCheckboxToggle(name, value) {
        this.setState({ [name]: value });
    }

    handleUserTextInput(event) {
        const { name, value } = event.target;

        this.setState(
            { [name]: value },
            () => { this.validateField(name, value); }
        );
    }

    validateField(name, value) {
        let hasError = false;
        const errorMessages = [];

        // Common validation rules for all fields
        if (value.length === 0) {
            hasError = true;
            errorMessages.push('Field length must be greater than 0');
        }
        if (value.length > 25) {
            hasError = true;
            errorMessages.push('Field length must be lower or equal 25');
        }

        switch (name) {
            case 'firstName':
            case 'lastName': {
                if (!validName(value)) {
                    hasError = true;
                    errorMessages.push('Name field must contain only letters, hyphens or single quotes');
                }
                break;
            }
            case 'phone': {
                if (!onlyNumbers(value)) {
                    hasError = true;
                    errorMessages.push('Phone field must contain only numbers');
                }
                break;
            }
            case 'age': {
                if (!onlyNumbers(value)) {
                    hasError = true;
                    errorMessages.push('Age field must contain only numbers');
                }
                if (value.length > 3) {
                    hasError = true;
                    errorMessages.push('Age field length must be lower or equal 3');
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

    // Reset form fields
    clearFields() {
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            age: '',
            gender: true,
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

    handleSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        if (this.state.formIsValid) {
            const {
                firstName, lastName, phone, gender, age,
            } = this.state;

            this.props.onSubmit({
                firstName, lastName, phone, gender, age: +age,
            });

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
                <TextInputField
                    name="firstName"
                    placeholder="First name"
                    errorClass={this.inputStateClass(this.state.inputFieldsData.firstName.state)}
                    value={this.state.firstName}
                    handleChange={this.handleUserTextInput}
                    errors={this.state.inputFieldsData.firstName.errors}
                    inputRef={el => this.inputFields.firstName = el}
                />
                <TextInputField
                    name="lastName"
                    placeholder="Last name"
                    errorClass={this.inputStateClass(this.state.inputFieldsData.lastName.state)}
                    value={this.state.lastName}
                    handleChange={this.handleUserTextInput}
                    errors={this.state.inputFieldsData.lastName.errors}
                    inputRef={el => this.inputFields.lastName = el}
                />
                <TextInputField
                    name="phone"
                    placeholder="Phone"
                    errorClass={this.inputStateClass(this.state.inputFieldsData.phone.state)}
                    value={this.state.phone}
                    handleChange={this.handleUserTextInput}
                    errors={this.state.inputFieldsData.phone.errors}
                    inputRef={el => this.inputFields.phone = el}
                />
                <Checkbox
                    name="gender"
                    label="Female"
                    labelOnCheck="Male"
                    isChecked={this.state.gender}
                    onToggleCheckbox={this.handleUserCheckboxToggle}
                />
                <TextInputField
                    name="age"
                    placeholder="Age"
                    errorClass={this.inputStateClass(this.state.inputFieldsData.age.state)}
                    value={this.state.age}
                    handleChange={this.handleUserTextInput}
                    errors={this.state.inputFieldsData.age.errors}
                    inputRef={el => this.inputFields.age = el}
                />
                <input className="FormSubmit" type="submit" value="Add user" />
            </form>
        );
    }
}
