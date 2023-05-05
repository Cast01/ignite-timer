import styled, { css } from "styled-components";

export type ColorsType = "a" | "s" | "d" | "f" | undefined;

type VariantsType = {
    variant: ColorsType;
}

const variantsObj = {
	a: "red",
	s: "blue",
	d: "green",
	f: "coral"
};

export const ButtonContainer = styled.button<VariantsType>`
    padding: .8rem 2rem;

    background-color: ${props => props.theme.primary};

    /* ${({ variant = "a" }: VariantsType) => (
		css`background-color: ${variantsObj[variant]}`
	)} */
`;