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
export declare type FaqUpdateFormInputValues = {
    question?: string;
    answer?: string;
    likes?: number;
    pinned?: boolean;
};
export declare type FaqUpdateFormValidationValues = {
    question?: ValidationFunction<string>;
    answer?: ValidationFunction<string>;
    likes?: ValidationFunction<number>;
    pinned?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FaqUpdateFormOverridesProps = {
    FaqUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    question?: PrimitiveOverrideProps<TextFieldProps>;
    answer?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextFieldProps>;
    pinned?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type FaqUpdateFormProps = React.PropsWithChildren<{
    overrides?: FaqUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    faq?: any;
    onSubmit?: (fields: FaqUpdateFormInputValues) => FaqUpdateFormInputValues;
    onSuccess?: (fields: FaqUpdateFormInputValues) => void;
    onError?: (fields: FaqUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FaqUpdateFormInputValues) => FaqUpdateFormInputValues;
    onValidate?: FaqUpdateFormValidationValues;
} & React.CSSProperties>;
export default function FaqUpdateForm(props: FaqUpdateFormProps): React.ReactElement;
