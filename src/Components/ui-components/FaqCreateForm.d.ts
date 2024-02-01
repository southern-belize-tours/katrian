/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FaqCreateFormInputValues = {
    question?: string;
    answer?: string;
    likes?: number;
    pinned?: boolean;
};
export declare type FaqCreateFormValidationValues = {
    question?: ValidationFunction<string>;
    answer?: ValidationFunction<string>;
    likes?: ValidationFunction<number>;
    pinned?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FaqCreateFormOverridesProps = {
    FaqCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    question?: PrimitiveOverrideProps<TextFieldProps>;
    answer?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextFieldProps>;
    pinned?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type FaqCreateFormProps = React.PropsWithChildren<{
    overrides?: FaqCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FaqCreateFormInputValues) => FaqCreateFormInputValues;
    onSuccess?: (fields: FaqCreateFormInputValues) => void;
    onError?: (fields: FaqCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FaqCreateFormInputValues) => FaqCreateFormInputValues;
    onValidate?: FaqCreateFormValidationValues;
} & React.CSSProperties>;
export default function FaqCreateForm(props: FaqCreateFormProps): React.ReactElement;
