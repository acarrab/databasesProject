import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 150,
    },
};

interface Props {
    onUpdate: (category: string) => void
    errorText?: string
}
interface State {
    value: number
}
const categories = [
    "funny",
    "sports",
    "nature",
    "gaming",
    "music",
    "sad",
    "news",
    "documentary",
    "other"
]

export default class CategorySelector extends Component<Props, State> {


    handleChange(event, index, value) {
        this.setState({ value })

        if (value === null)
            this.props.onUpdate("")
        else
            this.props.onUpdate(categories[value])
    }
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = { value: null }
    }


    render() {
        return (
            <div>
                <SelectField
                    floatingLabelText="Category?"
                    value={this.state.value}
                    onChange={this.handleChange}
                    errorText={this.props.errorText}
                >
                    <MenuItem value={null} primaryText="" />
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={index} primaryText={category} />
                    ))}
                </SelectField>
                <br />
            </div>
        );
    }
}
