import FuseChipSelect from '@fuse/core/FuseChipSelect';
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import { withFormsy } from 'formsy-react';
import React from 'react';

function FuseChipSelectFormsy(props) {
	const importedProps = _.pick(props, [
		'children',
		'classes',
		'className',
		'defaultValue',
		'disabled',
		'fullWidth',
		'id',
		'label',
		'name',
		'onBlur',
		'onChange',
		'onFocus',
		'placeholder',
		'required',
		'textFieldProps',
		'variant',
		'isMulti',
		'options',
		'errorMessage'
	]);

	// An error message is returned only if the component is invalid
	const { errorMessage, value, disabled, isDisabled, isSearchable } = props;

	function changeValue(val, selectedOptions) {
		if (props.multiple) {
			props.setValue(selectedOptions.map(option => option.value));
		} else {
			// props.setValue(val);

			//for remove new val
			let newVal = [];
			for (let i = 0; i < val.length; i++) {
				let newDic = val[i];
				if (newDic.__isNew__) {
				}
				else {
					newVal.push(newDic);
				}
			}
			props.setValue(newVal);
		}
		if (props.onChange) {
			props.onChange(val);
		}
	}

	return (
		<FormControl
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			className={clsx(
				props.className,
				'z-10',
				props.showRequired ? 'required' : '',
				props.showError ? 'error' : null
			)}
			variant={importedProps.variant}
		>
			{props.label && <InputLabel htmlFor={props.name}>{props.label}</InputLabel>}
			<FuseChipSelect
				{...importedProps}
				value={value}
				onChange={changeValue}
				disabled={disabled}
				isDisabled={isDisabled}
				isSearchable={isSearchable}
				error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			/>
			{Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
}

export default React.memo(withFormsy(FuseChipSelectFormsy));
