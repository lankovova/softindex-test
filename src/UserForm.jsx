import React from 'react';
import { onlyDigits, onlyLetters } from './utils';
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
            inputsStates: {
                firstName: INPUT_STATES.UNTOUCHED,
                lastName: INPUT_STATES.UNTOUCHED,
                phone: INPUT_STATES.UNTOUCHED,
                age: INPUT_STATES.UNTOUCHED,
            },
        };

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
            inputsStates: {
                firstName: INPUT_STATES.UNTOUCHED,
                lastName: INPUT_STATES.UNTOUCHED,
                phone: INPUT_STATES.UNTOUCHED,
                age: INPUT_STATES.UNTOUCHED,
            },
        });
    }

    handleUserInput(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState(
            { [target.name]: value },
            () => { this.validateField(target, value); }
        );
    }

    // TODO: Add mutliple validation error message
    validateField(target, value) {
        let hasError = false;

        switch (target.name) {
            case 'firstName':
            case 'lastName': {
                if (!onlyLetters(value)) { hasError = true; }
                break;
            }
            case 'phone':
            case 'age': {
                if (!onlyDigits(value)) { hasError = true; }
                break;
            }
            default: { break; }
        }

        this.setState((prevState) => {
            const newInputStates = prevState.inputsStates;
            newInputStates[target.name] = (hasError) ? INPUT_STATES.ERROR : INPUT_STATES.PASS;

            return { inputsStates: newInputStates };
        }, () => {
            console.log(this.state.inputsStates);
        });
    }

    handleSubmit(formSubmitEvent) {
        formSubmitEvent.preventDefault();

        this.props.onSubmit(this.state);
        this.clearFields();
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
                    className={`FormInput ${this.inputStateClass(this.state.inputsStates.firstName)}`}
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.handleUserInput}
                    required
                />
                <input
                    className={`FormInput ${this.inputStateClass(this.state.inputsStates.lastName)}`}
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.handleUserInput}
                    required
                />
                <input
                    className={`FormInput ${this.inputStateClass(this.state.inputsStates.phone)}`}
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.handleUserInput}
                    required
                />
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
                    className={`FormInput ${this.inputStateClass(this.state.inputsStates.age)}`}
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={this.state.age}
                    onChange={this.handleUserInput}
                    required
                />
                <input className="FormSubmit" type="submit" value="Submit" />
            </form>
        );
    }
}
