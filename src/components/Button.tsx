import { ButtonContainer, ColorsType } from "./Button.styles";

type ButtonPropsType = {
    variantprop?: ColorsType;
}

export function Button({ variantprop }: ButtonPropsType) {
	return (
		<ButtonContainer variant={variantprop}>TESTE</ButtonContainer>
	);
}