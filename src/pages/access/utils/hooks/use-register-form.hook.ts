import { useCreateUserMutation } from '@/services';
import { registerSchema } from '@/pages/access/schemas';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

export function useRegisterForm(
	setState: React.Dispatch<React.SetStateAction<boolean>>
) {
	const [createUser] = useCreateUserMutation();

	const {
		values,
		errors,
		touched,
		resetForm,
		setFieldTouched,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: registerSchema,
		async onSubmit(values, formikHelpers) {
			const response = await createUser(values);

			if ('error' in response) {
				const { error } = response;
				// @ts-expect-error
				console.error(error.data.message);
				// @ts-expect-error
				if (error.data.message.includes('e-mail')) {
					setDisabledBtn(true);
					setShowAlert(true);

					setTimeout(() => {
						setDisabledBtn(false);
						setShowAlert(false);
					}, 3000);

					return;
				}
			}

			if ('data' in response) {
				resetForm();
				setState(false);
			}
		},
	});

	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

	useEffect(() => {
		if (
			values.firstName !== '' &&
			values.lastName !== '' &&
			values.email !== '' &&
			values.password !== '' &&
			values.confirmPassword !== ''
		) {
			if (
				!errors.firstName &&
				!errors.lastName &&
				!errors.email &&
				!errors.password &&
				!errors.confirmPassword
			) {
				setDisabledBtn(false);
			} else {
				setDisabledBtn(true);
			}
		} else {
			setDisabledBtn(true);
		}
	}, [{ ...values }]);

	useEffect(() => {
		if (showAlert) {
			setDisabledBtn(true);
		} else {
			setDisabledBtn(false);
		}
	}, [showAlert]);

	return {
		values,
		errors,
		touched,
		resetForm,
		setFieldTouched,
		handleChange,
		handleBlur,
		handleSubmit,
		showAlert,
		setShowAlert,
		disabledBtn,
		setDisabledBtn,
	};
}
