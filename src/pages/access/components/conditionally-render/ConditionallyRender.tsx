type RenderFunc = () => JSX.Element;

interface IConditionallyRenderProps {
	condition: boolean;
	show: JSX.Element | RenderFunc;
	elseShow?: JSX.Element | RenderFunc;
}

export function ConditionallyRender({
	condition,
	show,
	elseShow,
}: IConditionallyRenderProps): JSX.Element {
	const isFunc = (param: JSX.Element | RenderFunc) => {
		return typeof param === 'function';
	};

	const handleFunction = (renderFunc: RenderFunc) => {
		const result = renderFunc();

		if (!result) {
			return null;
		}

		return result;
	};

	if (condition) {
		if (isFunc(show)) {
			return handleFunction(show as RenderFunc)!;
		}

		return show as JSX.Element;
	}

	if (!condition && elseShow) {
		if (isFunc(elseShow)) {
			return handleFunction(elseShow as RenderFunc)!;
		}

		return elseShow as JSX.Element;
	}

	return <></>;
}
