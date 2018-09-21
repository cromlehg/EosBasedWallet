import React, {Component} from 'react';
import Default, {Async} from 'react-select';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.scss';

export default class Select extends Component {
  static propTypes = {
    clearable: PropTypes.bool,
    children: PropTypes.node,
    id: PropTypes.string,
    input: PropTypes.object,
    loadOptions: PropTypes.func,
    meta: PropTypes.object,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    searchable: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.input.value
    };
  }

  onChange = value => {
    this.setState({value});
    this.props.input.onChange(value ? value.value : '');
  }

  render() {
    const {
      clearable = false,
      disabled,
      id,
      input: {name, onBlur, onDragStart, onDrop, onFocus},
      loadOptions,
      meta,
      placeholder,
      searchable = false
    } = this.props;
    const isInvalid = meta.touched && meta.error;
    const isValid = meta.touched && !meta.invalid;
    let options;
    if (this.props.children) {
      options = this.props.children.map((child) => {
        const {value, children} = child.props;
        return {value, label: children};
      });
    } else {
      options = this.props.options;
    }
    const SelectComponent = loadOptions ? Async : Default;
    return (
      <React.Fragment>
        <SelectComponent
          autosize={false}
          className={cn({'is-valid': isValid, 'is-invalid': isInvalid})}
          clearable={clearable}
          disabled={disabled}
          inputProps={{id}}
          placeholder={placeholder}
          loadOptions={loadOptions}
          name={name}
          onBlur={() => onBlur(this.state.value ? this.state.value.value : '')}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onFocus={onFocus}
          onChange={this.onChange}
          options={options}
          searchable={searchable}
          value={this.state.value}
        />
        {isInvalid &&
          <div className="invalid-feedback">{meta.error}</div>
        }
      </React.Fragment>
    );
  }
}
