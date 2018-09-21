import React from 'react';
import cn from 'classnames';

export default function (field) {
  const isInvalid = field.meta.touched && field.meta.error && !field.disabled;
  const isValid = field.meta.touched && !field.meta.invalid && !field.disabled;
  const asyncValidating = field.meta.asyncValidating;
  return (
    <React.Fragment>
      <input
        className={cn('form-control', {'is-valid': isValid, 'is-invalid': isInvalid, 'loading': asyncValidating})}
        id={field.id}
        type={field.type}
        placeholder={field.placeholder}
        disabled={field.disabled}
        {...field.input}
      />
      {!field.hideFeedback && isInvalid &&
        <div className="invalid-feedback">{field.meta.error}</div>
      }
    </React.Fragment>
  );
}
