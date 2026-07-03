import type { BaseSyntheticEvent, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

type StyledFormProps = {
    type: 'modal' | 'regular';
};

const StyledForm = styled.form<StyledFormProps>`
    ${(props) =>
        props.type === 'regular' &&
        css`
            padding: 2.4rem 4rem;

            /* Box */
            background-color: var(--color-grey-0);
            border: 1px solid var(--color-grey-100);
            border-radius: var(--border-radius-md);
        `}

    ${(props) =>
        props.type === 'modal' &&
        css`
            width: 80rem;
        `}

    overflow: hidden;
    font-size: 1.4rem;
`;

type FormProps = PropsWithChildren<{
    type?: 'modal' | 'regular';
    onSubmit?: (e?: BaseSyntheticEvent) => Promise<void> | void;
}>;

export default function Form({
    type = 'regular',
    onSubmit,
    children,
}: FormProps) {
    return (
        <StyledForm type={type} onSubmit={onSubmit}>
            {children}
        </StyledForm>
    );
}
