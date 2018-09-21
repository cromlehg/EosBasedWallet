import React from 'react';
import cn from 'classnames';

export default function (field) {
  const isInvalid = field.meta.touched && field.meta.error && !field.disabled;
  const isValid = field.meta.touched && !field.meta.invalid && !field.disabled;
  return (
    <React.Fragment>
      <input
        className={cn('form-check-input', {'is-valid': isValid, 'is-invalid': isInvalid})}
        id={field.id}
        type="checkbox"
        disabled={field.disabled}
        {...field.input}
      />
      {field.children}
      {isInvalid &&
        <div className="invalid-feedback">{field.meta.error}</div>
      }
    </React.Fragment>
  );
}
