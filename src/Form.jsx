import React from 'react';
import { onlyDigits, onlyLetters } from './utils';
import './Form.css';

export default class From extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: 'Lemon',
            lastName: 'Grass',
            gender: true,
            phone: '5553555',
            age: '20',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Reset form fields
    clearFields() {
        this.setState({
            firstName: '',
            lastName: '',
            gender: false,
            phone: '',
            age: '',
        });
    }

    handleChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value.trim();

        // Skip if no input value at all
        if (value === '') {
            console.log('skip');
            // return;
        }

        switch (target.name) {
            case 'firstName':
            case 'lastName': {
                if (!onlyLetters(value)) {
                    target.style.borderColor = 'red';
                } else {
                    target.style.borderColor = 'green';
                }
                break;
            }
            case 'phone':
            case 'age': {
                if (!onlyDigits(value)) {
                    target.style.borderColor = 'red';
                } else {
                    target.style.borderColor = 'green';
                }
                break;
            }
            default: { break; }
        }

        // FIXME: Update field
        this.setState({ [target.name]: value });
    }

    handleSubmit(formSubmitEvent) {
        // Prevent form defaut behavior
        formSubmitEvent.preventDefault();

        this.clearFields();

        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="Form">
                {/* TODO: Extract textInput element from here */}
                <input
                    className="FormInput"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                />
                <input
                    className="FormInput"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    required
                />
                <input
                    className="FormInput"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    required
                />
                <label className="FormCheckbox" htmlFor="genderField">
                    <input
                        type="checkbox"
                        name="gender"
                        id="genderField"
                        checked={this.state.gender ? 'checked' : ''}
                        value={this.state.gender}
                        onChange={this.handleChange}
                    />
                    {(this.state.gender) ? 'Male' : 'Female'}
                </label>
                <input
                    className="FormInput"
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    required
                />
                <input className="FormSubmit" type="submit" value="Submit" />
            </form>
        );
    }
}
