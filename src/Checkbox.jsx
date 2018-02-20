import React from 'react';
import './Checkbox.css';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.isChecked,
        };

        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
    }

    componentWillReceiveProps({ isChecked }) {
        this.setState({ isChecked });
    }

    onToggleCheckbox(event) {
        const { name } = event.target;
        this.setState((prevState) => {
            const newCheckState = !prevState.isChecked;

            this.props.onToggleCheckbox(name, newCheckState);
            return { isChecked: newCheckState };
        });
    }

    render() {
        const { name, label, labelOnCheck } = this.props;

        return (
            <div>
                <label className="FormCheckbox" htmlFor={label + labelOnCheck}>
                    <input
                        type="checkbox"
                        name={name}
                        id={label + labelOnCheck}
                        checked={this.state.isChecked ? 'checked' : ''}
                        value={this.state.isChecked}
                        onChange={this.onToggleCheckbox}
                    />
                    {(this.state.isChecked) ? labelOnCheck : label}
                </label>
            </div>
        );
    }
}
