import { useLoginMutation } from '@/services';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

export function useLoginForm() {
	const [login] = useLoginMutation();

	const navigate = useNavigate();

	const { values, resetForm, handleChange, handleSubmit } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		async onSubmit(values, formikHelpers) {
			const { email, password } = values;

			const response = await login({ email, password });

			if ('error' in response) {
				const { error } = response;
				// @ts-expect-error
				console.error(error.data.message);

				setDisabledBtn(true);
				setShowAlert(true);

				setTimeout(() => {
					setDisabledBtn(false);
					setShowAlert(false);
				}, 3000);
			}

			if ('data' in response) {
				const { data } = response;
				console.log(data.data);

				sessionStorage.setItem('uid', JSON.stringify(data.data));

				navigate('/home');
			}
		},
	});

	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

	useEffect(() => {
		values.email !== '' && values.password !== ''
			? setDisabledBtn(false)
			: setDisabledBtn(true);
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
		resetForm,
		handleChange,
		handleSubmit,
		showAlert,
		setShowAlert,
		disabledBtn,
		setDisabledBtn,
	};
}
