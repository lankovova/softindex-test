import React from 'react';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.isChecked,
        };

        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isChecked: nextProps.isChecked });
    }

    onToggleCheckbox() {
        this.setState((prevState) => {
            const newCheckState = !prevState.isChecked;

            this.props.onToggleCheckbox(newCheckState);
            return { isChecked: newCheckState };
        });
    }

    render() {
        const { label, labelOnCheck } = this.props;

        return (
            <div className="checkbox">
                <label htmlFor={label + labelOnCheck}>
                    <input
                        type="checkbox"
                        name="gender"
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
